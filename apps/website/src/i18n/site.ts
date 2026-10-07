import type { Locale } from './config';

export const SHARE_IMAGE = { width: 1200, height: 630 };

export const SITE_META: Record<Locale, { name: string; label: string; focus: string; locale: string }> = {
  en: {
    name: 'Chen Yangfan',
    label: 'RESUME & PROJECTS',
    focus: 'Software engineering · Human-computer interaction · Product design',
    locale: 'en_US'
  },
  zh: {
    name: '陈扬帆',
    label: '简历与项目',
    focus: '软件工程 · 人机交互 · 产品设计',
    locale: 'zh_CN'
  }
};
