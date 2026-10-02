#!/usr/bin/env node
'use strict';
/*
 * flat-block-diagram renderer: JSON spec -> flat layered-architecture SVG.
 * Pass 1 measure() computes intrinsic size, pass 2 assign() resolves final rects,
 * then shapes are emitted in tree order so panels sit behind their children.
 */
const fs = require('fs');

/* ---------- Helvetica advance widths (/1000 em), from the AFM metric tables ---------- */
const PUNCT = { ' ': 278, '!': 278, '"': 355, '#': 556, $: 556, '%': 889, '&': 667, "'": 191, '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278, ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556, '@': 1015, '[': 278, '\\': 278, ']': 278, '^': 469, _: 556, '`': 333, '{': 334, '|': 260, '}': 334, '~': 584 };
const PUNCT_B = { ' ': 278, '!': 333, '"': 478, '#': 556, $: 556, '%': 889, '&': 722, "'": 238, '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278, ':': 333, ';': 333, '<': 584, '=': 584, '>': 584, '?': 611, '@': 1015, '[': 333, '\\': 278, ']': 333, '^': 584, _: 556, '`': 333, '{': 389, '|': 280, '}': 389, '~': 584 };
const ALPHA = { A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611, a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500 };
const ALPHA_B = { A: 722, B: 722, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 556, K: 722, L: 611, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611, a: 556, b: 611, c: 556, d: 611, e: 556, f: 333, g: 611, h: 611, i: 278, j: 278, k: 556, l: 278, m: 889, n: 611, o: 611, p: 611, q: 611, r: 389, s: 556, t: 333, u: 611, v: 556, w: 778, x: 556, y: 556, z: 500 };
const MAP = Object.assign({ '0': 556, '1': 556, '2': 556, '3': 556, '4': 556, '5': 556, '6': 556, '7': 556, '8': 556, '9': 556 }, ALPHA, PUNCT);
const MAP_B = Object.assign({ '0': 556, '1': 556, '2': 556, '3': 556, '4': 556, '5': 556, '6': 556, '7': 556, '8': 556, '9': 556 }, ALPHA_B, PUNCT_B);

function charWidth(ch, bold) {
  const w = (bold ? MAP_B : MAP)[ch];
  if (w !== undefined) return w;
  const code = ch.codePointAt(0);
  if (code >= 0x2e80) return 1000;
  if (code >= 0xc0) return 600;
  return 556;
}
function textWidth(str, size, bold) {
  let u = 0;
  for (const ch of String(str)) u += charWidth(ch, bold);
  return (u * size) / 1000;
}

/* ---------- style tokens ---------- */
const TONES = {
  panel: { fill: '#EDF1F3', fg: '#000000' },
  amber: { fill: '#CC850A', fg: '#FFFFFF' },
  green: { fill: '#6B9E78', fg: '#FFFFFF' },
  dark: { fill: '#003D4F', fg: '#FFFFFF' },
  teal: { fill: '#47A1AD', fg: '#FFFFFF' },
  purple: { fill: '#634F7D', fg: '#FFFFFF' },
  lavender: { fill: '#B4A7D6', fg: '#000000' },
  slate: { fill: '#666666', fg: '#FFFFFF' },
  white: { fill: '#FFFFFF', fg: '#000000' },
  ink: { fill: '#000000', fg: '#FFFFFF' },
};

const SANS = '"Helvetica Neue", Helvetica, Arial, "Liberation Sans", "Noto Sans", "PingFang SC", "Microsoft YaHei", sans-serif';

const DEF = {
  fontFamily: SANS,
  gap: 12, pad: 8, size: 15, subRatio: 0.66, minSize: 9, lineHeight: 1.28,
  padX: 14, padY: 10, chamfer: 5, corner: 'tr', overlap: 0.5, titleRatio: 1.55,
  shadow: null, hairline: 0, strokeColor: 'rgba(0,0,0,0.08)',
  titleAlign: 'center', tracking: 0, background: '#FFFFFF',
};

/* Visual languages. `flat` is the strokeless Sketch-derived one; `apple` keeps the
   same layer semantics but re-dresses it: white cards on a gray page, generous
   radii, one soft elevation, hairline separation, SF tracking. */
const PRESETS = {
  flat: {},
  apple: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", ' + SANS,
    gap: 18, pad: 14, size: 15, subRatio: 0.68, lineHeight: 1.32,
    padX: 18, padY: 14, titleRatio: 1.75,
    shadow: 'soft', hairline: 1, titleAlign: 'left',
    tracking: -0.012, background: '#F5F5F7',
  },
};

