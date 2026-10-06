export type LinkActivation = {
  defaultPrevented: boolean;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
};
export function shouldAnimateNavigation(event: LinkActivation, target?: string | null, download = false) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey &&
    !event.shiftKey && !event.altKey && !download && (!target || target === '_self');
}

export function normalizePageHref(href: string): string {
  const match = href.match(/^(\/(?:en|zh)(?:\/[^?#]*)?)([?#].*)?$/);
  if (!match || match[1].endsWith('/') || /\/[^/]*\.[^/]*$/.test(match[1])) return href;
  return `${match[1]}/${match[2] ?? ''}`;
}
