# leelaa-admin

更适合中国人体质的后台管理系统,从用户体验出发，并且努力提高开发体验。

## 启动项目

```sh
pnpm install
```

### 开发模式

```sh
pnpm dev
```

### 编译项目

```sh
pnpm build
```

### 格式化代码

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

点击一级路由后出现二级路由页面。

二级页面可以打开三级页面。

三级页面在二级页面中打开。以弹窗的形式打开。可以关闭。当然。这是可选项。

你可以没有3级页面。三级页面也可以打开四级。然后一直递增。最多嵌套5层。

实现方式为组件嵌套。提供一个插槽。插槽中放置一个组件。这个组件就是二级页面。二级页面中也有一个插槽。插槽中放置一个组件。这个组件就是三级页面。以此类推。

如果在移动端。和pc端。一级页面都是一样的。那么就不需要二级页面。直接在一级页面中打开三