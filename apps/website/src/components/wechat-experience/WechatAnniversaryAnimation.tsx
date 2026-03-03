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
const DISPLAY_MODEL_SCALE = 2;
const CAMERA_FOV = 18;
const CAMERA_NEAR = 1;
const CAMERA_FAR = 1600;
const CAMERA_POSITION = new THREE.Vector3(35, 20, 35);

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

export default function WechatAnniversaryAnimation() {
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
    let cycleIntervalId: number | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let envMap: THREE.CubeTexture | null = null;
    let rotatingRoot: THREE.Group | null = null;
    let model: THREE.Object3D | null = null;
    let control: TrackballControlInstance | null = null;
    let activeAction: THREE.AnimationAction | null = null;

    const actions: Record<string, THREE.AnimationAction> = {};
    const clock = new THREE.Clock();
    const timeoutIds: number[] = [];

    const cleanupTimers = () => {
      while (timeoutIds.length > 0) {
        const id = timeoutIds.pop();
        if (id !== undefined) window.clearTimeout(id);
      }
    };

    const queueTimeout = (handler: () => void, delay: number) => {
      const id = window.setTimeout(handler, delay);
      timeoutIds.push(id);
    };

    const playExpandAnimation = () => {
      if (!mixer || !actions.expand || !actions.rolling) return;

      mixer.stopAllAction();
      activeAction = actions.expand;
      activeAction
        .crossFadeTo(actions.expand, 0.35)
        .setEffectiveTimeScale(1)
        .play();

      queueTimeout(() => {
        if (!activeAction || !actions.rolling) return;
        activeAction = activeAction.crossFadeTo(actions.rolling).play().setLoop(THREE.LoopRepeat, Infinity);
      }, actions.expand.getClip().duration * 1000);
    };

    const cancelExpandAnimation = () => {
      if (!mixer || !actions.expand || !actions.rolling) return;

      activeAction = actions.rolling;
      mixer.stopAllAction();

      activeAction
        .crossFadeTo(actions.expand, 0.35)
        .setLoop(THREE.LoopRepeat, 1)
        .setEffectiveTimeScale(-1)
        .play();
    };

    const startCycle = () => {
      playExpandAnimation();
      queueTimeout(cancelExpandAnimation, 5000);
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
          actions.rolling.setLoop(THREE.LoopOnce, 1);
          actions.rolling.clampWhenFinished = true;

          startCycle();
          cycleIntervalId = window.setInterval(startCycle, 9000);
        }

        resize();
      })
      .catch(() => {
        // noop
      });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    window.addEventListener('resize', resize);

    resize();
    animate();

    return () => {
      disposed = true;
      cleanupTimers();
      resizeObserver.disconnect();
      window.removeEventListener('resize', resize);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (cycleIntervalId !== null) {
        window.clearInterval(cycleIntervalId);
      }

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
      className="mx-auto aspect-square w-full max-w-[26rem] overflow-hidden border border-emerald-500/80"
      aria-label="WeChat anniversary 3D animation"
    />
  );
}
