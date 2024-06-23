import {ref, watchEffect} from 'vue'

export const useWatchColor = () => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const colorSchemeChangeHandler = () =>
        mode.value = colorSchemeQuery.matches ? 'dark' : 'light'

    colorSchemeQuery.addEventListener('change', colorSchemeChangeHandler)

    const mode = ref(
        localStorage.getItem('color-preference') || (colorSchemeQuery.matches ? 'dark' : 'light')
    )

    const toggleMode = () => {
        mode.value = mode.value === 'light' ? 'dark' : 'light'
        localStorage.setItem('color-preference', mode.value)
    }

    watchEffect(() => document
        .querySelector('body')
        ?.setAttribute('light-mode', mode.value)
    )

    return { mode, toggleMode }
}


