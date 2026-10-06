import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navigate } from 'astro:transitions/client';

export default function useSectionNavigation(ids: readonly string[]) {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [flashId, setFlashId] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHash = useRef('');
  const flash = useCallback((id: string) => {
    if (timer.current !== null) clearTimeout(timer.current);
    setFlashId(id);
    timer.current = setTimeout(() => { setFlashId(''); timer.current = null; }, 1400);
  }, []);
  useEffect(() => () => {
    if (timer.current !== null) clearTimeout(timer.current);
  }, []);
  useLayoutEffect(() => {
    try {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (ids.includes(id)) document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    } catch { /* Invalid external fragment. */ }
  }, [ids]);
  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id); else visible.delete(entry.target.id);
      }
      setActiveIds(ids.filter(id => visible.has(id)));
    }, { rootMargin: '-80px 0px -15% 0px' });
    ids.forEach(id => { const section = document.getElementById(id); if (section) observer.observe(section); });
    lastHash.current = window.location.hash;
    const fromHash = () => {
      const hash = window.location.hash;
      if (hash === lastHash.current) return;
      lastHash.current = hash;
      try { const id = decodeURIComponent(hash.slice(1)); if (ids.includes(id)) flash(id); } catch { /* Invalid external fragment. */ }
    };
    window.addEventListener('hashchange', fromHash);
    window.addEventListener('popstate', fromHash);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', fromHash);
      window.removeEventListener('popstate', fromHash);
    };
  }, [ids, flash]);
  const select = async (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    if (window.location.hash !== `#${id}`) {
      const style = document.documentElement.style;
      const previous = style.scrollBehavior;
      style.scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      try { await navigate(`#${id}`); } finally { style.scrollBehavior = previous; }
    } else {
      section.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    section.focus({ preventScroll: true });
    flash(id);
  };
  return { activeIds, flashId, select };
}
