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
        className="pointer-events-auto fixed top-0 bottom-0 left-0 z-30 hidden w-[58px] flex-col items-center justify-between border-r-2 border-[#e5b55c]/80 bg-gradient-to-b from-[#0e435b]/94 via-[#0b3549]/94 to-[#082839]/94 py-3.5 shadow-[4px_0_22px_rgba(4,18,28,0.5)] md:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onOpenCodex}
            aria-label="Открыть Кодекс законов"
            title="Кодекс законов"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fcecc2] transition-all hover:bg-[#16516d] hover:text-[#ffd859] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            <BookOpen className="h-[22px] w-[22px]" />
          </button>

          <button
            type="button"
            onClick={onReturnHome ?? onPause}
            aria-label="На главный экран"
            title="На главный экран"
            className="flex h-11 w-11 items-center justify-center rounded-[14px] border-2 border-[#f6c959] bg-[#a68128]/35 text-[#ffe694] shadow-[0_0_20px_rgba(246,201,89,0.58)] ring-1 ring-inset ring-[#fff4cf]/40 transition-all hover:bg-[#be932e]/50 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Home className="h-[22px] w-[22px]" />
          </button>

          <button
            type="button"
            onClick={onOpenBadges ?? onOpenCodex}
            aria-label={`Значки исследователя (${unlockedBadgesCount} из 6)`}
            title={`Значки исследователя (${unlockedBadgesCount}/6)`}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fdf3da] transition-all hover:bg-[#16516d] hover:text-[#ffd45c] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            <Award className="h-[22px] w-[22px]" />
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fdf3da] transition-all hover:bg-[#16516d] hover:text-[#ffd45c] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            {isMuted ? (
              <VolumeX className="h-[22px] w-[22px] text-slate-400" />
            ) : (
              <Volume2 className="h-[22px] w-[22px]" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onPause}
          aria-label="Пауза и настройки (Esc)"
          title="Пауза и настройки (Esc)"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fdf3da] transition-all hover:bg-[#16516d] hover:text-[#ffd45c] focus-visible:outline-2 focus-visible:outline-[#f6c959]"
        >
          <Settings className="h-[22px] w-[22px]" />
        </button>
      </aside>

      {/* Top Floating Teal-and-Gold HUD Bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-2 p-2.5 sm:gap-3 sm:p-4 md:pl-[78px]">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Mobile-only Pause button */}
          <button
            type="button"
            onClick={onPause}
            aria-label="Пауза и настройки (Esc)"
            title="Пауза и настройки (Esc)"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 text-[#ffd45c] shadow-[0_6px_18px_rgba(4,18,28,0.52)] ring-1 ring-inset ring-[#fff4d6]/50 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-white md:hidden"
          >
            <Pause className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenCodex}
            aria-label={`Открыть Кодекс Равновесия: законов ${unlockedLawsCount} из 6, значков ${unlockedBadgesCount} из 6`}
            className="flex h-10 items-center gap-2 rounded-full border-2 border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 px-3.5 text-xs font-bold text-[#fff8e6] shadow-[0_0_0_1.5px_rgba(7,31,44,0.85),0_8px_18px_rgba(4,18,28,0.52)] ring-1 ring-inset ring-[#fff4d6]/60 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 sm:px-4.5 sm:text-[15px]"
          >
            <Layers className="h-4.5 w-4.5 shrink-0 text-[#f6c959]" />
            <span>Кодекс</span>
            <span className="font-math font-extrabold text-[#ffd859] tabular-nums">
              {unlockedLawsCount}/6
            </span>
          </button>

          {inCrossroadsOrLater && (
            <button
              type="button"
              onClick={onOpenCrossroadsHint}
              aria-label={`Карта районов острова (${completedDistrictsCount} из 4)`}
              className="hidden h-10 items-center gap-2 rounded-full border-2 border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 px-4.5 text-[15px] font-bold text-[#fff8e6] shadow-[0_0_0_1.5px_rgba(7,31,44,0.85),0_8px_18px_rgba(4,18,28,0.52)] ring-1 ring-inset ring-[#fff4d6]/60 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 sm:flex"
            >
              <Compass className="h-4.5 w-4.5 shrink-0 text-[#f6c959]" />
              <span>Районы</span>
              <span className="font-math font-extrabold text-[#ffd859] tabular-nums">
                {completedDistrictsCount}/4
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenBadges ?? onOpenCodex}
            aria-label={`Открыть значки исследователя (${unlockedBadgesCount} из 6)`}
            className="hidden h-10 items-center gap-2 rounded-full border-2 border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 px-4.5 text-[15px] font-bold text-[#fff8e6] shadow-[0_0_0_1.5px_rgba(7,31,44,0.85),0_8px_18px_rgba(4,18,28,0.52)] ring-1 ring-inset ring-[#fff4d6]/60 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 lg:flex"
          >
            <Award className="h-4.5 w-4.5 shrink-0 text-[#f6c959]" />
            <span>Значки</span>
            <span className="font-math font-extrabold text-[#ffd859] tabular-nums">
              {unlockedBadgesCount}/6
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 text-white shadow-[0_6px_18px_rgba(4,18,28,0.52)] ring-1 ring-inset ring-[#fff4d6]/50 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#f6c959] md:hidden"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-300" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#f6c959]" />
            )}
          </button>
        </div>

        {/* Top-Right Wide Equilibrium Plaque */}
        <div className="pointer-events-auto flex shrink-0 flex-col justify-center rounded-[20px] border-2 border-[#e5b55c] bg-gradient-to-b from-[#16536f]/96 to-[#0a3145]/97 px-3.5 py-2 shadow-[0_0_0_1.5px_rgba(7,31,44,0.85),0_8px_20px_rgba(4,18,28,0.54)] ring-1 ring-inset ring-[#b8eef9]/50 sm:min-w-[285px] sm:px-5 sm:py-2.5 lg:min-w-[315px]">
          <div className="flex items-center justify-between gap-4 text-xs sm:text-[15px]">
            <span className="font-bold text-[#fff8e6]">Равновесие</span>
            <span className="font-math font-extrabold text-[#fff8e6] tabular-nums">
              {balanceIntegrity}%
            </span>
          </div>
          <div className="mt-1.5 h-[7px] w-24 overflow-hidden rounded-full border border-[#62b7cc]/55 bg-[#062230]/90 sm:w-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                balanceIntegrity >= 80
                  ? 'bg-gradient-to-r from-[#22dfb9] via-[#52f9d6] to-[#98ffea] shadow-[0_0_12px_rgba(82,249,214,0.7)]'
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
