// 刷新 StyleKit 目录快照与封面。仅写入 data/，不发布、不改 README。
// 用法：node scripts/sync-catalog.mjs [--base https://www.stylekit.top]
import {mkdirSync, readFileSync, statSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const skill = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = join(skill, 'data');
const coverDir = join(dataDir, 'covers');
const INDEX = 'https://www.stylekit.top/api/styles';
const args = process.argv.slice(2);
let base = 'https://www.stylekit.top';
for (let i = 0; i < args.length; i += 2) {
  if (args[i] !== '--base' || !args[i + 1]?.startsWith('http')) throw Error('用法：sync-catalog.mjs [--base URL]');
  base = args[i + 1].replace(/\/$/, '');
}
const keep = ['slug', 'name', 'nameEn', 'description', 'styleType', 'category', 'tags', 'cover', 'colors'];

async function fetchText(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(25000)});
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise(r => setTimeout(r, 300 * attempt));
    }
  }
}

const raw = JSON.parse((await fetchText(`${base}/api/styles`)).toString('utf8'));
if (!Array.isArray(raw.styles) || !Number.isSafeInteger(raw.total)) throw Error('上游目录格式不符');
mkdirSync(coverDir, {recursive: true});
const styles = [];
let downloaded = 0, reused = 0;
for (const style of raw.styles) {
  const slim = Object.fromEntries(keep.filter(key => style[key] !== undefined).map(key => [key, style[key]]));
  const accent = Array.isArray(style.colors?.accent) ? style.colors.accent : [];
  slim.colors = {primary: style.colors?.primary ?? '', secondary: style.colors?.secondary ?? '', accent};
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slim.slug ?? '')) throw Error(`无效 slug：${slim.slug}`);
  styles.push(slim);
  const target = join(coverDir, `${slim.slug}.svg`);
  if (existsSync(target) && statSync(target).size > 200) { reused++; continue; }
  const cover = await fetchText(`${base}${style.cover}`);
  if (cover.length < 200 || cover.subarray(0, 5).toString('utf8') !== '<svg ') throw Error(`封面异常：${slim.slug}`);
  writeFileSync(target, cover);
  downloaded++;
  await new Promise(r => setTimeout(r, 60));
}
const catalog = {
  source: `${base}/api/styles`,
  fetchedAt: new Date().toISOString().slice(0, 10),
  license: 'MIT (AnxForever/stylekit)',
  total: styles.length,
  styles
};
writeFileSync(join(dataDir, 'catalog.json'), JSON.stringify(catalog, null, 1) + '\n');
const notice = readFileSync(join(dataDir, 'NOTICE.md'), 'utf8');
if (!notice.includes(catalog.fetchedAt)) {
  console.log('提示：data/NOTICE.md 未记录本次 fetchedAt，请手动补充快照日期与上游提交。');
}
console.log(JSON.stringify({total: styles.length, downloaded, reused}));
