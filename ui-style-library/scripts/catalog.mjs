import {existsSync, readdirSync, readFileSync, statSync} from 'node:fs';
import {dirname, isAbsolute, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

// 本脚本只检索目录快照与项目私有条目，不联网、不写文件。
// 风格正文由 StyleKit 按 slug 提供；见 SKILL.md 与 references/catalog.md。
const skill = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalogFile = resolve(skill, 'data/catalog.json');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const nonblank = value => typeof value === 'string' && value.trim().length > 0;
const TYPES = ['visual', 'layout'];

function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
}

function loadCatalog(errors) {
  const items = [];
  try {
    const data = readJson(catalogFile);
    if (!Array.isArray(data.styles)) throw Error('styles 必须是数组');
    if (data.total !== data.styles.length) throw Error(`total ${data.total} 与条目数 ${data.styles.length} 不一致`);
    const seen = new Set();
    for (const style of data.styles) {
      if (!slugPattern.test(style.slug ?? '')) throw Error(`无效 slug：${style.slug}`);
      if (seen.has(style.slug)) throw Error(`重复 slug：${style.slug}`);
      seen.add(style.slug);
      if (!nonblank(style.name) || !nonblank(style.description)) throw Error(`缺少名称或说明：${style.slug}`);
      if (!TYPES.includes(style.styleType)) throw Error(`无效 styleType：${style.slug}`);
      if (style.tags !== undefined && (!Array.isArray(style.tags) || !style.tags.every(nonblank))) throw Error(`无效 tags：${style.slug}`);
      if (style.colors !== undefined && !style.colors.primary) throw Error(`缺少主色：${style.slug}`);
      items.push({
        slug: style.slug,
        name: style.name,
        nameEn: style.nameEn ?? '',
        summary: style.description,
        styleType: style.styleType,
        category: style.category ?? '',
        tags: style.tags ?? [],
        colors: style.colors,
        source: 'stylekit'
      });
    }
    if (typeof data.fetchedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.fetchedAt)) throw Error('缺少 fetchedAt（YYYY-MM-DD）');
  } catch (error) {
    errors.push(`data/catalog.json: ${error.message}`);
  }
  return items;
}

function loadProject(projectRoot, errors) {
  const items = [];
  const root = resolve(projectRoot, '.ui-styles');
  if (!existsSync(root)) return items;
  for (const slug of readdirSync(root, {withFileTypes: true}).filter(entry => entry.isDirectory()).map(entry => entry.name).sort()) {
    const directory = resolve(root, slug);
    try {
      const record = readJson(resolve(directory, 'style.json'));
      if (!slugPattern.test(slug) || record.slug !== slug) throw Error('slug 与目录名不一致');
      if (!nonblank(record.name) || !nonblank(record.summary)) throw Error('缺少 name 或 summary');
      if (!nonblank(record.guide) || isAbsolute(record.guide)) throw Error('guide 必须是相对路径');
      const guide = resolve(directory, record.guide);
      if (!guide.startsWith(directory) || !statSync(guide).isFile()) throw Error(`guide 文件不存在：${record.guide}`);
      if (!['reference', 'reproducible'].includes(record.level)) throw Error('level 必须是 reference 或 reproducible');
      if (record.tags !== undefined && (!Array.isArray(record.tags) || !record.tags.every(nonblank))) throw Error('tags 无效');
      items.push({
        slug,
        name: record.name,
        nameEn: record.nameEn ?? '',
        summary: record.summary,
        styleType: record.styleType ?? 'visual',
        category: record.category ?? '',
        tags: record.tags ?? [],
        level: record.level,
        source: 'project'
      });
    } catch (error) {
      errors.push(`${slug}: ${error.message}`);
    }
  }
  return items;
}

function parse(args, allowed) {
  const opts = new Map();
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i], value = args[i + 1];
    if (!allowed.includes(key) || opts.has(key) || !nonblank(value) || value.startsWith('--')) throw Error(`无效选项：${key} ${value ?? ''}`.trim());
    opts.set(key, value);
  }
  return opts;
}

function list(args) {
  const opts = parse(args, ['--project', '--query', '--type', '--category', '--tag', '--offset', '--limit']);
  const offset = Number(opts.get('--offset') ?? 0);
  const limit = Number(opts.get('--limit') ?? 12);
  if (!Number.isSafeInteger(offset) || offset < 0) throw Error('offset 必须是非负整数');
  if (!Number.isSafeInteger(limit) || limit < 1 || limit > 50) throw Error('limit 必须是 1–50 的整数');
  if (opts.has('--type') && !TYPES.includes(opts.get('--type'))) throw Error('type 只能是 visual 或 layout');
  const errors = [];
  const items = [...loadCatalog(errors), ...(opts.has('--project') ? loadProject(opts.get('--project'), errors) : [])];
  if (errors.length) throw Error(errors.join('\n'));
  const words = (opts.get('--query') ?? '').toLowerCase().split(/\s+/).filter(Boolean);
  const matches = items.filter(item => {
    if (opts.has('--type') && item.styleType !== opts.get('--type')) return false;
    if (opts.has('--category') && item.category !== opts.get('--category')) return false;
    if (opts.has('--tag') && !item.tags.includes(opts.get('--tag'))) return false;
    const text = [item.slug, item.name, item.nameEn, item.summary, item.category, ...item.tags].join(' ').toLowerCase();
    return words.every(word => text.includes(word));
  });
  console.log(JSON.stringify({
    total: matches.length,
    offset,
    nextOffset: matches.length > offset + limit ? offset + limit : null,
    styles: matches.slice(offset, offset + limit)
  }, null, 2));
}

function validate(args) {
  const opts = parse(args, ['--project']);
  const errors = [];
  const catalog = loadCatalog(errors);
  const project = opts.has('--project') ? loadProject(opts.get('--project'), errors) : [];
  const covers = resolve(skill, 'data/covers');
  if (!existsSync(covers)) errors.push('缺少 data/covers');
  else {
    for (const item of catalog) {
      const file = resolve(covers, `${item.slug}.svg`);
      if (!existsSync(file)) { errors.push(`缺少封面：${item.slug}.svg`); continue; }
      const head = readFileSync(file).subarray(0, 5).toString('utf8');
      if (head !== '<svg ') errors.push(`封面不是 SVG 文本：${item.slug}.svg`);
    }
  }
  if (errors.length) throw Error(errors.join('\n'));
  const duplicate = project.filter(item => catalog.some(entry => entry.slug === item.slug)).map(item => item.slug);
  if (duplicate.length) throw Error(`项目条目与 StyleKit 已有 slug 重复，请直接引用上游：${duplicate.join(', ')}`);
  console.log(JSON.stringify({valid: true, catalog: catalog.length, project: project.length, covers: catalog.length}, null, 2));
}

const [command, ...args] = process.argv.slice(2);
try {
  if (command === 'list') list(args);
  else if (command === 'validate') validate(args);
  else throw Error('用法：catalog.mjs list|validate [--project PATH] [--query WORDS] [--type visual|layout] [--category C] [--tag T] [--offset N] [--limit N]');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
