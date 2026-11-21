# Agent handoff: UI Style Library

- To use this skill in a UI task, load [SKILL.md](SKILL.md). This file is a maintenance guide, not a substitute for the skill or a guarantee of automatic loading.
- [README.md](README.md) is the user-facing entry. Keep the repository root README a catalog; keep this skill's setup and examples here.
- [Catalog format](references/catalog.md) defines built-in and project-local style manifests. The directory layout is the index; do not create a duplicate registry.
- [极简主义 1.0.0](styles/minimalism/1.0.0/guide.md) is the existing baseline. Keep published versions intact. To change the visual contract, add a version and update the local README. Keep the demo's inline CSS and the reusable CSS synchronized in the new version.
- Do not save user references before confirmation or publish project-local assets without authorization. The demo uses fictional data, not production integrations.
- Before publishing, run `node scripts/catalog.mjs validate` and `node scripts/catalog.mjs list` from this directory. For demo changes, verify desktop and narrow layouts and the affected interactions in a browser.
