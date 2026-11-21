# Soda's skill repo

Independent Agent Skills. Each skill lives in its own directory. This README is the repository index; use each directory's documentation for setup and maintenance.

| Skill | What it does | Documentation |
| --- | --- | --- |
| [flat-block-diagram](flat-block-diagram/) | Generates layered software architecture diagrams as editable SVG. | [Skill instructions](flat-block-diagram/SKILL.md) |
| [threejs-pixel-3d](threejs-pixel-3d/) | Renders pixel-art-style 3D scenes with Three.js. | [Skill instructions](threejs-pixel-3d/SKILL.md) |
| [ui-style-library](ui-style-library/) | Helps users select, reproduce, and add UI styles. | [README](ui-style-library/README.md) · [Agent handoff](ui-style-library/agent.md) · [Skill instructions](ui-style-library/SKILL.md) |

To install a skill, place its full directory in the host's skill search path and reload or restart the session. `SKILL.md` is the host-facing entry point; `agent.md`, where provided, is a maintenance handoff for other agents.
