import {createI18n} from 'vue-i18n'
import {navBarMsg} from './nav-bar.ts'
import {cvMsg} from './cv.ts'
import {blogMsg} from './blog.ts'
import {devLabMsg} from './dev-lab.ts'
import {portfolioMsg} from './portfolio.ts'
import { homeMsg } from './home'


export const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            navBarMsg: navBarMsg.en,
            cvMsg: cvMsg.en,
            blogMsg: blogMsg.en,
            devLabMsg: devLabMsg.en,
            portfolioMsg: portfolioMsg.en,
            homeMsg: homeMsg.en,
        },
        zh: {
            navBarMsg: navBarMsg.zh,
            cvMsg: cvMsg.zh,
            blogMsg: blogMsg.zh,
            devLabMsg: devLabMsg.zh,
            portfolioMsg: portfolioMsg.zh,
            homeMsg: homeMsg.zh,
        }
    }
})
