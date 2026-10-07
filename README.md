# chenyfz.github.io

个人网站，使用 Astro 静态生成、React 交互组件、Tailwind CSS与 GSAP。中英文页面内容集中在 `apps/website/src/i18n/pages`。

## 编辑简历

中文简历的日常编辑入口是 [`resume.zh.md`](./resume.zh.md)。采用紧凑的纯文本式 Markdown，方便专注于内容；可以修改文字、增加栏目或调整经历顺序。

这是供人工编辑和 Agent 同步的内容稿，网站暂不直接读取 Markdown。编辑后向 Agent 说明“同步简历”，同步时：

- 以 Markdown 为中文内容来源，对比它与 `apps/website/src/i18n/pages/static-cv/zh.ts`，同步实际修改；保留未涉及的已有网站改动。
- Markdown 只保留页面正文和内容顺序，不添加辅助标签、同步说明或元信息，不使用标题标记、加粗或链接语法，保持普通字号。浏览器标题和搜索摘要继续在网站文案文件中维护。
- 页面上同行的内容在编辑稿中大致保持同行，每段经历按“日期、机构名称、学位或角色”合为一行，年份完整保留四位；南京大学、腾讯微信、乌特勒支大学只显示年份区间（如 2016–2020），CWI、一成智能、TapNow 保留月份，中文使用 YYYY.MM–YYYY.MM，英文使用 MM/YYYY–MM/YYYY；保留必要的段落和条目换行，减少空行。不添加“个人介绍”“经历”等页面没有的可见标题。用户删除的内容同步时也应删除，不应从网站还原。
- 链接地址、Logo、布局、字号及交互继续由网站代码维护。普通文字对应原有链接时保留链接。
- 每个经历条目保持一句完整表达，保留事实、时间、责任范围和因果关系；优先理顺语序、减少重复措辞，尽量一行，空间不足时自然换行，不为行数删减信息。
- 新增栏目或结构变化需要同步调整组件和类型，不应省略内容。英文文案随中文翻译同步，中英文共用左侧抬头及自述、右侧经历的页面结构，两栏顶部对齐。
- 完成后运行 `pnpm validate`，报告同步结果及验证状态。如果直接修改了网站中文文案，也应回写 Markdown，保持两者一致。

## 开发

使用 Node 24 和 `package.json` 声明的 pnpm 12.9.1。

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm validate
pnpm preview
```

`pnpm validate` 依次运行 lint、Astro/TypeScript 检查和正式构建。

## 目录与入口

- `apps/website/src/pages`：静态路由与页面装配。
- `apps/website/src/components`：页面展示组件与通用组件。
- `apps/website/src/features`：菜单、图片墙与项目预览的独立实现。
- `apps/website/src/hooks`：主题、导航、减少动态效果、弹层焦点管理。
- `apps/website/src/styles`：全局样式、主题、字体。
- `apps/website/scripts`：字体生成与图片优化工具。
- `apps/website/public`：图片、字体、视频、PDF 与保留的教学演示原件。

静态简历直接作为 `/zh/`、`/en/` 首页。原来的 `/zh/static-cv/`、`/en/static-cv/` 地址跳转到对应首页；根路径提供语言选择与跳转。

字体预构建文件可直接使用；文字或字体来源变更后，需要安装字体工具再重新生成：

```sh
python3.12 -m venv .venv
.venv/bin/python -m pip install -r apps/website/scripts/requirements-fonts.txt
pnpm --filter apps-website build:fonts
```

可用 `FONTTOOLS_PYTHON` 指定 Python 路径。构建指纹同时检查文字、源字体、生成规则和工具版本声明；字体全部生成成功后才发布新清单。
