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
        className="relative z-10 mx-4 max-w-xl rounded-[20px] border-[3px] border-[#df9d36] bg-[radial-gradient(ellipse_at_top_left,#fff9ea_0%,#faecc9_56%,#f2da9f_100%)] p-6 text-[#152d3c] ring-1 ring-inset ring-[#fff8e6]/85 shadow-[0_0_0_2px_rgba(148,92,18,0.75),0_24px_60px_rgba(4,18,28,0.68),inset_0_0_30px_rgba(196,144,58,0.2)] sm:ml-14 sm:p-8 md:ml-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6px] rounded-[13px] border border-[#d69c3c]/60"
        />
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
                className="min-h-[46px] rounded-full border-2 border-[#8b3c07] bg-gradient-to-b from-[#ef932e] via-[#df7519] to-[#c75b0e] px-6 py-3 text-base font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_12px_rgba(8,32,46,0.22)] transition-all hover:from-[#f69f3f] hover:to-[#d96915] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
              >
                Продолжить путь
              </button>
              <button
                type="button"
                onClick={onStartNew}
                className="min-h-[46px] rounded-full border-2 border-[#3c7b90] bg-gradient-to-b from-[#cbeaf2] to-[#98cddc] px-5 py-3 text-base font-bold text-[#0c2d3e] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_2px_6px_rgba(8,32,46,0.16)] transition-all hover:brightness-97 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
              >
                Начать заново
              </button>
            </>
          ) : (
            <button
              type="button"
              data-start="true"
              onClick={onStartNew}
              className="min-h-[48px] rounded-full border-2 border-[#8b3c07] bg-gradient-to-b from-[#ef932e] via-[#df7519] to-[#c75b0e] px-7 py-3.5 text-base font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_12px_rgba(8,32,46,0.22)] transition-all hover:from-[#f69f3f] hover:to-[#d96915] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
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
