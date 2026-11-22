/*
 * 从 gallery-template.html 生成画廊页面。
 *   1. gallery.html            首屏 24 张卡片预渲染进 HTML，其余由脚本渲染
 *   2. gallery-standalone.html 同一页面副本，便于单文件分发
 * 封面不依赖图片：每张缩略图都用 catalog.json 的配色由 CSS 现场绘制。
 * 用法：node scripts/build-gallery.mjs（前置：data/catalog.json）
 */
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const skill = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templateFile = join(skill, 'gallery-template.html');
const outFile = join(skill, 'gallery.html');
const standaloneFile = join(skill, 'gallery-standalone.html');
const catalogFile = join(skill, 'data', 'catalog.json');

for (const file of [templateFile, catalogFile]) {
  if (!existsSync(file)) throw Error(`缺少文件:${file}`);
}

const catalog = JSON.parse(readFileSync(catalogFile, 'utf8'));
if (!Array.isArray(catalog.styles)) throw Error('catalog.json 缺少 styles 数组');

const TAGS = {
  'anime-aesthetic': '动漫', 'brand-inspired': '品牌衍生', colorful: '多彩', 'dark-theme': '深色',
  'game-ui': '游戏界面', geometric: '几何', glassmorphic: '玻璃拟态', gradient: '渐变',
  'hand-drawn': '手绘', 'high-contrast': '高对比', responsive: '响应式', retro: '复古', 'texture-heavy': '强质感'
};
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const safeColor = value => String(value || '').replace(/["'<>;]/g, '');

function thumb(style) {
  const c = style.colors || {};
  const accent = (c.accent || []).filter(Boolean);
  const vars = [safeColor(c.primary), safeColor(c.secondary), safeColor(accent[0])]
    .map((v, i) => v || ['#16181c', '#ffffff', '#8a8f96'][i]);
  const initial = esc(String(style.nameEn || style.name || '?').trim().slice(0, 2).toUpperCase());
  return `<span class="thumb-css" aria-hidden="true" style="--c1:${vars[0]};--c2:${vars[1]};--c3:${vars[2]}"><span class="band"></span><span class="blob"></span><span class="glyph">${initial}</span><span class="tiny">${esc(style.slug)}</span></span>`;
}

function card(style) {
  return `<article class="card" data-slug="${esc(style.slug)}">
    <button class="thumb" type="button" data-open="${esc(style.slug)}" aria-label="查看 ${esc(style.name)} 详情">
      ${thumb(style)}
      <span class="type">${style.styleType === 'layout' ? 'layout' : 'visual'}</span>
    </button>
    <button class="fav" type="button" data-fav="${esc(style.slug)}" aria-pressed="false" aria-label="收藏 ${esc(style.name)}"><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg></button>
    <div class="card-body"><div class="card-title"><h3>${esc(style.name)}</h3><em>${esc(style.nameEn || '')}</em></div>
      <p>${esc(style.description)}</p><div class="card-tags">${(style.tags || []).slice(0, 3).map(t => `<span>${esc(TAGS[t] || t)}</span>`).join('')}</div>
      <div class="card-actions"><button class="detail" type="button" data-open="${esc(style.slug)}">查看详情</button><button class="copy" type="button" data-copy="${esc(style.slug)}" aria-label="复制风格指令" title="复制交给 Agent 的风格指令"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button></div>
    </div></article>`;
}

let html = readFileSync(templateFile, 'utf8');
html = html.replace('<!--__STATIC_CARDS__-->', catalog.styles.slice(0, 24).map(card).join('\n'));
html = html.replace('/*__CATALOG__*/', JSON.stringify({total: catalog.total, styles: catalog.styles}));
if (html.includes('data/covers/')) throw Error('页面仍引用图片封面');
writeFileSync(outFile, html);
writeFileSync(standaloneFile, html);

console.log(JSON.stringify({
  styles: catalog.styles.length,
  staticCards: Math.min(24, catalog.styles.length),
  galleryKB: Math.round(html.length / 1024),
  images: 0
}));
