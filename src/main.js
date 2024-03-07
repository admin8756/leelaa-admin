import './assets/main.css'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
Object.values(import.meta.glob('./modules/*.js', { eager: true })).forEach(i => i.install({app}))
app.mount('#app')
