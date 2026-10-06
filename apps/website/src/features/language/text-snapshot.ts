import { characters, textUnits } from './motion';

const headings = 'h1, h2, h3, h4, h5, h6';
const prose = '.cv-meta, .cv-period, .cv-bullet-content, p, li:not(.cv-bullet), figcaption, dt, dd, th, td, .page-return, .course-directory nav a, a.text-link';
const visible = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight &&
    // Modal backgrounds are inert but still visible through the menu's blur.
    !element.closest('[hidden], [aria-hidden="true"]');
};

function textClip(element: HTMLElement) {
  const clip = { left: 0, top: 0, right: innerWidth, bottom: innerHeight, opacity: 1 };
  for (let parent: HTMLElement | null = element; parent; parent = parent.parentElement) {
    const style = getComputedStyle(parent);
    clip.opacity *= Number(style.opacity);
    if (style.display === 'inline') continue;
    const rect = parent.getBoundingClientRect();
    if (style.overflowX !== 'visible') {
      clip.left = Math.max(clip.left, rect.left + parent.clientLeft);
      clip.right = Math.min(clip.right, rect.left + parent.clientLeft + parent.clientWidth);
    }
    if (style.overflowY !== 'visible') {
      clip.top = Math.max(clip.top, rect.top + parent.clientTop);
      clip.bottom = Math.min(clip.bottom, rect.top + parent.clientTop + parent.clientHeight);
    }
  }
  return clip;
}

/** Position visual copies over the original text without changing React's nodes or wrapping. */
function copyText(main: HTMLElement, layer: HTMLElement) {
  const titles: HTMLElement[] = [];
  const bodies: HTMLElement[] = [];
  const sources = new Set<HTMLElement>();
  const groups = new Map<HTMLElement, { element: HTMLDivElement; clip: ReturnType<typeof textClip> }>();
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement!;
    if (!parent.closest(`${headings}, ${prose}`) || !visible(parent)) continue;
    const style = getComputedStyle(parent);
    if (style.visibility !== 'visible') continue;
    const units = parent.closest(headings) ? titles : bodies;
    let group = groups.get(parent);
    if (!group) {
      const clip = textClip(parent);
      if (clip.right <= clip.left || clip.bottom <= clip.top || !clip.opacity) continue;
      const element = document.createElement('div');
      Object.assign(element.style, {
        left: `${clip.left}px`, top: `${clip.top}px`,
        width: `${clip.right - clip.left}px`, height: `${clip.bottom - clip.top}px`, opacity: clip.opacity
      });
      group = { element, clip };
      groups.set(parent, group);
      layer.append(element);
    }
    const { element, clip } = group;
    const copy = (text: string, rect: DOMRect) => {
      const span = document.createElement('span');
      span.textContent = text;
      Object.assign(span.style, {
        left: `${rect.left - clip.left}px`, top: `${rect.top - clip.top}px`, font: style.font,
        lineHeight: `${rect.height}px`, color: style.color, letterSpacing: style.letterSpacing,
        fontKerning: style.fontKerning, fontFeatureSettings: style.fontFeatureSettings
      });
      return span;
    };
    for (const { segment, index } of textUnits(node.textContent ?? '')) {
      if (!segment.trim()) continue;
      range.setStart(node, index);
      range.setEnd(node, index + segment.length);
      const rect = range.getBoundingClientRect();
      if (!rect.width || !rect.height || rect.bottom <= clip.top || rect.top >= clip.bottom ||
        rect.right <= clip.left || rect.left >= clip.right) continue;
      let unit = copy(segment, rect);
      if (range.getClientRects().length > 1) {
        // A word broken across lines still shares one delay and one movement.
        unit = document.createElement('span');
        for (const character of characters.segment(segment)) {
          range.setStart(node, index + character.index);
          range.setEnd(node, index + character.index + character.segment.length);
          unit.append(copy(character.segment, range.getBoundingClientRect()));
        }
      }
      units.push(unit);
      element.append(unit);
      sources.add(parent);
    }
  }
  return { titles, bodies, sources: [...sources] };
}

/** The snapshot owns its visual copies and temporary source masking. */
export function createTextSnapshot(main: HTMLElement) {
  const layer = document.createElement('div');
  layer.className = 'language-motion-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.inert = true;
  const { titles, bodies, sources } = copyText(main, layer);
  return {
    titles, bodies,
    show() {
      if (!sources.length) return;
      document.body.append(layer);
      sources.forEach(element => element.classList.add('language-motion-source'));
    },
    dispose() {
      sources.forEach(element => element.classList.remove('language-motion-source'));
      layer.remove();
    }
  };
}
