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
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#0e394e]">
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
              className="h-full w-full object-cover object-center brightness-[1.03] contrast-[1.02] saturate-[1.06] select-none"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#134a66] via-[#0e3a52] to-[#0a2c3e] p-8">
              <div className="text-center text-[#fdf3da]">
                <p className="font-display text-2xl font-bold text-[#f6c959]">
                  {alt}
                </p>
              </div>
            </div>
          )}

          {/* Soft storybook edge vignette that preserves bright luminous scene artwork */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(7,32,46,0.34)_100%)]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
