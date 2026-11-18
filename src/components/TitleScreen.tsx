import { motion } from 'motion/react';
import { SCENE_IMAGES } from '../game/codexData';

interface TitleScreenProps {
  hasSavedProgress: boolean;
  onStartNew: () => void;
  onContinue: () => void;
}

export function TitleScreen({
  hasSavedProgress,
  onStartNew,
  onContinue,
}: TitleScreenProps) {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden bg-[#071b2b]">
      <img
        src={SCENE_IMAGES.attic}
        alt="Школьный чердак с волшебным компасом"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-center select-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#051422]/92 via-[#071e31]/75 to-[#051422]/30"
      />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-6 max-w-xl sm:ml-14 md:ml-20"
      >
        {/* Custom Inline SVG Title Lockup / Compass Crest */}
        <div className="mb-5 flex items-center gap-4">
          <svg
            viewBox="0 0 72 72"
            className="h-16 w-16 shrink-0 drop-shadow-lg"
            aria-hidden="true"
          >
            <circle
              cx="36"
              cy="36"
              r="32"
              fill="#0b2840"
              stroke="#fbbf24"
              strokeWidth="2.5"
            />
            <circle
              cx="36"
              cy="36"
              r="24"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeDasharray="4 3"
            />
            <polygon points="36,8 40,18 32,18" fill="#fbbf24" />
            <polygon points="36,64 40,54 32,54" fill="#38bdf8" />
            <text
              x="36"
              y="44"
              textAnchor="middle"
              fill="#fde68a"
              fontSize="24"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              X
            </text>
          </svg>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Образовательная визуальная новелла · 5–6 класс
            </p>
            <h1 className="font-display mt-1 text-3xl font-bold leading-tight text-white sm:text-5xl text-balance">
              Алёша и Остров Неизвестных
            </h1>
          </div>
        </div>

        <p className="mb-7 max-w-lg text-base leading-relaxed text-slate-200">
          Нелинейный алгебраический квест, где каждое решение, выбранный способ рассуждения и точность уравнений открывают одну из пяти концовок.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {hasSavedProgress ? (
            <>
              <button
                type="button"
                data-start="true"
                onClick={onContinue}
                className="rounded-lg bg-amber-400 px-6 py-3 text-base font-bold text-slate-950 shadow-lg transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
              >
                Продолжить путь
              </button>
              <button
                type="button"
                onClick={onStartNew}
                className="rounded-lg border border-sky-300/60 bg-[#0a304d]/85 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#134a73] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 whitespace-nowrap"
              >
                Начать заново
              </button>
            </>
          ) : (
            <button
              type="button"
              data-start="true"
              onClick={onStartNew}
              className="rounded-lg bg-amber-400 px-7 py-3.5 text-base font-bold text-slate-950 shadow-lg transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
            >
              Начать приключение
            </button>
          )}
        </div>
      </motion.main>

      {/* Flat borderless control hint in bottom safe margin */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 px-6 text-xs text-slate-300/80 sm:px-20">
        Enter или Пробел — начать · Esc — пауза и меню · 5 ветвящихся концовок
      </div>
    </div>
  );
}
