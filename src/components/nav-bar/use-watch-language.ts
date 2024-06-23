import {ref, watch} from 'vue'
import {Languages} from '../../i18n/types.ts'
import {i18n} from '../../i18n'

export const useWatchLanguage = () => {
    const preference = localStorage.getItem('language-preference')
    const language = ref((preference || 'en') as unknown as Languages)

    const toggleLanguage = (input: Languages) => {
        language.value = input
        localStorage.setItem('language-preference', language.value)
    }
    watch(language, () => i18n.global.locale = language.value, {
        immediate: true,
    })

    return {
        language,
        toggleLanguage
    }
}