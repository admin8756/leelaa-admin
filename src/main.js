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
    if (i?.install && typeof i.install === 'function') {
      i.install({ app, router });
    }
  } catch (error) {
    console.error(`Error installing module: ${error.name}: ${error.message}`);
  }
});
app.mount('#app');
