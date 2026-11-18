import { Home, Play, RotateCcw, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface PauseModalProps {
  balanceIntegrity: number;
  unlockedLawsCount: number;
  completedDistrictsCount: number;
  instantText: boolean;
  onToggleInstantText: () => void;
  onResume: () => void;
  onRestart: () => void;
  onReturnToTitle: () => void;
}

export function PauseModal({
  balanceIntegrity,
  unlockedLawsCount,
  completedDistrictsCount,
  instantText,
  onToggleInstantText,
  onResume,
  onRestart,
  onReturnToTitle,
}: PauseModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Пауза"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#061e2b]/78 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md rounded-[20px] border-[3px] border-[#df9d36] bg-[radial-gradient(ellipse_at_top_left,#fff9ea_0%,#faecc9_56%,#f2da9f_100%)] p-6 text-[#152d3c] ring-1 ring-inset ring-[#fff8e6]/85 shadow-[0_0_0_2px_rgba(148,92,18,0.75),0_24px_60px_rgba(4,18,28,0.75)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6px] rounded-[13px] border border-[#d69c3c]/60"
        />
        <div className="relative z-10 flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-flex items-center">
            <span className="h-[2px] w-4 bg-[#e09226]" />
            <span className="h-2.5 w-2.5 rotate-45 border-[1.5px] border-[#d98520] bg-[#fff8e6]" />
            <span className="h-[2px] w-3 bg-[#e09226]" />
          </span>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide text-[#0d3347]">
            Пауза и настройки
          </h2>
        </div>
        <p className="relative z-10 mt-1 text-sm font-semibold text-[#47687a]">
          Твой прогресс автоматически сохранён в Кодексе.
        </p>

        {/* Unboxed Hairline Divider Metric Strip */}
        <div className="relative z-10 my-5 grid grid-cols-3 divide-x divide-[#d4b068] border-y border-[#d4b068] py-3 text-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-[#47687a]">
              Равновесие
            </div>
            <div className="font-math mt-0.5 text-lg font-extrabold text-[#127662] tabular-nums">
              {balanceIntegrity}%
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-[#47687a]">
              Законы
            </div>
            <div className="font-math mt-0.5 text-lg font-extrabold text-[#b45811] tabular-nums">
              {unlockedLawsCount}/6
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wide text-[#47687a]">
              Районы
            </div>
            <div className="font-math mt-0.5 text-lg font-extrabold text-[#0e5b75] tabular-nums">
              {completedDistrictsCount}/4
            </div>
          </div>
        </div>

        {/* Reading Pace Toggle */}
        <div className="relative z-10 mb-5 flex items-center justify-between gap-3 rounded-2xl border-[1.5px] border-[#e5b55c]/90 bg-gradient-to-b from-[#14516c] to-[#0a3145] px-4 py-2.5 text-white shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#eaf6f8]">
            <Zap className="h-4 w-4 shrink-0 text-[#ffd859]" />
            <span>Подача текста реплик</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={instantText}
            onClick={onToggleInstantText}
            className={`min-h-[34px] rounded-full border px-3.5 py-1 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#ffd859] whitespace-nowrap ${
              instantText
                ? 'border-[#b46d14] bg-[#ffd859] text-[#0d2e3f]'
                : 'border-[#a3dae8]/75 bg-[#154c66] text-white hover:bg-[#1c6182]'
            }`}
          >
            {instantText ? 'Мгновенно' : 'Плавная'}
          </button>
        </div>

        <div className="relative z-10 space-y-2.5">
          <button
            type="button"
            onClick={onResume}
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border-2 border-[#8b3c07] bg-gradient-to-b from-[#ef932e] via-[#df7519] to-[#c75b0e] px-5 py-2.5 text-sm font-extrabold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_2px_6px_rgba(8,32,46,0.18)] transition-all hover:from-[#f69f3f] hover:to-[#d96915] focus-visible:outline-2 focus-visible:outline-[#0d3347]"
          >
            <Play className="h-4 w-4" />
            <span>Продолжить игру</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border-2 border-[#3c7b90] bg-gradient-to-b from-[#cbeaf2] to-[#98cddc] px-5 py-2.5 text-sm font-bold text-[#0c2d3e] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_2px_6px_rgba(8,32,46,0.16)] transition-all hover:brightness-97 focus-visible:outline-2 focus-visible:outline-[#0d3347]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Начать заново</span>
          </button>

          <button
            type="button"
            onClick={onReturnToTitle}
            className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full border-2 border-[#c8a663] bg-[#f0dcb0] px-5 py-2.5 text-sm font-bold text-[#3b2e17] transition-colors hover:bg-[#e7ce96] focus-visible:outline-2 focus-visible:outline-[#0d3347]"
          >
            <Home className="h-4 w-4" />
            <span>На главный экран</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
