/*
 * 把 samples-data.mjs 里的风格样板编译成 samples.html。
 * 输出是纯静态页面：无 <script>、无 <img>、无外链，任何环境都能直接打开。
 * 用法：node scripts/build-samples.mjs
 */
import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {pathToFileURL} from 'node:url';

const skill = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dataFile = join(skill, 'samples-data.mjs');
const outFile = join(skill, 'samples.html');
const catalogFile = join(skill, 'data', 'catalog.json');

if (!existsSync(dataFile)) throw Error('缺少 samples-data.mjs');
const {samples} = await import(pathToFileURL(dataFile).href + '?v=' + Date.now());
if (!Array.isArray(samples) || !samples.length) throw Error('samples 为空');

const catalog = existsSync(catalogFile) ? JSON.parse(readFileSync(catalogFile, 'utf8')) : {styles: []};
const bySlug = new Map(catalog.styles.map(s => [s.slug, s]));
const seen = new Set();
const errors = [];
for (const item of samples) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug ?? '')) errors.push(`slug 非法: ${item.slug}`);
  if (seen.has(item.slug)) errors.push(`slug 重复: ${item.slug}`);
  seen.add(item.slug);
  for (const key of ['name', 'nameEn', 'desc', 'css', 'html']) {
    if (typeof item[key] !== 'string' || !item[key].trim()) errors.push(`${item.slug} 缺少 ${key}`);
  }
  if (!Array.isArray(item.meta) || item.meta.length < 2) errors.push(`${item.slug} 需要至少 2 个 meta`);
  if (bySlug.has(item.slug) && !item.verified) errors.push(`${item.slug} 在目录中存在但未标记 verified`);
}
if (errors.length) throw Error(errors.join('\n'));

const esc = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const CATS = [['all', '全部'], ['expressive', '创意表达'], ['minimal', '极简'], ['modern', '现代'], ['retro', '复古'], ['layout', '布局模式']];

function card(item) {
  const meta = (item.meta || []).map(m => `<span>${esc(m)}</span>`).join('');
  return `<article class="card" id="s-${item.slug}" data-slug="${esc(item.slug)}">
      <div class="stage s-${esc(item.slug)}">${item.html}</div>
      <div class="label"><h3>${esc(item.name)}</h3><em>${esc(item.nameEn)}</em></div>
      <p class="desc">${esc(item.desc)}</p>
      <div class="meta">${meta}</div>
    </article>`;
}

const styles = samples.map(item => `/* ${item.slug} — ${item.nameEn} */\n.s-${item.slug}{${item.css}}`).join('\n');
const groups = ['expressive', 'minimal', 'modern', 'retro', 'layout'].map(cat => {
  const items = samples.filter(item => (bySlug.get(item.slug)?.styleType === 'layout' ? 'layout' : bySlug.get(item.slug)?.category) === cat);
  if (!items.length) return '';
  return `  <section class="group" id="g-${cat}">
    <div class="group-head"><h2>${CATS.find(([k]) => k === cat)[1]}</h2><span class="mono">${items.length}</span></div>
    <div class="grid">
${items.map(card).join('\n')}
    </div>
  </section>`;
}).join('\n');

