import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type ResourceModule = {
  envUrls?: string[];
};

type TrackballControlInstance = {
  update: () => void;
  handleResize: () => void;
  dispose: () => void;
};

type TrackballControlCtor = new (
  object: THREE.Camera,
  domElement: HTMLElement,
  model: THREE.Object3D
) => TrackballControlInstance;

type TrackballModule = {
  TrackballControls: TrackballControlCtor;
};

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
type MixerFinishedEvent = THREE.Event & {
  action?: THREE.AnimationAction;
  direction?: 1 | -1;
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

interface WechatAnniversaryAnimationProps {
  className?: string;
}

export default function WechatAnniversaryAnimation({ className = '' }: WechatAnniversaryAnimationProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

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
    let control: TrackballControlInstance | null = null;
    let playbackState: PlaybackState = 'collapsed';
    let activePointerId: number | null = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerMoved = false;

    const actions: Partial<Record<'expand' | 'rolling', THREE.AnimationAction>> = {};
    const clock = new THREE.Clock();
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

    const onMixerFinished = (event: THREE.Event) => {
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
      if (!event.isPrimary) return;
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
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);

      if (clock && mixer) {
        const delta = Math.min(clock.getDelta(), 1 / 30);
        mixer.update(delta);
      }

      control?.update();
      renderer.render(scene, camera);
    };

    let disposed = false;
    const gltfLoader = new GLTFLoader();
    const resourceImportUrl = new URL('/wechat-anniversary/assets/resource.js', window.location.origin).href;
    const trackballImportUrl = new URL('/wechat-anniversary/demo/05/trackball-controller.js', window.location.origin).href;

    Promise.all([
      import(/* @vite-ignore */ resourceImportUrl) as Promise<ResourceModule>,
      import(/* @vite-ignore */ trackballImportUrl) as Promise<TrackballModule>,
      new Promise<{ scene: THREE.Group; animations: THREE.AnimationClip[] }>((resolve, reject) => {
        gltfLoader.load(
          '/wechat-anniversary/assets/v23.glb',
          (gltf) => resolve({ scene: gltf.scene, animations: gltf.animations }),
          undefined,
          (error) => reject(error)
        );
      })
    ])
      .then(([resourceModule, trackballModule, gltfData]) => {
        if (disposed) return;

        if (resourceModule.envUrls && resourceModule.envUrls.length === 6) {
          envMap = new THREE.CubeTextureLoader().load(resourceModule.envUrls);
          scene.environment = envMap;
        }

        model = gltfData.scene.children[0] as THREE.Object3D;

        model.traverse((node) => {
          const mesh = node as THREE.Mesh;
          if (!mesh.isMesh) return;

          mesh.frustumCulled = false;
          const config = randomMaterialConfig();
          mesh.material = new THREE.MeshStandardMaterial({
            ...config,
            envMap,
            envMapIntensity: 2
          });
        });

        rotatingRoot = new THREE.Group();
        rotatingRoot.name = 'interaction-root';

        const children = [...model.children];
        for (const child of children) {
          rotatingRoot.add(child);
        }

        const rotatingBounds = new THREE.Box3().setFromObject(rotatingRoot);
        const rotatingCenter = rotatingBounds.getCenter(new THREE.Vector3());
        rotatingRoot.position.sub(rotatingCenter);
        rotatingRoot.scale.setScalar(DISPLAY_MODEL_SCALE);
        model.add(rotatingRoot);

        scene.add(model);

        const TrackballControls = trackballModule.TrackballControls;
        control = new TrackballControls(camera, renderer.domElement, rotatingRoot);

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
          actions.rolling.clampWhenFinished = false;

          mixer.addEventListener('finished', onMixerFinished);
        }

        resize();
      })
      .catch(() => {
        // noop
      });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener('resize', resize);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', clearActivePointer);

    resize();
    animate();

    return () => {
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

      if (envMap) {
        envMap.dispose();
      }

      renderer.dispose();

      scene.traverse((node) => {
        const mesh = node as THREE.Mesh;
        if (!mesh.isMesh) return;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`mx-auto aspect-square w-full max-w-[26rem] overflow-hidden rounded-xl border border-black/10 dark:border-white/12 ${className}`}
      aria-label="WeChat anniversary 3D animation"
    />
  );
}
