import { useEffect, useEffectEvent, useRef, type RefObject } from 'react';

export type PanZoomView = { x: number; y: number; scale: number };
type Size = { width: number; height: number };
type Point = { x: number; y: number };
type Options = {
  minScale?: number;
  maxScale?: number;
  constrain?: (view: PanZoomView, size: Size) => PanZoomView;
  onChange: (view: PanZoomView) => void;
  onNavigate?: (direction: number) => void;
};
const initialView = () => ({ x: 0, y: 0, scale: 1 });

/** Shared pointer gestures; translation and zoom are relative to the viewport center. */
export default function usePanZoom(ref: RefObject<HTMLElement | null>,
  { minScale = 1, maxScale = 6, constrain, onChange, onNavigate }: Options) {
  const view = useRef<PanZoomView>(initialView());
  const changed = useEffectEvent(onChange);
  const navigate = useEffectEvent((direction: number) => {
    if (!onNavigate) return false;
    onNavigate(direction); return true;
  });
  const bounded = useEffectEvent((next: PanZoomView, size: Size) => constrain?.(next, size) ?? next);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const pointers = new Map<number, Point>();
    let origin: Point | null = null;
    let multiTouch = false;
    let size: Size = { width: 0, height: 0 };
    const publish = (next: PanZoomView) => {
      view.current = bounded(next, size);
      changed(view.current);
    };
    const local = (clientX: number, clientY: number): Point => {
      const rect = element.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const zoom = (factor: number, anchor: Point): PanZoomView => {
      const current = view.current;
      const scale = Math.max(minScale, Math.min(maxScale, current.scale * factor));
      const ratio = scale / current.scale;
      const x = anchor.x - size.width / 2;
      const y = anchor.y - size.height / 2;
      return { scale, x: x - (x - current.x) * ratio, y: y - (y - current.y) * ratio };
    };
    const resize = () => {
      const rect = element.getBoundingClientRect();
      size = { width: Math.max(1, rect.width), height: Math.max(1, rect.height) };
      publish(view.current);
    };
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? size.height : 1;
      publish(zoom(Math.exp(-event.deltaY * unit * (event.ctrlKey ? .012 : .0025)), local(event.clientX, event.clientY)));
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0 || (event.target instanceof Element && event.target.closest('button, a, input, video'))) return;
      const point = local(event.clientX, event.clientY);
      if (pointers.size === 0) { origin = point; multiTouch = false; }
      else multiTouch = true;
      pointers.set(event.pointerId, point);
      element.setPointerCapture(event.pointerId);
      element.classList.add('is-panning');
    };
    const move = (event: PointerEvent) => {
      const previous = pointers.get(event.pointerId);
      if (!previous) return;
      const before = [...pointers.values()];
      const point = local(event.clientX, event.clientY);
      pointers.set(event.pointerId, point);
      if (pointers.size === 1) {
        publish({ ...view.current, x: view.current.x + point.x - previous.x, y: view.current.y + point.y - previous.y });
      } else {
        const after = [...pointers.values()];
        const center = (points: Point[]) => ({ x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 });
        const distance = (points: Point[]) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        const oldCenter = center(before);
        const newCenter = center(after);
        const next = zoom(distance(after) / Math.max(1, distance(before)), oldCenter);
        publish({ ...next, x: next.x + newCenter.x - oldCenter.x, y: next.y + newCenter.y - oldCenter.y });
      }
    };
    const release = (event: PointerEvent) => {
      const last = pointers.size === 1 && pointers.has(event.pointerId);
      pointers.delete(event.pointerId);
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
      if (pointers.size === 0) element.classList.remove('is-panning');
      if (last && origin && !multiTouch && view.current.scale === 1 && event.type === 'pointerup') {
        const point = local(event.clientX, event.clientY);
        const dx = point.x - origin.x; const dy = point.y - origin.y;
        origin = null;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx < 0 ? 1 : -1);
      }
    };
    const keydown = (event: KeyboardEvent) => {
      const arrows: Record<string, Point> = { ArrowLeft: { x: 60, y: 0 }, ArrowRight: { x: -60, y: 0 }, ArrowUp: { x: 0, y: 60 }, ArrowDown: { x: 0, y: -60 } };
      if (view.current.scale === 1 && ['ArrowLeft', 'ArrowRight'].includes(event.key) && navigate(event.key === 'ArrowLeft' ? -1 : 1)) {
        event.preventDefault(); event.stopPropagation(); return;
      }
      const delta = arrows[event.key];
      if (delta) publish({ ...view.current, x: view.current.x + delta.x, y: view.current.y + delta.y });
      else if (['+', '=', '-'].includes(event.key)) publish(zoom(event.key === '-' ? 1 / 1.25 : 1.25, { x: size.width / 2, y: size.height / 2 }));
      else if (event.key === '0') publish(initialView());
      else return;
      event.preventDefault();
      event.stopPropagation();
    };
    const doubleClick = (event: MouseEvent) => publish(view.current.scale > 1 ? initialView() : zoom(2, local(event.clientX, event.clientY)));
    const load = () => publish(view.current);
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('pointerdown', down);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerup', release);
    element.addEventListener('pointercancel', release);
    element.addEventListener('lostpointercapture', release);
    element.addEventListener('keydown', keydown);
    element.addEventListener('dblclick', doubleClick);
    element.addEventListener('load', load, true);
    return () => {
      observer.disconnect();
      for (const id of pointers.keys()) if (element.hasPointerCapture(id)) element.releasePointerCapture(id);
      pointers.clear();
      element.classList.remove('is-panning');
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', release);
      element.removeEventListener('pointercancel', release);
      element.removeEventListener('lostpointercapture', release);
      element.removeEventListener('keydown', keydown);
      element.removeEventListener('dblclick', doubleClick);
      element.removeEventListener('load', load, true);
    };
  }, [ref, minScale, maxScale]);
  return view;
}
