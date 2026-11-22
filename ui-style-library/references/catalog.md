# 风格库格式

风格内容以 StyleKit 的 `slug` 为准，本仓库不再复制风格正文。目录分两层：

- **目录快照** `data/catalog.json`：151 条 StyleKit 目录的本地副本，用于离线检索。由 [data/NOTICE.md](../data/NOTICE.md) 记录来源与更新方式，不要手改单条。
- **项目私有条目** `<project>/.ui-styles/<slug>/style.json`：用户确认后加入的、StyleKit 没有的风格，或需要固定说明的本地变体。

## 条目格式

```json
{
  "slug": "paper-editorial",
  "name": "纸感编辑",
  "summary": "暖白底、衬线标题与疏朗版面，适用于阅读型页面。",
  "tags": ["阅读", "内容站"],
  "level": "reference",
  "guide": "guide.md",
  "source": "https://example.com 或用户提供的样本说明"
}
```

- `slug`：小写字母、数字和连字符，必须与目录名一致。已存在于 StyleKit 的风格直接引用上游 slug，不重复入库。
- `name`、`summary`、`guide` 必填。`tags` 为可选字符串数组。
- `level`：`reference` 表示只能是视觉参考、复现程度未验证；`reproducible` 必须附可运行样本，并在指南中列明状态验收。
- 已发布的条目只增不改，变更另建 slug 或版本；不同项目出现同 slug 属于冲突，需报告。
- 不写 `version` 字段：风格正文的版本由 StyleKit 上游管理，本仓库只记录 `source` 与 `fetchedAt`（需要时）。

```sh
node scripts/catalog.mjs list --project /path/to/project --query 后台
node scripts/catalog.mjs validate --project /path/to/project
```

脚本依赖 Node.js 18+，不联网；查询不写文件。无 Node.js 时仍可直接读清单。

## 更新目录快照

上游目录变化时，用同一份脚本重建快照与封面，保证 `slug`、名称、分类一致，并保留 NOTICE 中的来源说明：

```sh
node scripts/sync-catalog.mjs
```

脚本会请求 `https://www.stylekit.top/api/styles`、写入 `data/catalog.json` 并补齐缺失封面。它不发布、不改 README。
