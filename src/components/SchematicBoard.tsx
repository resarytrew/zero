import { Check, Pause, Play, RotateCcw, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { SchematicKind } from '../game/types';
import { MathText } from './MathText';
import { StorybookTealCard } from './StorybookFrames';

interface SchematicBoardProps {
  kind?: SchematicKind;
  step?: number;
  formulaDisplay?: string;
  bossShieldHp?: number;
  ep3Model?: 'first_shelf' | 'second_shelf';
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function SchematicBoard({
  kind = 'none',
  step = 1,
  formulaDisplay,
  bossShieldHp = 100,
  ep3Model = 'second_shelf',
  mobileOpen = false,
  onCloseMobile,
}: SchematicBoardProps) {
  // Ep 1 interactive scales state
  const [scaleMode, setScaleMode] = useState<'initial' | 'both_removed' | 'left_only'>('initial');
  // Ep 2 interactive tunnel time slider
  const [tunnelHours, setTunnelHours] = useState(0);
  const [tunnelPlaying, setTunnelPlaying] = useState(false);
  // Ep 3 interactive shelf tester (2nd shelf = x OR 1st shelf = x in multiples of 3)
  const [shelfTestX, setShelfTestX] = useState(16);
  const [shelfAltTestX, setShelfAltTestX] = useState(48);
  // Ep 4 interactive 12-part crystal bar
  const [crystalPaint, setCrystalPaint] = useState<'empty' | 'parts'>('empty');
  // Ep 5 interactive chest count stepper
  const [chestTestX, setChestTestX] = useState(5);
  // Ep 6 interactive river current tester
  const [riverTestX, setRiverTestX] = useState(2);

  useEffect(() => {
    setTunnelPlaying(false);
  }, [kind]);

  useEffect(() => {
    if (!tunnelPlaying) return;
    const id = window.setInterval(() => {
      setTunnelHours((prev) => {
        if (prev >= 24) {
          setTunnelPlaying(false);
          return 24;
        }
        return prev + 1;
      });
    }, 120);
    return () => window.clearInterval(id);
  }, [tunnelPlaying]);

  if (kind === 'none' || kind === 'crossroads_map') return null;

  const tiltAngle = scaleMode === 'left_only' ? 9 : 0;
  const g1Dist = Math.min(48, tunnelHours * 2);
  const g2Dist = Math.min(72, tunnelHours * 3);
  const isEp3FirstShelf = ep3Model === 'first_shelf';
  const shelf1Val = isEp3FirstShelf ? shelfAltTestX - 16 : 3 * shelfTestX - 16;
  const shelf2Val = isEp3FirstShelf ? shelfAltTestX / 3 + 22 : shelfTestX + 22;
  const way1Coins = 5 * chestTestX + 10;
  const way2Coins = 7 * chestTestX - 4;
  const downDist = 3 * (12 + riverTestX);
  const upDist = 5 * (12 - riverTestX);

  const isSolvedState =
    (kind === 'scales_ep1' && scaleMode === 'both_removed') ||
    (kind === 'tunnel_ep2' && step >= 2 && tunnelHours === 24) ||
    (kind === 'archive_table_ep3' && step >= 3 && shelf1Val === shelf2Val) ||
    (kind === 'city_chests_ep5' && step >= 3 && way1Coins === way2Coins) ||
    (kind === 'boss_river_ep6' && step >= 3 && downDist === upDist);

  const positionClasses = mobileOpen
    ? 'pointer-events-auto fixed inset-x-3 top-16 z-50 lg:left-[78px] lg:right-auto lg:top-auto lg:bottom-5 lg:z-20 lg:w-[435px]'
    : 'pointer-events-auto hidden lg:block fixed left-[78px] bottom-5 z-20 w-[435px]';

  return (
    <>
      {mobileOpen && onCloseMobile && (
        <div
          aria-hidden="true"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-[#051824]/68 lg:hidden"
        />
      )}

      <motion.div
        key={kind}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className={positionClasses}
      >
        <StorybookTealCard
          className={`p-4 transition-shadow duration-300 ${
            isSolvedState
              ? 'shadow-[0_0_0_2px_rgba(78,242,202,0.55),0_20px_42px_rgba(4,16,26,0.72)]'
              : ''
          }`}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-[#fff8e6]">
              <svg
                viewBox="0 0 24 24"
                className="h-5.5 w-5.5 shrink-0 text-[#ffd859] drop-shadow-[0_1px_4px_rgba(246,201,89,0.5)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2.5 16 4.8v4.4L12 11.5 8 9.2V4.8L12 2.5Z" />
                <path d="M8 4.8 12 7.1l4-2.3M12 7.1v4.4" />
                <path d="M7.5 11.8 11.5 14v4.5l-4 2.2-4-2.2V14l4-2.2Z" />
                <path d="M3.5 14 7.5 16.2l4-2.2M7.5 16.2v4.5" />
                <path d="M16.5 11.8 20.5 14v4.5l-4 2.2-4-2.2V14l4-2.2Z" />
                <path d="M12.5 14 16.5 16.2l4-2.2M16.5 16.2v4.5" />
              </svg>
              <span>Интерактивная модель</span>
            </span>
            <div className="flex items-center gap-2">
              {formulaDisplay && kind !== 'archive_table_ep3' && (
                <span className="font-math text-xs font-bold text-[#ffd859] tabular-nums">
                  <MathText text={formulaDisplay} />
                </span>
              )}
              {mobileOpen && onCloseMobile && (
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="min-h-[44px] rounded-full border-2 border-[#ecd084]/85 bg-[#14506b] px-4 py-1 text-xs font-bold text-white hover:bg-[#195a7a] lg:hidden"
                >
                  Скрыть
                </button>
              )}
            </div>
          </div>

          {kind === 'compass' && (
            <div className="flex items-center gap-3.5 rounded-xl border border-[#72bdd1]/45 bg-[#082433]/55 p-3">
              <svg viewBox="0 0 64 64" className="h-13 w-13 shrink-0" aria-hidden="true">
                <circle cx="32" cy="32" r="27" fill="#0d3347" stroke="#f6c959" strokeWidth="2.5" />
                <circle cx="32" cy="32" r="20" fill="none" stroke="#78cde0" strokeWidth="1.2" strokeDasharray="3 3" />
                <text
                  x="32"
                  y="39"
                  textAnchor="middle"
                  fill="#ffd45c"
                  fontSize="22"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  X
                </text>
              </svg>
              <p className="text-xs leading-relaxed text-[#eaf6f8]">
                Латунный компас стал твоим Кодексом Равновесия. В каждом районе ты сможешь крутить и проверять модели прямо здесь.
              </p>
            </div>
          )}

          {kind === 'scales_ep1' && (
            <div className="space-y-2.5">
              <div className="rounded-xl border-[1.5px] border-[#96cedb]/80 bg-[#08293a]/55 px-2.5 py-2">
                <svg viewBox="0 0 280 96" className="w-full" aria-hidden="true">
                  <line x1="140" y1="20" x2="140" y2="82" stroke="#d9932b" strokeWidth="4" />
                  <rect x="110" y="80" width="60" height="8" rx="3" fill="#b46e18" />
                  <g transform={`rotate(${tiltAngle} 140 26)`}>
                    <line x1="48" y1="26" x2="232" y2="26" stroke="#f6c959" strokeWidth="3" />
                    <line x1="55" y1="26" x2="26" y2="56" stroke="#a6d5e0" strokeWidth="1.5" />
                    <line x1="55" y1="26" x2="84" y2="56" stroke="#a6d5e0" strokeWidth="1.5" />
                    <path d="M22 56 Q55 68 88 56 Z" fill="#c77a1c" />
                    <text x="55" y="79" textAnchor="middle" fill="#ffd95e" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
                      {scaleMode === 'initial' ? (step >= 3 ? 'x + 25' : 'мешок и 25') : 'x'}
                    </text>

                    <line x1="225" y1="26" x2="196" y2="56" stroke="#a6d5e0" strokeWidth="1.5" />
                    <line x1="225" y1="26" x2="254" y2="56" stroke="#a6d5e0" strokeWidth="1.5" />
                    <path d="M192 56 Q225 68 258 56 Z" fill="#c77a1c" />
                    <text x="225" y="79" textAnchor="middle" fill="#a8e6f5" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
                      {scaleMode === 'both_removed' ? '78 − 25' : '78'}
                    </text>
                  </g>
                  <text
                    x="140"
                    y="14"
                    textAnchor="middle"
                    fill={scaleMode === 'left_only' ? '#ff9982' : '#54f8dc'}
                    fontSize="10.5"
                    fontWeight="700"
                  >
                    {scaleMode === 'left_only'
                      ? 'ПЕРЕКОС! Убрано только слева'
                      : '= РАВНОВЕСИЕ СОХРАНЕНО ='}
                  </text>
                </svg>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setScaleMode('both_removed')}
                  className={`min-h-[44px] rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors lg:min-h-[34px] ${
                    scaleMode === 'both_removed'
                      ? 'border-[#54f8dc] bg-[#136052] text-[#d8fff5]'
                      : 'border-[#96cedb]/75 bg-[#0f4159] text-[#eaf6f8] hover:bg-[#175775]'
                  }`}
                >
                  Убрать 25 с обеих чаш
                </button>
                <button
                  type="button"
                  onClick={() => setScaleMode('left_only')}
                  className={`min-h-[44px] rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors lg:min-h-[34px] ${
                    scaleMode === 'left_only'
                      ? 'border-[#ff9b7b] bg-[#782e1e] text-[#ffece6]'
                      : 'border-[#96cedb]/75 bg-[#0f4159] text-[#eaf6f8] hover:bg-[#175775]'
                  }`}
                >
                  Убрать 25 только слева
                </button>
                {scaleMode !== 'initial' && (
                  <button
                    type="button"
                    onClick={() => setScaleMode('initial')}
                    aria-label="Сбросить весы"
                    className="min-h-[44px] min-w-[44px] rounded-full border border-[#eec46b]/80 bg-[#0f4159] px-2.5 py-1.5 text-xs text-[#ffd95e] hover:bg-[#175775] lg:min-h-[34px] lg:min-w-[34px]"
                  >
                    <RotateCcw className="inline h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {kind === 'tunnel_ep2' && (
            <div className="space-y-3">
              <div className="space-y-2 rounded-xl border-[1.5px] border-[#a3dae8]/85 bg-[#08293a]/55 p-3">
                <div className="flex justify-between font-math text-xs font-bold tabular-nums">
                  <span className="text-[#ffd859]">Гном I: {g1Dist} м</span>
                  <span className="text-[#54f8dc]">
                    {tunnelHours === 24 ? 'Встреча! 120 м' : `Время: ${tunnelHours} ч`}
                  </span>
                  <span className="text-[#a8e6f5]">Гном II: {g2Dist} м</span>
                </div>
                <div className="relative h-6 w-full overflow-hidden rounded-full border border-[#a3dae8]/65 bg-[#061e2b]">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#df8c26] to-[#f2b33d] transition-all duration-100"
                    style={{ width: `${(g1Dist / 120) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 bg-gradient-to-l from-[#2996b3] to-[#5ec9e0] transition-all duration-100"
                    style={{ width: `${(g2Dist / 120) * 100}%` }}
                  />
                  <span className="relative z-10 flex h-full items-center justify-center font-math text-xs font-extrabold text-white drop-shadow tabular-nums">
                    {g1Dist + g2Dist} / 120 м
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    if (tunnelHours >= 24) setTunnelHours(0);
                    setTunnelPlaying((p) => !p);
                  }}
                  aria-label={tunnelPlaying ? 'Пауза симуляции' : 'Запустить движение гномов'}
                  className="flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#e5b55c] bg-[#967b31]/70 px-4 py-1.5 text-xs font-bold text-[#fff3cf] hover:bg-[#b58727] lg:min-h-[34px]"
                >
                  {tunnelPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  <span>{tunnelPlaying ? 'Пауза' : 'Пуск'}</span>
                </button>
                <input
                  type="range"
                  aria-label="Время работы гномов в часах"
                  min={0}
                  max={24}
                  value={tunnelHours}
                  onChange={(e) => {
                    setTunnelPlaying(false);
                    setTunnelHours(Number(e.target.value));
                  }}
                  className="h-2 flex-1 accent-[#ffd859]"
                />
              </div>
            </div>
          )}

          {kind === 'archive_table_ep3' && (
            <div className="space-y-3">
              {step <= 2 ? (
                <div className="space-y-2">
                  <div className="overflow-hidden rounded-xl border-[1.5px] border-[#a3dae8]/85 bg-[#08293a]/40 text-xs sm:text-[13.5px]">
                    <table className="w-full border-collapse text-center font-math">
                      <thead className="border-b border-[#a3dae8]/75 text-[#fff8e6]">
                        <tr>
                          <th className="border-r border-[#a3dae8]/45 px-3 py-2 text-left font-bold">
                            Полка
                          </th>
                          <th className="border-r border-[#a3dae8]/45 px-3 py-2 font-bold">
                            Было
                          </th>
                          <th className="px-3 py-2 font-bold">Изменение</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#a3dae8]/60 text-[#f3fafc]">
                        <tr>
                          <td className="border-r border-[#a3dae8]/45 bg-[#967b31]/75 px-3 py-2 text-left font-bold text-[#ffd859]">
                            1-я полка
                          </td>
                          <td className="border-r border-[#a3dae8]/45 px-3 py-2 font-sans text-xs font-semibold">
                            {step === 2 && isEp3FirstShelf ? 'x' : 'в 3 раза больше'}
                          </td>
                          <td className="px-3 py-2 font-sans text-xs font-semibold text-[#ffd859]">
                            сняли 16
                          </td>
                        </tr>
                        <tr>
                          <td className="border-r border-[#a3dae8]/45 px-3 py-2 text-left font-bold text-[#ffe69d]">
                            2-я полка
                          </td>
                          <td className="border-r border-[#a3dae8]/45 px-3 py-2 font-sans text-xs font-semibold">
                            {step === 2 && !isEp3FirstShelf ? 'x' : 'в 3 раза меньше'}
                          </td>
                          <td className="px-3 py-2 font-sans text-xs font-semibold text-[#a8e6f5]">
                            добавили 22
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11.5px] font-semibold text-[#cbe5ec]">
                    {step === 1
                      ? 'Итог по условию: после перестановки на обеих полках стало поровну. Выбери модель справа!'
                      : 'Переведи строки условия в алгебраические выражения в реестре справа.'}
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-hidden rounded-xl border-[1.5px] border-[#a3dae8]/85 bg-[#08293a]/40 text-xs sm:text-[14px]">
                    <table className="w-full border-collapse text-center font-math">
                      <thead className="border-b border-[#a3dae8]/75 text-[#fff8e6]">
                        <tr>
                          <th className="border-r border-[#a3dae8]/45 px-3 py-2 text-left font-bold">
                            Полка
                          </th>
                          <th className="border-r border-[#a3dae8]/45 px-3 py-2 font-bold">
                            Было
                          </th>
                          <th className="px-3 py-2 font-bold">
                            Стало (x = {isEp3FirstShelf ? shelfAltTestX : shelfTestX})
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#a3dae8]/60 text-[#f3fafc] tabular-nums">
                        <tr>
                          <td className="border-r border-[#a3dae8]/45 bg-[#967b31]/75 px-3 py-2 text-left font-bold text-[#ffd859]">
                            1-я полка
                          </td>
                          <td className="border-r border-[#a3dae8]/45 px-3 py-2 font-semibold">
                            {isEp3FirstShelf ? 'x' : '3x'}
                          </td>
                          <td className="px-3 py-2 font-semibold">
                            {isEp3FirstShelf ? 'x − 16' : '3x − 16'} ={' '}
                            <span className="font-extrabold text-[#ffd859]">{shelf1Val}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-r border-[#a3dae8]/45 px-3 py-2 text-left font-bold text-[#ffe69d]">
                            2-я полка
                          </td>
                          <td className="border-r border-[#a3dae8]/45 px-3 py-2 font-semibold">
                            {isEp3FirstShelf ? 'x/3' : 'x'}
                          </td>
                          <td className="px-3 py-2 font-semibold">
                            {isEp3FirstShelf ? 'x/3 + 22' : 'x + 22'} ={' '}
                            <span className="font-extrabold text-[#ffd859]">{shelf2Val}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-[13px]">
                    <span className="font-semibold text-[#e6f3f6]">
                      Проверка гипотезы x:
                    </span>
                    <div className="flex items-center gap-2.5 font-math">
                      <div className="flex items-center overflow-hidden rounded-xl border-[1.5px] border-[#a3dae8]/80 bg-[#0b354b]/90 shadow-inner">
                        <button
                          type="button"
                          onClick={() =>
                            isEp3FirstShelf
                              ? setShelfAltTestX((v) => Math.max(36, v - 3))
                              : setShelfTestX((v) => Math.max(10, v - 1))
                          }
                          aria-label="Уменьшить x"
                          className="flex h-11 w-11 items-center justify-center border-r border-[#a3dae8]/45 bg-[#12455e] text-base font-bold text-white hover:bg-[#195d7d] active:bg-[#0e394e] lg:h-7 lg:w-8"
                        >
                          −
                        </button>
                        <span className="w-10 text-center text-base font-extrabold text-[#ffd859] tabular-nums">
                          {isEp3FirstShelf ? shelfAltTestX : shelfTestX}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            isEp3FirstShelf
                              ? setShelfAltTestX((v) => Math.min(72, v + 3))
                              : setShelfTestX((v) => Math.min(25, v + 1))
                          }
                          aria-label="Увеличить x"
                          className="flex h-11 w-11 items-center justify-center border-l border-[#a3dae8]/45 bg-[#12455e] text-base font-bold text-white hover:bg-[#195d7d] active:bg-[#0e394e] lg:h-7 lg:w-8"
                        >
                          +
                        </button>
                      </div>
                      <span
                        className={`flex items-center gap-1 font-sans font-semibold ${
                          shelf1Val === shelf2Val ? 'text-[#4ef2ca]' : 'text-[#d8eef2]'
                        }`}
                      >
                        {shelf1Val === shelf2Val ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Поровну!</span>
                          </>
                        ) : (
                          <>
                            <X className="h-3.5 w-3.5 text-[#a6d5e0]" />
                            <span>Не равны</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {kind === 'crystals_ep4' && (
            <div className="space-y-3">
              {step <= 3 ? (
                <div className="space-y-2 rounded-xl border-[1.5px] border-[#a3dae8]/85 bg-[#08293a]/55 p-3">
                  <div className="flex h-7 w-full overflow-hidden rounded-lg border border-[#a3dae8]/70 font-math text-[11px] font-bold">
                    <div className="flex w-1/3 items-center justify-center bg-[#2a9fd6] text-white">
                      ⅓ син.
                    </div>
                    <div className="flex w-1/4 items-center justify-center border-x border-[#08293a] bg-[#e26a3c] text-white">
                      ¼ кр.
                    </div>
                    <div className="flex flex-1 items-center justify-center bg-[#19b58f] text-[#052920]">
                      20 зел.
                    </div>
                  </div>
                  <p className="text-[11.5px] font-semibold text-[#cbe5ec]">
                    Всё целое — коллекция кристаллов x. Найди общий знаменатель и вычисли доли справа!
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-12 gap-1 rounded-xl border-[1.5px] border-[#a3dae8]/85 bg-[#08293a]/55 p-2.5">
                    {Array.from({ length: 12 }).map((_, idx) => {
                      let cls = 'bg-[#0e394f] border-[#5fa2b8]';
                      if (crystalPaint === 'parts') {
                        if (idx < 4) cls = 'bg-[#2a9fd6] border-[#96e3ff]';
                        else if (idx < 7) cls = 'bg-[#e26a3c] border-[#ffbe9d]';
                        else cls = 'bg-[#19b58f] border-[#8effde]';
                      }
                      return (
                        <div
                          key={idx}
                          className={`h-6 rounded border transition-colors ${cls}`}
                          title={`Доля ${idx + 1}/12`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() =>
                        setCrystalPaint((m) => (m === 'empty' ? 'parts' : 'empty'))
                      }
                      className="min-h-[44px] rounded-full border border-[#e5b55c]/85 bg-[#12455e] px-3.5 py-1.5 font-bold text-white hover:bg-[#195a7a] lg:min-h-[34px]"
                    >
                      {crystalPaint === 'empty'
                        ? 'Разбить целое на 12 долей'
                        : 'Сбросить доли'}
                    </button>
                    <span className="font-math text-[11px] font-bold text-[#ffd859] tabular-nums">
                      {crystalPaint === 'parts'
                        ? '4/12 син. + 3/12 кр. + 5/12 зел. (=20)'
                        : '12 равных долей = 1 целое (x)'}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {kind === 'city_chests_ep5' && (
            <div className="space-y-3">
              {step <= 2 ? (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border-[1.5px] border-[#e5b55c]/80 bg-[#967b31]/50 p-2.5 text-[#fff4d6]">
                    <div className="text-[11px] font-bold text-[#ffd859]">Способ 1</div>
                    <div className="mt-0.5 font-semibold">По 5 в сундук · 10 лишних</div>
                  </div>
                  <div className="rounded-xl border-[1.5px] border-[#a3dae8]/80 bg-[#0d3b52]/75 p-2.5 text-[#e6f7fa]">
                    <div className="text-[11px] font-bold text-[#a8e6f5]">Способ 2</div>
                    <div className="mt-0.5 font-semibold">По 7 в сундук · 4 не хватает</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 font-math text-xs tabular-nums">
                    <div className="rounded-xl border-[1.5px] border-[#e5b55c]/80 bg-[#967b31]/50 p-2.5 text-[#fff4d6]">
                      <div className="text-[11px] font-bold text-[#ffd859]">
                        Способ 1 (5x + 10)
                      </div>
                      <div className="mt-0.5 text-sm font-extrabold">{way1Coins} монет</div>
                    </div>
                    <div className="rounded-xl border-[1.5px] border-[#a3dae8]/80 bg-[#0d3b52]/75 p-2.5 text-[#e6f7fa]">
                      <div className="text-[11px] font-bold text-[#a8e6f5]">
                        Способ 2 (7x − 4)
                      </div>
                      <div className="mt-0.5 text-sm font-extrabold">{way2Coins} монет</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-[13px]">
                    <span className="font-semibold text-[#e6f3f6]">Проверка гипотезы x:</span>
                    <div className="flex items-center gap-2.5 font-math">
                      <div className="flex items-center overflow-hidden rounded-xl border-[1.5px] border-[#a3dae8]/80 bg-[#0b354b]/90 shadow-inner">
                        <button
                          type="button"
                          onClick={() => setChestTestX((v) => Math.max(3, v - 1))}
                          aria-label="Уменьшить x"
                          className="flex h-11 w-11 items-center justify-center border-r border-[#a3dae8]/45 bg-[#12455e] text-base font-bold text-white hover:bg-[#195d7d] lg:h-7 lg:w-8"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-base font-extrabold text-[#ffd859] tabular-nums">
                          {chestTestX}
                        </span>
                        <button
                          type="button"
                          onClick={() => setChestTestX((v) => Math.min(10, v + 1))}
                          aria-label="Увеличить x"
                          className="flex h-11 w-11 items-center justify-center border-l border-[#a3dae8]/45 bg-[#12455e] text-base font-bold text-white hover:bg-[#195d7d] lg:h-7 lg:w-8"
                        >
                          +
                        </button>
                      </div>
                      <span
                        className={`font-sans font-semibold ${
                          way1Coins === way2Coins ? 'text-[#54f8dc]' : 'text-[#e6f3f6]'
                        }`}
                      >
                        {way1Coins === way2Coins ? 'Совпало!' : 'Разные'}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {kind === 'boss_river_ep6' && (
            <div className="space-y-3">
              <div>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#ffbe9d]">Щит Тени Скобок</span>
                  <span className="font-math font-extrabold text-[#ffd859] tabular-nums">
                    {bossShieldHp}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full border border-[#a3dae8]/65 bg-[#061e2b]">
                  <div
                    className="h-full bg-gradient-to-r from-[#d6542b] to-[#f6c959] transition-all duration-300"
                    style={{ width: `${bossShieldHp}%` }}
                  />
                </div>
              </div>

              {step <= 2 ? (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border-[1.5px] border-[#a3dae8]/80 bg-[#08293a]/75 p-2.5">
                    <div className="text-[11px] font-bold text-[#a8e6f5]">По течению</div>
                    <div className="mt-0.5 font-semibold text-white">3 ч · катер 12 км/ч</div>
                  </div>
                  <div className="rounded-xl border-[1.5px] border-[#e5b55c]/80 bg-[#967b31]/40 p-2.5">
                    <div className="text-[11px] font-bold text-[#ffd859]">Против течения</div>
                    <div className="mt-0.5 font-semibold text-white">5 ч · тот же путь</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 font-math text-xs tabular-nums">
                    <div className="rounded-xl border-[1.5px] border-[#a3dae8]/80 bg-[#08293a]/75 p-2.5">
                      <div className="text-[11px] font-bold text-[#a8e6f5]">
                        По течению 3(12+x)
                      </div>
                      <div className="font-extrabold text-white">{downDist} км</div>
                    </div>
                    <div className="rounded-xl border-[1.5px] border-[#e5b55c]/80 bg-[#967b31]/40 p-2.5">
                      <div className="text-[11px] font-bold text-[#ffd859]">
                        Против 5(12−x)
                      </div>
                      <div className="font-extrabold text-white">{upDist} км</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-[#e6f3f6]">Проверка гипотезы x (км/ч):</span>
                    <div className="flex items-center gap-1 font-math">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setRiverTestX(val)}
                          className={`h-10 w-10 rounded-full border text-xs font-extrabold transition-colors lg:h-7 lg:w-7 ${
                            riverTestX === val
                              ? 'border-[#b46d14] bg-[#ffd859] text-[#102d3e]'
                              : 'border-[#a3dae8]/70 bg-[#12455e] text-white hover:bg-[#195d7d]'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </StorybookTealCard>
      </motion.div>
    </>
  );
}
