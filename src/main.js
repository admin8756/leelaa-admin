import '@/assets/main.css';
import '@/assets/nprogress.css';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
