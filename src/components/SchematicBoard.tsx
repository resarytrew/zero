import { Play, Pause, RotateCcw, Scale } from 'lucide-react';
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
    ? 'pointer-events-auto fixed inset-x-3 top-16 z-40 rounded-xl border border-[#4a8ab5]/80 bg-[#08253c]/97 p-4 shadow-2xl lg:left-5 lg:right-auto lg:top-auto lg:bottom-5 lg:w-[405px] lg:border-[#3a7ca5]/70'
    : 'pointer-events-auto hidden lg:block fixed left-5 bottom-5 z-20 w-[405px] rounded-xl border border-[#3a7ca5]/70 bg-[#08253c]/94 p-4 shadow-2xl';

  return (
    <motion.div
      key={kind}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={containerClasses}
    >
      <div className="mb-2.5 flex items-center justify-between gap-2 text-xs font-medium text-sky-200/90">
        <span className="flex items-center gap-1.5">
          <Scale className="h-3.5 w-3.5 text-amber-300" />
          <span>Интерактивная модель</span>
        </span>
        <div className="flex items-center gap-2">
          {formulaDisplay && (
            <span className="font-math text-amber-300 tabular-nums">
              <MathText text={formulaDisplay} />
            </span>
          )}
          {mobileOpen && onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="min-h-[32px] rounded border border-sky-400/40 px-2.5 py-1 text-xs text-slate-200 hover:bg-sky-900"
            >
              Скрыть
            </button>
          )}
        </div>
      </div>

      {kind === 'compass' && (
        <div className="flex items-center gap-4 py-1">
          <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0" aria-hidden="true">
            <circle cx="32" cy="32" r="28" fill="#0f2942" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="21" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            <text
              x="32"
              y="39"
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="22"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="700"
            >
              X
            </text>
          </svg>
          <p className="text-xs leading-relaxed text-slate-200">
            Латунный компас стал твоим Кодексом Равновесия. В каждом районе ты сможешь крутить и проверять модели прямо здесь.
          </p>
        </div>
      )}

      {kind === 'scales_ep1' && (
        <div className="space-y-2.5">
          <svg viewBox="0 0 280 96" className="w-full" aria-hidden="true">
            <line x1="140" y1="20" x2="140" y2="82" stroke="#d97706" strokeWidth="4" />
            <rect x="110" y="80" width="60" height="8" rx="3" fill="#b45309" />
            <g transform={`rotate(${tiltAngle} 140 26)`}>
              <line x1="48" y1="26" x2="232" y2="26" stroke="#fbbf24" strokeWidth="3" />
              <line x1="55" y1="26" x2="26" y2="56" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="55" y1="26" x2="84" y2="56" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M22 56 Q55 68 88 56 Z" fill="#b45309" />
              <text x="55" y="79" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono">
                {scaleMode === 'initial' ? (step >= 2 ? 'x + 25' : 'мешок + 25') : 'x'}
              </text>

              <line x1="225" y1="26" x2="196" y2="56" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="225" y1="26" x2="254" y2="56" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M192 56 Q225 68 258 56 Z" fill="#b45309" />
              <text x="225" y="79" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="600" fontFamily="JetBrains Mono">
                {scaleMode === 'both_removed' ? '78 − 25' : '78'}
              </text>
            </g>
            <text
              x="140"
              y="14"
              textAnchor="middle"
              fill={scaleMode === 'left_only' ? '#fb7185' : '#34d399'}
              fontSize="10.5"
              fontWeight="700"
            >
              {scaleMode === 'left_only'
                ? 'ПЕРЕКОС! Убрано только слева'
                : '= РАВНОВЕСИЕ СОХРАНЕНО ='}
            </text>
          </svg>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setScaleMode('both_removed')}
              className={`rounded border px-2 py-1 text-[11px] font-medium transition-colors ${
                scaleMode === 'both_removed'
                  ? 'border-emerald-300 bg-emerald-500/25 text-emerald-100'
                  : 'border-sky-400/40 bg-[#0d3554] text-slate-200 hover:bg-[#134870]'
              }`}
            >
              Убрать 25 с обеих чаш
            </button>
            <button
              type="button"
              onClick={() => setScaleMode('left_only')}
              className={`rounded border px-2 py-1 text-[11px] font-medium transition-colors ${
                scaleMode === 'left_only'
                  ? 'border-rose-300 bg-rose-500/25 text-rose-100'
                  : 'border-sky-400/40 bg-[#0d3554] text-slate-200 hover:bg-[#134870]'
              }`}
            >
              Убрать 25 только слева
            </button>
            {scaleMode !== 'initial' && (
              <button
                type="button"
                onClick={() => setScaleMode('initial')}
                aria-label="Сбросить весы"
                className="rounded border border-slate-500/50 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-300 hover:text-white"
              >
                <RotateCcw className="inline h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {kind === 'tunnel_ep2' && (
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs font-math tabular-nums">
            <span className="text-amber-300">Гном I: {g1Dist} м</span>
            <span className="text-emerald-300">
              {tunnelHours === 24 ? 'Встреча! 120 м' : `Время: ${tunnelHours} ч`}
            </span>
            <span className="text-sky-300">Гном II: {g2Dist} м</span>
          </div>
          <div className="relative h-5 w-full overflow-hidden rounded border border-sky-400/40 bg-slate-900/80">
            <div
              className="absolute inset-y-0 left-0 bg-amber-500/55 transition-all duration-100"
              style={{ width: `${(g1Dist / 120) * 100}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-sky-500/55 transition-all duration-100"
              style={{ width: `${(g2Dist / 120) * 100}%` }}
            />
            <span className="relative z-10 flex h-full items-center justify-center font-math text-[11px] font-semibold text-white tabular-nums">
              {g1Dist + g2Dist} / 120 м
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (tunnelHours >= 24) setTunnelHours(0);
                setTunnelPlaying((p) => !p);
              }}
              aria-label={tunnelPlaying ? 'Пауза симуляции' : 'Запустить движение гномов'}
              className="flex items-center gap-1 rounded border border-amber-300/60 bg-amber-400/20 px-2.5 py-1 text-[11px] font-semibold text-amber-200 hover:bg-amber-400/30"
            >
              {tunnelPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
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
              className="h-1.5 flex-1 accent-amber-400"
            />
          </div>
        </div>
      )}

      {kind === 'archive_table_ep3' && (
        <div className="space-y-2.5">
          <div className="overflow-hidden rounded-lg border border-sky-400/30 text-xs">
            <table className="w-full text-left font-math">
              <thead className="bg-sky-950/70 text-sky-200">
                <tr>
                  <th className="px-2.5 py-1.5">Полка</th>
                  <th className="px-2.5 py-1.5">Было</th>
                  <th className="px-2.5 py-1.5">Стало (x={shelfTestX})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-400/20 text-slate-100 tabular-nums">
                <tr>
                  <td className="px-2.5 py-1.5 text-amber-200">1-я полка</td>
                  <td className="px-2.5 py-1.5">3x</td>
                  <td className="px-2.5 py-1.5">
                    3x − 16 = <span className="font-bold text-amber-300">{shelf1Val}</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-2.5 py-1.5 text-sky-200">2-я полка</td>
                  <td className="px-2.5 py-1.5">x</td>
                  <td className="px-2.5 py-1.5">
                    x + 22 = <span className="font-bold text-sky-300">{shelf2Val}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-300">Подбор x на полках:</span>
            <div className="flex items-center gap-1.5 font-math">
              <button
                type="button"
                onClick={() => setShelfTestX((v) => Math.max(10, v - 1))}
                className="rounded border border-sky-400/40 bg-[#0d3554] px-2 py-0.5 text-white hover:bg-[#144b75]"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-amber-200 tabular-nums">
                {shelfTestX}
              </span>
              <button
                type="button"
                onClick={() => setShelfTestX((v) => Math.min(25, v + 1))}
                className="rounded border border-sky-400/40 bg-[#0d3554] px-2 py-0.5 text-white hover:bg-[#144b75]"
              >
                +
              </button>
              <span
                className={`ml-1 font-semibold ${
                  shelf1Val === shelf2Val ? 'text-emerald-300' : 'text-slate-400'
                }`}
              >
                {shelf1Val === shelf2Val ? 'Поровну!' : 'Не равны'}
              </span>
            </div>
          </div>
        </div>
      )}

      {kind === 'crystals_ep4' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }).map((_, idx) => {
              let cls = 'bg-slate-800 border-slate-600/60';
              if (crystalPaint === 'parts') {
                if (idx < 4) cls = 'bg-sky-500/85 border-sky-300';
                else if (idx < 7) cls = 'bg-rose-500/85 border-rose-300';
                else cls = 'bg-emerald-500/85 border-emerald-300';
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
              className="rounded border border-sky-400/50 bg-[#0d3554] px-2.5 py-1 font-medium text-sky-100 hover:bg-[#144b75]"
            >
              {crystalPaint === 'empty'
                ? 'Разбить целое на 12 долей'
                : 'Сбросить доли'}
            </button>
            <span className="font-math text-[11px] text-emerald-200 tabular-nums">
              {crystalPaint === 'parts'
                ? '4/12 син. + 3/12 красн. + 5/12 зел. (=20)'
                : '12 равных долей = 1 целое (x)'}
            </span>
          </div>
        </div>
      )}

      {kind === 'city_chests_ep5' && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2 text-xs font-math tabular-nums">
            <div className="rounded border border-amber-400/35 bg-amber-950/30 p-2 text-amber-100">
              <div className="text-[11px] text-amber-300">Способ 1 (5x + 10)</div>
              <div className="mt-0.5 text-sm font-bold">{way1Coins} монет</div>
            </div>
            <div className="rounded border border-sky-400/35 bg-sky-950/30 p-2 text-sky-100">
              <div className="text-[11px] text-sky-300">Способ 2 (7x − 4)</div>
              <div className="mt-0.5 text-sm font-bold">{way2Coins} монет</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Проверка сундуков x:</span>
            <div className="flex items-center gap-1.5 font-math">
              <button
                type="button"
                onClick={() => setChestTestX((v) => Math.max(3, v - 1))}
                className="rounded border border-sky-400/40 bg-[#0d3554] px-2 py-0.5 text-white hover:bg-[#144b75]"
              >
                −
              </button>
              <span className="w-6 text-center font-bold text-amber-200 tabular-nums">
                {chestTestX}
              </span>
              <button
                type="button"
                onClick={() => setChestTestX((v) => Math.min(10, v + 1))}
                className="rounded border border-sky-400/40 bg-[#0d3554] px-2 py-0.5 text-white hover:bg-[#144b75]"
              >
                +
              </button>
              <span
                className={`ml-1 font-semibold ${
                  way1Coins === way2Coins ? 'text-emerald-300' : 'text-slate-400'
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
              <span className="font-semibold text-rose-300">Щит Тени Скобок</span>
              <span className="font-math text-rose-200 tabular-nums">{bossShieldHp}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full border border-rose-400/40 bg-slate-950">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-300"
                style={{ width: `${bossShieldHp}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-math tabular-nums">
            <div className="rounded border border-sky-400/35 bg-[#062238] p-2">
              <div className="text-[11px] text-sky-300">По течению 3(12+x)</div>
              <div className="font-bold text-white">{downDist} км</div>
            </div>
            <div className="rounded border border-sky-400/35 bg-[#062238] p-2">
              <div className="text-[11px] text-amber-300">Против 5(12−x)</div>
              <div className="font-bold text-white">{upDist} км</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Тест течения x (км/ч):</span>
            <div className="flex items-center gap-1 font-math">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRiverTestX(val)}
                  className={`h-6 w-6 rounded border text-xs font-bold transition-colors ${
                    riverTestX === val
                      ? 'border-amber-300 bg-amber-400 text-slate-950'
                      : 'border-sky-400/40 bg-[#0d3554] text-slate-200 hover:bg-[#144b75]'
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
