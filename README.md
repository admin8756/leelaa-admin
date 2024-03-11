# leelaa-admin

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# 依赖列表
vue3 + vite + i18n + pwa + pinia

# 开发规划

登录页

首页

表单生成页

图表数据页

表格页

详情页

外部页面

结果页面

i18n

# 亮点 
现有的管理系统都太丑了，要玻璃新拟物。要科技。要美观。要好用

构思1
顶部存放一级路由，在移动端显示为底部路由方便统一管理
点击一级路由后出现二级路由页面。二级页面可以打开三级页面。三级页面在二级页面中打开。以弹窗的形式打开。可以关闭。当然。这是可选项。你可以没有3级页面。三级页面也可以打开四级。然后一直递增。最多嵌套5层。实现方式为组件嵌套。提供一个插槽。插槽中放置一个组件。这个组件就是二级页面。二级页面中也有一个插槽。插槽中放置一个组件。这个组件就是三级页面。以此类推。
如果在移动端。和pc端。一级页面都是一样的。那么就不需要二级页面。直接在一级页面中打开三