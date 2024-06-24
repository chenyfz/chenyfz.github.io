import {Languages} from './types.ts'

interface Content {
    introP1: string,
    introP2: string,
    introP3: string,
    introP4: string,
    descToCV: string,
    descBeforeStudyPlan: string,
    linkToCV: string,
    linkToStudyPlan: string,
    descAfterStudyPlan: string,
    reachOut: string,
}

export const homeMsg : Record<Languages, Content> = {
    en: {
        introP1: 'Hi! I am CHEN Yangfan.',
        introP2: 'I am currently a Master\'s student in Human-Computer Interaction program at Utrecht University. I hold a Bachelor\'s degree in Software Engineering from Nanjing University. ',
        introP3: 'During my undergraduate studies at Nanjing University, I was attracted by the universality of web UI technology and chose to become a front-end engineer, working at WeChat for two years. However, I gradually realized that the work of a front-end engineer mainly focuses on engineering and efficiency, rather than the interactive technology and experience innovation that truly interested me. Therefore, I decided to continue my studies in Human-Computer Interaction. ',
        introP4: 'Currently, I have a strong interest in Virtual Reality and Mixed Reality (VR/MR) technology, and I hope to pursue it as the next step in my future academic and career development.',
        descToCV: 'You can check my',
        linkToCV: 'CV',
        descBeforeStudyPlan: 'and my',
        linkToStudyPlan: 'Study Plan',
        descAfterStudyPlan: 'during my Master\'s program to learn more about me。',
        reachOut: 'Reach Out by Email',
    },
    zh: {
        introP1: 'Hi! 在下陈扬帆',
        introP2: '我目前在乌特勒支大学（Utrecht University）人机交互硕士项目就读，本科毕业于南京大学软件工程专业。',
        introP3: '在南京大学本科期间，我被web UI技术的普适性所吸引，选择成为一名前端工程师并在微信任职了两年。但我渐渐发现，前端工程师的工作主要聚焦于工程化和效率，而不是让我真正感兴趣的交互技术和体验的创新。于是我决定离开微信，重回象牙塔继续学习人机交互。',
        introP4: '目前，我对虚拟现实与融合现实（VR/MR）技术非常感兴趣，并希望将其作为我未来学术和职业生涯的下一步发展方向。',
        descToCV: '您可查看我的',
        linkToCV: '简历',
        descBeforeStudyPlan: '和',
        linkToStudyPlan: '（硕士期间）课程计划',
        descAfterStudyPlan: '来更深入了解我。',
        reachOut: '邮箱联系',
    }
}