import gsap from 'gsap';

const words = new Intl.Segmenter(undefined, { granularity: 'word' });
export const characters = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

export function* textUnits(text: string) {
  for (const word of words.segment(text)) {
    if (/\p{Script=Han}/u.test(word.segment)) {
      for (const character of characters.segment(word.segment)) {
        yield { segment: character.segment, index: word.index + character.index };
      }
    } else yield word;
  }
}

export function revealText(timeline: gsap.core.Timeline, elements: HTMLElement[], duration: number, subtle = false) {
  if (!elements.length) return;
  // Independent delays give an irregular rhythm; share them across position and opacity.
  const delays = elements.map(() => gsap.utils.random(0, duration * .36));
  const stagger = (index: number) => delays[index];
  gsap.set(elements, { y: subtle ? 4 : 10, opacity: 0 });
  timeline.to(elements, { y: 0, duration: duration * .64, stagger, ease: 'power3.out' }, 0);
  timeline.to(elements, {
    keyframes: [
      { opacity: 1, duration: duration * .14 },
      { opacity: subtle ? .9 : .68, duration: duration * .08 },
      { opacity: 1, duration: duration * .42 }
    ], stagger, ease: 'none'
  }, 0);
}