const PRESET_TONES = {
  flat: {},
  apple: {
    panel: { fill: '#FFFFFF', fg: '#1D1D1F' },
    amber: { fill: '#FF9F0A', fg: '#FFFFFF' },
    green: { fill: '#30A46C', fg: '#FFFFFF' },
    dark: { fill: '#1D1D1F', fg: '#FFFFFF' },
    teal: { fill: '#0071E3', fg: '#FFFFFF' },
    purple: { fill: '#5E5CE6', fg: '#FFFFFF' },
    lavender: { fill: '#AEAFF0', fg: '#1D1D1F' },
    slate: { fill: '#86868B', fg: '#FFFFFF' },
    white: { fill: '#FFFFFF', fg: '#1D1D1F' },
    ink: { fill: '#1D1D1F', fg: '#FFFFFF' },
  },
};

const CONTAINER = new Set(['row', 'stack', 'grid', 'zone']);
const warn = [];
const W_ = (m) => { if (warn.length < 25) warn.push(m); };
const num = (v, f) => (typeof v === 'number' && isFinite(v) ? v : f);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const r1 = (v) => { const n = Math.round(v * 10) / 10; return Object.is(n, -0) ? 0 : n; };

function toneOf(n, theme, fallback) {
  if (n.tone) {
    const t = theme[n.tone] || TONES[n.tone];
    if (!t) W_(`unknown tone "${n.tone}"`);
    return t || theme.teal || TONES.teal;
  }
  if (n.color) return { fill: n.color, fg: n.fg || '#FFFFFF' };
  return theme[fallback] || TONES[fallback] || TONES.teal;
}

/* ---------- pass 1: intrinsic size ---------- */
function measure(n, ctx) {
  const d = ctx.def;
  const gap = num(n.gap, d.gap), pad = num(n.pad, d.pad);
  n._gap = gap; n._pad = pad;

  if (CONTAINER.has(n.kind)) {
    const kids = n.children || [];
    kids.forEach((c) => measure(c, ctx));
    /* grow children contribute nothing to intrinsic size along the main axis */
    const main = (c) => (c.grow ? 0 : n.kind === 'stack' ? c._h : c._w);
    const cross = (c) => (c.grow ? 0 : n.kind === 'stack' ? c._w : c._h);

    if (n.kind === 'row') {
      n._w = num(n.w, kids.reduce((s, c) => s + main(c), 0) + gap * Math.max(0, kids.length - 1) + pad * 2);
      n._h = num(n.h, (kids.length ? Math.max(...kids.map((c) => c._h)) : 0) + pad * 2);
    } else if (n.kind === 'stack') {
      n._w = num(n.w, (kids.length ? Math.max(...kids.map(cross)) : 0) + pad * 2);
      n._h = num(n.h, kids.reduce((s, c) => s + main(c), 0) + gap * Math.max(0, kids.length - 1) + pad * 2);
    } else if (n.kind === 'grid') {
      const cols = num(n.cols, 2), rows = Math.max(1, Math.ceil(kids.length / cols));
      const cw = kids.length ? Math.max(...kids.map((c) => c._w)) : 0;
      const ch = kids.length ? Math.max(...kids.map((c) => c._h)) : 0;
      n._cols = cols; n._rows = rows;
      n._w = num(n.w, cols * cw + gap * (cols - 1) + pad * 2);
      n._h = num(n.h, rows * ch + gap * (rows - 1) + pad * 2);
    } else {
      n._titleSize = num(n.titleSize, Math.round(d.size * 1.5));
      n._titleH = n.title ? num(n.titleH, Math.round(n._titleSize * d.titleRatio)) : 0;
      const inner = { kind: n.dir || 'stack', gap, pad: 0, children: kids, align: n.align, stretch: n.stretch, cols: n.cols };
      measure(inner, ctx);
      n._inner = inner;
      n._w = num(n.w, inner._w + pad * 2);
      n._h = num(n.h, inner._h + pad * 2 + n._titleH);
    }
    n._bx = typeof n.w === 'number' ? n.w : 0;
    n._by = typeof n.h === 'number' ? n.h : 0;
    return;
  }

  /* leaf: natural size only; fitLeaf() re-flows once the final width is known */
  const size = num(n.size, d.size);
  const lines = String(n.label == null ? '' : n.label).split('\n');
  const subLines = n.sub == null ? [] : String(n.sub).split('\n');
  const subSize = subLines.length ? num(n.subSize, Math.max(8, Math.round(size * d.subRatio))) : 0;
  Object.assign(n, { _lines: lines, _subLines: subLines, _size: size, _subSize: subSize, _padX: num(n.padX, d.padX) });
  n._w = num(n.w, Math.ceil(Math.max(widest(lines, size, !!n.bold), widest(subLines, subSize, !!n.subBold)) + n._padX * 2));
  n._h = num(n.h, Math.ceil(blockHeight(n, ctx) + num(n.padY, d.padY) * 2));
  n._bx = typeof n.w === 'number' ? n.w : 0;
  n._by = typeof n.h === 'number' ? n.h : 0;
}

