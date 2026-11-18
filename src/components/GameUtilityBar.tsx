import { BookOpen, Compass, Pause, Volume2, VolumeX } from 'lucide-react';

interface GameUtilityBarProps {
  unlockedLawsCount: number;
  balanceIntegrity: number;
  completedDistrictsCount: number;
  inCrossroadsOrLater: boolean;
  isMuted: boolean;
  onOpenCodex: () => void;
  onOpenCrossroadsHint: () => void;
  onToggleMute: () => void;
  onPause: () => void;
}

export function GameUtilityBar({
  unlockedLawsCount,
  balanceIntegrity,
  completedDistrictsCount,
  inCrossroadsOrLater,
  isMuted,
  onOpenCodex,
  onOpenCrossroadsHint,
  onToggleMute,
  onPause,
}: GameUtilityBarProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-2.5 sm:gap-4 sm:p-4">
      {/* Top-Left Compact Utility Cluster (echoing reference mockup blue square icon style) */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={onPause}
          aria-label="Пауза и настройки (Esc)"
          title="Пауза и настройки (Esc)"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-300/40 bg-[#1971c2]/95 text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1c7ed6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 active:scale-95"
        >
          <Pause className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={onOpenCodex}
          aria-label={`Открыть Кодекс Равновесия (${unlockedLawsCount} из 6)`}
          className="flex h-10 items-center gap-1.5 rounded-lg border border-[#3a7ca5]/60 bg-[#0a304d]/90 px-2.5 text-xs font-medium text-slate-100 shadow-lg transition-colors hover:border-amber-300/60 hover:bg-[#0e3f63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 whitespace-nowrap shrink-0 sm:gap-2 sm:px-3 sm:text-sm"
        >
          <BookOpen className="h-4 w-4 text-amber-300" />
          <span>Кодекс</span>
          <span className="font-math text-xs text-amber-200 tabular-nums">
            {unlockedLawsCount}/6
          </span>
        </button>

        {inCrossroadsOrLater && (
          <button
            type="button"
            onClick={onOpenCrossroadsHint}
            aria-label={`Карта районов острова (${completedDistrictsCount} из 4)`}
            className="hidden sm:flex h-10 items-center gap-2 rounded-lg border border-[#3a7ca5]/60 bg-[#0a304d]/90 px-3 text-sm font-medium text-slate-100 shadow-lg transition-colors hover:border-sky-300/60 hover:bg-[#0e3f63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 whitespace-nowrap shrink-0"
          >
            <Compass className="h-4 w-4 text-sky-300" />
            <span>Районы</span>
            <span className="font-math text-xs text-sky-200 tabular-nums">
              {completedDistrictsCount}/4
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          title={isMuted ? 'Включить звук' : 'Выключить звук'}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#3a7ca5]/60 bg-[#0a304d]/90 text-slate-100 shadow-lg transition-colors hover:border-sky-300/60 hover:bg-[#0e3f63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-slate-400" />
          ) : (
            <Volume2 className="h-4 w-4 text-sky-300" />
          )}
        </button>
      </div>

      {/* Top-Right Compact World-Matched Balance Integrity Plaque */}
      <div className="pointer-events-auto shrink-0 flex items-center rounded-lg border border-[#3a7ca5]/60 bg-[#0a304d]/90 px-2.5 py-1.5 shadow-lg sm:px-3.5 sm:py-2">
        <div className="text-right">
          <div className="text-[10px] font-medium tracking-wide text-sky-200/80 sm:text-[11px]">
            Равновесие
          </div>
          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <div className="h-2 w-12 overflow-hidden rounded-full border border-sky-400/30 bg-slate-900/80 sm:w-20">
              <div
                className={`h-full transition-all duration-300 ${
                  balanceIntegrity >= 80
                    ? 'bg-emerald-400'
                    : balanceIntegrity >= 55
                      ? 'bg-amber-400'
                      : 'bg-rose-400'
                }`}
                style={{ width: `${balanceIntegrity}%` }}
              />
            </div>
            <span className="font-math text-xs font-semibold text-white tabular-nums sm:text-sm">
              {balanceIntegrity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
