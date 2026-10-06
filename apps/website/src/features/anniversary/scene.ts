import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ModelTrackball } from './ModelTrackball';
import { envUrls } from './environment';
import { disposeMaterials, disposeModel } from './dispose';
const CLIP_FPS = 30;
const DISPLAY_MODEL_SCALE = 1;
const CAMERA_FOV = 18;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 1600;
const CAMERA_POSITION = new THREE.Vector3(35, 20, 35);
const FORWARD_BLEND_DURATION = 0.35;
const REVERSE_BLEND_DURATION = 0.35;
const CLICK_DRAG_THRESHOLD_SQ = 36;

type PlaybackState = 'collapsed' | 'opening' | 'expanded' | 'closing';
type MixerFinishedEvent = {
  action?: THREE.AnimationAction;
  direction?: number;
};

const MATERIAL_CONFIGS = [
  { metalness: 0.95, roughness: 0.1, color: 0xf7c663 },
  { metalness: 0.95, roughness: 0.1, color: 0xe68754 },
  { metalness: 0.95, roughness: 0.1, color: 0xd0d4dd }
];

function randomMaterialConfig() {
  return MATERIAL_CONFIGS[Math.floor(Math.random() * MATERIAL_CONFIGS.length)];
}

function createClipSegment(
  source: THREE.AnimationClip,
  name: string,
  startFrame: number,
  endFrame: number,
  fps: number,
  shiftToZero: boolean
) {
  const clip = source.clone();
  const start = startFrame / fps;
  const end = endFrame / fps;

  clip.name = name;
  clip.duration = Math.max(0.001, end - start);
  clip.tracks.forEach((track) => track.trim(start, end));

  if (shiftToZero) {
    clip.tracks.forEach((track) => {
      track.times = track.times.map((time) => time - start);
    });
  }

  return clip;
}

