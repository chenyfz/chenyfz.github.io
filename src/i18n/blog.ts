import {Languages} from './types.ts'

interface Content {
    emptyText: string
}

export const blogMsg : Record<Languages, Content> = {
    en: {
        emptyText: 'Apparently this lazybones prefers to swim in fuzzy daydreams...',
    },
    zh: {
        emptyText: '看来此人懒惰腐朽更喜欢做白日梦...',
    }
}