const pending = catalog.styles.length - samples.length;

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>风格样板册 · ${samples.length} 个真实风格</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#f6f6f4;color:#16181c;font:14px/1.6 system-ui,-apple-system,'Segoe UI','Microsoft YaHei',sans-serif;-webkit-font-smoothing:antialiased}
h1,h2,h3,p{margin:0}a{color:inherit}button{font:inherit;color:inherit;cursor:pointer}
.mono{font:11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em}
.wrap{width:min(100% - 48px,1200px);margin-inline:auto}
header.top{border-bottom:1px solid #e2e3df;background:rgba(246,246,244,.94);backdrop-filter:blur(10px);position:sticky;top:0;z-index:10}
.top-in{display:flex;align-items:center;gap:14px;height:60px}
.logo{display:flex;align-items:center;gap:9px;font-weight:700;letter-spacing:-.02em;white-space:nowrap}
.logo i{width:22px;height:22px;border-radius:6px;background:#16181c;color:#fff;display:grid;place-items:center;font-style:normal;font-size:11px}
.spacer{margin-left:auto}.hint{font-size:12px;color:#6d7278;text-align:right}
.hero{padding:46px 0 6px}
.eyebrow{font:11px/1 ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#8b9096;margin-bottom:12px}
.hero h1{font-size:clamp(28px,4vw,44px);line-height:1.08;letter-spacing:-.03em;font-weight:700}
.hero p{color:#5d6268;max-width:44em;margin-top:14px;font-size:14.5px}
.toc{display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 4px}
.toc a{border:1px solid #e2e3df;background:#fff;border-radius:999px;padding:6px 12px;font-size:12.5px;text-decoration:none;color:#4c5157}
.toc a:hover{border-color:#b9bcb6;color:#16181c}
.toc b{font-weight:600;color:#8b9096;margin-left:5px;font-size:11px}
.group{padding-top:32px}
.group-head{display:flex;align-items:baseline;gap:10px;border-bottom:1px solid #e2e3df;padding-bottom:8px;margin-bottom:20px}
.group-head h2{font-size:17px;letter-spacing:-.02em}
.group-head .mono{color:#8b9096}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px;padding-bottom:8px}
.card{border:1px solid #e2e3df;border-radius:14px;background:#fff;overflow:hidden;transition:box-shadow .18s,transform .18s}
.card:hover{box-shadow:0 14px 34px rgb(20 22 26 / .1);transform:translateY(-2px)}
.stage{position:relative;aspect-ratio:1200/630;overflow:hidden;isolation:isolate}
.label{padding:13px 15px 4px;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.label h3{font-size:15px;font-weight:650;letter-spacing:-.01em}
.label em{font:10.5px/1.4 ui-monospace,monospace;color:#8b9096;font-style:normal;text-align:right;flex:none}
.desc{padding:0 15px 12px;font-size:12.5px;color:#6d7278;line-height:1.55}
.meta{padding:0 15px 15px;display:flex;gap:6px;flex-wrap:wrap}
.meta span{font:10.5px/1 ui-monospace,monospace;color:#5d6268;background:#f1f2ee;border-radius:5px;padding:4px 6px}
footer.foot{border-top:1px solid #e2e3df;margin-top:36px;padding:24px 0 44px;color:#8b9096;font-size:12px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap}
${styles}
@media(max-width:700px){.wrap{width:calc(100% - 32px)}.hint{display:none}.hero{padding-top:30px}.grid{grid-template-columns:1fr;gap:16px}}
</style>
</head>
<body>
<header class="top"><div class="wrap top-in"><span class="logo"><i>S</i>风格样板册</span><span class="spacer"></span><span class="hint">${samples.length} 个真实样板 · 纯 CSS 绘制 · 不依赖任何图片</span></div></header>
<main class="wrap">
  <div class="hero"><p class="eyebrow">Style samples / no images</p><h1>把风格画出来，而不只是描述</h1><p>每个预览都是现场渲染的真实界面片段：布局、配色、字体关系与质感。全部由 CSS 绘制，断网、禁脚本或屏蔽图片时依然完整可见。每张卡片本身就是可复制的实现参照。</p>
  <nav class="toc" aria-label="分类">${groups ? ['expressive', 'minimal', 'modern', 'retro', 'layout'].filter(cat => samples.some(item => (bySlug.get(item.slug)?.styleType === 'layout' ? 'layout' : bySlug.get(item.slug)?.category) === cat)).map(cat => `<a href="#g-${cat}">${CATS.find(([k]) => k === cat)[1]}<b>${samples.filter(item => (bySlug.get(item.slug)?.styleType === 'layout' ? 'layout' : bySlug.get(item.slug)?.category) === cat).length}</b></a>`).join('') : ''}</nav>
  </div>
${groups}
</main>
<footer class="foot wrap"><span>风格样板册 · ${samples.length} / ${catalog.styles.length} 个风格已手写 · 纯 CSS，可离线打开</span><span>${pending > 0 ? `剩余 ${pending} 个风格待补齐` : '全部风格已覆盖'}</span></footer>
</body>
</html>`;

if (/<script/i.test(html) || /<img/i.test(html) || /src=/i.test(html)) throw Error('产物不应包含 script/img/src');
writeFileSync(outFile, html);
console.log(JSON.stringify({samples: samples.length, catalog: catalog.styles.length, pending, kb: Math.round(html.length / 1024)}, null, 1));