export function createAnniversaryScene(mount: HTMLElement, options: { reducedMotion: boolean }) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, CAMERA_NEAR, CAMERA_FAR);
    camera.position.copy(CAMERA_POSITION);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    let rafId: number | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let envMap: THREE.CubeTexture | null = null;
    let rotatingRoot: THREE.Group | null = null;
    let model: THREE.Object3D | null = null;
    let control: ModelTrackball | null = null;
    let playbackState: PlaybackState = 'collapsed';
    let activePointerId: number | null = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerMoved = false;

    const actions: Partial<Record<'expand' | 'rolling', THREE.AnimationAction>> = {};
    const timer = new THREE.Timer();
    timer.connect(document);
    let active = true;
    let disposed = false;
    let reducedMotion = options.reducedMotion;
    const invalidate = () => { if (!disposed && active && !document.hidden && rafId === null) rafId = requestAnimationFrame(animate); };
    const playRollingLoop = () => {
      const expand = actions.expand;
      const rolling = actions.rolling;
      if (!expand || !rolling) return;

      rolling.reset();
      rolling.setLoop(THREE.LoopRepeat, Infinity);
      rolling.clampWhenFinished = false;
      rolling.setEffectiveTimeScale(1);
      rolling.play();

      expand.crossFadeTo(rolling, FORWARD_BLEND_DURATION, false);
      playbackState = 'expanded';
    };

    const playExpandForward = () => {
      const expand = actions.expand;
      if (!expand) return;

      actions.rolling?.stop();

      expand.reset();
      expand.time = 0;
      expand.setLoop(THREE.LoopOnce, 1);
      expand.clampWhenFinished = true;
      expand.setEffectiveTimeScale(1);
      expand.play();

      playbackState = 'opening';
    };

    const setExpandDirection = (direction: 1 | -1) => {
      const expand = actions.expand;
      if (!expand) return;

      expand.enabled = true;
      expand.paused = false;
      expand.setLoop(THREE.LoopOnce, 1);
      expand.clampWhenFinished = true;

      if (direction === -1 && expand.time <= 0) {
        expand.time = expand.getClip().duration;
      }

      expand.setEffectiveTimeScale(direction);
      expand.play();
    };

    const playExpandReverseFromRolling = () => {
      const expand = actions.expand;
      const rolling = actions.rolling;
      if (!expand) return;

      expand.reset();
      expand.time = expand.getClip().duration;
      expand.setLoop(THREE.LoopOnce, 1);
      expand.clampWhenFinished = true;
      expand.setEffectiveTimeScale(-1);
      expand.play();

      rolling?.crossFadeTo(expand, REVERSE_BLEND_DURATION, false);
      playbackState = 'closing';
    };

    const toggleAnimation = () => {
      if (!actions.expand) return;

      if (playbackState === 'collapsed') {
        playExpandForward();
        return;
      }

      if (playbackState === 'opening') {
        setExpandDirection(-1);
        playbackState = 'closing';
        return;
      }

      if (playbackState === 'expanded') {
        playExpandReverseFromRolling();
        return;
      }

      setExpandDirection(1);
      playbackState = 'opening';
    };

    const onMixerFinished = (event: MixerFinishedEvent) => {
      const { action, direction } = event as MixerFinishedEvent;

      if (!actions.expand || action !== actions.expand || direction === undefined) {
        return;
      }

      if (direction === 1 && playbackState === 'opening') {
        playRollingLoop();
        return;
      }

      if (direction === -1) {
        actions.rolling?.stop();
        playbackState = 'collapsed';
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) { pointerMoved = true; return; }
      if (event.pointerType === 'mouse' && event.button !== 0) return;

      activePointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerMoved = false;
    };

    const clearActivePointer = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) return;
      activePointerId = null;
      pointerMoved = false;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) return;

      const dx = event.clientX - pointerStartX;
      const dy = event.clientY - pointerStartY;

      if (dx * dx + dy * dy > CLICK_DRAG_THRESHOLD_SQ) {
        pointerMoved = true;
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (activePointerId !== event.pointerId) return;

      const shouldToggle = !pointerMoved;
      activePointerId = null;
      pointerMoved = false;

      if (shouldToggle) {
        toggleAnimation();
        invalidate();
      }
    };

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, true);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      control?.handleResize();
      invalidate();
    };

    const animate = (timestamp: number) => {
      rafId = null;
      if (disposed || !active || document.hidden) return;
      timer.update(timestamp);
      const delta = Math.min(timer.getDelta(), 1 / 30);
      if (mixer) mixer.update(delta);
      const moving = control?.update(delta, reducedMotion);
      renderer.render(scene, camera);
      if (moving || playbackState === 'opening' || playbackState === 'closing' || (playbackState === 'expanded' && !reducedMotion)) invalidate();
    };

    const gltfLoader = new GLTFLoader();
    const ready = gltfLoader.loadAsync('/wechat-anniversary/assets/v23.glb')
      .then((gltfData) => {
        if (disposed) { disposeModel(gltfData.scene); return; }
        envMap = new THREE.CubeTextureLoader().load(envUrls, invalidate);
        scene.environment = envMap;
        model = gltfData.scene.children[0] ?? gltfData.scene;
        const originals: THREE.Material[] = [];
        model.traverse(node => {
          const mesh = node as THREE.Mesh;
          if (!mesh.isMesh) return;
          originals.push(...(Array.isArray(mesh.material) ? mesh.material : [mesh.material]));
          mesh.frustumCulled = false;
          mesh.material = new THREE.MeshStandardMaterial({ ...randomMaterialConfig(), envMap, envMapIntensity: 2 });
        });
        disposeMaterials(originals);
        rotatingRoot = new THREE.Group();
        rotatingRoot.name = 'interaction-root';
        while (model.children.length) rotatingRoot.add(model.children[0]);
        const center = new THREE.Box3().setFromObject(rotatingRoot).getCenter(new THREE.Vector3());
        rotatingRoot.position.sub(center);
        rotatingRoot.scale.setScalar(DISPLAY_MODEL_SCALE);
        model.add(rotatingRoot);
        scene.add(model);
        control = new ModelTrackball(camera, renderer.domElement, rotatingRoot, invalidate);
        const baseAnimation = gltfData.animations[0];
        if (baseAnimation) {
          mixer = new THREE.AnimationMixer(model);
          const expand = createClipSegment(baseAnimation, 'expand', 0, 64, CLIP_FPS, false);
          const rolling = createClipSegment(baseAnimation, 'rolling', 71, 150, CLIP_FPS, true);
          actions.expand = mixer.clipAction(expand);
          actions.rolling = mixer.clipAction(rolling);
          actions.expand.setLoop(THREE.LoopOnce, 1);
          actions.expand.clampWhenFinished = true;
          actions.rolling.setLoop(THREE.LoopRepeat, Infinity);
          mixer.addEventListener('finished', onMixerFinished);
        }
        resize();
        invalidate();
      });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener('resize', resize);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', clearActivePointer);

    const visibilityChanged = () => { timer.reset(); invalidate(); };
    document.addEventListener('visibilitychange', visibilityChanged);
    resize();
    invalidate();

    const dispose = () => {
      disposed = true;
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', clearActivePointer);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      mixer?.removeEventListener('finished', onMixerFinished);

      control?.dispose();

      renderer.dispose();

      if (model) { mixer?.stopAllAction(); mixer?.uncacheRoot(model); }
      const disposedTextures = disposeModel(scene);
      if (envMap && !disposedTextures.has(envMap)) envMap.dispose();
      timer.dispose();
      renderer.forceContextLoss();
      document.removeEventListener('visibilitychange', visibilityChanged);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
    return { ready, dispose, toggle: () => { toggleAnimation(); invalidate(); },
      setActive: (value: boolean) => { active = value; timer.reset(); if (!value && rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } invalidate(); },
      setReducedMotion: (value: boolean) => { reducedMotion = value; invalidate(); } };
}
