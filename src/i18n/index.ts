import {createI18n} from 'vue-i18n'
import {navBarMsg} from './nav-bar.ts'
import {cvMsg} from './cv.ts'
import {blogMsg} from './blog.ts'
import {devLabMsg} from './dev-lab.ts'


const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            navBarMsg: navBarMsg.en,
            cvMsg: cvMsg.en,
            blogMsg: blogMsg.en,
            devLabMsg: devLabMsg.en,
        },
        zh: {
            navBarMsg: navBarMsg.zh,
            cvMsg: cvMsg.zh,
            blogMsg: blogMsg.zh,
            devLabMsg: devLabMsg.zh,
        }
    }
})

export {
    i18n
}