# 模块存放目录

在 modules 目录下的js。必须提供install方法，该方法会自动在main.js中引入。

js 中可以使用app, router这两个函数

``` js
export const install = ({ router }) => {

}

```