export const supportedLangs = ['en', 'zh'] as const
export type Lang = (typeof supportedLangs)[number]
