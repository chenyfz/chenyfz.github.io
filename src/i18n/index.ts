import {createI18n} from 'vue-i18n'

export const createI18nInstance = () => createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false
})
