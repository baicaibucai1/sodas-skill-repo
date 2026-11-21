import {existsSync, readdirSync, readFileSync, realpathSync, statSync} from 'node:fs';
import {dirname, isAbsolute, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const skill = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const versionPattern = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/;
const nonblank = value => typeof value === 'string' && value.trim().length > 0;
const directories = path => readdirSync(path, {withFileTypes:true}).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();

function asset(root, value, key) {
  if (!nonblank(value) || isAbsolute(value)) throw Error(`Invalid ${key} path`);
  const target = realpathSync(resolve(root, value));
  const rel = relative(realpathSync(root), target);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel) || !statSync(target).isFile()) throw Error(`Invalid ${key} file: ${value}`);
  return target;
}

function scan(root, scope, items, errors) {
  if (!existsSync(root)) return;
  for (const id of directories(root)) {
    for (const version of directories(resolve(root, id))) {
      const directory = resolve(root, id, version);
      try {
        const record = JSON.parse(readFileSync(resolve(directory, 'style.json'), 'utf8').replace(/^\uFEFF/, ''));
        if (!idPattern.test(id) || !versionPattern.test(version) || record.id !== id || record.version !== version) throw Error('ID or version does not match directory');
        if (!nonblank(record.name) || !nonblank(record.summary)) throw Error('Missing name or summary');
        if (record.tags !== undefined && (!Array.isArray(record.tags) || !record.tags.every(nonblank))) throw Error('Invalid tags');
        if (record.source !== undefined && !nonblank(record.source)) throw Error('Invalid source');
        if (!['reference','reproducible'].includes(record.level)) throw Error('Invalid level');
        const result = {id, version, name:record.name, summary:record.summary, tags:record.tags ?? [], level:record.level, scope, directory, guide:asset(directory, record.guide, 'guide')};
        for (const key of ['demo','css']) if (record[key] !== undefined || record.level === 'reproducible') result[key] = asset(directory, record[key], key);
        items.push(result);
      } catch (error) { errors.push(`${directory}: ${error.message}`); }
    }
  }
}

function newerFirst(a, b) {
  const left = a.version.split('.').map(BigInt), right = b.version.split('.').map(BigInt);
  for (let i = 0; i < 3; i++) if (left[i] !== right[i]) return left[i] > right[i] ? -1 : 1;
  return 0;
}

function main([command, ...args]) {
  if (!['list','validate'].includes(command)) throw Error('Usage: catalog.mjs list|validate [--project PATH] [--query WORDS] [--id ID] [--version VERSION] [--offset N]');
  const opts = new Map();
  const permitted = command === 'list' ? ['--project','--query','--id','--version','--offset'] : ['--project'];
  for (let i = 0; i < args.length; i += 2) {
    const [key,value] = args.slice(i,i+2);
    if (!permitted.includes(key) || opts.has(key) || !nonblank(value) || value.startsWith('--')) throw Error(`Invalid option: ${key}`);
    opts.set(key,value);
  }
  const offset = Number(opts.get('--offset') ?? 0);
  if (!Number.isSafeInteger(offset) || offset < 0) throw Error('Invalid offset');
  if (opts.has('--id') && !idPattern.test(opts.get('--id'))) throw Error('Invalid ID');
  if (opts.has('--version') && (!opts.has('--id') || !versionPattern.test(opts.get('--version')))) throw Error('A valid --version requires --id');
  const items = [], errors = [], occupied = new Set();
  scan(resolve(skill,'styles'), 'builtin', items, errors);
  if (opts.has('--project')) {
    const project = resolve(opts.get('--project'));
    if (!statSync(project).isDirectory()) throw Error('Project must be a directory');
    scan(resolve(project,'.ui-styles'), 'project', items, errors);
  }
  for (const item of items) {
    const key = `${item.id}@${item.version}`;
    if (occupied.has(key)) errors.push(`Duplicate version across scopes: ${key}`);
    occupied.add(key);
  }
  if (errors.length) throw Error(errors.join('\n'));
  if (command === 'validate') { console.log(JSON.stringify({valid:true, versions:items.length})); return; }
  const query = (opts.get('--query') ?? '').toLowerCase().trim().split(/\s+/).filter(Boolean);
  const seen = new Set();
  const ordered = items.sort((a,b) => a.id.localeCompare(b.id) || newerFirst(a,b)).filter(item => {
    if (opts.has('--id') && item.id !== opts.get('--id')) return false;
    if (opts.has('--version')) return item.version === opts.get('--version');
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
  const matches = ordered.filter(item => {
    const text = [item.id,item.name,item.summary,...item.tags].join(' ').toLowerCase();
    return query.every(word => text.includes(word));
  });
  console.log(JSON.stringify({total:matches.length, offset, nextOffset:matches.length > offset + 5 ? offset + 5 : null, styles:matches.slice(offset,offset+5)}, null, 2));
}

try { main(process.argv.slice(2)); }
catch (error) { console.error(error.message); process.exitCode = 1; }