function widest(lines, size, bold) {
  return lines.length ? Math.max(...lines.map((l) => textWidth(l, size, bold))) : 0;
}

function blockHeight(n, ctx) {
  const lh = ctx.def.lineHeight;
  const gap = num(n.subGap, n._size * 0.3);
  return n._lines.length * n._size * lh + (n._subLines.length ? gap + n._subLines.length * n._subSize * lh : 0);
}

/* shrink-to-fit / word-wrap against the width the layout actually gave this box */
function fitLeaf(n, w, ctx) {
  const d = ctx.def, bold = !!n.bold;
  const avail = w - n._padX * 2;
  let lines = String(n.label == null ? '' : n.label).split('\n');
  let size = num(n.size, d.size);
  if (avail <= 0) { Object.assign(n, { _lines: lines, _size: size, _subSize: 0, _blockH: 0 }); return; }
  if (n.wrap && widest(lines, size, bold) > avail) lines = lines.flatMap((l) => wrapWords(l, avail, size, bold));
  while (size > d.minSize && widest(lines, size, bold) > avail) size -= 0.5;
  let subLines = n.sub == null ? [] : String(n.sub).split('\n');
  let subSize = subLines.length ? num(n.subSize, Math.max(8, Math.round(size * d.subRatio))) : 0;
  if (n.wrap && widest(subLines, subSize, !!n.subBold) > avail) subLines = wrapWords(n.sub, avail, subSize, !!n.subBold);
  while (subSize > 7 && widest(subLines, subSize, !!n.subBold) > avail) subSize -= 0.5;
  if (widest(lines, size, bold) > avail) W_(`label too wide for its ${Math.round(w)}px box at ${d.minSize}px: "${n.label}"`);
  else if (widest(subLines, subSize, !!n.subBold) > avail) W_(`sub too wide for its ${Math.round(w)}px box at 7px: "${n.sub}"`);
  Object.assign(n, { _lines: lines, _subLines: subLines, _size: size, _subSize: subSize });
  n._blockH = blockHeight(n, ctx);
}

function wrapWords(line, maxW, size, bold) {
  const out = []; let cur = '';
  for (const word of String(line).split(/\s+/)) {
    const t = cur ? cur + ' ' + word : word;
    if (cur && textWidth(t, size, bold) > maxW) { out.push(cur); cur = word; } else cur = t;
  }
  if (cur) out.push(cur);
  return out.length ? out : [''];
}

