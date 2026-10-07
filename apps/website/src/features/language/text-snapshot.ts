import { characters, textUnits } from './motion';

const headings = 'h1, h2, h3, h4, h5, h6';
const prose = '.cv-meta, .cv-period, .cv-bullet-content, p, li:not(.cv-bullet), figcaption, dt, dd, th, td, .page-return, .course-directory nav a, a.text-link';
const intersects = (rect: DOMRect, clip: { left: number; top: number; right: number; bottom: number }) =>
  rect.width > 0 && rect.height > 0 && rect.bottom > clip.top && rect.top < clip.bottom &&
  rect.right > clip.left && rect.left < clip.right;

function cached<T>(read: (element: HTMLElement) => T) {
  const values = new Map<HTMLElement, T>();
  return (element: HTMLElement): T => {
    if (!values.has(element)) values.set(element, read(element));
    return values.get(element)!;
  };
}

function measureText() {
  // One measurement per element, scoped to this snapshot; never reuse stale layout.
  const rect = cached(element => element.getBoundingClientRect());
  const style = cached(element => getComputedStyle(element));
  const viewport = { left: 0, top: 0, right: innerWidth, bottom: innerHeight, opacity: 1 };
  const clip: (element: HTMLElement) => typeof viewport = cached(element => {
    const bounds = { ...(element.parentElement ? clip(element.parentElement) : viewport) };
    const css = style(element);
    bounds.opacity *= Number(css.opacity);
    if (css.display === 'inline') return bounds;
    if (css.overflowX !== 'visible') {
      bounds.left = Math.max(bounds.left, rect(element).left + element.clientLeft);
      bounds.right = Math.min(bounds.right, rect(element).left + element.clientLeft + element.clientWidth);
    }
    if (css.overflowY !== 'visible') {
      bounds.top = Math.max(bounds.top, rect(element).top + element.clientTop);
      bounds.bottom = Math.min(bounds.bottom, rect(element).top + element.clientTop + element.clientHeight);
    }
    return bounds;
  });
  return { rect, style, clip, viewport };
}

/** Position visual copies over the original text without changing React's nodes or wrapping. */
function copyText(main: HTMLElement, layer: HTMLElement) {
  const titles: HTMLElement[] = [];
  const bodies: HTMLElement[] = [];
  const sources = new Set<HTMLElement>();
  const measure = measureText();
  const groups = new Map<HTMLElement, { element: HTMLDivElement; clip: typeof measure.viewport }>();
  const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement!;
    const text = node.textContent ?? '';
    // Modal backgrounds are inert but still visible through the menu's blur.
    if (!text.trim() || !parent.closest(`${headings}, ${prose}`) ||
      parent.closest('[hidden], [aria-hidden="true"]') || !intersects(measure.rect(parent), measure.viewport)) continue;
    const style = measure.style(parent);
    if (style.visibility !== 'visible') continue;
    const units = parent.closest(headings) ? titles : bodies;
    let group = groups.get(parent);
    if (!group) {
      const clip = measure.clip(parent);
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
    for (const { segment, index } of textUnits(text)) {
      if (!segment.trim()) continue;
      range.setStart(node, index);
      range.setEnd(node, index + segment.length);
      const rect = range.getBoundingClientRect();
      if (!intersects(rect, clip)) continue;
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
