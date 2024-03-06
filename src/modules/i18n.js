

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]),
)

export const availableLocales = Object.keys(localesMap)

const loadedLanguages = []

function setI18nLanguage(lang) {
  i18n.global.locale.value = lang
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang){
  //  如果是相同的语言
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  //  如果语言已经加载
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // 如果语言尚未加载
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export const install = ({ app }) => {
  app.use(i18n)
  loadLanguageAsync('zh-CN')
}