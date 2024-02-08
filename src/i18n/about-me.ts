import {Languages} from './types.ts'

interface Content {
    cvTitle: string
    estimated: string
    educationTitle: string
    masterTitle: string
    masterLocation: string
    bachelorTitle: string
    bachelorLocation: string
    workExperienceTitle: string
    fedTitle: string
    fedLocation: string
    aboutMeTitle: string
    aboutMeContent: string
}

export const aboutMeMsg : Record<Languages, Content> = {
    en: {
        cvTitle: 'Curriculum Vitae',
        estimated: '(estimated)',
        educationTitle: 'Education',
        masterTitle: 'Master Human-Computer Interaction',
        masterLocation: 'Utrecht University, Utrecht, the Netherlands',
        bachelorTitle: 'Bachelor Software Engineering',
        bachelorLocation: 'Nanjing University, Nanjing, China',
        workExperienceTitle: 'Work Experience',
        fedTitle: 'Front-end developer',
        fedLocation: 'WeChat (Tencent), Guangzhou, China',
        aboutMeTitle: 'About me',
        aboutMeContent: 'Leave it blank for now :D',
    },
    zh: {
        cvTitle: '简历',
        estimated: '(预计)',
        educationTitle: '教育经历',
        masterTitle: 'Master 人机交互',
        masterLocation: 'Utrecht University, Utrecht, 荷兰',
        bachelorTitle: '学士 软件工程',
        bachelorLocation: '南京大学',
        workExperienceTitle: '工作经历',
        fedTitle: '前端开发工程师',
        fedLocation: '微信（腾讯）设计中心前端重构组',
        aboutMeTitle: '关于我',
        aboutMeContent: '不知道写啥，先留空',
    }
}