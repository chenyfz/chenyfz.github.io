import type { Locale } from '@/i18n/config';
import type { IndexPageCopy } from '@/i18n/pages/index/types';
import HeroSection from './HeroSection';
import type { ChatMessage } from '../chat/types';

type IndexPageProps = {
  text: IndexPageCopy;
  lang: Locale;
};

export default function IndexPage({ text, lang }: IndexPageProps) {
  const messages: ChatMessage[] = [
    {
      id: 'welcome-1',
      type: 'system',
      content: text.hero.messages.hi
    },
    {
      id: 'welcome-2',
      type: 'system',
      content: text.hero.messages.intro
    },
    {
      id: 'welcome-3',
      type: 'system',
      content: (
        <a 
          href={`/${lang}/static-cv`} 
          className="underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          ({text.hero.messages.staticCv})
        </a>
      )
    }
  ];

  return (
    <main>
      <HeroSection messages={messages} />
      {/* Additional sections will be added here later */}
    </main>
  );
}
