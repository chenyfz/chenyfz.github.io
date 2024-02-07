import {ref, watch} from 'vue'
import {Languages} from '../../i18n/types.ts'
import {i18n} from '../../i18n'

export const useWatchLanguage = () => {
    // default: english
    const language = ref('en' as Languages)
    watch(language, () => i18n.global.locale = language.value)
    const toggleLanguage = (input: Languages) => {
        language.value = input
    }
    return {
        language,
        toggleLanguage
    }
}