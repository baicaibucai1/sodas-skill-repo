# 风格库格式

随 Skill 分发的库在 `styles/`；项目私有库在 `.ui-styles/`。每个版本独占 `目录/<id>/<version>/`，含 `style.json` 和素材。目录即索引，无需编辑中央清单。

```json
{
  "id": "paper-editorial",
  "version": "1.0.0",
  "name": "纸感编辑",
  "summary": "暖白底、衬线标题与疏朗版面，适用于阅读型页面。",
  "tags": ["阅读", "内容站"],
  "level": "reference",
  "guide": "guide.md"
}
```

- `id`：小写字母、数字和连字符；`version`：三段式数字版本。ID 与版本必须匹配目录名。
- `name`、`summary`、`guide` 为必填。`tags` 为可选字符串数组；`source` 为可选来源说明。`guide`、可选 `demo` 和 `css` 指向版本目录内文件。
- `reference`：描述可见风格及未知点。`reproducible`：必须附可运行样本和样式，并在指南中列出状态验收；结构校验不代替浏览器测试。
- 不覆盖已发布版本；变更另建版本。库中同 ID 同版本出现在两个作用域，属于冲突。默认列表每个 ID 只显示最新版；已锁定的旧版用 `--id` 和 `--version` 精确查找。

```sh
node scripts/catalog.mjs list --project /path/to/project --query 后台
node scripts/catalog.mjs list --id minimalism --version 1.0.0
node scripts/catalog.mjs validate --project /path/to/project
```

脚本依赖 Node.js 18+，不联网；查询方法不写文件。无 Node.js 时，仍可直接读清单。
