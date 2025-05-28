import {ref, watch} from 'vue'
// import {Languages} from '../../i18n/types.ts' // Removed this import
import {i18n} from '../../i18n'

// Define Languages type directly or use string literals
type Languages = 'zh' | 'en'

export const useWatchLanguage = () => {
    const preference = localStorage.getItem('language-preference')
    const language = ref<Languages>((preference || 'en') as Languages)

    const toggleLanguage = (input: Languages) => {
        language.value = input
        localStorage.setItem('language-preference', language.value)
    }
    watch(language, (newLocale) => {
      if (i18n.global.locale.value !== newLocale) {
        i18n.global.locale.value = newLocale
      }
    }, {
        immediate: true,
    })

    // Also watch for external changes to i18n.global.locale (e.g., browser language detector on init)
    watch(() => i18n.global.locale.value, (newGlobalLocaleValue) => {
      if (language.value !== newGlobalLocaleValue) {
        language.value = newGlobalLocaleValue as Languages
      }
    })

    return {
        language,
        toggleLanguage
    }
}