/* ---------- pass 2: final rects ---------- */
function assign(n, x, y, w, h, ctx) {
  if (![x, y, w, h].every(Number.isFinite)) {
    throw new Error(`non-finite geometry at "${n.id || n.label || n.title || n.kind}" — the spec is unsolvable`);
  }
  if (n.shift) { x += num(n.shift[0], 0); y += num(n.shift[1], 0); }
  n.x = x; n.y = y; n.w = Math.max(0, w); n.h = Math.max(0, h);
  if (n.id) ctx.anchors[n.id] = n;

  if (CONTAINER.has(n.kind)) {
    if (n.kind === 'zone') {
      ctx.shapes.push({ n, x, y, w, h, fill: n._fill, op: n.opacity });
      if (n.title) {
        const al = n.titleAlign || ctx.def.titleAlign;
        const ta = { left: 'start', center: 'middle', right: 'end' }[al] || al;
        ctx.texts.push({ cx: x + w / 2, left: x + n._pad, right: x + w - n._pad, ta, b: y + n._pad + n._titleSize * 0.95, s: n.title, size: n._titleSize, bold: !!n.titleBold, fill: n._fg });
      }
      const inner = n._inner;
      const iy = y + n._pad + n._titleH;
      layout(inner, x, iy, w, Math.max(0, h - n._pad * 2 - n._titleH), ctx);
      return;
    }
    layout(n, x, y, w, h, ctx);
    return;
  }
  if (w < 1 || h < 1) { W_(`box collapsed to ${Math.round(w)}x${Math.round(h)}: "${n.label}" — parent has no room`); return; }
  fitLeaf(n, w, ctx);
  if (n._blockH > h + 1) W_(`label taller than its box: "${n.label}" (needs ${Math.ceil(n._blockH)}px, has ${Math.round(h)}px)`);
  ctx.shapes.push({ n, x, y, w, h, fill: n._fill, op: n.opacity });
  leafText(n, ctx);
}

function layout(c, x, y, w, h, ctx) {
  const kids = c.children || [];
  if (!kids.length) return;
  const gap = c._gap, pad = c._pad, stretch = c.stretch !== false;
  const ix = x + pad, iy = y + pad, iw = w - pad * 2, ih = h - pad * 2;

  if (c.kind === 'grid') {
    const cols = c._cols, rows = c._rows;
    const cw = (iw - gap * (cols - 1)) / cols, ch = (ih - gap * (rows - 1)) / rows;
    kids.forEach((k, i) => assign(k, ix + (i % cols) * (cw + gap), iy + Math.floor(i / cols) * (ch + gap), cw, ch, ctx));
    return;
  }
  const growTotal = kids.reduce((s, k) => s + (k.grow || 0), 0);

  if (c.kind === 'row') {
    const basis = (k) => (k.grow ? num(k._bx, 0) : k._w);
    const fixedSum = kids.reduce((s, k) => s + basis(k), 0);
    const free = Math.max(0, iw - fixedSum - gap * (kids.length - 1));
    let cx = ix;
    for (const k of kids) {
      const kw = basis(k) + (k.grow && growTotal && free > 0 ? (k.grow / growTotal) * free : 0);
      const kh = stretch ? ih : k._h;
      const ky = stretch ? iy : iy + (c.align === 'center' ? (ih - kh) / 2 : c.align === 'end' ? ih - kh : 0);
      assign(k, cx, ky, kw, kh, ctx);
      cx += kw + gap;
    }
  } else {
    const basis = (k) => (k.grow ? num(k._by, 0) : k._h);
    const fixedSum = kids.reduce((s, k) => s + basis(k), 0);
    const free = Math.max(0, ih - fixedSum - gap * (kids.length - 1));
    let cy = iy;
    for (const k of kids) {
      const kh = basis(k) + (k.grow && growTotal && free > 0 ? (k.grow / growTotal) * free : 0);
      const kw = stretch ? iw : k._w;
      const kx = stretch ? ix : ix + (c.align === 'center' ? (iw - kw) / 2 : c.align === 'end' ? iw - kw : 0);
      assign(k, kx, cy, kw, kh, ctx);
      cy += kh + gap;
    }
  }
}

