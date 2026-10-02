# Soda's skill repo

My personal agent skill library. Nothing here is Qoder-specific.
Each skill lives in its own directory as a `SKILL.md` plus optional `scripts/`, which is
the layout any agent that reads the `SKILL.md` convention expects, and every `SKILL.md`
is written to be self-contained enough to carry alone.

## Install

Copy a skill directory into whichever path your agent reads:

| agent | user-wide | per-project |
|---|---|---|
| Qoder | `~/.qoder/skills/<skill>/` | `<project>/.qoder/skills/<skill>/` |
| Claude Code | `~/.claude/skills/<skill>/` | `<project>/.claude/skills/<skill>/` |
| anything else | wherever it looks for a `SKILL.md` | — |

Restart the session (in Qoder, `/skills reload` also works) and invoke the skill by name.

The directory is the whole install: `SKILL.md` is the instruction, `scripts/` are the
tools it tells the agent to run. No package manager, no build step.

## Skills

| skill | what it does | version |
|---|---|---|
| [flat-block-diagram](flat-block-diagram/SKILL.md) | layered software-architecture diagrams as editable SVG from a JSON spec | 1.0 |

### [flat-block-diagram](flat-block-diagram/SKILL.md)

Layered software-architecture diagrams as editable SVG, generated from a JSON spec.
Two visual languages over one set of layer semantics:

- **`flat`** — strokeless hard-edged color blocks, light-gray zone panels, amber
  legacy rail, chamfered purple interface badges. Derived from a Sketch 62 export
  that I reverse-engineered shape by shape (36 rectangles + 2 chamfered pentagons,
  zero strokes, zero radii, zero connectors).
- **`apple`** — white cards on `#F5F5F7`, one soft elevation on panels only,
  hairline edges, left-aligned headings, SF Pro with negative tracking.

Switch with `--preset`; the same spec renders in both.

**Non-negotiables the renderer enforces:**

- Every corner is square. No `rx`, no pills.
- No two shapes may partially intersect — a pair is either disjoint or strictly
  nested. Violations print the overlap area per pair and exit non-zero.
- Text that does not fit its box is reported, never silently clipped or shrunk past
  9px. A clean run (`overlaps=0`, no `WARN`) is the acceptance gate.

**The point of the style** is that vertical position encodes abstraction depth and
horizontal span encodes how much a thing underlies. `SKILL.md` opens with a
structure gate for exactly that reason: a diagram that lists files instead of
layering them is wrong no matter how tidy it looks.

```
flat-block-diagram/
├── SKILL.md              # self-contained skill; renderer is embedded as Appendix A
└── scripts/
    ├── render.cjs        # byte-identical to Appendix A
    └── example.json      # byte-identical to Appendix B; regression fixture
```

Verify an install:

```bash
node scripts/render.cjs scripts/example.json
# OK  ...  894x357  shapes=30 texts=36 overlaps=8 (waived)
```

`example.json` reproduces the original reference faithfully, and that reference
genuinely overlaps — hence the waiver. It is the only sanctioned use of
`allowOverlap`. Raster preview needs an optional dep: `npm i @resvg/resvg-js`, then
add `--png out.png`.

## Status

| skill | version | working |
|---|---|---|
| flat-block-diagram | 1.0 | yes — used on real repos, 3 latent layout bugs found and fixed in the process |
