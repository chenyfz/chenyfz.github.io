import type { Locale } from '@/i18n/config';

type PlaygroundPageProps = {
  lang: Locale;
};

export default function PlaygroundPage({ lang }: PlaygroundPageProps) {
  return (
    <main className="min-h-[calc(100dvh-4rem)] p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Playground</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </main>
  );
}
