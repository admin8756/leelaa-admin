import '@/assets/main.css';
import '@/assets/nprogress.css';
import 'tailwindcss/tailwind.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
Object.values(import.meta.glob('./modules/*.js', { eager: true })).forEach((i) => {
  try {
    // 检查导入的模块是否包含install属性，并且是一个函数
    if (i?.install && typeof i.install === 'function') {
      // 安全地调用install方法
      i.install({ app, router });
    }
  } catch (error) {
    // 使用更详细的错误处理来捕获并处理可能的错误
    console.error(`Error installing module: ${error.name}: ${error.message}`);
  }
});
app.mount('#app');
