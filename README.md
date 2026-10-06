# chenyfz.github.io

个人网站，使用 Astro 静态生成、React 交互组件、Tailwind CSS、GSAP 与 Three.js。中英文页面内容集中在 `apps/website/src/i18n/pages`。

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
- `apps/website/src/features`：菜单、图片墙、周年 3D 的独立实现。
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
