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
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface GameUtilityBarProps {
  unlockedLawsCount: number;
  unlockedBadgesCount?: number;
  hasUnseenBadge?: boolean;
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
  hasUnseenBadge = false,
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
  const prevBalanceRef = useRef(balanceIntegrity);
  const [balancePulseKey, setBalancePulseKey] = useState(0);

  useEffect(() => {
    if (prevBalanceRef.current !== balanceIntegrity) {
      prevBalanceRef.current = balanceIntegrity;
      setBalancePulseKey((k) => k + 1);
    }
  }, [balanceIntegrity]);

  return (
    <>
      {/* Left Vertical Storybook Navigation Rail (Desktop/Tablet) */}
      <aside
        aria-label="Боковая панель навигации"
        className="pointer-events-auto fixed top-0 bottom-0 left-0 z-30 hidden w-[58px] flex-col items-center justify-between border-r-2 border-[#ecd084]/85 bg-gradient-to-b from-[#0f455e]/95 via-[#0b3549]/96 to-[#072636]/96 py-3.5 shadow-[4px_0_24px_rgba(4,16,26,0.56)] md:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onOpenCodex}
            aria-label="Открыть Кодекс законов"
            title="Кодекс законов"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fcecc2] transition-all hover:bg-[#175572] hover:text-[#ffd859] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f6c959]"
          >
            <BookOpen className="h-[22px] w-[22px]" />
          </button>

          <button
            type="button"
            onClick={onReturnHome ?? onPause}
            aria-label="На главный экран"
            title="На главный экран"
            className="flex h-11 w-11 items-center justify-center rounded-[14px] border-2 border-[#f6c959] bg-[#b08726]/38 text-[#ffeb9e] shadow-[0_0_20px_rgba(246,201,89,0.62)] ring-1 ring-inset ring-[#fff4cf]/45 transition-all hover:bg-[#c5962b]/52 active:scale-95 focus-visible:outline-2 focus-visible:outline-white"
          >
            <Home className="h-[22px] w-[22px]" />
          </button>

          <button
            type="button"
            onClick={onOpenBadges ?? onOpenCodex}
            aria-label={`Значки исследователя (${unlockedBadgesCount} из 6)`}
            title={`Значки исследователя (${unlockedBadgesCount}/6)`}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-[#175572] hover:text-[#ffd859] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f6c959] ${
              hasUnseenBadge
                ? 'border border-[#f6c959] bg-[#a67d20]/30 text-[#ffe68e] shadow-[0_0_14px_rgba(246,201,89,0.5)]'
                : 'text-[#fdf3da]'
            }`}
          >
            <Award className="h-[22px] w-[22px]" />
            <span
              className={`font-math absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border px-1 text-[10px] leading-none font-extrabold tabular-nums shadow-sm ${
                hasUnseenBadge || unlockedBadgesCount > 0
                  ? 'border-[#7d3305] bg-gradient-to-b from-[#ffd966] to-[#e2951e] text-[#112d3d]'
                  : 'border-[#89c4d4]/70 bg-[#0d3549] text-[#cde9f0]'
              }`}
            >
              {unlockedBadgesCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fdf3da] transition-all hover:bg-[#175572] hover:text-[#ffd859] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f6c959]"
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
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#fdf3da] transition-all hover:bg-[#175572] hover:text-[#ffd859] active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f6c959]"
        >
          <Settings className="h-[22px] w-[22px]" />
        </button>
      </aside>

      {/* Top Floating Teal-and-Gold HUD Bar: Clean 2 Capsules Left + Equilibrium Right */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-1.5 p-2 sm:gap-3 sm:p-4 md:pl-[78px]">
        <div className="pointer-events-auto flex min-w-0 items-center gap-1.5 sm:gap-3">
          {/* Mobile-only Pause button */}
          <button
            type="button"
            onClick={onPause}
            aria-label="Пауза и настройки (Esc)"
            title="Пауза и настройки (Esc)"
            className="storybook-teal-plaque flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#ffd859] transition-all hover:brightness-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-white md:hidden"
          >
            <Pause className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onOpenCodex}
            aria-label={`Открыть Кодекс Равновесия: законов ${unlockedLawsCount} из 6, значков ${unlockedBadgesCount} из 6`}
            className={`storybook-teal-plaque relative flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-bold text-[#fff8e6] transition-all hover:brightness-110 active:translate-y-[1px] focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 sm:h-10 sm:gap-2 sm:px-4.5 sm:text-[15px] ${
              hasUnseenBadge ? 'ring-2 ring-[#ffd859] md:ring-0' : ''
            }`}
          >
            <Layers className="h-4 w-4 shrink-0 text-[#f6c959] sm:h-4.5 sm:w-4.5" />
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
              className="storybook-teal-plaque hidden h-10 items-center gap-2 rounded-full px-4.5 text-[15px] font-bold text-[#fff8e6] transition-all hover:brightness-110 active:translate-y-[1px] focus-visible:outline-2 focus-visible:outline-[#f6c959] whitespace-nowrap shrink-0 sm:flex"
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
            onClick={onToggleMute}
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            title={isMuted ? 'Включить звук' : 'Выключить звук'}
            className="storybook-teal-plaque flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all hover:brightness-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#f6c959] md:hidden"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-300" />
            ) : (
              <Volume2 className="h-4 w-4 text-[#f6c959]" />
            )}
          </button>
        </div>

        {/* Top-Right Wide Equilibrium Plaque */}
        <motion.div
          key={balancePulseKey}
          initial={balancePulseKey > 0 ? { scale: 1.035 } : false}
          animate={{ scale: 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="storybook-teal-plaque pointer-events-auto flex shrink-0 flex-col justify-center rounded-[18px] px-3 py-1.5 sm:min-w-[290px] sm:rounded-[20px] sm:px-5 sm:py-2.5 lg:min-w-[325px]"
        >
          <div className="flex items-center justify-between gap-2.5 text-[11px] sm:gap-4 sm:text-[15px]">
            <span className="font-bold text-[#fff8e6]">Равновесие</span>
            <span className="font-math font-extrabold text-[#fff8e6] tabular-nums">
              {balanceIntegrity}%
            </span>
          </div>
          <div className="mt-1 h-[6px] w-24 overflow-hidden rounded-full border border-[#67bdd1]/60 bg-[#05202d]/90 sm:mt-1.5 sm:h-[7px] sm:w-full">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                balanceIntegrity >= 80
                  ? 'bg-gradient-to-r from-[#22dfb9] via-[#52f9d6] to-[#98ffea] shadow-[0_0_12px_rgba(82,249,214,0.72)]'
                  : balanceIntegrity >= 55
                    ? 'bg-gradient-to-r from-[#d98c1f] to-[#ffd257]'
                    : 'bg-gradient-to-r from-[#c83d3d] to-[#ff766b]'
              }`}
              style={{ width: `${balanceIntegrity}%` }}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
