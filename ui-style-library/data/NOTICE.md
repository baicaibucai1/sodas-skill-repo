# 素材来源与许可

本目录的目录快照、封面与名称说明来自 **StyleKit**，不是本仓原创：

- 站点：<https://www.stylekit.top/zh/styles>
- 上游仓库：<https://github.com/AnxForever/stylekit>（MIT）
- 目录接口：<https://www.stylekit.top/api/styles>
- 快照日期：2026-11-22；条目数：151
- 单风格规范：`https://www.stylekit.top/api/styles/<slug>`；完整实现文档在 `.../brief`

## 包含什么

- `catalog.json`：目录字段的子集（slug、中英文名、说明、类型、场景、标签、配色），用于离线检索。
- `covers/<slug>.svg`：封面的本地副本，仅用于离线浏览与画廊原型。

## 不包含什么

本仓不再复制风格正文（规范、组件配方、提示词），这些以 StyleKit 为准，按 slug 实时读取。若本仓与上游不一致，以上游为准。

## 再分发要求

1. 保留本文件的来源与 MIT 许可说明，不得声称风格内容为本仓原创。
2. 上游更新后，用 `node scripts/sync-catalog.mjs` 重建快照，并更新上面的「快照日期」与条目数。
3. 新增本地风格时，素材与文字必须自有版权或获授权；不要把上游正文抄进本地条目。
