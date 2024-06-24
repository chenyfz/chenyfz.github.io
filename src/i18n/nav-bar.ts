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
        portfolioTab: 'Study Plan',
        cvTab: 'CV',
    },
    zh: {
        homeTab: '主页',
        blogTab: '随想',
        devLabTab: '实验室',
        portfolioTab: '课程计划',
        cvTab: '简历',
    }
}