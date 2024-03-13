import { createPinia } from 'pinia'

export const install = ({ app }) => {
  const pinia = createPinia()
  app.use(pinia)
};
