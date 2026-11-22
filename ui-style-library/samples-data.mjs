/**
 * samples.html 的数据源。每个条目是一个风格样板：
 *   slug   与 StyleKit 目录一致
 *   name / nameEn / desc   卡片文案
 *   meta   3 个左右的关键特征标签
 *   css    只作用于 .s-<slug> 内部的样式（会被编译器加前缀）
 *   html   舞台内容，不含 style/script/img
 * verified  已在浏览器截图核验过
 *
 * 新增风格时在数组里加一条，然后运行 node scripts/build-samples.mjs。
 */
export const samples = [
  {
    slug: 'neo-brutalist',
    name: '新野兽派',
    nameEn: 'Neo-Brutalist',
    desc: '粗黑边框、硬阴影、无圆角，用冲撞色块制造压迫感。',
    meta: ['4px 边框', '12px 硬阴影', '零圆角'],
    verified: true,
    css: `background:#fff6d8;display:grid;place-items:center;
.frame{border:4px solid #000;background:#ff006e;box-shadow:10px 10px 0 #000;padding:16px 20px;text-align:center}
.frame b{display:block;font:900 30px/1 'Arial Black',system-ui,sans-serif;letter-spacing:-.02em;color:#000}
.frame small{display:block;font:700 10px/1.6 system-ui;letter-spacing:.22em;color:#000}
.chips{position:absolute;left:16px;bottom:14px;display:flex;gap:6px}
.chips i{width:16px;height:16px;border:3px solid #000}`,
    html: `<div class="frame"><b>BRUTAL</b><small>RAW · BOLD · UNAPOLOGETIC</small></div><div class="chips"><i style="background:#ff006e"></i><i style="background:#ccff00"></i><i style="background:#00d9ff"></i><i style="background:#000"></i></div>`
  },
  {
    slug: 'editorial',
    name: '编辑杂志风',
    nameEn: 'Editorial',
    desc: '衬线大标题、分栏正文、细分割线，靠留白而不是阴影分层。',
    meta: ['Georgia 标题', '双栏正文', '纸白 #fbfaf7'],
    verified: true,
    css: `background:#fbfaf7;padding:18px 24px;display:flex;flex-direction:column;justify-content:center;gap:2px;
.kicker{font:9px/1.5 ui-monospace,monospace;letter-spacing:.24em;color:#8a8478;text-transform:uppercase;border-bottom:1px solid #d9d5cb;padding-bottom:5px;display:flex;justify-content:space-between}
h4{font:400 clamp(19px,2.9vw,27px)/1.04 Georgia,'Songti SC',serif;letter-spacing:-.02em;margin:8px 0 4px;color:#1c1a17}
.rule{width:44px;height:1px;background:#1c1a17;margin:4px 0 8px}
.cols{column-count:2;column-gap:14px;font-size:9.5px;line-height:1.6;color:#4a463f;text-align:justify;overflow:hidden}`,
    html: `<div class="kicker"><span>The Quarterly</span><span>No. 14</span></div><h4>On the quiet<br>architecture of type</h4><div class="rule"></div><div class="cols">衬线标题与无衬线正文构成节奏，留白承担分层。栏宽控制在可读区间，让页面像一本摊开的杂志。</div>`
  },
  {
    slug: 'neumorphism',
    name: '新拟物派',
    nameEn: 'Neumorphism',
    desc: '同色系背景，用双重内外阴影模拟光源，只靠凹凸表达层级。',
    meta: ['双向阴影', '同色背景', '圆润边角'],
    verified: true,
    css: `background:#e8e9ec;display:grid;place-items:center;
.pad{border-radius:20px;background:#e8e9ec;box-shadow:9px 9px 20px #c8cace,-9px -9px 20px #fff;padding:20px 26px;text-align:center}
.pad b{font:600 17px/1.3 system-ui;color:#565b63}
.knob{margin:14px auto 0;width:52px;height:52px;border-radius:50%;background:#e8e9ec;box-shadow:inset 5px 5px 10px #c8cace,inset -5px -5px 10px #fff;display:grid;place-items:center;font:600 9px/1 system-ui;color:#6c727a;letter-spacing:.1em}`,
    html: `<div class="pad"><b>Neumorphism</b><div class="knob">KNOB</div></div>`
  },
  {
    slug: 'bento-grid',
    name: '便当盒布局',
    nameEn: 'Bento Grid',
    desc: '不规则网格，大小卡片混排，用尺寸差异建立信息层级。',
    meta: ['CSS Grid', '8px 间隙', '深色底'],
    verified: true,
    css: `background:#101014;padding:18px;display:grid;grid-template-columns:1.4fr 1fr 1fr;grid-template-rows:1fr 1fr;gap:8px;
.b1{grid-row:span 2;background:linear-gradient(140deg,#2b2b39,#15151c);border-radius:9px;display:grid;place-items:center;color:#fff;font:600 15px/1 system-ui}
.b2{background:#7c5cff;border-radius:9px;display:grid;place-items:center;color:#fff;font:600 15px/1 system-ui}
.b3{background:#22d3a5;border-radius:9px;display:grid;place-items:center;color:#08211a;font:600 15px/1 system-ui}
.b4{grid-column:span 2;background:#1d1d24;border-radius:9px;display:grid;place-items:center;color:#8a8a99;font:600 15px/1 system-ui}`,
    html: `<div class="b1">Bento</div><div class="b2">1</div><div class="b3">2</div><div class="b4">3</div>`
  },
  {
    slug: 'minimalist-flat',
    name: '极简扁平风',
    nameEn: 'Minimalist Flat',
    desc: '纯色块与几何形状，无任何立体效果，版面极度克制。',
    meta: ['零阴影', '纯色块', '几何图形'],
    verified: true,
    css: `background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 40px;gap:20px;
b{display:block;font:700 24px/1.1 system-ui;letter-spacing:-.04em;color:#111}
small{display:block;margin-top:9px;font-size:11px;color:#777;max-width:16em;line-height:1.6}
.sw{display:flex;gap:7px;margin-top:14px}.sw i{width:26px;height:26px}
.shape{width:96px;height:96px;border-radius:50%;background:#ff4d2e;flex:none}`,
    html: `<div><b>Minimal<br>Flat Design</b><small>无阴影、无渐变，用颜色与留白创造层次。</small><div class="sw"><i style="background:#ff4d2e"></i><i style="background:#111"></i><i style="background:#0b6bff"></i><i style="background:#ffd400"></i></div></div><div class="shape"></div>`
  },
  {
    slug: 'corporate-clean',
    name: '企业简洁风',
    nameEn: 'Corporate Clean',
    desc: '白底、蓝色主色、规整栅格，强调可读性与专业信任感。',
    meta: ['#2563eb', '6px 圆角', '数据条'],
    verified: true,
    css: `background:#f7f9fc;display:flex;flex-direction:column;
.bar{height:26px;background:#fff;border-bottom:1px solid #e3e8ef;display:flex;align-items:center;gap:6px;padding:0 12px}
.bar i{width:7px;height:7px;border-radius:2px;background:#2563eb}
.bar u{width:42px;height:5px;border-radius:3px;background:#dbe3ee}
.body{flex:1;display:flex;align-items:center;justify-content:space-between;padding:0 22px;gap:14px}
.body b{display:block;font:650 17px/1.25 system-ui;letter-spacing:-.02em;color:#0f172a}
.body small{display:block;margin-top:6px;font-size:10.5px;color:#64748b;max-width:15em;line-height:1.55}
.body span.cta{border-radius:6px;background:#2563eb;color:#fff;padding:8px 15px;font-size:11px;font-weight:600;white-space:nowrap}
.stats{display:flex;gap:16px;padding:0 22px 16px;font:10px/1.4 ui-monospace,monospace;color:#94a3b8}
.stats b{display:block;font:650 15px/1.2 system-ui;color:#0f172a}`,
    html: `<div class="bar"><i></i><u></u><u></u><u></u></div><div class="body"><div><b>Enterprise clarity</b><small>一致、可读、可信，适合 B2B 与后台系统。</small></div><span class="cta">Get Started</span></div><div class="stats"><div><b>99.9%</b>uptime</div><div><b>24k</b>teams</div><div><b>1.2M</b>requests</div></div>`
  },
  {
    slug: 'soft-ui',
    name: '柔和界面风',
    nameEn: 'Soft UI',
    desc: '低饱和渐变、大圆角与柔和投影，整体轻盈亲切。',
    meta: ['22px 圆角', '柔和阴影', '粉蓝渐变'],
    verified: true,
    css: `background:linear-gradient(160deg,#fdf2f8,#eef4ff);display:grid;place-items:center;
.panel{background:#fff;border-radius:22px;padding:18px 22px;box-shadow:0 18px 40px rgb(120 110 180 / .16);text-align:center}
.panel b{font:600 15px/1.3 system-ui;color:#3f3a55}
.panel small{display:block;font-size:10.5px;color:#8d87a3;margin-top:5px}
.panel span{margin-top:13px;display:inline-block;border-radius:999px;padding:9px 22px;background:linear-gradient(135deg,#a78bfa,#7dd3fc);color:#fff;font-size:11.5px;font-weight:600}`,
    html: `<div class="panel"><b>Soft UI</b><small>温和友好的四层阴影</small><span>Get started</span></div>`
  },
  {
    slug: 'dark-mode',
    name: '暗黑模式',
    nameEn: 'Dark Mode',
    desc: '深色分层而非纯黑，用极细边框与一个高亮色维持层次。',
    meta: ['#0b0f14', '1px 边框', '发光状态'],
    verified: true,
    css: `background:#0b0f14;padding:22px;display:flex;flex-direction:column;justify-content:space-between;
.row{display:flex;align-items:center;gap:8px;font:10px/1 ui-monospace,monospace;color:#5b6675}
.row b{color:#e6edf3;font:600 12px/1.3 system-ui}
.dot{width:8px;height:8px;border-radius:50%;background:#3fb950;box-shadow:0 0 0 3px #3fb95022}
.panel{border:1px solid #1f2937;border-radius:10px;padding:12px;background:#111823}
.panel small{font-size:10px;color:#6b7688}
.panel b{display:block;font:600 16px/1 system-ui;color:#e6edf3;font-variant-numeric:tabular-nums}
.bars{display:flex;align-items:flex-end;gap:4px;height:38px;margin-top:10px}
.bars i{flex:1;background:linear-gradient(#58a6ff,#1f6feb);border-radius:2px 2px 0 0;opacity:.85}`,
    html: `<div class="row"><span class="dot"></span><b>System status</b></div><div class="panel"><small>Requests / min</small><b>1,284</b><div class="bars"><i style="height:34%"></i><i style="height:58%"></i><i style="height:42%"></i><i style="height:76%"></i><i style="height:60%"></i><i style="height:92%"></i><i style="height:70%"></i><i style="height:84%"></i></div></div>`
  },
  {
    slug: 'macos-vibrancy',
    name: 'macOS 毛玻璃',
    nameEn: 'macOS Vibrancy',
    desc: '半透明深灰面板叠加彩色背景，靠模糊与描边建立空间。',
    meta: ['backdrop-blur', '12px 圆角', '半透明描边'],
    verified: true,
    css: `background:linear-gradient(140deg,#2b1b52,#0f2b46 55%,#123c3a);display:grid;place-items:center;padding:20px;
.win{border-radius:12px;background:rgba(28,28,32,.52);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.16);box-shadow:0 22px 50px rgb(0 0 0 / .45);padding:13px 15px;width:76%}
.dots{display:flex;gap:5px;margin-bottom:9px}.dots i{width:8px;height:8px;border-radius:50%}
.dots i:nth-child(1){background:#ff5f56}.dots i:nth-child(2){background:#ffbd2e}.dots i:nth-child(3){background:#27c93f}
.win b{display:block;font:600 14px/1.3 system-ui;color:#fff}
.win small{display:block;font-size:10px;color:rgba(255,255,255,.62);margin-top:4px}
.pill{display:inline-block;margin-top:9px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.14);font:10px/1 system-ui;color:#fff}`,
    html: `<div class="win"><div class="dots"><i></i><i></i><i></i></div><b>Nocturne Glass</b><small>系统级 backdrop-blur，多层深灰面板</small><span class="pill">macOS 质感</span></div>`
  },
  {
    slug: 'glassmorphism',
    name: '玻璃拟态',
    nameEn: 'Glassmorphism',
    desc: '彩色光斑背景配磨砂玻璃卡片，边框提亮边缘形成通透感。',
    meta: ['blur 16px', '白色 14% 填充', '18px 圆角'],
    verified: true,
    css: `background:radial-gradient(circle at 22% 18%,#ff9edb,transparent 46%),radial-gradient(circle at 80% 30%,#7cc4ff,transparent 44%),radial-gradient(circle at 55% 88%,#b89dff,transparent 50%),#141a2e;display:grid;place-items:center;
.card2{border-radius:18px;background:rgba(255,255,255,.14);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.42);padding:18px 22px;text-align:center;width:70%}
.card2 b{font:600 15px/1.3 system-ui;color:#fff}
.card2 small{display:block;margin-top:5px;font-size:10px;color:rgba(255,255,255,.8)}
.card2 i{display:block;margin:12px auto 0;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.34);border:1px solid rgba(255,255,255,.6)}`,
    html: `<div class="card2"><b>Glassmorphism</b><small>玻璃无色，色彩属于夜景</small><i></i></div>`
  },
  {
    slug: 'quantized-line-field',
    name: '量化线场',
    nameEn: 'Quantized Line Field',
    desc: '把明暗量化成四档竖线，唯一允许的线宽是 1/2/3/4 px。',
    meta: ['四档线宽', '#2152e7', '17px 圆角'],
    verified: true,
    css: `background:#fafaf8;display:grid;place-items:center;
.field{height:74%;aspect-ratio:.70;background:#2152e7;border-radius:14px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}
.lines{display:flex;gap:2px;justify-content:center;align-items:center;flex:1;padding:8px 0}
.lines i{background:#fafaf8;border-radius:1px;flex:none}
.cap{display:flex;justify-content:space-between;font:10px/1 ui-monospace,monospace;color:rgba(255,255,255,.86)}
.cap b{font:400 13px/1 Georgia,serif}`,
    html: `<div class="field"><div class="lines"><i style="width:1px;height:52%"></i><i style="width:2px;height:64%"></i><i style="width:4px;height:78%"></i><i style="width:3px;height:70%"></i><i style="width:1px;height:46%"></i><i style="width:4px;height:84%"></i><i style="width:2px;height:58%"></i><i style="width:1px;height:49%"></i><i style="width:3px;height:73%"></i><i style="width:4px;height:88%"></i><i style="width:2px;height:61%"></i><i style="width:1px;height:54%"></i><i style="width:4px;height:80%"></i><i style="width:3px;height:68%"></i><i style="width:1px;height:47%"></i><i style="width:2px;height:57%"></i><i style="width:4px;height:86%"></i><i style="width:1px;height:51%"></i><i style="width:3px;height:74%"></i><i style="width:2px;height:63%"></i></div><div class="cap"><b>Quantized</b><span>04 / 72H</span></div></div>`
  },
  {
    slug: 'swiss-style',
    name: '瑞士国际风格',
    nameEn: 'Swiss International',
    desc: '严格网格、无衬线大字、原色块，形式服从信息本身。',
    meta: ['Helvetica', '12 栅格', '原色块'],
    verified: true,
    css: `background:#f4f4f1;padding:24px 30px;display:flex;flex-direction:column;justify-content:space-between;
.top{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #111;padding-bottom:6px;font:10px/1 ui-monospace,monospace;letter-spacing:.1em}
h4{font:700 clamp(22px,3.4vw,32px)/.96 Helvetica,Arial,sans-serif;letter-spacing:-.04em;color:#111;margin:14px 0 0;text-transform:uppercase}
.blocks{display:flex;gap:6px;margin-top:auto}
.blocks i{flex:1;height:26px}
.blocks i:nth-child(1){background:#e4002b}.blocks i:nth-child(2){background:#111}.blocks i:nth-child(3){background:#f4f4f1;border:1px solid #111}`,
    html: `<div class="top"><span>SWISS DESIGN</span><span>12 COL · 8PT</span></div><h4>Grid,<br>typography,<br>clarity.</h4><div class="blocks"><i></i><i></i><i></i></div>`
  },
  {
    slug: "natural-organic",
    name: "自然有机风",
    nameEn: "Natural Organic",
    desc: "大地色系、天然纹理与手作感，传递温暖朴素的信任感。",
    meta: ["大地色","手作质感","有机曲线"],
    verified: true,
    css: "background:#faf6f1;padding:13px 18px;display:flex;flex-direction:column;justify-content:center;gap:6px;\n.top{display:flex;align-items:center;gap:8px;font:600 10px/1 ui-monospace,monospace;letter-spacing:.16em;color:#7a5c43;text-transform:uppercase}\n.leaf{width:26px;height:26px;border-radius:50% 0 50% 50%;background:#5c4033;transform:rotate(-45deg)}\nh4{font:400 clamp(16px,2.5vw,22px)/1.1 Georgia,'Songti SC',serif;color:#3b2a1d}\n.sw{display:flex;gap:6px}.sw i{width:22px;height:22px;border-radius:50%}\n.line{height:1px;background:#e0d3c2}",
    html: "<div class=\"top\"><span class=\"leaf\"></span>Harvest · No. 3</div><h4>Grown slowly,<br>made by hand.</h4><div class=\"sw\"><i style=\"background:#5c4033\"></i><i style=\"background:#8a9a5b\"></i><i style=\"background:#d9b382\"></i><i style=\"background:#f0e6d6\"></i></div><div class=\"line\"></div>"
  },
  {
    slug: "modern-gradient",
    name: "现代渐变风",
    nameEn: "Modern Gradient",
    desc: "多彩渐变叠玻璃卡片，活力感强，适合活动页与数字产品。",
    meta: ["多彩渐变","玻璃卡片","动态光晕"],
    verified: true,
    css: "background:linear-gradient(135deg,#8b5cf6,#ec4899 48%,#f59e0b);display:grid;place-items:center;\n.glass{width:76%;border-radius:16px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.4);backdrop-filter:blur(12px);padding:16px 18px;text-align:center}\n.glass b{display:block;font:700 17px/1.2 system-ui;color:#fff;letter-spacing:-.02em}\n.glass small{display:block;margin-top:6px;font-size:10px;color:rgba(255,255,255,.86)}\n.bar{height:4px;border-radius:2px;background:rgba(255,255,255,.8);margin-top:12px}",
    html: "<div class=\"glass\"><b>Gradient</b><small>多彩渐变与玻璃质感的叠加</small><div class=\"bar\"></div></div>"
  },
  {
    slug: "retro-vintage",
    name: "复古怀旧风",
    nameEn: "Retro Vintage",
    desc: "老式排版、做旧纸张与复古色调，像一张旧海报。",
    meta: ["做旧纸","粗衬线","复古红"],
    verified: true,
    css: "background:#f5e6d3;padding:20px 22px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:6px;box-shadow:inset 0 0 40px #d9c1a1;\n.frame{border:3px double #8b4513;padding:12px 18px;text-align:center;background:#f9efdf}\n.frame b{display:block;font:700 22px/1.1 Georgia,'Songti SC',serif;letter-spacing:.04em;color:#7a3b12;text-transform:uppercase}\n.frame small{display:block;margin-top:4px;font:10px/1.4 ui-monospace,monospace;letter-spacing:.2em;color:#9c6b45}\n.stars{margin-top:6px;font-size:11px;color:#8b4513;letter-spacing:.3em}",
    html: "<div class=\"frame\"><b>Vintage</b><small>EST · 1954</small></div><div class=\"stars\">✦ ✦ ✦</div>"
  },
  {
    slug: "geometric-bold",
    name: "几何大胆风",
    nameEn: "Geometric Bold",
    desc: "强对比几何色块与斜切构图，视觉冲击力强。",
    meta: ["几何构图","强对比","色块拼接"],
    verified: true,
    css: "background:#fff;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:0;overflow:hidden;\n.g1{background:#ff2d55}.g2{background:#111;display:grid;place-items:center}\n.g2 b{font:900 20px/1 'Arial Black',system-ui;color:#fff;letter-spacing:-.03em}\n.g3{background:#ffd400}.g4{background:#2d5bff;border-radius:100% 0 0 0}",
    html: "<div class=\"g1\"></div><div class=\"g2\"><b>BOLD</b></div><div class=\"g3\"></div><div class=\"g4\"></div>"
  },
  {
    slug: "masonry-flow",
    name: "瀑布流布局",
    nameEn: "Masonry Flow",
    desc: "不等高卡片错落排布，像 Pinterest 一样的自然流动。",
    meta: ["不等高","多列","错落流动"],
    verified: true,
    css: "background:#f5f5f5;padding:14px;column-count:3;column-gap:8px;\n.m{border-radius:8px;margin-bottom:8px;break-inside:avoid;display:grid;place-items:center;font:600 10px/1 ui-monospace,monospace;color:#fff}\n.m:nth-child(1){height:86px;background:#1a1a2e}.m:nth-child(2){height:58px;background:#e94560}\n.m:nth-child(3){height:70px;background:#16c79a}.m:nth-child(4){height:46px;background:#7579e7}\n.m:nth-child(5){height:78px;background:#ffd460;color:#5a4300}.m:nth-child(6){height:52px;background:#2d2d44}",
    html: "<div class=\"m\" style=\"color:#fff\">01</div><div class=\"m\">02</div><div class=\"m\">03</div><div class=\"m\">04</div><div class=\"m\">05</div><div class=\"m\">06</div>"
  },
  {
    slug: "split-screen",
    name: "分屏布局",
    nameEn: "Split Screen",
    desc: "左右对半分屏，用明暗对比制造平衡与张力。",
    meta: ["左右分割","明暗对比","对称平衡"],
    verified: true,
    css: "display:grid;grid-template-columns:1fr 1fr;\n.l{background:#0f0f0f;color:#fff;padding:18px;display:flex;flex-direction:column;justify-content:space-between}\n.l b{font:700 16px/1.15 system-ui;letter-spacing:-.02em}\n.l small{font:9px/1.5 ui-monospace,monospace;color:#8a8a8a}\n.r{background:#fff;padding:18px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end}\n.r span{font:9px/1 ui-monospace,monospace;letter-spacing:.14em;color:#999}\n.r u{display:block;width:60px;height:8px;border-radius:4px;background:#0f0f0f;text-decoration:none}",
    html: "<div class=\"l\"><b>Light / Dark</b><small>SPLIT 50 / 50</small></div><div class=\"r\"><span>SIGN IN</span><u></u></div>"
  },
  {
    slug: "full-page-scroll",
    name: "全屏滚动布局",
    nameEn: "Full Page Scroll",
    desc: "每屏占满视口，用滚动切换完整场景。",
    meta: ["一屏一节","滚动切换","满版"],
    verified: true,
    css: "background:#000;display:grid;grid-template-rows:repeat(3,1fr);gap:3px;padding:3px;\n.sec{background:#111;display:flex;align-items:center;justify-content:space-between;padding:0 16px;color:#fff}\n.sec:nth-child(2){background:#1c1c1c}.sec:nth-child(3){background:#2a2a2a}\n.sec b{font:600 13px/1 system-ui}.sec small{font:9px/1 ui-monospace,monospace;color:#777;letter-spacing:.14em}",
    html: "<div class=\"sec\"><b>01 — Intro</b><small>SCROLL</small></div><div class=\"sec\"><b>02 — Work</b><small>↓</small></div><div class=\"sec\"><b>03 — Contact</b><small>↓</small></div>"
  },
  {
    slug: "timeline-vertical",
    name: "垂直时间线布局",
    nameEn: "Vertical Timeline",
    desc: "沿中轴向下串联节点，适合履历与进程展示。",
    meta: ["垂直轴","节点串联","线性叙事"],
    verified: true,
    css: "background:#f8fafc;padding:16px 20px;position:relative;\n.axis{position:absolute;left:34px;top:22px;bottom:22px;width:2px;background:#cbd5e1}\n.item{display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;position:relative}\n.dot{width:10px;height:10px;border-radius:50%;background:#1e293b;border:2px solid #fff;margin-top:3px;flex:none;box-shadow:0 0 0 2px #cbd5e1}\n.item b{display:block;font:600 11.5px/1.3 system-ui;color:#0f172a}\n.item small{display:block;font:9.5px/1.4 ui-monospace,monospace;color:#64748b}",
    html: "<div class=\"axis\"></div><div class=\"item\"><span class=\"dot\"></span><div><b>项目启动</b><small>2024 · Q1</small></div></div><div class=\"item\"><span class=\"dot\"></span><div><b>首次上线</b><small>2024 · Q3</small></div></div><div class=\"item\"><span class=\"dot\"></span><div><b>规模化</b><small>2025 · Q2</small></div></div>"
  },
  {
    slug: "card-stack",
    name: "卡片堆叠布局",
    nameEn: "Card Stack",
    desc: "多层卡片微微错位叠放，用层级暗示前后关系。",
    meta: ["层叠","错位","阴影深度"],
    verified: true,
    css: "background:#f0f0f5;display:grid;place-items:center;position:relative;\n.c{position:absolute;width:56%;height:52%;border-radius:10px;border:1px solid #ddd;background:#fff;box-shadow:0 8px 18px rgb(0 0 0 / .1)}\n.c1{transform:rotate(-6deg) translate(-16px,6px);background:#e8e8f0}\n.c2{transform:rotate(3deg) translate(10px,-4px);background:#fff}\n.c3{transform:translateY(2px);display:flex;align-items:flex-end;padding:12px;font:600 11px/1.3 system-ui;color:#1a1a2e}",
    html: "<div class=\"c c1\"></div><div class=\"c c2\"></div><div class=\"c c3\">Stacked<br>Cards</div>"
  },
  {
    slug: "sidebar-fixed",
    name: "固定侧边栏布局",
    nameEn: "Fixed Sidebar",
    desc: "左侧常驻导航，右侧内容区独立滚动。",
    meta: ["常驻导航","主区独立","左右分栏"],
    verified: true,
    css: "display:grid;grid-template-columns:78px 1fr;height:100%;\n.side{background:#1e293b;padding:14px 10px;display:flex;flex-direction:column;gap:9px}\n.side i{height:8px;border-radius:3px;background:#334155}.side i:first-child{background:#60a5fa}\n.main{padding:14px 16px;display:flex;flex-direction:column;gap:8px;background:#f8fafc}\n.main b{font:600 12px/1.2 system-ui;color:#0f172a}\n.main u{display:block;height:10px;border-radius:4px;background:#e2e8f0;text-decoration:none}\n.main u:nth-child(2){width:80%}.main u:nth-child(3){width:60%}",
    html: "<div class=\"side\"><i></i><i></i><i></i><i></i><i></i></div><div class=\"main\"><b>Dashboard</b><u></u><u></u><u></u></div>"
  },
  {
    slug: "magazine-grid",
    name: "杂志网格布局",
    nameEn: "Magazine Grid",
    desc: "大小版位混排的网格，模拟杂志跨页的阅读节奏。",
    meta: ["版位混排","跨页节奏","图文网格"],
    verified: true,
    css: "background:#fafafa;padding:12px;display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1.3fr 1fr;gap:7px;\n.a{grid-row:span 2;background:#1a1a1a;color:#fff;padding:12px;display:flex;flex-direction:column;justify-content:flex-end;border-radius:4px}\n.a b{font:400 17px/1.1 Georgia,serif}.a small{font:8.5px/1.5 ui-monospace,monospace;color:#9a9a9a;letter-spacing:.12em}\n.b{background:#e63946;border-radius:4px}.c{background:#e9e9e9;border-radius:4px;padding:8px;font:9px/1.4 ui-monospace,monospace;color:#666}",
    html: "<div class=\"a\"><b>Cover<br>Story</b><small>ISSUE 08</small></div><div class=\"b\"></div><div class=\"c\">FEATURE / 02</div>"
  },
  {
    slug: "hero-fullscreen",
    name: "全屏英雄区布局",
    nameEn: "Hero Fullscreen",
    desc: "整屏只放一句话与一个动作，把注意力压到唯一重点。",
    meta: ["满版留白","超大标题","单一动作"],
    verified: true,
    css: "background:#000;padding:13px 18px;display:flex;flex-direction:column;justify-content:space-between;color:#fff;\n.nav{display:flex;justify-content:space-between;font:8px/1 ui-monospace,monospace;letter-spacing:.2em;color:#777}\n.mid h4{font:600 clamp(17px,2.9vw,24px)/1.08 system-ui;letter-spacing:-.035em}\n.mid p{margin-top:6px;font-size:9px;color:#888;max-width:20em}\n.cta{display:inline-block;margin-top:10px;padding:6px 12px;border:1px solid #fff;border-radius:999px;font-size:9px}",
    html: "<div class=\"nav\"><span>STUDIO</span><span>MENU</span></div><div class=\"mid\"><h4>Design that<br>speaks quietly.</h4><p>一个页面只留一个重点，其余全部交给留白。</p><span class=\"cta\">Enter →</span></div>"
  },
  {
    slug: "claymorphism",
    name: "粘土拟态",
    nameEn: "Claymorphism",
    desc: "超大圆角、内外阴影叠加，做出柔软可捏的 3D 质感。",
    meta: ["超大圆角","内外阴影","糖果配色"],
    verified: true,
    css: "background:#fef3e8;display:grid;place-items:center;\n.clay{width:56%;aspect-ratio:1.5;border-radius:26px;background:#f8b4d9;box-shadow:inset -10px -10px 18px #e08bbd,inset 8px 8px 16px #ffcdea,12px 16px 26px rgb(200 120 170 / .35);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}\n.clay b{font:700 13px/1 system-ui;color:#8a3560}\n.clay i{width:54px;height:16px;border-radius:10px;background:#ffd9ee;box-shadow:inset 2px 2px 5px #efb4d4,inset -2px -3px 6px #fff}",
    html: "<div class=\"clay\"><b>Clay Card</b><i></i></div>"
  },
  {
    slug: "notion-style",
    name: "Notion 风格",
    nameEn: "Notion Style",
    desc: "文档式白底、克制的字号与浅灰标签，内容优先。",
    meta: ["文档优先","浅灰标签","细边框"],
    verified: true,
    css: "background:#fff;padding:16px 20px;display:flex;flex-direction:column;gap:7px;justify-content:center;\n.emoji{font-size:18px;line-height:1}\nh4{font:600 16px/1.25 system-ui;color:#37352f;letter-spacing:-.01em}\np{font-size:9.5px;line-height:1.6;color:#787774}\n.call{background:#f7f6f3;border-radius:4px;padding:6px 8px;font:9px/1.5 ui-monospace,monospace;color:#787774}\n.tag{display:inline-block;background:#e7e6e3;border-radius:3px;padding:2px 5px;font:8.5px/1.2 ui-monospace,monospace;color:#666}",
    html: "<div class=\"emoji\">📄</div><h4>Project brief</h4><p>用最少的装饰承载最多的信息，让读者专注在文字本身。</p><div class=\"call\">TODO · 把这一页拆成三节</div><span class=\"tag\">Draft</span>"
  },
  {
    slug: "stripe-style",
    name: "Stripe 风格",
    nameEn: "Stripe Style",
    desc: "紫色渐变网格配精致卡片与纤细描边，金融科技的精密感。",
    meta: ["渐变网格","细描边","紫主色"],
    verified: true,
    css: "background:radial-gradient(120% 90% at 15% 0%,#635bff 0%,#3b2fd4 42%,#0a2540 100%);padding:16px 20px;display:flex;flex-direction:column;justify-content:center;\n.card3{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:12px;backdrop-filter:blur(6px)}\n.card3 small{font:8.5px/1 ui-monospace,monospace;letter-spacing:.14em;color:#a5b4fc}\n.card3 b{display:block;margin-top:6px;font:600 15px/1.2 system-ui;color:#fff;letter-spacing:-.02em}\n.card3 p{margin-top:4px;font-size:9px;color:#c7d2fe}\n.card3 span{display:inline-block;margin-top:9px;padding:6px 12px;border-radius:6px;background:#fff;color:#3b2fd4;font-size:9px;font-weight:600}",
    html: "<div class=\"card3\"><small>PAYMENTS</small><b>Accept payments online</b><p>为开发者设计的基础设施界面。</p><span>Get Started</span></div>"
  },
  {
    slug: "apple-style",
    name: "Apple 风格",
    nameEn: "Apple Style",
    desc: "极简留白、精致圆角与克制配色，突出产品本身。",
    meta: ["大留白","细腻圆角","SF 质感"],
    verified: true,
    css: "background:#f5f5f7;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;\nh4{font:600 clamp(18px,3.2vw,28px)/1.08 -apple-system,system-ui;letter-spacing:-.04em;color:#1d1d1f}\nsmall{font-size:9.5px;color:#86868b}\n.acts{display:flex;gap:8px;margin-top:4px;align-items:center}\n.acts span{padding:5px 12px;border-radius:999px;background:#0071e3;color:#fff;font-size:9px}\n.acts u{font-size:9px;color:#0071e3;text-decoration:none}",
    html: "<h4>Pro.<br>Beyond fast.</h4><small>From $999</small><div class=\"acts\"><span>Buy</span><u>Learn more ›</u></div>"
  },
  {
    slug: "pixel-art",
    name: "像素艺术风",
    nameEn: "Pixel Art",
    desc: "8-bit 硬边像素、无抗锯齿、阶梯色块，游戏机的记忆。",
    meta: ["8-bit","零圆角","硬边色块"],
    verified: true,
    css: "background:#1a1c2c;display:grid;place-items:center;image-rendering:pixelated;\n.px{width:76%;border:3px solid #94b0c2;padding:10px;background:#29366f;display:flex;flex-direction:column;gap:6px;align-items:center}\n.px b{font:700 12px/1 ui-monospace,monospace;color:#f4f4f4;letter-spacing:.06em}\n.hp{display:flex;gap:2px}.hp i{width:8px;height:8px;background:#41a6f6}\n.hp i:nth-child(n+4){background:#29366f}\n.btns{display:flex;gap:6px;margin-top:2px}\n.btns span{border:2px solid #94b0c2;padding:3px 7px;font:9px/1 ui-monospace,monospace;color:#f4f4f4}",
    html: "<div class=\"px\"><b>PLAYER 1</b><div class=\"hp\"><i></i><i></i><i></i><i></i><i></i></div><div class=\"btns\"><span>FIGHT</span><span>RUN</span></div></div>"
  },
  {
    slug: "vaporwave",
    name: "霓虹复古",
    nameEn: "Neon Retro",
    desc: "粉紫渐变、网格地平线与日文装饰，80 年代的未来想象。",
    meta: ["粉紫渐变","网格地平线","日文装饰"],
    verified: true,
    css: "background:linear-gradient(#2b1055,#7597de 55%,#ff71ce 100%);position:relative;overflow:hidden;display:grid;place-items:center;\n.sun{position:absolute;top:14%;width:34%;aspect-ratio:1;border-radius:50%;background:linear-gradient(#ffe259,#ff71ce)}\n.grid{position:absolute;bottom:0;left:0;right:0;height:46%;background-image:linear-gradient(#01cdfe 1px,transparent 1px),linear-gradient(90deg,#01cdfe 1px,transparent 1px);background-size:22px 14px;transform:perspective(120px) rotateX(48deg);opacity:.55}\n.txt{position:relative;text-align:center;color:#fff;text-shadow:0 0 8px #ff71ce}\n.txt b{display:block;font:700 11px/1 'Arial Black',system-ui;letter-spacing:.02em;white-space:nowrap}\n.txt small{font-size:9px;letter-spacing:.4em;color:#bdf6ff}",
    html: "<div class=\"sun\"></div><div class=\"grid\"></div><div class=\"txt\"><b>VAPORWAVE</b><small>アエステティック</small></div>"
  },
  {
    slug: "y2k",
    name: "千禧风格",
    nameEn: "Y2K",
    desc: "金属银、透明塑料与气泡元素，2000 年代的未来感。",
    meta: ["金属银","气泡","彩虹高光"],
    verified: true,
    css: "background:linear-gradient(150deg,#e6e9ee,#b9c2cd 45%,#dfe4ea);display:grid;place-items:center;\n.blob{width:58%;aspect-ratio:1.6;border-radius:24px;background:linear-gradient(135deg,#fff,#c8d2de 40%,#8fa0b3 70%,#eef3f8);box-shadow:inset 0 2px 6px #fff,inset 0 -6px 14px rgb(90 105 125 / .4),0 10px 22px rgb(90 105 125 / .35);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px}\n.blob b{font:700 14px/1 system-ui;letter-spacing:.06em;background:linear-gradient(#5c6b7d,#aeb9c6,#5c6b7d);-webkit-background-clip:text;background-clip:text;color:transparent}\n.blob i{width:44px;height:12px;border-radius:6px;background:linear-gradient(90deg,#ff69b4,#c0c0c0,#69c9ff)}",
    html: "<div class=\"blob\"><b>Y2K.NET</b><i></i></div>"
  },
  {
    slug: "memphis",
    name: "孟菲斯风格",
    nameEn: "Memphis",
    desc: "撞色几何、随机曲线与圆点图案，活泼且不讲秩序。",
    meta: ["撞色","几何拼贴","圆点纹理"],
    verified: true,
    css: "background:#fff7ea;position:relative;overflow:hidden;\n.sq{position:absolute;width:34px;height:34px;background:#ff6b6b;top:14%;left:8%;transform:rotate(12deg)}\n.ci{position:absolute;width:46px;height:46px;border-radius:50%;background:#feca57;bottom:16%;right:12%}\n.tri{position:absolute;bottom:20%;left:22%;width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent;border-bottom:32px solid #48dbfb}\n.zig{position:absolute;top:22%;right:20%;width:44px;height:16px;border-bottom:4px solid #1dd1a1;border-radius:0 0 20px 20px}\n.dots{position:absolute;bottom:12%;left:6%;width:40px;height:40px;background-image:radial-gradient(#111 1.6px,transparent 1.7px);background-size:9px 9px}\n.txt{position:absolute;inset:0;display:grid;place-items:center;text-align:center}\n.txt b{font:900 19px/1 'Arial Black',system-ui;letter-spacing:-.02em;color:#111}\n.txt small{display:block;margin-top:4px;font:9px/1 ui-monospace,monospace;letter-spacing:.24em;color:#555}",
    html: "<div class=\"sq\"></div><div class=\"ci\"></div><div class=\"tri\"></div><div class=\"zig\"></div><div class=\"dots\"></div><div class=\"txt\"><b>MEMPHIS</b><small>FUN SINCE 1981</small></div>"
  },
  {
    slug: "art-deco",
    name: "装饰艺术风格",
    nameEn: "Art Deco",
    desc: "金色几何放射、对称构图与华丽衬线，黄金时代的奢华。",
    meta: ["金色线条","对称放射","衬线大写"],
    verified: true,
    css: "background:linear-gradient(#141026,#241a3a 55%,#141026);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;color:#d4af37;position:relative;overflow:hidden;\n.fan{position:absolute;bottom:-40%;width:150%;height:120%;border-radius:50%;background:repeating-conic-gradient(from 0deg at 50% 100%,rgba(212,175,55,.22) 0deg 3deg,transparent 3deg 9deg)}\nh4{position:relative;font:400 clamp(11px,1.8vw,14px)/1 Georgia,'Songti SC',serif;letter-spacing:.04em;color:#e8cf86;white-space:nowrap}\n.rule{position:relative;display:flex;align-items:center;gap:6px;color:#d4af37}\n.rule i{height:1px;width:30px;background:#d4af37}\n.rule b{width:5px;height:5px;transform:rotate(45deg);background:#d4af37}\nsmall{position:relative;font:7.5px/1 ui-monospace,monospace;letter-spacing:.1em;color:#a8912f;white-space:nowrap}",
    html: "<div class=\"fan\"></div><h4>ART DECO</h4><div class=\"rule\"><i></i><b></b><i></i></div><small>1925 · PARIS</small>"
  },
  {
    slug: "bauhaus",
    name: "包豪斯风格",
    nameEn: "Bauhaus",
    desc: "原色圆、三角与直线的大胆并置，形式追随功能。",
    meta: ["原色三色","几何并置","无衬线"],
    verified: true,
    css: "background:#f2efe6;display:grid;grid-template-columns:1.1fr 1fr;grid-template-rows:1fr 1fr;position:relative;\n.circle{grid-row:span 2;display:grid;place-items:center}\n.circle i{width:64%;aspect-ratio:1;border-radius:50%;background:#1d3fb5}\n.block{background:#e02b1f;display:grid;place-items:center;color:#f2efe6;font:700 13px/1 system-ui;letter-spacing:.04em}\n.tri2{background:#f2c200;display:grid;place-items:center}\n.tri2 i{width:0;height:0;border-left:22px solid transparent;border-right:22px solid transparent;border-bottom:36px solid #111}",
    html: "<div class=\"circle\"><i></i></div><div class=\"block\">BAU<br>HAUS</div><div class=\"tri2\"><i></i></div>"
  },
  {
    slug: "skeuomorphism",
    name: "拟物设计",
    nameEn: "Skeuomorphism",
    desc: "皮革、纸张与内嵌阴影，模拟真实物体带来熟悉感。",
    meta: ["真实材质","内嵌阴影","立体按压"],
    verified: true,
    css: "background:repeating-linear-gradient(45deg,#8b7355,#8b7355 6px,#7d6647 6px,#7d6647 12px);padding:16px;display:grid;place-items:center;\n.panel2{width:82%;border-radius:9px;background:linear-gradient(#d4c4a8,#bfa87f);padding:12px;box-shadow:inset 0 1px 0 #f0e6d2,inset 0 -3px 8px rgb(80 60 30 / .4),0 6px 14px rgb(0 0 0 / .35);border:1px solid #6b563a}\n.panel2 b{display:block;font:600 11px/1.3 Georgia,serif;color:#4a3820;text-shadow:0 1px 0 #f3e8d6}\n.btn3{display:inline-block;margin-top:9px;padding:5px 12px;border-radius:5px;background:linear-gradient(#f5efdf,#cdbb98);border:1px solid #6b563a;font:600 9px/1 system-ui;color:#3f301c;box-shadow:inset 0 1px 0 #fff,0 2px 3px rgb(0 0 0 / .3)}",
    html: "<div class=\"panel2\"><b>Leather Panel</b><br><span class=\"btn3\">Press me</span></div>"
  },
  {
    slug: "ghibli-style",
    name: "吉卜力风格",
    nameEn: "Ghibli Style",
    desc: "温暖柔和的自然色、手绘云朵与治愈氛围。",
    meta: ["暖色天空","手绘云","柔和渐变"],
    verified: true,
    css: "background:linear-gradient(#bfe3f0 0%,#dff0e6 55%,#f4e4bc);position:relative;overflow:hidden;display:grid;place-items:center;\n.cloud{position:absolute;width:46%;height:20%;border-radius:50%;background:#fff;opacity:.85;top:12%;left:12%;box-shadow:18px -6px 0 -5px #fff,44px 2px 0 -8px #fff}\n.hill{position:absolute;bottom:-16%;left:-10%;width:120%;height:46%;border-radius:50% 50% 0 0;background:#7cb9a8;opacity:.9}\n.txt{position:relative;text-align:center;margin-top:4%}\n.txt b{font:600 clamp(13px,2.2vw,18px)/1.2 Georgia,'Songti SC',serif;color:#3f5d52}\n.txt small{display:block;font-size:9px;color:#6b8578;margin-top:3px;letter-spacing:.06em}",
    html: "<div class=\"cloud\"></div><div class=\"hill\"></div><div class=\"txt\"><b>Warm and dreamy</b><small>手绘的自然与治愈</small></div>"
  },
  {
    slug: "material-design",
    name: "材料设计",
    nameEn: "Material Design",
    desc: "纸张隐喻、层级阴影与胶囊按钮，Google 的系统语言。",
    meta: ["层级阴影","胶囊按钮","紫主色"],
    verified: true,
    css: "background:#faf7ff;padding:16px 18px;display:flex;flex-direction:column;justify-content:center;gap:8px;\n.top{display:flex;align-items:center;gap:6px}\n.dot{width:9px;height:9px;border-radius:50%;background:#6200ee}\n.top b{font:600 11px/1 system-ui;color:#1c1b1f}\n.card4{background:#fff;border-radius:12px;padding:11px 13px;box-shadow:0 1px 3px rgb(0 0 0 / .14),0 4px 8px rgb(0 0 0 / .08)}\n.card4 b{display:block;font:600 13px/1.2 system-ui;color:#1c1b1f}\n.card4 small{display:block;margin-top:4px;font-size:9px;color:#79747e}\n.card4 span{display:inline-block;margin-top:9px;padding:5px 14px;border-radius:999px;background:#6200ee;color:#fff;font-size:9px;font-weight:600;box-shadow:0 2px 4px rgb(98 0 238 / .3)}",
    html: "<div class=\"top\"><span class=\"dot\"></span><b>Material 3</b></div><div class=\"card4\"><b>Elevation system</b><small>用阴影与层级表达纸张叠放。</small><span>Action</span></div>"
  },
  {
    slug: "fluent-design",
    name: "流利设计",
    nameEn: "Fluent Design",
    desc: "亚克力材质、光效与深度，微软的跨平台语言。",
    meta: ["亚克力","柔和光效","深色面板"],
    verified: true,
    css: "background:linear-gradient(135deg,#0b1a2a,#123049 60%,#0b1a2a);padding:16px 18px;display:flex;flex-direction:column;justify-content:center;\n.acr{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:11px 12px;backdrop-filter:blur(12px);box-shadow:0 8px 20px rgb(0 0 0 / .3)}\n.acr b{display:block;font:600 12px/1.2 system-ui;color:#fff}\n.acr small{display:block;margin-top:4px;font-size:9px;color:#a9c4d8}\n.row2{display:flex;gap:6px;margin-top:9px}\n.row2 span{padding:4px 10px;border-radius:4px;background:#0078d4;color:#fff;font-size:8.5px}\n.row2 u{border:1px solid rgba(255,255,255,.3);border-radius:4px;padding:4px 10px;font-size:8.5px;color:#dbeafe;text-decoration:none}",
    html: "<div class=\"acr\"><b>Acrylic &amp; depth</b><small>光效、材质与深度的组合。</small><div class=\"row2\"><span>Action</span><u>Cancel</u></div></div>"
  },
  {
    slug: "comic-style",
    name: "漫画风格",
    nameEn: "Comic Style",
    desc: "浓墨描边、网点填充与对话气泡，充满故事感。",
    meta: ["浓墨描边","网点","气泡对话"],
    verified: true,
    css: "background:#fff3c4;display:grid;place-items:center;position:relative;overflow:hidden;\n.panel3{border:3px solid #111;background:#fff;padding:10px 14px;border-radius:3px;box-shadow:6px 6px 0 #111;position:relative;text-align:center}\n.panel3 b{font:900 13px/1 'Arial Black',system-ui;color:#111;letter-spacing:-.02em}\n.burst{position:absolute;top:10%;right:9%;width:36px;height:36px;background:#e63946;border:2px solid #111;border-radius:50%;display:grid;place-items:center;font:900 9px/1 'Arial Black',system-ui;color:#fff;transform:rotate(-12deg)}\n.bubble{position:absolute;bottom:14%;left:8%;border:2px solid #111;border-radius:10px;padding:4px 8px;font:8.5px/1.3 system-ui;color:#111;background:#fff}\n.bubble:after{content:'';position:absolute;bottom:-6px;left:12px;width:8px;height:8px;background:#fff;border-right:2px solid #111;border-bottom:2px solid #111;transform:rotate(45deg)}",
    html: "<div class=\"panel3\"><b>POW!</b></div><div class=\"burst\">BAM</div><div class=\"bubble\">Manga style</div>"
  },
  {
    slug: "sketch-style",
    name: "铅笔手绘风",
    nameEn: "Sketch Style",
    desc: "不规则手绘线、纸张纹理与手写字，亲切温暖。",
    meta: ["手绘线","纸纹","手写字"],
    verified: true,
    css: "background:#f5f0e8;padding:14px 16px;display:flex;flex-direction:column;justify-content:center;gap:6px;\nh4{font:400 clamp(15px,2.5vw,21px)/1.15 'Segoe Script','Bradley Hand',cursive;color:#2c2c2c;transform:rotate(-1.2deg)}\n.box{border:2px solid #2c2c2c;border-radius:255px 15px 225px 15px/15px 225px 15px 255px;padding:8px 10px;font:10px/1.5 'Segoe Script',cursive;color:#3a3a3a;transform:rotate(.6deg)}\nul{margin:0;padding-left:14px;font:9.5px/1.6 'Segoe Script',cursive;color:#555}",
    html: "<h4>Sketch it out</h4><div class=\"box\">手绘的边框，故意不完美。</div><ul><li>不规则线条</li><li>纸张质感</li></ul>"
  },
  {
    slug: "watercolor-style",
    name: "水彩画风",
    nameEn: "Watercolor Style",
    desc: "柔和晕染、边缘扩散与纸上流动的色彩。",
    meta: ["色彩晕染","柔和边缘","纸感"],
    verified: true,
    css: "background:#faf8f5;position:relative;overflow:hidden;display:grid;place-items:center;\n.w1{position:absolute;width:46%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#4a6fa5aa,transparent 68%);top:8%;left:8%;filter:blur(6px)}\n.w2{position:absolute;width:40%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e8a87caa,transparent 68%);bottom:6%;right:10%;filter:blur(7px)}\n.w3{position:absolute;width:30%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#9ac2a0aa,transparent 70%);bottom:24%;left:34%;filter:blur(8px)}\nh4{position:relative;font:400 clamp(12px,2vw,17px)/1.2 Georgia,'Songti SC',serif;color:#2f4257;text-align:center}\nh4 small{display:block;margin-top:4px;font:9px/1 ui-monospace,monospace;letter-spacing:.16em;color:#68809a}",
    html: "<div class=\"w1\"></div><div class=\"w2\"></div><div class=\"w3\"></div><h4>Soft flowing colours<small>PAINT · PAPER · LIGHT</small></h4>"
  },
  {
    slug: "f-pattern-layout",
    name: "F型布局",
    nameEn: "F Pattern",
    desc: "按视线 F 形路径排布标题与正文，符合阅读习惯。",
    meta: ["F 形视线","左对齐","分段扫描"],
    verified: true,
    css: "background:#f8f9fa;padding:14px 18px;display:flex;flex-direction:column;gap:7px;\n.b{border-radius:3px;background:#1a1a2e}\n.b1{height:12px;width:78%}.b2{height:8px;width:52%}.b3{height:8px;width:46%}\n.two{display:flex;gap:8px;margin-top:4px}\n.two div{flex:1;height:34px;border-radius:3px;background:#e2e6ea}\n.two div:first-child{background:#1a1a2e;opacity:.85}\n.tag{font:8.5px/1 ui-monospace,monospace;letter-spacing:.18em;color:#8892a0}",
    html: "<span class=\"tag\">F-SHAPED READING</span><div class=\"b b1\"></div><div class=\"b b2\"></div><div class=\"b b3\"></div><div class=\"two\"><div></div><div></div></div>"
  },
  {
    slug: "z-pattern-layout",
    name: "Z型布局",
    nameEn: "Z Pattern",
    desc: "沿 Z 字视线布点：左上品牌、右上动作、中部主体、底部号召。",
    meta: ["Z 形视线","四角布点","强引导"],
    verified: true,
    css: "background:#fff;position:relative;height:100%;padding:12px 16px;\n.tl{position:absolute;top:12px;left:16px;font:700 11px/1 system-ui;color:#0f172a}\n.tr{position:absolute;top:12px;right:16px;padding:3px 9px;border-radius:4px;background:#0f172a;color:#fff;font-size:8.5px}\n.mid{position:absolute;top:46%;left:50%;transform:translate(-50%,-50%);text-align:center;width:70%}\n.mid b{font:650 13px/1.2 system-ui;color:#0f172a}.mid small{display:block;margin-top:3px;font-size:8.5px;color:#7c8899}\n.bl{position:absolute;bottom:12px;left:16px;font:8px/1 ui-monospace,monospace;color:#9aa6b5}\n.br{position:absolute;bottom:12px;right:16px;padding:3px 9px;border:1px solid #0f172a;border-radius:4px;font-size:8.5px;color:#0f172a}",
    html: "<div class=\"tl\">Brand</div><div class=\"tr\">Sign in</div><div class=\"mid\"><b>Follow the Z</b><small>视线从左上到右下</small></div><div class=\"bl\">© 2026</div><div class=\"br\">Start →</div>"
  },
  {
    slug: "holy-grail-layout",
    name: "圣杯布局",
    nameEn: "Holy Grail",
    desc: "页头、页脚加三栏，中间主内容自适应，经典经典布局。",
    meta: ["三栏","自适应中栏","页头页脚"],
    verified: true,
    css: "background:#f1f5f9;display:grid;grid-template-rows:22px 1fr 18px;gap:4px;padding:4px;height:100%;\n.hd,.ft{background:#1e293b;border-radius:3px}\n.mid2{display:grid;grid-template-columns:52px 1fr 52px;gap:4px}\n.mid2 div{background:#fff;border-radius:3px;box-shadow:0 1px 2px rgb(0 0 0 / .08)}\n.mid2 .nav2{background:#e2e8f0}.mid2 .aside2{background:#e2e8f0}\n.main3{padding:7px;display:flex;flex-direction:column;gap:4px}\n.main3 b{font:600 9.5px/1.2 system-ui;color:#0f172a}\n.main3 u{display:block;height:20px;border-radius:3px;background:#f1f5f9;text-decoration:none}",
    html: "<div class=\"hd\"></div><div class=\"mid2\"><div class=\"nav2\"></div><div class=\"main3\"><b>Main</b><u></u><u></u></div><div class=\"aside2\"></div></div><div class=\"ft\"></div>"
  },
  {
    slug: "dashboard-layout",
    name: "仪表盘布局",
    nameEn: "Dashboard",
    desc: "侧边导航加指标卡与图表区，后台系统的标准骨架。",
    meta: ["指标卡","图表区","侧栏"],
    verified: true,
    css: "background:#f9fafb;display:grid;grid-template-columns:44px 1fr;height:100%;\n.sb{background:#111827;padding:10px 7px;display:flex;flex-direction:column;gap:7px}\n.sb i{height:6px;border-radius:2px;background:#374151}.sb i:first-child{background:#60a5fa}\n.mn{padding:9px 10px;display:flex;flex-direction:column;gap:6px}\n.kpis{display:flex;gap:6px}\n.kpi{flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:5px 6px}\n.kpi small{font:7.5px/1 ui-monospace,monospace;color:#9ca3af}.kpi b{display:block;font:650 11px/1.3 system-ui;color:#111827}\n.chart4{flex:1;background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:6px;display:flex;align-items:flex-end;gap:3px}\n.chart4 i{flex:1;background:#3b82f6;border-radius:1px 1px 0 0;opacity:.8}",
    html: "<div class=\"sb\"><i></i><i></i><i></i><i></i></div><div class=\"mn\"><div class=\"kpis\"><div class=\"kpi\"><small>VIEWS</small><b>27.6m</b></div><div class=\"kpi\"><small>UPTIME</small><b>99.9%</b></div></div><div class=\"chart4\"><i style=\"height:40%\"></i><i style=\"height:70%\"></i><i style=\"height:52%\"></i><i style=\"height:88%\"></i><i style=\"height:64%\"></i><i style=\"height:76%\"></i></div></div>"
  },
  {
    slug: "cyberpunk-neon",
    name: "赛博朋克霓虹",
    nameEn: "Cyberpunk Neon",
    desc: "深空黑底、霓虹青与故障高光，高科技低生活。",
    meta: ["霓虹青","扫描线","故障高光"],
    verified: true,
    css: "background:#0a0a0f;position:relative;overflow:hidden;display:grid;place-items:center;\n.grid2{position:absolute;inset:0;background-image:linear-gradient(#00ffff14 1px,transparent 1px),linear-gradient(90deg,#00ffff14 1px,transparent 1px);background-size:20px 20px}\n.panel4{position:relative;border:1px solid #00ffff;padding:12px 16px;text-align:center;box-shadow:0 0 12px #00ffff55,inset 0 0 12px #00ffff22}\n.panel4 b{display:block;font:700 15px/1 ui-monospace,monospace;color:#00ffff;letter-spacing:.14em;text-shadow:0 0 6px #00ffff}\n.panel4 small{display:block;margin-top:6px;font:8px/1.5 ui-monospace,monospace;color:#ff00aa;letter-spacing:.2em}",
    html: "<div class=\"grid2\"></div><div class=\"panel4\"><b>CYBERPUNK</b><small>SYS // ONLINE</small></div>"
  },
  {
    slug: "synthwave",
    name: "合成波",
    nameEn: "Synthwave",
    desc: "霓虹粉紫、网格地平线与落日渐变，80 年代复古未来。",
    meta: ["粉紫霓虹","网格地平线","落日"],
    verified: true,
    css: "background:linear-gradient(#1a0033 0%,#3d0066 45%,#ff00ff 78%,#ffcc00 100%);position:relative;overflow:hidden;\n.sun2{position:absolute;left:50%;top:16%;transform:translateX(-50%);width:34%;aspect-ratio:1;border-radius:50%;background:linear-gradient(#ff006e,#ffcc00);box-shadow:0 0 24px #ff006e99}\n.grid3{position:absolute;bottom:0;left:0;right:0;height:44%;background-image:linear-gradient(#ff00ffaa 1px,transparent 1px),linear-gradient(90deg,#ff00ffaa 1px,transparent 1px);background-size:20px 12px;transform:perspective(90px) rotateX(52deg);transform-origin:bottom}\n.txt2{position:absolute;left:0;right:0;bottom:12%;text-align:center;color:#fff;text-shadow:0 0 8px #ff00ff}\n.txt2 b{font:700 13px/1 'Arial Black',system-ui;letter-spacing:.1em}",
    html: "<div class=\"sun2\"></div><div class=\"grid3\"></div><div class=\"txt2\"><b>SYNTHWAVE</b></div>"
  },
  {
    slug: "neo-brutalist-soft",
    name: "柔和野兽派",
    nameEn: "Neo-Brutalist Soft",
    desc: "保留硬阴影与零圆角，但配色更柔、边框更细。",
    meta: ["细边框","柔色","硬阴影"],
    verified: true,
    css: "background:#eef2ff;display:grid;place-items:center;\n.f{border:2px solid #2b2b3a;background:#c7d2fe;box-shadow:6px 6px 0 #2b2b3a;padding:14px 18px;text-align:center}\n.f b{display:block;font:700 16px/1.1 system-ui;color:#1e1b4b;letter-spacing:-.02em}\n.f small{display:block;margin-top:5px;font:9px/1.4 ui-monospace,monospace;letter-spacing:.16em;color:#4c4a72}",
    html: "<div class=\"f\"><b>Soft Card</b><small>GENTLE BRUTAL</small></div>"
  },
  {
    slug: "neo-brutalist-playful",
    name: "俏皮野兽派",
    nameEn: "Neo-Brutalist Playful",
    desc: "硬边结构加旋转、撞色与夸张贴纸，活泼又有力。",
    meta: ["旋转","撞色","贴纸感"],
    verified: true,
    css: "background:#fff200;display:grid;place-items:center;position:relative;\n.f2{border:3px solid #111;background:#ff5d8f;padding:12px 18px;box-shadow:7px 7px 0 #111;transform:rotate(-4deg);text-align:center}\n.f2 b{font:900 16px/1 'Arial Black',system-ui;color:#111;letter-spacing:-.02em}\n.star{position:absolute;top:12%;right:12%;width:34px;height:34px;background:#00d9ff;border:3px solid #111;border-radius:50%;display:grid;place-items:center;font:900 10px/1 'Arial Black';transform:rotate(12deg)}",
    html: "<div class=\"f2\"><b>PLAYFUL!</b></div><div class=\"star\">FUN</div>"
  },
  {
    slug: "art-nouveau",
    name: "新艺术运动风",
    nameEn: "Art Nouveau",
    desc: "有机曲线、藤蔓纹样与自然形态，优雅而富装饰性。",
    meta: ["有机曲线","藤蔓纹","古典衬线"],
    verified: true,
    css: "background:#f5f0e1;position:relative;overflow:hidden;display:grid;place-items:center;\n.vine{position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,#2d501622,transparent 42%),radial-gradient(circle at 85% 80%,#2d501622,transparent 42%)}\n.arc{position:absolute;top:-20%;left:50%;transform:translateX(-50%);width:82%;aspect-ratio:1;border:1px solid #2d5016;border-radius:50%;opacity:.4}\n.arc2{position:absolute;top:-6%;left:50%;transform:translateX(-50%);width:62%;aspect-ratio:1;border:1px solid #2d5016;border-radius:50%;opacity:.5}\n.txt3{position:relative;text-align:center}\n.txt3 b{font:400 clamp(13px,2.2vw,18px)/1.15 Georgia,'Songti SC',serif;color:#2d5016;letter-spacing:.04em}\n.txt3 small{display:block;margin-top:4px;font:8px/1 ui-monospace,monospace;letter-spacing:.24em;color:#6b8347}",
    html: "<div class=\"vine\"></div><div class=\"arc\"></div><div class=\"arc2\"></div><div class=\"txt3\"><b>Curves drawn<br>from the garden</b><small>MAISON VERTE</small></div>"
  },
  {
    slug: "surrealism",
    name: "超现实主义风",
    nameEn: "Surrealism",
    desc: "梦境般的不合逻辑并置、漂浮物与扭曲空间。",
    meta: ["漂浮物","梦幻","超现实"],
    verified: true,
    css: "background:linear-gradient(#1a1a3e,#3b2f63 60%,#f0ece4);position:relative;overflow:hidden;\n.ball{position:absolute;top:14%;left:18%;width:26%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 32% 28%,#ffd9a0,#e8875c);box-shadow:0 16px 28px rgb(0 0 0 / .35)}\n.door{position:absolute;bottom:-4%;right:14%;width:22%;height:46%;background:#0d0b1c;border:1px solid #f0ece4;transform:skewY(-6deg)}\n.eye{position:absolute;bottom:26%;left:16%;font:11px/1 ui-monospace,monospace;color:#f0ece4;letter-spacing:.3em}\n.txt4{position:absolute;left:14%;top:44%;color:#f0ece4}\n.txt4 b{font:400 clamp(12px,2vw,17px)/1.15 Georgia,serif;letter-spacing:.02em}",
    html: "<div class=\"ball\"></div><div class=\"door\"></div><div class=\"eye\">◉ ◉</div><div class=\"txt4\"><b>Ceci n'est pas<br>un écran</b></div>"
  },
  {
    slug: "ukiyo-e-digital",
    name: "浮世绘数字风",
    nameEn: "Ukiyo-e Digital",
    desc: "扁平色块、精致线描与古典构图，东方美学数字化。",
    meta: ["扁平色块","线描","海浪纹"],
    verified: true,
    css: "background:#f5f0e1;position:relative;overflow:hidden;\n.wave{position:absolute;bottom:0;left:0;right:0;height:52%;background:#1a3055;border-radius:52% 62% 0 0/38% 44% 0 0}\n.wave2{position:absolute;bottom:0;left:0;right:0;height:38%;background:#2d4a7a;border-radius:60% 40% 0 0/30% 36% 0 0}\n.foam{position:absolute;bottom:34%;left:8%;width:26%;height:12%;border-radius:50%;background:#f5f0e1;opacity:.9}\n.txt5{position:absolute;top:14%;left:8%;right:8%;display:flex;justify-content:space-between;align-items:flex-start;color:#1a3055}\n.txt5 b{font:400 clamp(13px,2.2vw,18px)/1.1 Georgia,'Songti SC',serif;letter-spacing:.06em}\n.txt5 small{font:8px/1.6 ui-monospace,monospace;letter-spacing:.2em;writing-mode:vertical-rl;color:#7a4b2a}",
    html: "<div class=\"wave\"></div><div class=\"wave2\"></div><div class=\"foam\"></div><div class=\"txt5\"><b>浮世 ·<br>PRINTS</b><small>版画</small></div>"
  },
  {
    slug: "gothic",
    name: "哥特式风",
    nameEn: "Gothic",
    desc: "深色尖拱、华丽纹样与古典衬线，庄严肃穆。",
    meta: ["尖拱","深色","古典衬线"],
    verified: true,
    css: "background:#0a0a0a;position:relative;overflow:hidden;display:grid;place-items:center;\n.arch{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:54%;height:78%;border:1px solid #3d2b4e;border-radius:50% 50% 0 0;box-shadow:0 0 40px #3d2b4e55}\n.arch2{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:38%;height:58%;border:1px solid #5b4375;border-radius:50% 50% 0 0}\n.txt6{position:relative;text-align:center;color:#c9b7dd}\n.txt6 b{font:400 clamp(13px,2.2vw,18px)/1.15 Georgia,serif;letter-spacing:.16em;text-transform:uppercase}\n.txt6 small{display:block;margin-top:5px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.3em;color:#6b5a85}",
    html: "<div class=\"arch\"></div><div class=\"arch2\"></div><div class=\"txt6\"><b>On the<br>Vaulted Arch</b><small>CHAPTER XIV</small></div>"
  },
  {
    slug: "outrun",
    name: "Outrun 复古未来",
    nameEn: "Outrun",
    desc: "霓虹粉紫、透视网格与高速运动感，80 年代赛车游戏。",
    meta: ["透视线","高速感","霓虹"],
    verified: true,
    css: "background:linear-gradient(#0a0a0a 0%,#1a0b2e 42%,#ff006e 100%);position:relative;overflow:hidden;\n.sun3{position:absolute;left:50%;top:12%;transform:translateX(-50%);width:30%;aspect-ratio:1;border-radius:50%;background:linear-gradient(#ff006e,#ffcc00)}\n.grid4{position:absolute;bottom:0;left:-20%;right:-20%;height:52%;background-image:linear-gradient(#00ffffaa 1px,transparent 1px),linear-gradient(90deg,#00ffffaa 1px,transparent 1px);background-size:26px 16px;transform:perspective(80px) rotateX(56deg);transform-origin:bottom}\n.txt7{position:absolute;left:0;right:0;bottom:14%;text-align:center;color:#fff}\n.txt7 b{font:700 12px/1 'Arial Black',system-ui;letter-spacing:.12em;text-shadow:0 0 8px #ff006e}",
    html: "<div class=\"sun3\"></div><div class=\"grid4\"></div><div class=\"txt7\"><b>OUTRUN</b></div>"
  },
  {
    slug: "dark-academia",
    name: "暗黑学院风",
    nameEn: "Dark Academia",
    desc: "深棕主调、旧书纸张与古典排版，文学与历史的浪漫。",
    meta: ["深棕","旧纸","经典衬线"],
    verified: true,
    css: "background:#3d2b1f;padding:14px 18px;display:flex;flex-direction:column;justify-content:center;gap:6px;position:relative;\n.pdf{position:absolute;inset:7px;border:1px solid #8a6e52;border-radius:2px;opacity:.5}\nsmall.t1{font:7.5px/1 ui-monospace,monospace;letter-spacing:.28em;color:#b5936e}\nh4{font:400 clamp(13px,2.2vw,18px)/1.15 Georgia,'Songti SC',serif;color:#f0e6d0;letter-spacing:.02em}\np.p1{font-size:8.5px;line-height:1.6;color:#c7b191;max-width:90%}\n.by{font:8px/1 ui-monospace,monospace;letter-spacing:.14em;color:#9a7f60}",
    html: "<div class=\"pdf\"></div><small class=\"t1\">THE QUARTERLY · VOL XIV</small><h4>On Lamplight<br>and Marginalia</h4><p class=\"p1\">“The margin is where reading becomes argument.”</p><span class=\"by\">BY E. ASHCOMBE</span>"
  },
  {
    slug: "cottagecore",
    name: "田园核风",
    nameEn: "Cottagecore",
    desc: "柔和自然色、花卉纹样与手作质感，向往简单生活。",
    meta: ["花草纹样","柔和自然色","手作感"],
    verified: true,
    css: "background:#f5f0e1;position:relative;overflow:hidden;display:grid;place-items:center;\n.fl{position:absolute;width:8px;height:8px;border-radius:50%;background:#e8a0b4}\n.f1{top:16%;left:12%}.f2{top:28%;right:16%;background:#c9a2d4}.f3{bottom:20%;left:20%;background:#a8c9a0}.f4{bottom:30%;right:12%}\n.card5{position:relative;background:#fffdf6;border:1px solid #d8cbb3;border-radius:4px;padding:12px 16px;text-align:center;box-shadow:0 6px 14px rgb(120 100 60 / .12)}\n.card5 b{font:400 clamp(12px,2vw,16px)/1.2 Georgia,'Songti SC',serif;color:#5a8f5a;letter-spacing:.04em}\n.card5 small{display:block;margin-top:4px;font:8px/1.5 ui-monospace,monospace;color:#9a8a6a}\n.rule2{width:26px;height:1px;background:#c9b995;margin:6px auto}",
    html: "<div class=\"fl f1\"></div><div class=\"fl f2\"></div><div class=\"fl f3\"></div><div class=\"fl f4\"></div><div class=\"card5\"><b>Meadow &amp; Jar</b><div class=\"rule2\"></div><small>ROSE JAM · $8</small></div>"
  },
  {
    slug: "risograph",
    name: "Risograph 印刷风",
    nameEn: "Risograph",
    desc: "专色叠印、半调网点与轻微套印偏移，手工印刷的质感。",
    meta: ["专色叠印","半调网点","套印偏移"],
    verified: true,
    css: "background:#f5f5f0;position:relative;overflow:hidden;display:grid;place-items:center;\n.dots2{position:absolute;inset:0;background-image:radial-gradient(#ff6b9d55 2px,transparent 2px);background-size:10px 10px;opacity:.7}\n.blob2{position:absolute;width:40%;aspect-ratio:1;border-radius:50%;background:#ff6b9d;mix-blend-mode:multiply;left:20%;top:22%}\n.blob3{position:absolute;width:40%;aspect-ratio:1;border-radius:50%;background:#6bc7ff;mix-blend-mode:multiply;left:32%;top:30%}\n.txt8{position:relative;text-align:center;color:#1a1a1a}\n.txt8 b{font:700 clamp(12px,2vw,16px)/1.1 system-ui;letter-spacing:.08em}\n.txt8 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.24em}",
    html: "<div class=\"dots2\"></div><div class=\"blob2\"></div><div class=\"blob3\"></div><div class=\"txt8\"><b>RISOGRAPH</b><small>DUPLICATOR PRESS</small></div>"
  },
  {
    slug: "mecha",
    name: "机甲风",
    nameEn: "Mecha",
    desc: "钢铁质感、警示条纹与技术参数标注，工业机械感。",
    meta: ["钢铁质感","警示条纹","参数标注"],
    verified: true,
    css: "background:#1a2744;position:relative;overflow:hidden;padding:12px 16px;display:flex;flex-direction:column;justify-content:space-between;\n.hatch{position:absolute;top:0;left:0;right:0;height:8px;background:repeating-linear-gradient(45deg,#f5c518 0 8px,#111 8px 16px)}\n.hd2{display:flex;justify-content:space-between;align-items:flex-start;margin-top:6px}\n.hd2 b{font:700 15px/1 'Arial Black',system-ui;color:#e5e5e5;letter-spacing:.06em}\n.hd2 small{font:8px/1 ui-monospace,monospace;color:#f5c518;letter-spacing:.18em}\n.gauges{display:flex;gap:10px}\n.gauges div{flex:1}\n.gauges small{display:block;font:7px/1 ui-monospace,monospace;color:#7d92b8;letter-spacing:.14em}\n.gauges i{display:block;height:4px;background:#0d1526;margin-top:3px;border-radius:1px}\n.gauges i u{display:block;height:100%;background:#f5c518;text-decoration:none}\n.ok{font:8px/1 ui-monospace,monospace;color:#5ce68a;letter-spacing:.2em}",
    html: "<div class=\"hatch\"></div><div class=\"hd2\"><b>RX-07</b><small>PILOT ARMORY</small></div><div class=\"gauges\"><div><small>THRUST 88%</small><i><u style=\"width:88%\"></u></i></div><div><small>ARMOR 62%</small><i><u style=\"width:62%\"></u></i></div></div><span class=\"ok\">FRAME OK</span>"
  },
  {
    slug: "gothic-lolita",
    name: "哥特萝莉风",
    nameEn: "Gothic Lolita",
    desc: "深色蕾丝、玫瑰纹样与维多利亚装饰，暗黑浪漫的精致。",
    meta: ["蕾丝","玫瑰纹","维多利亚"],
    verified: true,
    css: "background:#4a1a4a;position:relative;overflow:hidden;display:grid;place-items:center;\n.rose{position:absolute;top:14%;left:14%;width:18%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#e5e5e5,#8a3a63);opacity:.85}\n.lace{position:absolute;bottom:0;left:0;right:0;height:26%;background-image:radial-gradient(#e5e5e5 3px,transparent 3.4px);background-size:14px 14px;opacity:.4}\n.card6{position:relative;border:1px solid #d9b8d9;border-radius:3px;padding:11px 16px;text-align:center;background:rgba(20 8 20 / .35)}\n.card6 b{font:400 clamp(12px,2vw,17px)/1.2 Georgia,serif;color:#f5e6f5;letter-spacing:.1em}\n.card6 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.24em;color:#d3a8d3}",
    html: "<div class=\"rose\"></div><div class=\"lace\"></div><div class=\"card6\"><b>Rosenkranz</b><small>CATHEDRAL · ¥28,000</small></div>"
  },
  {
    slug: "cyber-chinese",
    name: "赛博中华风",
    nameEn: "Cyber Chinese",
    desc: "霓虹灯笼、数字山水与电路纹样，东方未来主义。",
    meta: ["霓虹灯笼","数字山水","电路纹样"],
    verified: true,
    css: "background:#0a0a0a;position:relative;overflow:hidden;display:grid;place-items:center;\n.mount{position:absolute;bottom:0;left:0;right:0;height:52%;background:linear-gradient(160deg,#d4553a33,#0a0a0a);clip-path:polygon(0 62%,18% 26%,34% 56%,52% 14%,70% 52%,86% 30%,100% 64%,100% 100%,0 100%)}\n.lantern{position:absolute;top:12%;right:14%;width:26px;height:34px;border-radius:50%;background:radial-gradient(circle,#ff6b4a,#8a1f0f);box-shadow:0 0 18px #d4553acc}\n.circuit{position:absolute;inset:0;background-image:linear-gradient(#d4553a22 1px,transparent 1px),linear-gradient(90deg,#d4553a22 1px,transparent 1px);background-size:18px 18px}\n.txt9{position:relative;text-align:center;color:#f0d0b0}\n.txt9 b{font:400 clamp(14px,2.4vw,19px)/1.1 'Songti SC',Georgia,serif;letter-spacing:.14em}\n.txt9 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.26em;color:#d4553a}",
    html: "<div class=\"circuit\"></div><div class=\"mount\"></div><div class=\"lantern\"></div><div class=\"txt9\"><b>山海集</b><small>NEO · ORIENT</small></div>"
  },
  {
    slug: "acid-graphics",
    name: "酸性平面设计",
    nameEn: "Acid Graphics",
    desc: "荧光撞色、扭曲字体与液态形态，反叛又实验。",
    meta: ["荧光绿","扭曲字体","液态形"],
    verified: true,
    css: "background:#0a0a0a;position:relative;overflow:hidden;display:grid;place-items:center;\n.blob4{position:absolute;width:60%;aspect-ratio:1;border-radius:44% 56% 62% 38%/52% 40% 60% 48%;background:linear-gradient(#39ff14,#00b3ff);filter:blur(1px);opacity:.85}\n.txt10{position:relative;text-align:center;color:#0a0a0a}\n.txt10 b{font:900 clamp(14px,2.6vw,20px)/1 'Arial Black',system-ui;letter-spacing:-.04em;transform:skew(-6deg);display:block}\n.txt10 small{display:block;margin-top:3px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.2em}",
    html: "<div class=\"blob4\"></div><div class=\"txt10\"><b>ACID//LAB</b><small>MELT DOWN</small></div>"
  },
  {
    slug: "hand-drawn-doodle",
    name: "手绘涂鸦风",
    nameEn: "Hand-Drawn Doodle",
    desc: "随手画的线、涂鸦插画与手写字，温暖又有趣。",
    meta: ["涂鸦线","手写字","不规则"],
    verified: true,
    css: "background:#fffef5;padding:14px 16px;display:flex;flex-direction:column;justify-content:center;gap:6px;position:relative;\nh4{font:400 clamp(13px,2.2vw,18px)/1.2 'Segoe Script','Bradley Hand',cursive;color:#2c2c2c;transform:rotate(-1.5deg)}\n.fld{border:2px dashed #2c2c2c;border-radius:8px 14px 10px 16px;padding:7px 9px;font:9px/1.5 'Segoe Script',cursive;color:#666}\n.circ{position:absolute;right:12%;top:18%;width:36px;height:22px;border:2px solid #ff7a59;border-radius:50%;transform:rotate(-14deg)}\n.arr{font:16px/1 cursive;color:#2c2c2c;position:absolute;right:16%;bottom:16%}",
    html: "<h4>Doodle time!</h4><div class=\"fld\">hello@example.com</div><div class=\"circ\"></div><div class=\"arr\">↝</div>"
  },
  {
    slug: "swiss-poster",
    name: "瑞士海报风",
    nameEn: "Swiss Poster",
    desc: "超大字号、网格对齐与原色块，实验性海报语言。",
    meta: ["超大字号","网格","原色块"],
    verified: true,
    css: "background:#f4f4f1;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between;\n.num{font:700 clamp(34px,7vw,62px)/.8 Helvetica,Arial;color:#111;letter-spacing:-.06em}\n.mid3{display:flex;justify-content:space-between;align-items:flex-end;border-top:2px solid #111;padding-top:5px;margin-top:4px}\n.mid3 b{font:700 9px/1 Helvetica;letter-spacing:.18em;text-transform:uppercase}\n.mid3 span{font:8px/1 ui-monospace,monospace;color:#666}\n.bars2{display:flex;gap:4px;margin-top:6px}.bars2 i{height:8px;flex:1}\n.bars2 i:nth-child(1){background:#e4002b}.bars2 i:nth-child(2){background:#111}.bars2 i:nth-child(3){background:#1d4ed8}",
    html: "<div class=\"num\">24</div><div class=\"mid3\"><b>Grid<br>System</b><span>12 COL · 8PT</span></div><div class=\"bars2\"><i></i><i></i><i></i></div>"
  },
  {
    slug: "watercolor-art",
    name: "水彩艺术风",
    nameEn: "Watercolor Art",
    desc: "真实的晕染叠加与笔触，像一幅水彩原作。",
    meta: ["晕染","透明叠加","笔触"],
    verified: true,
    css: "background:#faf8f5;position:relative;overflow:hidden;display:grid;place-items:center;\n.a1{position:absolute;width:52%;aspect-ratio:1;border-radius:45% 55% 60% 40%;background:radial-gradient(circle,#d4a0a0cc,transparent 66%);top:6%;left:8%;filter:blur(5px)}\n.a2{position:absolute;width:46%;aspect-ratio:1;border-radius:55% 45% 40% 60%;background:radial-gradient(circle,#8fa5c8cc,transparent 66%);bottom:4%;right:8%;filter:blur(6px)}\n.a3{position:absolute;width:30%;height:8%;border-radius:50%;background:#c8a0b8aa;bottom:32%;left:28%;filter:blur(4px);transform:rotate(-8deg)}\nh4{position:relative;font:400 clamp(13px,2.2vw,18px)/1.2 Georgia,serif;color:#4a4256;text-align:center}\nh4 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.2em;color:#8b8296}",
    html: "<div class=\"a1\"></div><div class=\"a2\"></div><div class=\"a3\"></div><h4>Soft art<small>WATERCOLOUR</small></h4>"
  },
  {
    slug: "impressionist-oil",
    name: "油画印象派风",
    nameEn: "Impressionist Oil",
    desc: "厚涂笔触、光影交织与暖调画布，浓郁的油画感。",
    meta: ["厚涂笔触","暖调","画布质感"],
    verified: true,
    css: "background:#f5f0e1;position:relative;overflow:hidden;\n.sky{position:absolute;inset:0;background:linear-gradient(#e8a87c44,#f5f0e1)}\n.stroke{position:absolute;border-radius:40px;opacity:.55}\n.s1{width:60%;height:14%;background:#e8a87c;top:22%;left:-6%;transform:rotate(-6deg);filter:blur(1px)}\n.s2{width:52%;height:12%;background:#8fb3c8;top:38%;left:20%;transform:rotate(4deg);filter:blur(1px)}\n.s3{width:70%;height:16%;background:#c9a86a;bottom:12%;left:-4%;transform:rotate(-3deg);filter:blur(1px)}\n.txt11{position:absolute;inset:0;display:grid;place-items:center;text-align:center}\n.txt11 b{font:400 clamp(13px,2.2vw,18px)/1.15 Georgia,serif;color:#3f3428;letter-spacing:.04em;text-shadow:0 1px 2px #f5f0e1}\n.txt11 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.22em;color:#6b5a44}",
    html: "<div class=\"sky\"></div><div class=\"stroke s1\"></div><div class=\"stroke s2\"></div><div class=\"stroke s3\"></div><div class=\"txt11\"><b>Galerie Lumière</b><small>MATINÉE · 1874</small></div>"
  },
  {
    slug: "immersive-photo",
    name: "沉浸摄影",
    nameEn: "Immersive Photo",
    desc: "全幅图像铺满视口，文字压在可读性遮罩上浮起。",
    meta: ["满幅图","可读遮罩","慢推"],
    verified: true,
    css: "background:linear-gradient(160deg,#2b3a44 0%,#4a5c63 42%,#8a7a63 72%,#c9b18a 100%);position:relative;overflow:hidden;display:grid;place-items:center;\n.mask{position:absolute;inset:0;background:linear-gradient(transparent 30%,#0c0d10cc)}\n.chap{position:absolute;top:12%;left:10%;font:7.5px/1 ui-monospace,monospace;letter-spacing:.3em;color:#e8dfd2}\n.txt12{position:relative;text-align:center;color:#f4f1ea}\n.txt12 b{font:400 clamp(13px,2.4vw,19px)/1.15 Georgia,serif;letter-spacing:.01em}\n.txt12 small{display:block;margin-top:5px;font:8px/1 ui-monospace,monospace;letter-spacing:.2em;color:#cbbfa9}",
    html: "<div class=\"mask\"></div><div class=\"chap\">CHAPTER ONE</div><div class=\"txt12\"><b>The light arrives<br>before the sound</b><small>VIEW THE SERIES →</small></div>"
  },
  {
    slug: "collage-art",
    name: "拼贴艺术风",
    nameEn: "Collage Art",
    desc: "纸片剪切、多层叠加与撕边混搭字体，手工拼贴感。",
    meta: ["纸片剪切","多层叠加","混排字"],
    verified: true,
    css: "background:#f5f0e8;position:relative;overflow:hidden;\n.p1{position:absolute;top:12%;left:8%;width:44%;height:34%;background:#2d2d2d;transform:rotate(-4deg)}\n.p2{position:absolute;top:26%;left:30%;width:40%;height:30%;background:#e8d15c;transform:rotate(6deg);mix-blend-mode:multiply}\n.p3{position:absolute;bottom:12%;right:10%;width:36%;height:34%;background:#c94f3d;transform:rotate(-8deg)}\n.txt13{position:absolute;top:14%;right:10%;text-align:right;color:#111}\n.txt13 b{font:900 clamp(13px,2.4vw,19px)/1 'Arial Black',system-ui;letter-spacing:-.03em;transform:rotate(3deg);display:block}\n.txt13 small{font:7.5px/1 ui-monospace,monospace;letter-spacing:.24em}",
    html: "<div class=\"p1\"></div><div class=\"p2\"></div><div class=\"p3\"></div><div class=\"txt13\"><b>CUT/<br>PASTE</b><small>ISSUE 04</small></div>"
  },
  {
    slug: "cinematic-video-hero",
    name: "电影视频首屏",
    nameEn: "Cinematic Video Hero",
    desc: "海报帧先出、视频静音循环，像电影预告片开场。",
    meta: ["电影感","暗场调色","播放键"],
    verified: true,
    css: "background:linear-gradient(#05060A 0%,#141a24 55%,#05060A 100%);position:relative;overflow:hidden;display:grid;place-items:center;\n.letter{position:absolute;inset:6% 0;background:#000;opacity:.35}\n.play{width:40px;height:40px;border-radius:50%;border:1px solid #f3efe8;display:grid;place-items:center;color:#f3efe8;font-size:13px;position:absolute;top:26%}\n.txt14{position:relative;text-align:center;color:#f3efe8;margin-top:12%}\n.txt14 b{font:400 clamp(12px,2vw,17px)/1.2 Georgia,serif;letter-spacing:.02em}\n.txt14 small{display:block;margin-top:5px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.26em;color:#9a927f}",
    html: "<div class=\"letter\"></div><div class=\"play\">▶</div><div class=\"txt14\"><b>Some stories only move</b><small>NOW SCREENING</small></div>"
  },
  {
    slug: "glitch-art",
    name: "故障艺术风",
    nameEn: "Glitch Art",
    desc: "RGB 分离、像素错位与扫描线，数字损坏的美学。",
    meta: ["RGB 分离","错位","扫描线"],
    verified: true,
    css: "background:#0a0a0a;position:relative;overflow:hidden;display:grid;place-items:center;\n.scan{position:absolute;inset:0;background:repeating-linear-gradient(#ffffff0a 0 1px,transparent 1px 3px)}\n.g1{position:absolute;font:900 clamp(15px,3vw,24px)/1 'Arial Black',system-ui;color:#00ffff;transform:translate(-2px,-1px);opacity:.85}\n.g2{position:absolute;font:900 clamp(15px,3vw,24px)/1 'Arial Black',system-ui;color:#ff00aa;transform:translate(2px,1px);opacity:.85}\n.g3{position:relative;font:900 clamp(15px,3vw,24px)/1 'Arial Black',system-ui;color:#f0f0f0}\n.gl{position:absolute;left:0;right:0;height:3px;background:#00ffff44}\n.l1{top:34%}.l2{top:62%;background:#ff00aa44}",
    html: "<div class=\"scan\"></div><div class=\"gl l1\"></div><div class=\"gl l2\"></div><div class=\"g1\">SIGNAL LOST</div><div class=\"g2\">SIGNAL LOST</div><div class=\"g3\">SIGNAL LOST</div>"
  },
  {
    slug: "visual-novel",
    name: "视觉小说风",
    nameEn: "Visual Novel",
    desc: "半透明对话框、角色立绘与选项按钮，沉浸式叙事。",
    meta: ["对话框","选项按钮","渐变底"],
    verified: true,
    css: "background:linear-gradient(160deg,#4a5568,#2d3748 60%,#1a202c);position:relative;overflow:hidden;\n.sil{position:absolute;right:12%;bottom:0;width:34%;height:62%;border-radius:50% 50% 0 0;background:linear-gradient(#7a8a9e,#4a5568);opacity:.7}\n.box2{position:absolute;left:8%;right:8%;bottom:8%;background:rgba(247,250,252,.92);border-radius:8px;padding:8px 10px}\n.box2 small{font:7.5px/1 ui-monospace,monospace;color:#718096;letter-spacing:.16em}\n.box2 b{display:block;margin-top:3px;font:400 9.5px/1.5 system-ui;color:#1a202c}\n.opts{position:absolute;right:8%;top:16%;display:flex;flex-direction:column;gap:5px}\n.opts span{padding:4px 12px;border-radius:999px;border:1px solid #f7fafc;color:#f7fafc;font-size:8px;background:rgba(255,255,255,.1)}",
    html: "<div class=\"sil\"></div><div class=\"opts\"><span>Choose</span><span>Continue</span></div><div class=\"box2\"><small>YUKI</small><b>「故事从这里开始展开。」</b></div>"
  },
  {
    slug: "shoujo-manga",
    name: "少女漫画风",
    nameEn: "Shoujo Manga",
    desc: "樱花花瓣、闪光与柔和粉色，梦幻浪漫的少女感。",
    meta: ["花瓣","闪光","粉色"],
    verified: true,
    css: "background:linear-gradient(160deg,#fff5f7,#ffe4ec);position:relative;overflow:hidden;display:grid;place-items:center;\n.pet{position:absolute;width:9px;height:9px;border-radius:60% 20% 60% 20%;background:#ffb7c5;opacity:.8}\n.p1{top:16%;left:14%;transform:rotate(24deg)}.p2{top:26%;right:18%;transform:rotate(-30deg)}.p3{bottom:22%;left:22%;transform:rotate(60deg)}.p4{bottom:30%;right:14%;transform:rotate(-12deg)}\n.sp{position:absolute;color:#ff9ab5;font-size:10px}.s1{top:20%;left:34%}.s2{bottom:26%;right:32%}\n.card7{position:relative;border:1px solid #ffc9d8;border-radius:6px;background:rgba(255,255,255,.72);padding:11px 16px;text-align:center}\n.card7 b{font:400 clamp(12px,2vw,17px)/1.2 Georgia,'Songti SC',serif;color:#b3476b;letter-spacing:.1em}\n.card7 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.2em;color:#c9809a}",
    html: "<div class=\"pet p1\"></div><div class=\"pet p2\"></div><div class=\"pet p3\"></div><div class=\"pet p4\"></div><div class=\"sp s1\">✧</div><div class=\"sp s2\">✦</div><div class=\"card7\"><b>Yumemiru</b><small>ときめき · SHOP</small></div>"
  },
  {
    slug: "cyber-anime",
    name: "赛博动漫风",
    nameEn: "Cyber Anime",
    desc: "深色霓虹、全息投影与锐利几何，未来动漫界面。",
    meta: ["霓虹光效","全息感","锐利几何"],
    verified: true,
    css: "background:#0f0f1a;position:relative;overflow:hidden;display:grid;place-items:center;\n.hud{position:absolute;inset:8%;border:1px solid #7c3aed55}\n.corner{position:absolute;width:14px;height:14px;border:2px solid #7c3aed}\n.c1{top:8%;left:8%;border-right:0;border-bottom:0}.c2{top:8%;right:8%;border-left:0;border-bottom:0}\n.c3{bottom:8%;left:8%;border-right:0;border-top:0}.c4{bottom:8%;right:8%;border-left:0;border-top:0}\n.gauge{position:relative;text-align:center;color:#c4b5fd}\n.gauge b{display:block;font:700 13px/1 ui-monospace,monospace;letter-spacing:.2em;text-shadow:0 0 10px #7c3aed}\n.gauge small{display:block;margin-top:5px;font:7.5px/1.6 ui-monospace,monospace;color:#8b5cf6;letter-spacing:.16em}",
    html: "<div class=\"hud\"></div><div class=\"corner c1\"></div><div class=\"corner c2\"></div><div class=\"corner c3\"></div><div class=\"corner c4\"></div><div class=\"gauge\"><b>SYNC 82%</b><small>SECTOR 07 // ONLINE</small></div>"
  },
  {
    slug: "pixel-anime",
    name: "像素动漫风",
    nameEn: "Pixel Anime",
    desc: "8-bit 像素角色与游戏 UI，怀旧又可爱。",
    meta: ["8-bit","游戏 UI","Q 版"],
    verified: true,
    css: "background:#2d1b69;display:grid;place-items:center;position:relative;\n.win3{width:74%;border:3px solid #f4f4f4;background:#1a1040;padding:9px;text-align:center}\n.win3 b{display:block;font:700 11px/1.3 ui-monospace,monospace;color:#f4f4f4}\n.hp2{display:flex;justify-content:center;gap:2px;margin:7px 0}\n.hp2 i{width:7px;height:7px;background:#4a90d9}.hp2 i:nth-child(4){background:#1a1040}\n.acts2{display:flex;gap:5px;justify-content:center}\n.acts2 span{border:2px solid #f4f4f4;padding:2px 7px;font:8px/1 ui-monospace,monospace;color:#f4f4f4}\n.lv{position:absolute;top:10%;left:10%;font:8px/1 ui-monospace,monospace;color:#ffd400}",
    html: "<div class=\"lv\">LV 12</div><div class=\"win3\"><b>A wild pixel appeared!</b><div class=\"hp2\"><i></i><i></i><i></i><i></i></div><div class=\"acts2\"><span>FIGHT</span><span>RUN</span></div></div>"
  },
  {
    slug: "japanese-fresh",
    name: "日系清新风",
    nameEn: "Japanese Fresh",
    desc: "淡雅配色、大留白与纤细线条，轻盈治愈。",
    meta: ["淡雅配色","大留白","细线"],
    verified: true,
    css: "background:#fafaf8;padding:16px 20px;display:flex;flex-direction:column;justify-content:center;gap:7px;\nsmall.k{font:7.5px/1 ui-monospace,monospace;letter-spacing:.3em;color:#9db4c8}\nh4{font:400 clamp(13px,2.2vw,18px)/1.25 Georgia,'Songti SC',serif;color:#40525f;letter-spacing:.03em}\n.row3{display:flex;gap:6px;margin-top:2px}\n.row3 div{flex:1;height:30px;border:1px solid #e2e6e8;border-radius:2px;display:grid;place-items:center;font:7px/1 ui-monospace,monospace;color:#9aa8b2}",
    html: "<small class=\"k\">KURASHI · くらし</small><h4>軽やかな<br>暮らしの道具</h4><div class=\"row3\"><div>glass</div><div>linen</div><div>teapot</div></div>"
  },
  {
    slug: "neon-samurai",
    name: "霓虹武士风",
    nameEn: "Neon Samurai",
    desc: "刀锋锐线、书法汉字与霓虹交织，浮世绘遇见霓虹灯。",
    meta: ["刀锋线","书法字","霓虹红"],
    verified: true,
    css: "background:#0a0a0a;position:relative;overflow:hidden;display:grid;place-items:center;\n.slash{position:absolute;width:140%;height:2px;background:linear-gradient(90deg,transparent,#dc2626,transparent);top:46%;transform:rotate(-18deg);box-shadow:0 0 14px #dc2626}\n.kanji{position:relative;font:400 clamp(26px,5vw,44px)/1 'Songti SC',serif;color:#dc2626;text-shadow:0 0 18px #dc262699}\n.sub{position:absolute;bottom:14%;left:0;right:0;text-align:center;font:7.5px/1 ui-monospace,monospace;letter-spacing:.32em;color:#8a8a8a}",
    html: "<div class=\"slash\"></div><div class=\"kanji\">刃</div><div class=\"sub\">RONIN · NEO-EDO 2099</div>"
  },
  {
    slug: "magic-circle",
    name: "魔法阵风",
    nameEn: "Magic Circle",
    desc: "同心圆纹样、符文与金色辉光，深蓝底上的魔法感。",
    meta: ["同心圆","符文","金色辉光"],
    verified: true,
    css: "background:radial-gradient(circle at 50% 50%,#1e1b4b,#0f0e2e 70%);position:relative;overflow:hidden;display:grid;place-items:center;\n.c1c{position:absolute;width:58%;aspect-ratio:1;border:1px solid #b8912f88;border-radius:50%}\n.c2c{position:absolute;width:44%;aspect-ratio:1;border:1px dashed #b8912f66;border-radius:50%}\n.c3c{position:absolute;width:30%;aspect-ratio:1;border:1px solid #b8912f99;border-radius:50%;transform:rotate(30deg)}\n.rune{position:absolute;font:11px/1 serif;color:#d9b755;letter-spacing:.5em;bottom:18%}\n.core{position:relative;text-align:center;color:#e8d29a}\n.core b{font:400 clamp(11px,1.9vw,15px)/1.2 Georgia,serif;letter-spacing:.14em}\n.core small{display:block;margin-top:4px;font:7px/1 ui-monospace,monospace;letter-spacing:.24em;color:#a8945e}",
    html: "<div class=\"c1c\"></div><div class=\"c2c\"></div><div class=\"c3c\"></div><div class=\"rune\">ᚦ ᛉ ᛟ ᛞ</div><div class=\"core\"><b>Circle of Binding</b><small>RANK IV</small></div>"
  },
  {
    slug: "cyber-wafuu",
    name: "赛博和风",
    nameEn: "Cyber Wafuu",
    desc: "和风纹样与电路金箔的数字化重构，日式赛博美学。",
    meta: ["和风纹样","金箔","电路"],
    verified: true,
    css: "background:linear-gradient(160deg,#0a0a14,#1e3a5f 65%,#0a0a14);position:relative;overflow:hidden;padding:12px 16px;display:flex;flex-direction:column;justify-content:space-between;\n.seigaiha{position:absolute;inset:0;background-image:radial-gradient(circle at 50% 100%,transparent 6px,#b8912f22 7px,transparent 8px);background-size:18px 9px;opacity:.5}\n.hdr{display:flex;justify-content:space-between;font:7.5px/1 ui-monospace,monospace;letter-spacing:.2em;color:#c9a94e}\n.list3{display:flex;flex-direction:column;gap:5px}\n.list3 div{display:flex;justify-content:space-between;font:8.5px/1.4 ui-monospace,monospace;color:#9fb4cc}\n.list3 div i{font-style:normal;color:#5ce68a}.list3 div:nth-child(2) i{color:#c9a94e}.list3 div:nth-child(3) i{color:#e05a5a}",
    html: "<div class=\"seigaiha\"></div><div class=\"hdr\"><span>和風 · 制御盤</span><span>v2.4</span></div><div class=\"list3\"><div><span>東京 拠点</span><i>稼働</i></div><div><span>京都 拠点</span><i>待機</i></div><div><span>大阪 拠点</span><i>遮断</i></div></div>"
  },
  {
    slug: "steampunk",
    name: "蒸汽朋克",
    nameEn: "Steampunk",
    desc: "黄铜齿轮、皮革质感与精密仪表，维多利亚机械美学。",
    meta: ["黄铜齿轮","皮革","仪表盘"],
    verified: true,
    css: "background:linear-gradient(#2d1810,#4a2c1a 60%,#2d1810);position:relative;overflow:hidden;display:grid;place-items:center;\n.gear{position:absolute;border-radius:50%;border:6px dashed #a87b3a;opacity:.65}\n.g1{width:56px;height:56px;top:16%;left:14%}.g2{width:38px;height:38px;top:30%;left:30%;border-width:4px;border-color:#c9a35e}\n.plate{position:relative;background:linear-gradient(#d4c4a8,#a8895e);border:1px solid #6b4a2a;border-radius:4px;padding:9px 14px;box-shadow:inset 0 1px 0 #f0e6d2,0 6px 14px rgb(0 0 0 / .4);text-align:center}\n.plate b{font:600 10px/1.3 Georgia,serif;color:#3f2a16;letter-spacing:.1em}\n.plate small{display:block;margin-top:3px;font:7px/1 ui-monospace,monospace;color:#6b4a2a;letter-spacing:.16em}",
    html: "<div class=\"gear g1\"></div><div class=\"gear g2\"></div><div class=\"plate\"><b>MECHANICA</b><small>STEAM · 1887</small></div>"
  },
  {
    slug: "pop-art",
    name: "波普艺术",
    nameEn: "Pop Art",
    desc: "安迪沃霍尔式撞色与半调网点，60 年代流行文化。",
    meta: ["撞色","半调网点","漫画感"],
    verified: true,
    css: "background:#ffff00;position:relative;overflow:hidden;display:grid;place-items:center;\n.dots3{position:absolute;inset:0;background-image:radial-gradient(#ff006655 2.4px,transparent 2.6px);background-size:12px 12px}\n.burst2{position:relative;background:#ff0066;border:3px solid #111;border-radius:50%;width:96px;height:96px;display:grid;place-items:center;box-shadow:5px 5px 0 #111}\n.burst2 b{font:900 17px/1 'Arial Black',system-ui;color:#fff;transform:rotate(-8deg)}\n.tag2{position:absolute;bottom:12%;right:12%;font:8px/1 ui-monospace,monospace;letter-spacing:.2em;color:#111}",
    html: "<div class=\"dots3\"></div><div class=\"burst2\"><b>BOOM!</b></div><div class=\"tag2\">ISSUE #42</div>"
  },
  {
    slug: "solarpunk",
    name: "太阳朋克",
    nameEn: "Solarpunk",
    desc: "生态未来主义的明亮绿调、太阳能美学与有机形态。",
    meta: ["明亮绿","有机形","自然科技"],
    verified: true,
    css: "background:linear-gradient(160deg,#f0fdf4,#d9f2e3 55%,#c9e8d4);position:relative;overflow:hidden;display:grid;place-items:center;\n.sun4{position:absolute;top:12%;right:16%;width:36px;height:36px;border-radius:50%;background:#f5c518;box-shadow:0 0 22px #f5c51899}\n.hill2{position:absolute;bottom:-8%;left:-8%;width:70%;height:44%;border-radius:50% 50% 0 0;background:#2d6a4f44}\n.hill3{position:absolute;bottom:-8%;right:-8%;width:62%;height:36%;border-radius:50% 50% 0 0;background:#40916c55}\n.txt15{position:relative;text-align:center;color:#1b4332}\n.txt15 b{font:600 clamp(12px,2vw,16px)/1.2 system-ui;letter-spacing:-.01em}\n.txt15 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.2em;color:#40916c}",
    html: "<div class=\"sun4\"></div><div class=\"hill2\"></div><div class=\"hill3\"></div><div class=\"txt15\"><b>Clean tech, nature</b><small>SOLARPUNK</small></div>"
  },
  {
    slug: "jrpg",
    name: "日式RPG",
    nameEn: "JRPG",
    desc: "华丽边框、魔法特效与状态面板，经典日式游戏 UI。",
    meta: ["华丽边框","状态面板","幻想风"],
    verified: true,
    css: "background:#1a1a2e;position:relative;overflow:hidden;display:grid;place-items:center;\n.frame2{position:relative;width:78%;border:2px solid #c9a94e;border-radius:4px;background:linear-gradient(rgba(20 30 80 / .9),rgba(10 14 40 / .95));padding:10px 12px;box-shadow:0 0 0 3px #1a1a2e,0 0 14px #c9a94e44}\n.frame2:before,.frame2:after{content:'';position:absolute;width:8px;height:8px;border:2px solid #e8d29a;top:-4px}\n.frame2:before{left:-4px;border-right:0;border-bottom:0}.frame2:after{right:-4px;border-left:0;border-bottom:0}\n.frame2 b{display:block;font:600 11px/1.3 system-ui;color:#eef2ff;letter-spacing:.06em}\n.stats2{display:flex;gap:10px;margin-top:7px}\n.stats2 div{font:7px/1 ui-monospace,monospace;color:#9fb0dd}.stats2 div b{display:block;font-size:9px;color:#e8d29a;margin-top:2px}\n.quest{display:inline-block;margin-top:8px;padding:3px 10px;border:1px solid #c9a94e;border-radius:2px;color:#e8d29a;font:7.5px/1 ui-monospace,monospace;letter-spacing:.14em}",
    html: "<div class=\"frame2\"><b>Start Quest</b><div class=\"stats2\"><div>HP<b>240</b></div><div>MP<b>86</b></div><div>LV<b>12</b></div></div><span class=\"quest\">▶ ADVENTURE</span></div>"
  },
  {
    slug: "asymmetric-grid",
    name: "非对称网格",
    nameEn: "Asymmetric Grid",
    desc: "刻意失衡的栏宽比例，用不对称制造张力。",
    meta: ["失衡比例","大小对撞","编辑感"],
    verified: true,
    css: "background:#fff;display:grid;grid-template-columns:1.8fr 1fr;grid-template-rows:1.4fr 1fr;gap:5px;padding:5px;height:100%;\n.a1{grid-row:span 2;background:#0f0f0f;color:#fff;padding:11px;display:flex;flex-direction:column;justify-content:flex-end}\n.a1 b{font:600 13px/1.1 system-ui;letter-spacing:-.02em}\n.a2{background:#f0f0f0;display:grid;place-items:center;font:8px/1 ui-monospace,monospace;color:#666}\n.a3{background:#e63946}",
    html: "<div class=\"a1\"><b>Asymmetric</b></div><div class=\"a2\">02</div><div class=\"a3\"></div>"
  },
  {
    slug: "parallax-sections",
    name: "视差滚动",
    nameEn: "Parallax Sections",
    desc: "多层景深错位滚动，营造空间纵深感。",
    meta: ["多层景深","错位","纵深感"],
    verified: true,
    css: "background:linear-gradient(#cfe3f2,#eef5fb 60%,#dfeaf5);position:relative;overflow:hidden;\n.l1{position:absolute;bottom:0;left:-6%;width:70%;height:38%;background:#a8c4dc;border-radius:50% 50% 0 0;opacity:.75}\n.l2{position:absolute;bottom:0;right:-8%;width:60%;height:28%;background:#7f9fbd;border-radius:50% 50% 0 0;opacity:.85}\n.l3{position:absolute;bottom:0;left:16%;width:46%;height:18%;background:#1e3a5f;border-radius:50% 50% 0 0}\n.txt16{position:absolute;top:16%;left:10%;color:#1e3a5f}\n.txt16 b{font:600 clamp(12px,2vw,17px)/1.2 system-ui;letter-spacing:-.01em}\n.txt16 small{display:block;margin-top:4px;font:7.5px/1 ui-monospace,monospace;letter-spacing:.2em;color:#6b85a0}",
    html: "<div class=\"l1\"></div><div class=\"l2\"></div><div class=\"l3\"></div><div class=\"txt16\"><b>Depth by layers</b><small>PARALLAX 03</small></div>"
  },
  {
    slug: "warm-dashboard",
    name: "暖色仪表盘",
    nameEn: "Warm Dashboard",
    desc: "珊瑚赤陶背景配奶油白卡片，温暖又专业的数据界面。",
    meta: ["赤陶背景","奶油卡片","柔和阴影"],
    verified: true,
    css: "background:#d4a088;padding:11px;display:flex;flex-direction:column;gap:6px;\n.cardk{background:#faf8f5;border-radius:7px;padding:8px 10px;box-shadow:0 4px 10px rgb(120 80 50 / .18)}\n.cardk small{font:7px/1 ui-monospace,monospace;color:#a89880;letter-spacing:.14em}\n.cardk b{display:block;margin-top:3px;font:650 15px/1 system-ui;color:#3f3428}\n.cardk i{font-style:normal;font-size:7.5px;color:#4a9b6a;margin-left:4px}\n.row4{display:flex;gap:6px}\n.row4 .cardk{flex:1}\n.bars3{display:flex;align-items:flex-end;gap:3px;height:24px;margin-top:5px}\n.bars3 i{flex:1;background:#d4a088;border-radius:1px 1px 0 0}",
    html: "<div class=\"cardk\"><small>TOTAL VIEWS</small><b>27.6m <i>+12%</i></b><div class=\"bars3\"><i style=\"height:40%\"></i><i style=\"height:66%\"></i><i style=\"height:52%\"></i><i style=\"height:84%\"></i><i style=\"height:70%\"></i><i style=\"height:92%\"></i></div></div><div class=\"row4\"><div class=\"cardk\"><small>ORDERS</small><b>1,284</b></div><div class=\"cardk\"><small>UPTIME</small><b>99.9%</b></div></div>"
  },
  {
    slug: "neon-gradient",
    name: "霓虹渐变",
    nameEn: "Neon Gradient",
    desc: "深色底上的鲜艳渐变卡片与粗彩边，年轻科技感。",
    meta: ["深色底","渐变卡片","粗彩边"],
    verified: true,
    css: "background:#0f0a1e;padding:14px;display:grid;place-items:center;\n.gc{width:74%;border-radius:12px;padding:2px;background:linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)}\n.gc2{border-radius:10px;background:#150d28;padding:13px;text-align:center}\n.gc2 b{display:block;font:700 14px/1.2 system-ui;background:linear-gradient(90deg,#a855f7,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:-.02em}\n.gc2 small{display:block;margin-top:5px;font:7.5px/1.5 ui-monospace,monospace;letter-spacing:.18em;color:#8b7aa8}\n.gc2 span{display:inline-block;margin-top:9px;padding:4px 12px;border-radius:999px;background:linear-gradient(90deg,#a855f7,#ec4899);color:#fff;font-size:8px;font-weight:600}",
    html: "<div class=\"gc\"><div class=\"gc2\"><b>Neon Gradient</b><small>GLOW · DEPTH · COLOR</small><br><span>Start</span></div></div>"
  },
  {
    slug: "liquid-glass",
    name: "液态玻璃",
    nameEn: "Liquid Glass",
    desc: "中心清晰、边缘折光的玻璃质感，浮在内容之上。",
    meta: ["折光","白色高光","浮层"],
    verified: true,
    css: "background:linear-gradient(160deg,#202929,#3a4a4a 50%,#202929);position:relative;overflow:hidden;display:grid;place-items:center;\n.orb{position:absolute;width:56%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 34% 30%,#c9e8e0aa,#4a6b66 60%,transparent 72%);filter:blur(2px)}\n.pane{position:relative;width:66%;border-radius:18px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.5);box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 8px 22px rgb(0 0 0 / .35);backdrop-filter:blur(10px);padding:12px 14px;text-align:center}\n.pane b{font:400 clamp(11px,1.9vw,15px)/1.3 'Songti SC',Georgia,serif;color:#f3f2ed;letter-spacing:.06em}\n.pane small{display:block;margin-top:3px;font:7px/1 ui-monospace,monospace;letter-spacing:.22em;color:rgba(255,255,255,.7)}",
    html: "<div class=\"orb\"></div><div class=\"pane\"><b>液态 玻璃</b><small>0164°02′ N · 03°</small></div>"
  }
];
