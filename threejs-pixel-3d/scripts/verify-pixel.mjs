#!/usr/bin/env node
/**
 * 像素风 3D 回归：块均匀度 A/B。
 *
 * 用法：node verify-pixel.mjs <pixel-template.html 的路径>
 *   （默认 ./pixel-template.html，需与 three.min.js 同目录）
 *
 * 依赖 playwright（npm i -D playwright）。浏览器优先本机 Edge
 * （与 Tauri 的 WebView2 同源），没有则退回 playwright 自带 chromium。
 *
 * 判据（见 SKILL.md §3）：
 *   · 像素化（4×）：4×4 对齐块几乎块块纯色（≥99%）
 *   · 全分辨率对照：同样多的块明显不再纯色（<99%）—— 证明块结构来自管线而非场景
 *   · 扫描线颜色段数 ≤ rt 宽度 × 1.25（最近邻放大的上界）
 *   · 块越大段数越少（8× 的段数 < 4× 的段数）
 */

import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("缺少 playwright：先 npm i -D playwright（并 npx playwright install chromium，或用本机 Edge）");
  process.exit(2);
}

const arg = process.argv[2] || "./pixel-template.html";
const target = path.resolve(arg);
const url = pathToFileURL(target).href;

let passed = 0, failed = 0;
const failures = [];
function check(name, cond, detail = "") {
  if (cond) { passed++; console.log(`  PASS  ${name}`); }
  else { failed++; failures.push(`${name}${detail ? ` — ${detail}` : ""}`); console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`); }
}
function info(label, v) { console.log(`    · ${label}: ${typeof v === "string" ? v : JSON.stringify(v)}`); }
function section(t) { console.log(`\n${t}`); }

async function launch() {
  try {
    return await chromium.launch({ channel: "msedge" });
  } catch {
    return await chromium.launch();
  }
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });

const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(url, { waitUntil: "load" });
await page.waitForFunction(() => !!window.__pixel3d, null, { timeout: 20000 });
info("打开", url);

const demo = () => page.evaluate(() => {
  const d = window.__pixel3d;
  return { frames: d.frames, rtW: d.rtW, rtH: d.rtH, scale: d.scale, canvasW: d.canvasW, canvasH: d.canvasH, nearestOK: d.nearestOK, webgl: d.webgl };
});

section("three.js 与 WebGL");
check("全局 THREE 就位", await page.evaluate(() => !!window.THREE && typeof window.THREE.WebGLRenderer === "function"));
check("canvas 已挂进 #stage", await page.evaluate(() => !!document.querySelector("#stage canvas")));
const d0 = await demo();
info("初始状态", d0);
check("WebGL 上下文创建成功", d0.webgl === true);
check("渲染循环在跑", d0.frames > 0);
await page.waitForTimeout(250);
check("帧数持续增长", (await demo()).frames > d0.frames);

section("像素风管线参数");
check("渲染目标是低分辨率（约为画布的 1/4）", d0.rtW === Math.round(d0.canvasW / 4) && d0.rtH === Math.round(d0.canvasH / 4), `rt ${d0.rtW}×${d0.rtH} vs 画布 ${d0.canvasW}×${d0.canvasH}`);
check("块大小 4×", d0.scale === 4);
check("过滤方式是最近邻（NearestFilter）", d0.nearestOK === true);

section("画面内容与像素感（核心证据）");
const content = await page.evaluate(() => window.__pixel3d.rtContent());
info("rt 内容", content);
check("低分辨率画面真的画出了东西（颜色数远大于 1）", content.colors > 8, `colors=${content.colors}`);

const pix = await page.evaluate(() => window.__pixel3d.probe());
const pixU = await page.evaluate(() => window.__pixel3d.blockUniformity(4));
info("像素化（4×）", { probe: pix, uniformity: pixU });
check("★ 像素化下 4×4 块几乎块块纯色", pixU.ratio >= 0.99, `均匀度 ${(pixU.ratio * 100).toFixed(2)}%`);
check("扫描线颜色段数 ≤ rt 宽度 × 1.25（最近邻放大的上界）", pix.maxRuns <= pix.rtW * 1.25 && pix.maxRuns > 4, `maxRuns=${pix.maxRuns}, rtW=${pix.rtW}`);

await page.evaluate(() => window.__pixel3d.setScale(1));
await page.waitForTimeout(200);
const rawU = await page.evaluate(() => window.__pixel3d.blockUniformity(4));
info("全分辨率（对照）块均匀度", rawU);
check("对照组：全分辨率下 4×4 块不再块块纯色（画面是连续的）", rawU.ratio < 0.99 && pixU.ratio > rawU.ratio, `均匀度 ${(pixU.ratio * 100).toFixed(2)}% → ${(rawU.ratio * 100).toFixed(2)}%`);

await page.evaluate(() => window.__pixel3d.setScale(8));
await page.waitForTimeout(200);
const big = await page.evaluate(() => window.__pixel3d.probe());
info("像素化（8×）扫描线", big);
check("块越大段数越少（8× 的段数 < 4× 的段数）", big.maxRuns < pix.maxRuns, `${big.maxRuns} < ${pix.maxRuns}`);

section("零报错");
check("全程没有 pageerror / console.error", errors.length === 0, errors.slice(0, 3).join(" | "));

console.log(`\n${"=".repeat(46)}`);
console.log(`通过 ${passed} 项，失败 ${failed} 项`);
if (failures.length) { console.log("失败项："); failures.forEach((f) => console.log("  · " + f)); }
await browser.close();
process.exit(failed ? 1 : 0);
