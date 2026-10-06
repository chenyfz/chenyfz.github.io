import { textUnits } from './motion';

/** Keep menu text inside its moving card, so word motion follows the card's transform. */
export default function LanguageMotionText({ text, subtle = false }: { text: string; subtle?: boolean }) {
  return <span className="language-motion-text" data-language-text={subtle ? 'body' : 'title'}>
    {[...textUnits(text)].map(({ segment, index }) => segment.trim()
      ? <span key={index}>{segment}</span> : segment)}
  </span>;
}
