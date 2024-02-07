import {ref, watchEffect} from 'vue'

export const useWatchColor = () => {
    const mode = ref<'dark' | 'light'>( 'light')
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const colorSchemeChangeHandler = () =>
        mode.value = colorSchemeQuery.matches ? 'dark' : 'light'

    colorSchemeQuery.addEventListener('change', colorSchemeChangeHandler)
    colorSchemeChangeHandler()

    const toggleMode = () => {
        mode.value = mode.value === 'light' ? 'dark' : 'light'
    }

    watchEffect(() => document
        .querySelector('body')
        ?.setAttribute('light-mode', mode.value)
    )

    return { mode, toggleMode }
}


