import {Languages} from './types.ts'

interface Content {
    homeTab: string,
}

export const portfolioMsg : Record<Languages, Content> = {
    en: {
        homeTab: 'Home',
    },
    zh: {
        homeTab: '主页',
    }
}