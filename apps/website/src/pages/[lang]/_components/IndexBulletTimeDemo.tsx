import { useState } from 'react';
import BulletTimeSlotOverlay from '@/components/BulletTimeSlotOverlay';

const bgWords = [
  'FOCUS SHIFT',
  'LINK TIME',
  'MOTION VECTOR',
  'TRACKING',
  'PARALLAX',
  'KINETIC',
  'LOCK-ON',
  'INERTIA',
  'DEPTH'
];

export default function IndexBulletTimeDemo() {
  const [open, setOpen] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const trigger = () => {
    console.log('[IndexBulletTimeDemo] trigger clicked');
    setRunKey((prev) => prev + 1);
    setOpen(true);
  };

  return (
    <section className="relative mt-6 flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-xl bg-black px-5 py-10 text-white">
      <div className="mb-8 flex items-center gap-3">
        <button
          type="button"
          onClick={trigger}
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          触发上抛
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md border border-white/35 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          关闭覆盖层
        </button>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-x-8 gap-y-4 text-center text-sm sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 20 }, (_, idx) => (
          <p key={idx} className="font-bold tracking-wide text-white/90">
            {bgWords[idx % bgWords.length]} #{idx + 1}
          </p>
        ))}
      </div>

      <BulletTimeSlotOverlay
        key={runKey}
        isOpen={open}
        onClose={() => setOpen(false)}
        layoutClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div className="h-[clamp(118px,24vw,180px)] w-[clamp(118px,24vw,180px)] rounded-[4px] bg-white/10 p-3 text-xs font-semibold text-white">
          Item A
        </div>
        <div className="h-[clamp(118px,24vw,180px)] w-[clamp(118px,24vw,180px)] rounded-[4px] bg-white/10 p-3 text-xs font-semibold text-white">
          Item B
        </div>
        <div className="h-[clamp(118px,24vw,180px)] w-[clamp(118px,24vw,180px)] rounded-[4px] bg-white/10 p-3 text-xs font-semibold text-white">
          Item C
        </div>
        <div className="h-[clamp(118px,24vw,180px)] w-[clamp(118px,24vw,180px)] rounded-[4px] bg-white/10 p-3 text-xs font-semibold text-white">
          Item D
        </div>
      </BulletTimeSlotOverlay>
    </section>
  );
}
