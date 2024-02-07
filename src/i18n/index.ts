import {createI18n} from 'vue-i18n'
import {navBarMsg} from './nav-bar.ts'


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            navBarMsg: navBarMsg.en
        },
        zh: {
            navBarMsg: navBarMsg.zh
        }
    }
})

export {
    i18n
}