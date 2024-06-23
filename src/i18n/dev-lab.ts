import {Languages} from './types.ts'

interface Content {
    emptyTitle: string
    emptySubtitle1: string
    emptySubtitle2: string
}

export const devLabMsg : Record<Languages, Content> = {
    en: {
        emptyTitle: 'CAUTION',
        emptySubtitle1: 'AREA UNDER',
        emptySubtitle2: 'CONSTRUCTION'
    },
    zh: {
        emptyTitle: '前方施工，注意安全',
        emptySubtitle1: '',
        emptySubtitle2: ''
    }
}