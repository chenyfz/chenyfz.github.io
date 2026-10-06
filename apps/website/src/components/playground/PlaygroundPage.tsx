import type { Locale } from '@/i18n/config';
import PageFrame from '@/components/common/PageFrame';

export default function PlaygroundPage({ lang }: { lang: Locale }) {
  return <PageFrame lang={lang} title="Playground">
    <p className="page-muted">{lang === 'zh' ? '内容即将上线。' : 'Coming soon…'}</p>
  </PageFrame>;
}
