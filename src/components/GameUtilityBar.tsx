import {
  Award,
  BookOpen,
  Compass,
  Home,
  Layers,
  Pause,
  Settings,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface GameUtilityBarProps {
  unlockedLawsCount: number;
  unlockedBadgesCount?: number;
  balanceIntegrity: number;
  completedDistrictsCount: number;
  inCrossroadsOrLater: boolean;
  isMuted: boolean;
  onOpenCodex: () => void;
  onOpenBadges?: () => void;
  onOpenCrossroadsHint: () => void;
  onToggleMute: () => void;
  onPause: () => void;
  onReturnHome?: () => void;
}

export function GameUtilityBar({
  unlockedLawsCount,
  unlockedBadgesCount = 0,
  balanceIntegrity,
  completedDistrictsCount,
  inCrossroadsOrLater,
  isMuted,
  onOpenCodex,
  onOpenBadges,
  onOpenCrossroadsHint,
  onToggleMute,
  onPause,
  onReturnHome,
}: GameUtilityBarProps) {
  return (
    <>
      {/* Left Vertical Storybook Navigation Rail (Desktop/Tablet) */}
      <aside
        aria-label="Боковая панель навигации"
        className="pointer-events-auto fixed top-0 bottom-0 left-0 z-30 hidden w-[56px] flex-col items-center justify-between border-r border-[#e5b55c]/50 bg-[#0b2d3f]/96 py-3.5 shadow-[4px_0_20px_rgba(4,18,28,0.45)] md:flex"
      >
        <div className="flex flex-col items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCodex}
            aria-label="Открыть Кодекс законов"
            title="Кодекс законов"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#f5ecd7] transition-colors hover:bg-[#144761] hover:text-[#f6c959] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            <BookOpen className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onReturnHome ?? onPause}
            aria-label="На главный экран"
            title="На главный экран"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#e6ba62] bg-[#144963] text-[#f6c959] shadow-md transition-colors hover:bg-[#1a5b7a] focus-visible:outline-2 focus-visible:outline-white"
          >
            <Home className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onOpenBadges ?? onOpenCodex}
            aria-label={`Значки исследователя (${unlockedBadgesCount} из 6)`}
            title={`Значки исследователя (${unlockedBadgesCount}/6)`}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#f5ecd7] transition-colors hover:bg-[#144761] hover:text-[#f6c959] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            <Award className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#f5ecd7] transition-colors hover:bg-[#144761] hover:text-[#f6c959] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-slate-400" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onPause}
          aria-label="Пауза и настройки (Esc)"
          title="Пауза и настройки (Esc)"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#f5ecd7] transition-colors hover:bg-[#144761] hover:text-[#f6c959] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
        >
          <Settings className="h-5 w-5" />
        </button>
      </aside>

      {/* Top Floating Teal-and-Gold HUD Bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-2.5 sm:gap-3 sm:p-4 md:pl-[74px]">
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5">
          {/* Mobile-only Pause button */}
          <button
            type="button"
            onClick={onPause}
            aria-label="Пауза и настройки (Esc)"
            title="Пауза и настройки (Esc)"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#e6ba62]/90 bg-[#0d3347]/95 text-[#f6c959] shadow-lg transition-colors hover:bg-[#154b66] focus-visible:outline-2 focus-visible:outline-white md:hidden"
          >
            <Pause className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenCodex}
            aria-label={`Открыть Кодекс Равновесия: законов ${unlockedLawsCount} из 6, значков ${unlockedBadgesCount} из 6`}
            className="flex h-10 items-center gap-1.5 rounded-xl border-[1.5px] border-[#e6ba62]/90 bg-[#0d3347]/94 px-3 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(5,20,30,0.45)] ring-1 ring-inset ring-[#fff2cf]/20 transition-colors hover:bg-[#144863] focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 sm:gap-2 sm:px-3.5 sm:text-sm"
          >
            <Layers className="h-4 w-4 shrink-0 text-[#f6c959]" />
            <span>Кодекс</span>
            <span className="font-math font-bold text-[#f6c959] tabular-nums">
              {unlockedLawsCount}/6
            </span>
          </button>

          {inCrossroadsOrLater && (
            <button
              type="button"
              onClick={onOpenCrossroadsHint}
              aria-label={`Карта районов острова (${completedDistrictsCount} из 4)`}
              className="hidden h-10 items-center gap-2 rounded-xl border-[1.5px] border-[#e6ba62]/90 bg-[#0d3347]/94 px-3.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(5,20,30,0.45)] ring-1 ring-inset ring-[#fff2cf]/20 transition-colors hover:bg-[#144863] focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 sm:flex"
            >
              <Compass className="h-4 w-4 shrink-0 text-[#f6c959]" />
              <span>Районы</span>
              <span className="font-math font-bold text-[#f6c959] tabular-nums">
                {completedDistrictsCount}/4
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenBadges ?? onOpenCodex}
            aria-label={`Открыть значки исследователя (${unlockedBadgesCount} из 6)`}
            className="hidden h-10 items-center gap-2 rounded-xl border-[1.5px] border-[#e6ba62]/90 bg-[#0d3347]/94 px-3.5 text-sm font-semibold text-white shadow-[0_6px_16px_rgba(5,20,30,0.45)] ring-1 ring-inset ring-[#fff2cf]/20 transition-colors hover:bg-[#144863] focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 lg:flex"
          >
            <Award className="h-4 w-4 shrink-0 text-[#f6c959]" />
            <span>Значки</span>
            <span className="font-math font-bold text-[#f6c959] tabular-nums">
              {unlockedBadgesCount}/6
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-[#e6ba62]/90 bg-[#0d3347]/94 text-white shadow-lg transition-colors hover:bg-[#144863] focus-visible:outline-2 focus-visible:outline-[#f6c959] md:hidden"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-300" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#f6c959]" />
            )}
          </button>
        </div>

        {/* Top-Right Balance Integrity Plaque */}
        <div className="pointer-events-auto flex shrink-0 flex-col justify-center rounded-xl border-[1.5px] border-[#e6ba62]/90 bg-[#0d3347]/94 px-3 py-1.5 shadow-[0_6px_16px_rgba(5,20,30,0.45)] ring-1 ring-inset ring-[#fff2cf]/20 sm:min-w-[205px] sm:px-4 sm:py-2">
          <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
            <span className="font-semibold text-[#eaf6f8]">Равновесие</span>
            <span className="font-math font-bold text-white tabular-nums">
              {balanceIntegrity}%
            </span>
          </div>
          <div className="mt-1 h-2 w-24 overflow-hidden rounded-full border border-[#3a7c91] bg-[#061e2b] sm:w-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                balanceIntegrity >= 80
                  ? 'bg-gradient-to-r from-[#0fc9a7] to-[#2df2c8]'
                  : balanceIntegrity >= 55
                    ? 'bg-gradient-to-r from-[#d98c1f] to-[#ffd257]'
                    : 'bg-gradient-to-r from-[#c83d3d] to-[#ff766b]'
              }`}
              style={{ width: `${balanceIntegrity}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
