import {createI18n} from 'vue-i18n'
import {navBarMsg} from './nav-bar.ts'
import {cvMsg} from './cv.ts'


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            navBarMsg: navBarMsg.en,
            cvMsg: cvMsg.en,
        },
        zh: {
            navBarMsg: navBarMsg.zh,
            cvMsg: cvMsg.zh,
        }
    }
})

export {
    i18n
}