# Agent handoff: UI Style Library

- To use this skill in a UI task, load [SKILL.md](SKILL.md). This file is maintenance guidance; it does not replace the skill or guarantee automatic loading.
- Positioning: StyleKit is the content source. This repo holds only orchestration, a catalog snapshot, and a gallery prototype. Do not reintroduce copied style bodies, component recipes, or prompts; reference upstream by slug.
- `styles/` was removed on purpose. Project additions live in a target's `.ui-styles/<slug>/`, not in this repo. If a local style is genuinely needed for every project, confirm with the user before adding it here.
- [data/NOTICE.md](data/NOTICE.md) records source and MIT attribution. Keep it accurate whenever `scripts/sync-catalog.mjs` refreshes `data/catalog.json` and `data/covers/`.
- [gallery.html](gallery.html) is a prototype, not a spec: it embeds `data/catalog.json` between `/*__CATALOG__*/` and the final semicolon, and pre-renders the first 24 cards into static HTML so the page is not blank when scripts are blocked. After syncing the catalog, re-inject the JSON and regenerate the static cards, then rebuild `gallery-standalone.html` (same page with every cover inlined as a base64 data URI). Check search, filters, favorites, sheet, load-more, and 360px layout in a browser after changes.
- Before publishing, run `node scripts/catalog.mjs validate` and `node scripts/catalog.mjs list --limit 3`. Report what you actually ran; do not claim upstream content is verified unless it was fetched.
- Never push to a remote or change a project's `.ui-style.json` without the user's request.
