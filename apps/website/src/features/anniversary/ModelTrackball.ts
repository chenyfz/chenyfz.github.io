// Model rotation follows the original Eberhard Graether TrackballControls math.
// Camera, vectors and model now all come from the same installed Three.js version.
import { Quaternion, Vector2, Vector3, type Camera, type Object3D } from 'three';

export class ModelTrackball {
  private target = new Vector3();
  private previous = new Vector2();
  private current = new Vector2();
  private axis = new Vector3();
  private lastAngle = 0;
  private zoom = 0;
  private pan = new Vector2();
  private pointers = new Map<number, Vector2>();
  private mode = 0;
  private pinchDistance = 0;
  private pinchCenter = new Vector2();
  private abort = new AbortController();
  private previousTouchAction: string;
  private quaternion = new Quaternion();
  constructor(private camera: Camera, private element: HTMLElement, private model: Object3D, private invalidate: () => void) {
    this.previousTouchAction = element.style.touchAction;
    element.style.touchAction = 'none';
    const options = { signal: this.abort.signal };
    element.addEventListener('pointerdown', this.down, options);
    element.addEventListener('pointermove', this.move, options);
    element.addEventListener('pointerup', this.up, options);
    element.addEventListener('pointercancel', this.up, options);
    element.addEventListener('lostpointercapture', this.up, options);
    element.addEventListener('wheel', this.wheel, { ...options, passive: false });
    element.addEventListener('contextmenu', event => event.preventDefault(), options);
  }
  private circle(point: Vector2) {
    const box = this.element.getBoundingClientRect();
    return new Vector2((point.x - box.left - box.width / 2) / (box.width / 2), (box.height + 2 * (box.top - point.y)) / box.width);
  }
  private pinch() {
    const [a, b] = [...this.pointers.values()];
    return { distance: Math.max(1, a.distanceTo(b)), center: a.clone().add(b).multiplyScalar(0.5) };
  }
  private down = (event: PointerEvent) => {
    event.preventDefault();
    this.element.setPointerCapture(event.pointerId);
    this.pointers.set(event.pointerId, new Vector2(event.clientX, event.clientY));
    this.mode = event.button;
    this.lastAngle = 0;
    if (this.pointers.size > 1) {
      const pinch = this.pinch(); this.pinchDistance = pinch.distance; this.pinchCenter.copy(pinch.center);
    } else { this.current.copy(this.circle(this.pointers.get(event.pointerId)!)); this.previous.copy(this.current); }
    this.invalidate();
  };
  private move = (event: PointerEvent) => {
    const previous = this.pointers.get(event.pointerId);
    if (!previous) return;
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    previous.set(event.clientX, event.clientY);
    const box = this.element.getBoundingClientRect();
    if (this.pointers.size > 1) {
      const pinch = this.pinch();
      this.camera.position.sub(this.target).multiplyScalar(this.pinchDistance / pinch.distance).add(this.target);
      this.pan.x += (pinch.center.x - this.pinchCenter.x) / box.width;
      this.pan.y += (pinch.center.y - this.pinchCenter.y) / box.height;
      this.pinchDistance = pinch.distance; this.pinchCenter.copy(pinch.center);
    } else if (this.mode === 0) { this.current.copy(this.circle(previous)); }
    else if (this.mode === 1) this.zoom += dy / box.height;
    else if (this.mode === 2) { this.pan.x += dx / box.width; this.pan.y += dy / box.height; }
    this.invalidate();
  };
  private up = (event: PointerEvent) => {
    this.pointers.delete(event.pointerId);
    if (this.element.hasPointerCapture(event.pointerId)) this.element.releasePointerCapture(event.pointerId);
    if (this.pointers.size === 1) {
      this.current.copy(this.circle([...this.pointers.values()][0])); this.previous.copy(this.current);
    }
    this.invalidate();
  };
  private wheel = (event: WheelEvent) => {
    event.preventDefault();
    this.zoom += event.deltaY * (event.deltaMode === 2 ? 0.025 : event.deltaMode === 1 ? 0.01 : 0.00025);
    this.invalidate();
  };
  update(delta = 1 / 60, reducedMotion = false): boolean {
    const frames = Math.min(3, Math.max(0.1, delta * 60));
    const damping = reducedMotion ? 1 : 1 - Math.pow(0.8, frames);
    const eye = this.camera.position.clone().sub(this.target);
    const movement = this.current.clone().sub(this.previous);
    let angle = movement.length();
    if (angle) {
      const up = this.camera.up.clone().normalize().setLength(movement.y);
      const side = new Vector3().crossVectors(this.camera.up, eye).normalize().setLength(movement.x);
      this.axis.crossVectors(up.add(side), eye).normalize().negate();
      this.lastAngle = angle;
    } else {
      this.lastAngle *= reducedMotion ? 0 : Math.pow(Math.sqrt(0.8), frames);
      angle = this.lastAngle * frames;
    }
    if (Math.abs(angle) > 0.00001) this.model.applyQuaternion(this.quaternion.setFromAxisAngle(this.axis, angle));
    this.previous.copy(this.current);
    const factor = Math.max(0.1, 1 + this.zoom * 1.2 * frames);
    eye.multiplyScalar(factor).clampLength(1, 1500);
    this.zoom *= 1 - damping;
    if (this.pan.lengthSq()) {
      const shift = new Vector3().crossVectors(eye, this.camera.up).setLength(this.pan.x * eye.length() * 0.3 * frames)
        .add(this.camera.up.clone().setLength(this.pan.y * eye.length() * 0.3 * frames));
      this.target.add(shift); this.pan.multiplyScalar(1 - damping);
    }
    this.camera.position.copy(this.target).add(eye);
    this.camera.lookAt(this.target);
    return Math.abs(this.lastAngle) > 0.00001 || Math.abs(this.zoom) > 0.00001 || this.pan.lengthSq() > 0.00000001;
  }
  handleResize() { this.invalidate(); }
  dispose() {
    this.abort.abort();
    for (const id of this.pointers.keys()) if (this.element.hasPointerCapture(id)) this.element.releasePointerCapture(id);
    this.pointers.clear(); this.element.style.touchAction = this.previousTouchAction;
  }
}
