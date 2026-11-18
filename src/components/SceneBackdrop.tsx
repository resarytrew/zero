import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { SCENE_IMAGES } from '../game/codexData';
import type { SceneId } from '../game/types';

interface SceneBackdropProps {
  scene: SceneId;
  alt: string;
}

export function SceneBackdrop({ scene, alt }: SceneBackdropProps) {
  const [failedScenes, setFailedScenes] = useState<Record<string, boolean>>({});
  const src = SCENE_IMAGES[scene];
  const hasFailed = Boolean(failedScenes[scene]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#071b2b]">
      <AnimatePresence initial={false}>
        <motion.div
          key={scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {!hasFailed ? (
            <img
              src={src}
              alt={alt}
              referrerPolicy="no-referrer"
              onError={() =>
                setFailedScenes((prev) => ({ ...prev, [scene]: true }))
              }
              className="h-full w-full object-cover object-center select-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b2a42] via-[#0e3652] to-[#071b2b] p-8">
              <div className="text-center text-slate-300">
                <p className="font-display text-2xl text-amber-200">{alt}</p>
              </div>
            </div>
          )}

          {/* Subtle cinematic vignette & readability scrim at bottom-right & top bar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#051523]/75 via-transparent to-[#051523]/40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#051523]/55"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
