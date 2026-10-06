import type { Locale } from '@/i18n/config';
import type { MastersCourseMediaItem } from '@/i18n/pages/masters-courses/types';
import RichText from '@/components/common/RichText';
import ExpandableContent from '@/components/common/ExpandableContent';
import MediaGallery from '@/components/media/MediaGallery';

type Props = {
  items: MastersCourseMediaItem[]; lang: Locale;
  expanded: boolean; onToggle: () => void; practiceText?: string;
  showLabel: string; hideLabel: string;
};
export default function CourseMediaGallery({ items, lang, expanded, onToggle, practiceText, showLabel, hideLabel }: Props) {
  const preview = (practiceText ?? '').replace(/\*\*/g, '').replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^\s*(?:-|\d+\.)\s+/gm, '').replace(/\s+/g, ' ').trim();
  return <div className="course-practice">
    {practiceText && <ExpandableContent expanded={expanded} onToggle={onToggle} preview={preview} showLabel={showLabel} hideLabel={hideLabel}>
      <RichText text={practiceText} mode="block" />
    </ExpandableContent>}
    <MediaGallery items={items} lang={lang} detailsOpen={expanded} />
  </div>;
}
