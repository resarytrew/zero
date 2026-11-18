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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04101c]/82 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md rounded-xl border border-[#4a8ab5]/75 bg-[#082c48] p-6 shadow-2xl"
      >
        <h2 className="font-display text-2xl font-bold text-white">
          Пауза и настройки
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          Твой прогресс автоматически сохранён в Кодексе.
        </p>

        {/* Unboxed Hairline Divider Metric Strip */}
        <div className="my-5 grid grid-cols-3 divide-x divide-[#3a7ca5]/40 border-y border-[#3a7ca5]/40 py-3 text-center">
          <div>
            <div className="text-[11px] text-slate-300">Равновесие</div>
            <div className="font-math mt-0.5 text-lg font-bold text-emerald-300 tabular-nums">
              {balanceIntegrity}%
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-300">Законы</div>
            <div className="font-math mt-0.5 text-lg font-bold text-amber-300 tabular-nums">
              {unlockedLawsCount}/6
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-300">Районы</div>
            <div className="font-math mt-0.5 text-lg font-bold text-sky-300 tabular-nums">
              {completedDistrictsCount}/4
            </div>
          </div>
        </div>

        {/* Reading Pace Toggle */}
        <div className="mb-5 flex items-center justify-between gap-3 rounded-lg bg-[#051d30] px-3.5 py-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <Zap className="h-4 w-4 shrink-0 text-amber-300" />
            <span>Подача текста реплик</span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={instantText}
            onClick={onToggleInstantText}
            className={`min-h-[34px] rounded-md border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-amber-300 whitespace-nowrap ${
              instantText
                ? 'border-amber-300 bg-amber-400 text-slate-950'
                : 'border-[#4a8ab5]/70 bg-[#0d3d61] text-sky-100 hover:bg-[#15527f]'
            }`}
          >
            {instantText ? 'Мгновенно' : 'Плавная'}
          </button>
        </div>

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={onResume}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Play className="h-4 w-4" />
            <span>Продолжить игру</span>
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[#4a8ab5]/70 bg-[#0d3d61] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#15527f] focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Начать заново</span>
          </button>

          <button
            type="button"
            onClick={onReturnToTitle}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-slate-500/40 bg-[#062238] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-[#0d3554] focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <Home className="h-4 w-4" />
            <span>На главный экран</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
