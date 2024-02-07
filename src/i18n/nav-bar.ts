import {Languages} from './types.ts'

interface Content {
    labsTab: string,
    aboutTab: string,
    photosTab: string
}

export const navBarMsg : Record<Languages, Content> = {
    en: {
        labsTab: 'Labs',
        aboutTab: 'About me',
        photosTab: 'Photographs'
    },
    zh: {
        labsTab: '实验',
        aboutTab: '关于',
        photosTab: '照片'
    }
}