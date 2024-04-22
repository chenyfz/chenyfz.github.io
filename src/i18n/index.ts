import {createI18n} from 'vue-i18n'
import {navBarMsg} from './nav-bar.ts'
import {aboutMeMsg} from './resume.ts'


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            navBarMsg: navBarMsg.en,
            aboutMeMsg: aboutMeMsg.en,
        },
        zh: {
            navBarMsg: navBarMsg.zh,
            aboutMeMsg: aboutMeMsg.zh,
        }
    }
})

export {
    i18n
}