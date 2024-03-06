## i18n配置页面

如果需要添加新的语言，需要在`src/locales`目录下添加对应的语言文件。

## 如何使用

在template中使用`$t`方法，传入需要翻译的key即可。

```html
<template>
  <div>
    <p>{{ $t('hello') }}</p>
  </div>
</template>
```

在script中使用`this.$t`方法，传入需要翻译的key即可。

```javascript
export default {
  created() {
    console.log(this.$t('hello'))
  }
}
```

在<script setup></script>中使用`useI18n`方法，传入需要翻译的key即可。

```javascript
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
console.log(t('hello'))
</script>
```

在style中使用`$t`方法，传入需要翻译的key即可。

```css
p::before {
  content: $t('hello');
}
```
## 更多
请查看[官方文档](https://github.com/intlify/vue-i18n-next)了解更多信息。
```