/* ---------- tabs that straddle the edge of another block ---------- */
function placeFloats(ctx, def) {
  for (const f of ctx.floats) {
    const a = ctx.anchors[f.anchor];
    if (!a) { W_(`anchor "${f.anchor}" not found`); f.x = 0; f.y = 0; continue; }
    const dx = num(f.dx, 0), dy = num(f.dy, 0), ov = num(f.overlap, def.overlap);
    if (f.side === 'bottom') { f.x = a.x + dx; f.y = a.y + a.h - f._h * ov; }
    else if (f.side === 'top') { f.x = a.x + dx; f.y = a.y - f._h * (1 - ov); }
    else if (f.side === 'left') { f.x = a.x - f._w * (1 - ov); f.y = a.y + dy; }
    else { f.x = a.x + a.w - f._w * ov; f.y = a.y + dy; }
    f.w = f._w; f.h = f._h;
    fitLeaf(f, f._w, ctx);
    ctx.shapes.push({ n: f, x: f.x, y: f.y, w: f.w, h: f.h, fill: f._fill, op: f.opacity });
    leafText(f, ctx);
  }
}

function leafText(n, ctx) {
  if (!n._lines) return;
  const lh = ctx.def.lineHeight, cx = n.x + n.w / 2;
  const top = n.y + (n.h - n._blockH) / 2;
  const put = (ls, i, size, fill, bold) => ctx.texts.push({ cx, b: top + (i + 0.5) * size * lh + size * 0.36, s: ls, size, fill, bold });
  n._lines.forEach((l, i) => put(l, i, n._size, n._fg, !!n.bold));
  if (n._subLines.length) {
    const st = top + n._lines.length * n._size * lh + num(n.subGap, n._size * 0.3);
    n._subLines.forEach((l, i) => {
      const b = st + (i + 0.5) * n._subSize * lh + n._subSize * 0.36;
      ctx.texts.push({ cx, b, s: l, size: n._subSize, fill: n.subFg || n._fg, bold: !!n.subBold });
    });
  }
}

function tabPoints(x, y, w, h, c, corner) {
  c = Math.max(0, Math.min(c, w / 2, h / 2));
  const P = {
    tr: [[x, y], [x + w - c, y], [x + w, y + c], [x + w, y + h], [x, y + h]],
    tl: [[x + c, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y + c]],
    br: [[x, y], [x + w, y], [x + w, y + h - c], [x + w - c, y + h], [x, y + h]],
    bl: [[x, y], [x + w, y], [x + w, y + h], [x + c, y + h], [x, y + h - c]],
  };
  return (P[corner] || P.tr).map((p) => `${r1(p[0])} ${r1(p[1])}`).join(' ');
}

/* Invariants. Two shapes may be disjoint or strictly nested (a panel and its
   children) — anything in between is an overlap and is reported. */
function checkOverlaps(ctx, loud) {
  const EPS = 0.5;
  const s = ctx.shapes;
  const hits = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      const a = s[i], b = s[j];
      const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      const iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      if (ix <= EPS || iy <= EPS) continue;
      const contains = (p, q) => p.x <= q.x + EPS && p.y <= q.y + EPS &&
        p.x + p.w >= q.x + q.w - EPS && p.y + p.h >= q.y + q.h - EPS;
      if (contains(a, b) || contains(b, a)) continue;
      hits.push({ a: labelOf(a.n), b: labelOf(b.n), area: Math.round(ix * iy) });
    }
  }
  hits.sort((p, q) => q.area - p.area);
  if (loud) {
    for (const h of hits.slice(0, 12)) W_(`OVERLAP ${h.area}px² between "${h.a}" and "${h.b}"`);
    if (hits.length > 12) W_(`...and ${hits.length - 12} more overlapping pairs`);
  }
  return hits;
}
function labelOf(n) { return String(n.id || n.label || n.title || n.kind).split('\n')[0]; }

