# UI 风格库

为网页、仪表盘和后台界面提供可复用的视觉样本。新建或整体改版时，Agent 在风格未明确的情况下先询问；已有项目优先沿用锁定的版本。

## 安装与使用

将整个 `ui-style-library` 目录放入宿主的 Skill 搜索路径，重新开启会话。宿主必须发现并加载 [SKILL.md](SKILL.md) 后，Agent 才能执行风格询问流程。也可以直接说「使用 `ui-style-library` 做一个后台」。

| 风格 | 适用场景 | 资源 |
| --- | --- | --- |
| 极简主义 `minimalism@1.0.0` | 监控、仪表盘、管理后台 | [风格速览](styles/minimalism/1.0.0/preview.html)、[完整交互样本](styles/minimalism/1.0.0/demo.html)、[风格指南](styles/minimalism/1.0.0/guide.md)、[CSS](styles/minimalism/1.0.0/style.css) |

**快速看样式**：从 GitHub 下载「风格速览」HTML 后直接用浏览器打开。单文件离线使用，可以对照浅色与深色配色，并试按钮、菜单、开关和表格筛选。需要看完整的页面布局、区域图表和编辑抽屉时，再打开完整交互样本。

## 添加风格

给 Agent 一个网址、截图或本地样本，让它提炼并展示待入库内容。确认后，默认写入目标项目的 `.ui-styles/`；这个项目内的新会话可以发现。目录格式见 [清单约定](references/catalog.md)。Node.js 18+ 可用于搜索和校验，从 Skill 目录执行：

```sh
node scripts/catalog.mjs list --project /path/to/project
node scripts/catalog.mjs validate --project /path/to/project
```

需要维护本目录的 Agent 先看 [agent.md](agent.md)。
