/*
 * 把 gallery.html 重新生成为两个可发布版本：
 *   1. gallery.html            静态首屏卡片 + 目录 JSON（封面走 data/covers 相对路径）
 *   2. gallery-standalone.html 同样的页面，但封面全部内嵌为 base64 data URI
 * 用法：node scripts/build-gallery.mjs
 * 前置：data/catalog.json 与 data/covers/<slug>.svg 已由 sync-catalog.mjs 准备好
 */
import {readFileSync, readdirSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const skill = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templateFile = join(skill, 'gallery-template.html');
const outFile = join(skill, 'gallery.html');
const standaloneFile = join(skill, 'gallery-standalone.html');
const catalogFile = join(skill, 'data', 'catalog.json');
const coverDir = join(skill, 'data', 'covers');

for (const file of [templateFile, catalogFile]) {
  if (!existsSync(file)) throw Error(`缺少文件：${file}`);
}

const catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
if (!Array.isArray(catalog.styles)) throw Error('catalog.json 缺少 styles 数组');

const CATEGORIES = {expressive: '创意表达', minimal: '极简', modern: '现代', retro: '复古'};
const TAGS = {
  'anime-aesthetic': '动漫', 'brand-inspired': '品牌衍生', colorful: '多彩', 'dark-theme': '深色',
  'game-ui': '游戏界面', geometric: '几何', glassmorphic: '玻璃拟态', gradient: '渐变',
  'hand-drawn': '手绘', 'high-contrast': '高对比', responsive: '响应式', retro: '复古', 'texture-heavy': '强质感'
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

function card(style) {
  return `<article class="card" data-slug="${esc(style.slug)}">
    <button class="thumb" type="button" data-open="${esc(style.slug)}" aria-label="查看 ${esc(style.name)} 详情">
      <img src="data/covers/${esc(style.slug)}.svg" alt="${esc(style.name)} 风格封面" loading="lazy" width="1200" height="630">
      <span class="type">${style.styleType === 'layout' ? 'layout' : 'visual'}</span>
    </button>
    <button class="fav" type="button" data-fav="${esc(style.slug)}" aria-pressed="false" aria-label="收藏 ${esc(style.name)}"><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg></button>
    <div class="card-body"><div class="card-title"><h3>${esc(style.name)}</h3><em>${esc(style.nameEn || '')}</em></div>
      <p>${esc(style.description)}</p><div class="card-tags">${(style.tags || []).slice(0, 3).map(t => `<span>${esc(TAGS[t] || t)}</span>`).join('')}</div>
      <div class="card-actions"><button class="detail" type="button" data-open="${esc(style.slug)}">查看详情</button><button class="copy" type="button" data-copy="${esc(style.slug)}" aria-label="复制风格指令" title="复制交给 Agent 的风格指令"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button></div>
    </div></article>`;
}

let html = readFileSync(templateFile, 'utf8');
const staticCards = catalog.styles.slice(0, 24).map(card).join('\n');
html = html.replace('<!--__STATIC_CARDS__-->', staticCards);
html = html.replace('/*__CATALOG__*/', JSON.stringify({total: catalog.total, styles: catalog.styles}));
writeFileSync(outFile, html);

let standalone = html.replace(/data\/covers\/([a-z0-9-]+)\.svg/g, (_, slug) => {
  const file = join(coverDir, `${slug}.svg`);
  if (!existsSync(file)) throw Error(`缺少封面：${slug}.svg`);
  return `data:image/svg+xml;base64,${readFileSync(file).toString('base64')}`;
});
standalone = standalone.split('src="data/covers/${esc(s.slug)}.svg"').join('src="${COVERS[s.slug]}"');
const covers = {};
for (const file of readdirSync(coverDir).filter(name => name.endsWith('.svg'))) {
  covers[file.slice(0, -4)] = `data:image/svg+xml;base64,${readFileSync(join(coverDir, file)).toString('base64')}`;
}
standalone = standalone.replace('const CATEGORIES =', `const COVERS = ${JSON.stringify(covers)};\nconst CATEGORIES =`);
if (standalone.includes('data/covers/')) throw Error('standalone 仍有相对封面路径');
writeFileSync(standaloneFile, standalone);

console.log(JSON.stringify({
  styles: catalog.styles.length,
  staticCards: Math.min(24, catalog.styles.length),
  galleryKB: Math.round(html.length / 1024),
  standaloneMB: (standalone.length / 1048576).toFixed(2)
}));