/* ---------- main ---------- */
function render(spec) {
  const presetName = spec.preset || 'flat';
  const preset = PRESETS[presetName] || (W_(`unknown preset "${presetName}", using flat`), PRESETS.flat);
  const theme = Object.assign({}, TONES, PRESET_TONES[presetName] || {}, spec.theme || {});
  const def = Object.assign({}, DEF, preset, spec.style || {});
  const root = spec.root;
  if (!root) throw new Error('spec.root is required');
  const ctx = { def, anchors: {}, floats: [], shapes: [], texts: [], needsShadow: false };

  const prep = (n) => {
    n.kind = n.kind || (n.children ? 'stack' : 'box');
    if (n.anchor && !n.shape) n.shape = 'tab';
    const t = toneOf(n, theme, n.kind === 'zone' ? 'panel' : n.anchor ? 'purple' : def.boxTone);
    n._fill = t.fill;
    n._fg = n.fg || t.fg;
    if (n.anchor) ctx.floats.push(n);
    n.children = (n.children || []).filter((c) => { prep(c); return !c.anchor; });
  };
  prep(root);
  (spec.floats || []).forEach(prep);
  measure(root, ctx);
  ctx.floats.forEach((f) => measure(f, ctx));

  const pad = num(spec.canvasPad, 0);
  const hasW = typeof spec.width === 'number', hasH = typeof spec.height === 'number';
  const innerW = hasW ? spec.width - pad * 2 : root._w;
  const innerH = hasH ? spec.height - pad * 2 : root._h;
  if (root._w > innerW) W_(`intrinsic width ${root._w} exceeds canvas ${innerW}; content will overflow`);
  if (root._h > innerH) W_(`intrinsic height ${root._h} exceeds canvas ${innerH}; content will overflow`);
  assign(root, pad, pad, innerW, innerH, ctx);
  placeFloats(ctx, def);
  const hits = checkOverlaps(ctx, !spec.allowOverlap);

  const right = Math.max(0, ...ctx.shapes.map((s) => s.x + s.w));
  const bottom = Math.max(0, ...ctx.shapes.map((s) => s.y + s.h));
  const cw = Math.ceil(hasW ? spec.width : right + pad);
  const chh = Math.ceil(hasH ? spec.height : bottom + pad);

  const isLight = (hex) => {
    const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return false;
    let h = m[1];
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h, 16);
    const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.72;
  };
  const lit = (n) => n.shadow === true || (n.shadow === undefined && !!def.shadow && n.kind === 'zone');
  ctx.needsShadow = !!def.shadow && ctx.shapes.some((s) => lit(s.n));
  const shapeSvg = (s) => {
    const raw = s.n.id || s.n.label || s.n.title;
    const at = raw ? ` id="${esc(String(raw).replace(/[^\w.+-]+/g, '-').slice(0, 40))}"` : '';
    const bits = [`fill="${s.fill}"`];
    if (s.op != null) bits.push(`fill-opacity="${s.op}"`);
    const edge = num(s.n.hairline, def.hairline);
    if (edge && isLight(s.fill)) bits.push(`stroke="${s.n.strokeColor || def.strokeColor}" stroke-width="${edge}"`);
    if (lit(s.n)) bits.push(`filter="url(#fbd-${def.shadow})"`);
    const a = bits.join(' ');
    return s.n.shape === 'tab'
      ? `<polygon${at} ${a} points="${tabPoints(s.x, s.y, s.w, s.h, num(s.n.chamfer, def.chamfer), s.n.corner || def.corner)}"/>`
      : `<rect${at} ${a} x="${r1(s.x)}" y="${r1(s.y)}" width="${r1(s.w)}" height="${r1(s.h)}"/>`;
  };
  const textSvg = (t) => {
    const anchor = t.ta || 'middle';
    const x = anchor === 'start' ? t.left : anchor === 'end' ? t.right : t.cx;
    return `<text x="${r1(x)}" y="${r1(t.b)}" font-family="${esc(def.fontFamily)}" font-size="${r1(t.size)}"${t.bold ? ' font-weight="bold"' : ''}${def.tracking ? ` letter-spacing="${def.tracking}em"` : ''} fill="${t.fill}" text-anchor="${anchor}">${esc(t.s)}</text>`;
  };

  const defs = ctx.needsShadow
    ? `  <defs>\n    <filter id="fbd-${def.shadow}" x="-30%" y="-30%" width="160%" height="180%">\n` +
      `      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.08"/>\n` +
      `    </filter>\n  </defs>\n`
    : '';

  const svg =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${cw}" height="${chh}" viewBox="0 0 ${cw} ${chh}">\n` +
    (spec.title ? `  <title>${esc(spec.title)}</title>\n` : '') +
    `  <desc>flat-block-diagram preset=${presetName}</desc>\n` +
    defs +
    (spec.background === 'none' ? '' : `  <rect width="100%" height="100%" fill="${spec.background || def.background}"/>\n`) +
    ctx.shapes.map((s) => '  ' + shapeSvg(s)).join('\n') + '\n' +
    ctx.texts.map((t) => '  ' + textSvg(t)).join('\n') + '\n</svg>\n';

  return { svg, width: cw, height: chh, shapes: ctx.shapes.length, texts: ctx.texts.length, overlaps: hits.length, waived: !!spec.allowOverlap };
}

