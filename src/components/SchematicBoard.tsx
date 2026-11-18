import { Box, Check, Pause, Play, RotateCcw, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { SchematicKind } from '../game/types';
import { MathText } from './MathText';

interface SchematicBoardProps {
  kind?: SchematicKind;
  step?: number;
  formulaDisplay?: string;
  bossShieldHp?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function SchematicBoard({
  kind = 'none',
  step = 1,
  formulaDisplay,
  bossShieldHp = 100,
  mobileOpen = false,
  onCloseMobile,
}: SchematicBoardProps) {
  // Ep 1 interactive scales state
  const [scaleMode, setScaleMode] = useState<'initial' | 'both_removed' | 'left_only'>('initial');
  // Ep 2 interactive tunnel time slider
  const [tunnelHours, setTunnelHours] = useState(0);
  const [tunnelPlaying, setTunnelPlaying] = useState(false);
  // Ep 3 interactive shelf tester
  const [shelfTestX, setShelfTestX] = useState(16);
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
  const shelf1Val = 3 * shelfTestX - 16;
  const shelf2Val = shelfTestX + 22;
  const way1Coins = 5 * chestTestX + 10;
  const way2Coins = 7 * chestTestX - 4;
  const downDist = 3 * (12 + riverTestX);
  const upDist = 5 * (12 - riverTestX);

  const containerClasses = mobileOpen
    ? 'pointer-events-auto fixed inset-x-3 top-16 z-40 rounded-2xl border-2 border-[#e3b864] ring-1 ring-inset ring-[#fff4d6]/30 bg-gradient-to-b from-[#0e3a50]/97 to-[#092738]/97 p-4 text-white shadow-[0_18px_40px_rgba(4,18,28,0.7)] lg:left-[74px] lg:right-auto lg:top-auto lg:bottom-5 lg:w-[415px]'
    : 'pointer-events-auto hidden lg:block fixed left-[74px] bottom-5 z-20 w-[415px] rounded-2xl border-2 border-[#e3b864] ring-1 ring-inset ring-[#fff4d6]/30 bg-gradient-to-b from-[#0e3a50]/96 to-[#092738]/96 p-4 text-white shadow-[0_18px_40px_rgba(4,18,28,0.62)]';

  return (
    <motion.div
      key={kind}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={containerClasses}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[15px] font-bold text-white">
          <Box className="h-4.5 w-4.5 shrink-0 text-[#f6c959]" />
          <span>Интерактивная модель</span>
        </span>
        <div className="flex items-center gap-2">
          {formulaDisplay && kind !== 'archive_table_ep3' && (
            <span className="font-math text-xs font-bold text-[#ffd45c] tabular-nums">
              <MathText text={formulaDisplay} />
            </span>
          )}
          {mobileOpen && onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="min-h-[32px] rounded-lg border border-[#e3b864]/70 bg-[#12455e] px-2.5 py-1 text-xs font-semibold text-white hover:bg-[#195a7a]"
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
          <div className="rounded-xl border border-[#72bdd1]/45 bg-[#072231]/65 px-2.5 py-2">
            <svg viewBox="0 0 280 96" className="w-full" aria-hidden="true">
              <line x1="140" y1="20" x2="140" y2="82" stroke="#d9932b" strokeWidth="4" />
              <rect x="110" y="80" width="60" height="8" rx="3" fill="#b46e18" />
              <g transform={`rotate(${tiltAngle} 140 26)`}>
                <line x1="48" y1="26" x2="232" y2="26" stroke="#f6c959" strokeWidth="3" />
                <line x1="55" y1="26" x2="26" y2="56" stroke="#a6d5e0" strokeWidth="1.5" />
                <line x1="55" y1="26" x2="84" y2="56" stroke="#a6d5e0" strokeWidth="1.5" />
                <path d="M22 56 Q55 68 88 56 Z" fill="#c77a1c" />
                <text x="55" y="79" textAnchor="middle" fill="#ffd45c" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">
                  {scaleMode === 'initial' ? (step >= 2 ? 'x + 25' : 'мешок + 25') : 'x'}
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
                fill={scaleMode === 'left_only' ? '#ff9982' : '#4ef2ca'}
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
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                scaleMode === 'both_removed'
                  ? 'border-[#4ef2ca] bg-[#136052] text-[#d8fff5]'
                  : 'border-[#72bdd1]/60 bg-[#0d3c52] text-[#eaf6f8] hover:bg-[#14506b]'
              }`}
            >
              Убрать 25 с обеих чаш
            </button>
            <button
              type="button"
              onClick={() => setScaleMode('left_only')}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                scaleMode === 'left_only'
                  ? 'border-[#ff9b7b] bg-[#782e1e] text-[#ffece6]'
                  : 'border-[#72bdd1]/60 bg-[#0d3c52] text-[#eaf6f8] hover:bg-[#14506b]'
              }`}
            >
              Убрать 25 только слева
            </button>
            {scaleMode !== 'initial' && (
              <button
                type="button"
                onClick={() => setScaleMode('initial')}
                aria-label="Сбросить весы"
                className="rounded-lg border border-[#e3b864]/60 bg-[#0d3c52] px-2.5 py-1.5 text-xs text-[#ffd45c] hover:bg-[#14506b]"
              >
                <RotateCcw className="inline h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {kind === 'tunnel_ep2' && (
        <div className="space-y-2.5">
          <div className="flex justify-between font-math text-xs font-semibold tabular-nums">
            <span className="text-[#ffd45c]">Гном I: {g1Dist} м</span>
            <span className="text-[#4ef2ca]">
              {tunnelHours === 24 ? 'Встреча! 120 м' : `Время: ${tunnelHours} ч`}
            </span>
            <span className="text-[#9ae3f5]">Гном II: {g2Dist} м</span>
          </div>
          <div className="relative h-6 w-full overflow-hidden rounded-lg border border-[#72bdd1]/60 bg-[#061e2b]">
            <div
              className="absolute inset-y-0 left-0 bg-[#df8c26]/75 transition-all duration-100"
              style={{ width: `${(g1Dist / 120) * 100}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-[#2d9cb8]/75 transition-all duration-100"
              style={{ width: `${(g2Dist / 120) * 100}%` }}
            />
            <span className="relative z-10 flex h-full items-center justify-center font-math text-xs font-bold text-white tabular-nums">
              {g1Dist + g2Dist} / 120 м
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                if (tunnelHours >= 24) setTunnelHours(0);
                setTunnelPlaying((p) => !p);
              }}
              aria-label={tunnelPlaying ? 'Пауза симуляции' : 'Запустить движение гномов'}
              className="flex items-center gap-1.5 rounded-lg border border-[#e3b864] bg-[#9b6c20]/60 px-3 py-1.5 text-xs font-bold text-[#ffebc2] hover:bg-[#b57f27]/75"
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
              className="h-1.5 flex-1 accent-[#f6c959]"
            />
          </div>
        </div>
      )}

      {kind === 'archive_table_ep3' && (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-[#8ec7d6]/65 bg-[#082433]/65 text-xs sm:text-[13px]">
            <table className="w-full border-collapse text-center font-math">
              <thead className="border-b border-[#8ec7d6]/55 bg-[#0b2f42]/80 text-white">
                <tr>
                  <th className="border-r border-[#8ec7d6]/35 px-2.5 py-2 text-left font-bold">
                    Полка
                  </th>
                  <th className="border-r border-[#8ec7d6]/35 px-2.5 py-2 font-bold">
                    Было
                  </th>
                  <th className="px-2.5 py-2 font-bold">
                    Стало (x = {shelfTestX})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8ec7d6]/45 text-[#eaf6f8] tabular-nums">
                <tr>
                  <td className="border-r border-[#8ec7d6]/35 bg-[#8f7937]/45 px-2.5 py-2 text-left font-bold text-[#ffd45c]">
                    1-я полка
                  </td>
                  <td className="border-r border-[#8ec7d6]/35 px-2.5 py-2 font-semibold">
                    3x
                  </td>
                  <td className="px-2.5 py-2 font-semibold">
                    3x − 16 ={' '}
                    <span className="font-bold text-[#ffd45c]">{shelf1Val}</span>
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-[#8ec7d6]/35 px-2.5 py-2 text-left font-bold text-[#bde9f5]">
                    2-я полка
                  </td>
                  <td className="border-r border-[#8ec7d6]/35 px-2.5 py-2 font-semibold">
                    x
                  </td>
                  <td className="px-2.5 py-2 font-semibold">
                    x + 22 ={' '}
                    <span className="font-bold text-[#ffd45c]">{shelf2Val}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-medium text-[#d8eef2]">Подбор x по полкам:</span>
            <div className="flex items-center gap-2 font-math">
              <div className="flex items-center overflow-hidden rounded-lg border border-[#72bdd1]/65 bg-[#061e2b]">
                <button
                  type="button"
                  onClick={() => setShelfTestX((v) => Math.max(10, v - 1))}
                  aria-label="Уменьшить x"
                  className="flex h-7 w-7 items-center justify-center bg-[#12455e] text-sm font-bold text-white hover:bg-[#195d7d]"
                >
                  −
                </button>
                <span className="w-9 text-center text-sm font-bold text-[#ffd45c] tabular-nums">
                  {shelfTestX}
                </span>
                <button
                  type="button"
                  onClick={() => setShelfTestX((v) => Math.min(25, v + 1))}
                  aria-label="Увеличить x"
                  className="flex h-7 w-7 items-center justify-center bg-[#12455e] text-sm font-bold text-white hover:bg-[#195d7d]"
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
        </div>
      )}

      {kind === 'crystals_ep4' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-12 gap-1 rounded-xl border border-[#72bdd1]/45 bg-[#072231]/65 p-2">
            {Array.from({ length: 12 }).map((_, idx) => {
              let cls = 'bg-[#0e394f] border-[#4b8ea3]';
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
              className="rounded-lg border border-[#e3b864]/75 bg-[#12455e] px-3 py-1.5 font-semibold text-white hover:bg-[#195a7a]"
            >
              {crystalPaint === 'empty'
                ? 'Разбить целое на 12 долей'
                : 'Сбросить доли'}
            </button>
            <span className="font-math text-[11px] font-semibold text-[#ffd45c] tabular-nums">
              {crystalPaint === 'parts'
                ? '4/12 син. + 3/12 ор. + 5/12 зел. (=20)'
                : '12 равных долей = 1 целое (x)'}
            </span>
          </div>
        </div>
      )}

      {kind === 'city_chests_ep5' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2 font-math text-xs tabular-nums">
            <div className="rounded-xl border border-[#e3b864]/60 bg-[#6b4f1b]/35 p-2.5 text-[#fff4d6]">
              <div className="text-[11px] font-semibold text-[#ffd45c]">
                Способ 1 (5x + 10)
              </div>
              <div className="mt-0.5 text-sm font-bold">{way1Coins} монет</div>
            </div>
            <div className="rounded-xl border border-[#72bdd1]/60 bg-[#0d3b52]/75 p-2.5 text-[#e6f7fa]">
              <div className="text-[11px] font-semibold text-[#9ae3f5]">
                Способ 2 (7x − 4)
              </div>
              <div className="mt-0.5 text-sm font-bold">{way2Coins} монет</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#d8eef2]">Проверка сундуков x:</span>
            <div className="flex items-center gap-2 font-math">
              <div className="flex items-center overflow-hidden rounded-lg border border-[#72bdd1]/65 bg-[#061e2b]">
                <button
                  type="button"
                  onClick={() => setChestTestX((v) => Math.max(3, v - 1))}
                  className="flex h-7 w-7 items-center justify-center bg-[#12455e] text-sm font-bold text-white hover:bg-[#195d7d]"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#ffd45c] tabular-nums">
                  {chestTestX}
                </span>
                <button
                  type="button"
                  onClick={() => setChestTestX((v) => Math.min(10, v + 1))}
                  className="flex h-7 w-7 items-center justify-center bg-[#12455e] text-sm font-bold text-white hover:bg-[#195d7d]"
                >
                  +
                </button>
              </div>
              <span
                className={`font-sans font-semibold ${
                  way1Coins === way2Coins ? 'text-[#4ef2ca]' : 'text-[#d8eef2]'
                }`}
              >
                {way1Coins === way2Coins ? 'Совпало!' : 'Разные'}
              </span>
            </div>
          </div>
        </div>
      )}

      {kind === 'boss_river_ep6' && (
        <div className="space-y-2.5">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-bold text-[#ffaf94]">Щит Тени Скобок</span>
              <span className="font-math font-bold text-[#ffd45c] tabular-nums">
                {bossShieldHp}%
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full border border-[#e3b864]/65 bg-[#061e2b]">
              <div
                className="h-full bg-gradient-to-r from-[#d6542b] to-[#f6c959] transition-all duration-300"
                style={{ width: `${bossShieldHp}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 font-math text-xs tabular-nums">
            <div className="rounded-xl border border-[#72bdd1]/55 bg-[#072333] p-2.5">
              <div className="text-[11px] font-semibold text-[#9ae3f5]">
                По течению 3(12+x)
              </div>
              <div className="font-bold text-white">{downDist} км</div>
            </div>
            <div className="rounded-xl border border-[#e3b864]/55 bg-[#072333] p-2.5">
              <div className="text-[11px] font-semibold text-[#ffd45c]">
                Против 5(12−x)
              </div>
              <div className="font-bold text-white">{upDist} км</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-[#d8eef2]">Тест течения x (км/ч):</span>
            <div className="flex items-center gap-1 font-math">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRiverTestX(val)}
                  className={`h-7 w-7 rounded-lg border text-xs font-bold transition-colors ${
                    riverTestX === val
                      ? 'border-[#b46d14] bg-[#f6c959] text-[#102d3e]'
                      : 'border-[#72bdd1]/60 bg-[#0d3c52] text-white hover:bg-[#14506b]'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
