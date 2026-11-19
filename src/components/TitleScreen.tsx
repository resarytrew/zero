import { motion } from 'motion/react';
import { SCENE_IMAGES } from '../game/codexData';
import { ParchmentBackdrop } from './StorybookFrames';

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
    <div className="relative flex h-full w-full items-center overflow-hidden bg-[#0e394e]">
      <img
        src={SCENE_IMAGES.attic}
        alt="Школьный чердак с волшебным компасом"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover object-center select-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#092738]/75 via-[#0b2f42]/45 to-transparent"
      />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-4 max-w-xl overflow-visible p-7 text-[#152d3c] sm:ml-14 sm:p-9 md:ml-20"
      >
        <ParchmentBackdrop notch={16} />
        <div className="relative z-10 mb-4 flex items-center gap-4">
          <svg
            viewBox="0 0 72 72"
            className="h-16 w-16 shrink-0 drop-shadow-md"
            aria-hidden="true"
          >
            <circle
              cx="36"
              cy="36"
              r="32"
              fill="#0d3549"
              stroke="#e5b34f"
              strokeWidth="3"
            />
            <circle
              cx="36"
              cy="36"
              r="24"
              fill="none"
              stroke="#78cde0"
              strokeWidth="1.3"
              strokeDasharray="4 3"
            />
            <polygon points="36,8 40,18 32,18" fill="#f6c959" />
            <polygon points="36,64 40,54 32,54" fill="#78cde0" />
            <text
              x="36"
              y="44"
              textAnchor="middle"
              fill="#ffd45c"
              fontSize="24"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              X
            </text>
          </svg>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.09em] text-[#a8461c]">
              Образовательная визуальная новелла · 5–6 класс
            </p>
            <h1 className="font-display mt-1 text-2xl font-extrabold leading-tight text-[#0d3347] sm:text-4xl text-balance">
              Алёша и Остров Неизвестных
            </h1>
          </div>
        </div>

        <p className="relative z-10 mb-6 max-w-lg text-[15px] leading-relaxed font-medium text-[#214254]">
          Нелинейный алгебраический квест, где каждое решение, выбранный способ рассуждения и точность уравнений открывают одну из пяти концовок.
        </p>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          {hasSavedProgress ? (
            <>
              <button
                type="button"
                data-start="true"
                onClick={onContinue}
                className="storybook-btn-primary min-h-[48px] rounded-full px-6 py-3 text-base font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
              >
                Продолжить путь
              </button>
              <button
                type="button"
                onClick={onStartNew}
                className="storybook-btn-sky min-h-[48px] rounded-full px-5 py-3 text-base font-bold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
              >
                Начать заново
              </button>
            </>
          ) : (
            <button
              type="button"
              data-start="true"
              onClick={onStartNew}
              className="storybook-btn-primary min-h-[48px] rounded-full px-7 py-3.5 text-base font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
            >
              Начать приключение
            </button>
          )}
        </div>
      </motion.main>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-10 px-6 text-xs font-semibold text-[#fdf3da]/90 drop-shadow sm:px-20">
        Enter или Пробел — начать · Esc — пауза и меню · 5 ветвящихся концовок
      </div>
    </div>
  );
}
