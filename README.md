# Soda 的智能体技能库

这里收录可独立安装的智能体技能。每项技能都有自己的目录；本页是总目录，具体用法和维护说明请查阅各技能的文档。

## 技能目录

| 技能 | 用途 | 文档 |
| --- | --- | --- |
| [flat-block-diagram](flat-block-diagram/) | 生成可编辑的 SVG 分层软件架构图。 | [技能说明](flat-block-diagram/SKILL.md) |
| [threejs-pixel-3d](threejs-pixel-3d/) | 用 Three.js 渲染像素风三维场景。 | [技能说明](threejs-pixel-3d/SKILL.md) |
| [ui-style-library](ui-style-library/) | 帮助用户选择、复现和添加界面风格。 | [使用说明](ui-style-library/README.md) · [智能体交接说明](ui-style-library/agent.md) · [技能说明](ui-style-library/SKILL.md) |

## 安装方式

将所需技能的整个目录放入智能体工具的技能搜索路径，然后重新加载技能或开启新会话。`SKILL.md` 是工具加载技能的入口；如目录内有 `agent.md`，它是给接手维护的智能体看的交接说明。
