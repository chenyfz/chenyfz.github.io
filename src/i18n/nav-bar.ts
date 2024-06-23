import {Languages} from './types.ts'

interface Content {
    homeTab: string,
    blogTab: string,
    devLabTab: string,
    portfolioTab: string,
    cvTab: string,
}

export const navBarMsg : Record<Languages, Content> = {
    en: {
        homeTab: 'Home',
        blogTab: 'Thoughts',
        devLabTab: 'DevLab',
        portfolioTab: 'Portfolio',
        cvTab: 'CV',
    },
    zh: {
        homeTab: '主页',
        blogTab: '随想',
        devLabTab: '实验室',
        portfolioTab: '作品集',
        cvTab: '简历',
    }
}