/* ---------- CLI ---------- */
if (require.main === module) {
  const argv = process.argv.slice(2);
  const flags = {}; const pos = [];
  const VAL = { '-o': 'out', '--out': 'out', '--png': 'png', '--scale': 'scale', '--preset': 'preset' };
  const USAGE = 'usage: node render.cjs <spec.json> [-o out.svg] [--png out.png] [--scale 2] [--preset flat|apple]';
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (VAL[a]) flags[VAL[a]] = argv[++i];
    else if (a === '--help' || a === '-h') { console.log(USAGE); process.exit(0); }
    else if (a.startsWith('-')) flags[a.replace(/^--/, '')] = true;
    else pos.push(a);
  }
  if (!pos.length) { console.log(USAGE); process.exit(1); }
  const specPath = pos[0];
  let res;
  try {
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    if (flags.preset) spec.preset = flags.preset;
    res = render(spec);
  } catch (e) { console.log('FAIL  ' + e.message); process.exit(1); }
  const outPath = flags.out || specPath.replace(/\.(json|json5)$/, '') + '.svg';
  fs.writeFileSync(outPath, res.svg);
  console.log(`OK  ${outPath}  ${res.width}x${res.height}  shapes=${res.shapes} texts=${res.texts} overlaps=${res.overlaps}${res.waived ? ' (waived)' : ''}`);
  if (flags.png) {
    try {
      const { Resvg } = require('@resvg/resvg-js');
      const r = new Resvg(res.svg, { fitTo: { mode: 'scale', value: Number(flags.scale || 2) }, background: 'white' });
      fs.writeFileSync(flags.png, r.render().asPng());
      console.log(`OK  ${flags.png}`);
    } catch (e) {
      console.log(e.code === 'MODULE_NOT_FOUND' ? 'SKIP png: run `npm i @resvg/resvg-js` to enable raster preview' : 'SKIP png: ' + e.message);
    }
  }
  if (warn.length) console.log('WARN\n  ' + warn.join('\n  '));
  if (res.overlaps && !res.waived) {
    console.log(`BLOCKED  ${res.overlaps} overlapping pair(s). Shapes must be disjoint or strictly nested —` +
      ` separate them, or set "allowOverlap": true to waive the gate.`);
    process.exitCode = 1;
  }
}

module.exports = { render, TONES, textWidth };