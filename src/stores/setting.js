import { defineStore } from 'pinia'
export const useSettingStore = defineStore('setting', {
    state: () => {
        return {
            theme: 'light',
            lang: 'zh-CN'
        }
    },
    persist: true,
})