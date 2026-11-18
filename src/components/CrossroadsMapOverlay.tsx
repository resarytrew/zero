import { CheckCircle2, Compass, Lock, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { DISTRICTS, TEMPLE_PORTAL_COORDS } from '../game/codexData';
import type { DistrictId } from '../game/types';
import { MathText } from './MathText';

interface CrossroadsMapOverlayProps {
  completedDistricts: DistrictId[];
  onSelectDistrict: (districtId: DistrictId) => void;
  onEnterTemple: () => void;
}

export function CrossroadsMapOverlay({
  completedDistricts,
  onSelectDistrict,
  onEnterTemple,
}: CrossroadsMapOverlayProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const allDistrictsDone = DISTRICTS.every((d) =>
    completedDistricts.includes(d.id),
  );

  return (
    <div
      aria-label="Интерактивная карта Перекрёстка Четырёх Стихий"
      className="pointer-events-none fixed inset-0 z-20 hidden overflow-hidden md:block"
    >
      {/* 16:9 Stage matched to object-cover so portal pins sit accurately on arches */}
      <div className="absolute top-1/2 left-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2">
        {DISTRICTS.map((district, index) => {
          const done = completedDistricts.includes(district.id);
          const isHovered = hoveredId === district.id;
          const openUpward = district.portalCoords.y > 55;

          return (
            <div
              key={district.id}
              style={{
                left: `${district.portalCoords.x}%`,
                top: `${district.portalCoords.y}%`,
              }}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.22,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => onSelectDistrict(district.id)}
                onMouseEnter={() => setHoveredId(district.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(district.id)}
                onBlur={() => setHoveredId(null)}
                aria-label={`${district.title} — ${done ? 'Восстановлен' : 'Открыт для прохождения'}`}
                className="group relative flex flex-col items-center focus-visible:outline-none"
              >
                {/* Animated subtle beacon ring on pending portals */}
                {!done && (
                  <span
                    aria-hidden="true"
                    className="portal-ring absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/75"
                  />
                )}

                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_8px_24px_rgba(2,12,24,0.85)] transition-transform duration-150 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-amber-300 ${
                    done
                      ? 'border-emerald-300/90 bg-[#08382c]/95 text-emerald-300'
                      : 'border-amber-300/90 bg-[#082c48]/95 text-amber-300 group-hover:border-white'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Compass className="h-5 w-5" />
                  )}
                </span>

                <span
                  className={`mt-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold whitespace-nowrap shadow-lg transition-colors ${
                    done
                      ? 'border-emerald-400/50 bg-[#062a24]/92 text-emerald-100'
                      : 'border-[#4a8ab5]/80 bg-[#062036]/94 text-white group-hover:border-amber-300/80'
                  }`}
                >
                  {district.title}
                </span>
              </motion.button>

              {/* Floating Preview Card on Hover/Focus */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: openUpward ? -6 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.14 }}
                  className={`pointer-events-none absolute left-1/2 z-30 w-64 -translate-x-1/2 rounded-lg border border-[#4a8ab5]/85 bg-[#062036]/97 p-3 text-left shadow-2xl ${
                    openUpward ? 'bottom-full mb-2.5' : 'top-full mt-2'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
                    <span className={done ? 'text-emerald-300' : 'text-amber-300'}>
                      {done ? 'Район восстановлен' : 'Доступен портал'}
                    </span>
                    <span className="font-math text-sky-200 tabular-nums">
                      <MathText text={district.mathTheme} />
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug text-slate-200">
                    {district.subtitle}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Temple of Great Balance Portal Pin */}
        <div
          style={{
            left: `${TEMPLE_PORTAL_COORDS.x}%`,
            top: `${TEMPLE_PORTAL_COORDS.y}%`,
          }}
          className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
        >
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={onEnterTemple}
            onMouseEnter={() => setHoveredId('temple')}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId('temple')}
            onBlur={() => setHoveredId(null)}
            aria-label={`Храм Великого Баланса — ${
              allDistrictsDone
                ? 'Купол снят, войти в финал'
                : `Закрыт, пройдено районов ${completedDistricts.length} из 4`
            }`}
            className="group relative flex flex-col items-center focus-visible:outline-none"
          >
            {allDistrictsDone && (
              <span
                aria-hidden="true"
                className="portal-ring absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-300"
              />
            )}
            <span
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_8px_28px_rgba(2,12,24,0.9)] transition-transform duration-150 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-amber-300 ${
                allDistrictsDone
                  ? 'border-amber-200 bg-amber-500 text-slate-950'
                  : 'border-slate-400/70 bg-[#082238]/95 text-slate-300'
              }`}
            >
              {allDistrictsDone ? (
                <Sparkles className="h-5 w-5" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </span>
            <span
              className={`mt-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold whitespace-nowrap shadow-lg tabular-nums ${
                allDistrictsDone
                  ? 'border-amber-300 bg-amber-400 text-slate-950'
                  : 'border-slate-500/70 bg-[#062036]/94 text-slate-200'
              }`}
            >
              Храм Баланса · {completedDistricts.length}/4
            </span>
          </motion.button>

          {hoveredId === 'temple' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.14 }}
              className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 w-64 -translate-x-1/2 rounded-lg border border-amber-300/75 bg-[#062036]/97 p-3 text-left shadow-2xl"
            >
              <div className="text-[11px] font-semibold text-amber-300">
                {allDistrictsDone
                  ? 'Финальное испытание открыто!'
                  : `Защитный купол (${completedDistricts.length}/4)`}
              </div>
              <p className="mt-1 text-xs leading-snug text-slate-200">
                {allDistrictsDone
                  ? 'Все четыре руны равновесия горят. Нажми, чтобы сразиться с Тенью Скобок.'
                  : 'Восстанови все четыре района острова, чтобы снять купол Храма.'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
