import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages'
const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: 'zh-CN',
  messages
});

export const install = ({ app }) => {
  app.use(i18n);
};
