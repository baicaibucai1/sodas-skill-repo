# UI 风格库

给界面制作加一层「先选风格、再动手」的编排。风格内容本身来自 [StyleKit](https://www.stylekit.top/zh/styles)（151 种，MIT），本 Skill 只负责：按 slug 找到并读取规范、把选择锁定到项目、在用户确认后补充本地风格、交付前按规范验收。

## 安装与使用

把整个 `ui-style-library` 目录放进宿主的 Skill 搜索路径，重新开启会话。宿主必须发现并加载 [SKILL.md](SKILL.md) 后，Agent 才会在新建界面时先询问风格。也可以直接说「用 StyleKit 的 `neo-brutalist` 做一个落地页」。

## 离线预览

- [单文件画廊](gallery-standalone.html)（推荐）：**一个文件，封面已内嵌**，下载后双击即可，不需要旁边的 `data/` 目录。适合单独发给别人或放进预览器。
- [画廊（相对路径版）](gallery.html)：体积小，但必须连同 `data/covers/` 一起复制。适合随整个 Skill 分发。
- [目录快照](data/catalog.json)：151 条风格的名称、说明、类型、场景、标签与配色。

> 若打开后仍是空白：多是预览器禁止了页面脚本或屏蔽了相对路径。用 `gallery-standalone.html`，或直接用浏览器打开本地文件。

## 常用命令

```sh
node scripts/catalog.mjs list --query 后台
node scripts/catalog.mjs list --type layout --limit 8
node scripts/catalog.mjs validate --project /path/to/project
```

`list` 检索目录与项目私有条目，`validate` 检查格式和 slug 冲突。两者都不联网、不写文件。需要刷新上游目录时运行 `node scripts/sync-catalog.mjs`。

## 添加本地风格

StyleKit 没有的风格，可以让 Agent 从网址、截图或本地样本提炼；**确认后**写入目标项目的 `.ui-styles/<slug>/`，供该项目后续会话使用。格式见 [清单约定](references/catalog.md)。

素材来源与许可见 [data/NOTICE.md](data/NOTICE.md)。维护本目录的 Agent 先看 [agent.md](agent.md)。
