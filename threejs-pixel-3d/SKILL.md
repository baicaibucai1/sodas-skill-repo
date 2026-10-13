---
name: threejs-pixel-3d
description: Render pixel-art-style 3D with three.js by drawing the scene into a low-resolution WebGLRenderTarget and upscaling to the screen with NearestFilter, plus a block-uniformity A/B regression that proves the pixel structure is real. Use when asked for 像素风 3D / 像素风格 three.js / retro 3D / low-poly pixel look / 3D 像素画 / PS1-style rendering / voxel-ish chunky 3D, or when a three.js scene looks too smooth and needs 像素感. Also covers loading three.js in restricted environments (file:// double-click, Tauri asset:// iframe) where relative paths and ES modules break. Not for 2D pixel art / sprite work, shader-heavy demoscene effects, or posterization-only looks.
---

# three.js Pixel-Style 3D

Two render passes turn any three.js scene into pixel art. No plugins, no shaders.

## 1 · The recipe

1. Create a **small** `WebGLRenderTarget` (e.g. 250x203 for a 1000x812 canvas).
2. Pass 1: render the scene **into the render target**.
3. Pass 2: render a **fullscreen quad** textured with the target to the screen, with
   `NearestFilter` on the texture so every target texel becomes one solid screen block.

```js
var rt = new THREE.WebGLRenderTarget(rtW, rtH, {
  minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat, depthBuffer: true,
});
rt.texture.generateMipmaps = false;

var quadScene = new THREE.Scene();
var quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
quadScene.add(new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.MeshBasicMaterial({ map: rt.texture })
));

function renderFrame() {
  renderer.setRenderTarget(rt);
  renderer.render(scene, camera);          // pass 1: low-res
  renderer.setRenderTarget(null);
  renderer.render(quadScene, quadCam);     // pass 2: nearest upscale
}
```

## 2 · Settings that make or break the look

| setting | value | why |
|---|---|---|
| `antialias` | `false` | MSAA smears block edges; pixel art needs hard edges |
| `setPixelRatio` | `1` | let the block be the pixel, not the renderer |
| block size | `rt.setSize(canvasW / n, canvasH / n)` | `n` = screen pixels per texel; 4/6/8 are the useful range |
| geometry | `flatShading: true`, low-poly | facets read as deliberate pixels, not smooth junk |
| palette | 6-10 colors | a tight palette sells the retro look more than resolution does |
| mipmaps | `generateMipmaps = false` | mipmapped minification re-blurs the blocks |

Offer a scale toggle (keys `1/2/3` = 4x/6x/8x, `0` = pixelation off). The off state
is the A/B control the verification below needs, and users love seeing it.

## 3 · Verify it — block uniformity, not color runs

A claim of "it looks pixelated" must be measured. Copy `scripts/pixel-template.html`
(next to a `three.min.js`), put `three@0.159.0/build/three.min.js` beside it, then run
`node scripts/verify-pixel.mjs <path-to-template>`.

The metric: read the full-screen framebuffer, group pixels into `block x block`
aligned groups, count how many groups are a single solid color.

- **Pixelated (nearest upscale): expect ~100%** — every screen block is exactly one texel.
- **Full-resolution control: expect clearly below 100%** — 1px edges (grid lines,
  silhouettes) break blocks. Measured on the reference scene: 100% vs 82.4%.

Two traps, both hit in practice:

- **Do NOT use scanline color-run counts as the control.** A flat-shaded low-poly
  scene has huge solid areas even at full resolution, so runs stay low and the
  control silently passes/fails for the wrong reason. Run counts are only good for
  the upper-bound assertion (`runs <= rtW * 1.25`) and "bigger blocks, fewer runs".
- Read pixels **in the same task as the render** (`gl.readPixels` right after the
  final `render` call) — the drawing buffer is gone after compositing.

## 4 · Loading three.js in restricted environments

The template's `assetBase()` string trick loads `three.min.js` as a classic script,
which works under `file://`, `http(s)://`, **and** Tauri's `asset://`:

```js
function assetBase() {
  var h = location.href;
  var i = Math.max(h.lastIndexOf("/"), h.lastIndexOf("%5C"), h.lastIndexOf("%5c"));
  if (i < 0) return "";
  return h.slice(0, i + (h.charAt(i) === "/" ? 1 : 3));   // %5C is three chars
}
```

Version strategy (pick per environment):

| three version | shape | `file://` | `asset://` (Tauri iframe) | `http(s)://` |
|---|---|---|---|---|
| <= r159 | `three.min.js` UMD | yes | yes | yes |
| r160-r166 | `three.module.min.js` single-file ESM | **no** (module CORS) | yes (`import(base + name)`) | yes |
| >= r167 | ESM + `three.core.min.js`, relative import | no | **no** (relative import resolves to site root) | yes |

Why the trick exists: under Tauri's asset protocol the tool URL looks like
`http://asset.localhost/C%3A%5C...%5Cindex.html` — every slash in the path is
percent-encoded, so `<script src="three.min.js">` and even `new URL(rel, base)`
resolve to the site root (404). The last `%5C` before the filename is the only
usable cut point. In a plain Tauri app's main window the frontend is served with
normal paths, so a relative `<script src>` just works.

Embedding in a host app iframe (e.g. the todo-workbench tool system): keep the
`bindState` four-state machine (`booting / bound / standalone / error`, 1200 ms
timeout, `parent === window` as the standalone signal), mark host-only controls
`data-host-only`, and prefix localStorage keys with the tool id.

## 5 · Known limits

- Nearest upscale is all-or-nothing per texel — no sub-block detail. If the art
  needs fine strokes, raise the target resolution instead of the block size.
- The two-pass pipeline costs one extra fullscreen blit; irrelevant at these sizes.
- `WebGLRenderTarget` + `readRenderTargetPixels` needs `preserveDrawingBuffer`
  semantics handled by reading in-task (see §3).

## Files

- `scripts/pixel-template.html` — materialized template: pipeline, diorama scene,
  scale keys, and the `__pixel3d` probe hooks the verifier drives.
- `scripts/verify-pixel.mjs` — the block-uniformity A/B regression.
