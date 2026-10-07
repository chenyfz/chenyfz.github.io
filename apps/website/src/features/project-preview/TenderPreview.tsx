import type { Locale } from '@/i18n/config';
import type { MediaItem } from '@/components/media/types';
import ZoomableImage from '@/components/media/ZoomableImage';

export const TENDER_IMAGE = '/1cAI/ui.png';

export function tenderImage(lang: Locale): MediaItem {
  return { type: 'image', src: TENDER_IMAGE,
    alt: lang === 'zh' ? '招投标 AI 工具：检查结果与原文对照界面' : 'AI tender review tool: review results alongside the source document' };
}

export default function TenderPreview({ lang }: { lang: Locale }) {
  return <ZoomableImage lang={lang} item={tenderImage(lang)} />;
}
