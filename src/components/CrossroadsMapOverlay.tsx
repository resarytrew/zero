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
                {!done && (
                  <span
                    aria-hidden="true"
                    className="portal-ring absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f6c959]"
                  />
                )}

                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-[0_8px_20px_rgba(6,24,36,0.55)] transition-transform duration-150 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white ${
                    done
                      ? 'border-[#33a88d] bg-[#126b57] text-[#e1fff5]'
                      : 'border-[#e6ba62] bg-[#0d3347] text-[#f6c959] group-hover:bg-[#d46714] group-hover:text-white'
                  }`}
                >
                  {done ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Compass className="h-5 w-5" />
                  )}
                </span>

                <span
                  className={`mt-1.5 rounded-full border-2 px-3.5 py-1 text-xs font-extrabold whitespace-nowrap shadow-[0_6px_16px_rgba(4,16,26,0.52)] ring-1 ring-inset ring-[#fff4d6]/55 transition-colors ${
                    done
                      ? 'border-[#33a88d] bg-gradient-to-b from-[#146e59]/96 to-[#0b4739]/96 text-[#e1fff5]'
                      : 'border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 text-[#fff8e6] group-hover:border-[#8b3c07] group-hover:from-[#ef932e] group-hover:to-[#c75b0e] group-hover:text-white'
                  }`}
                >
                  {district.title}
                </span>
              </motion.button>

              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: openUpward ? -6 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.14 }}
                  className={`pointer-events-none absolute left-1/2 z-30 w-64 -translate-x-1/2 rounded-2xl border-[2.5px] border-[#df9d36] bg-[radial-gradient(ellipse_at_top_left,#fff9ea_0%,#faecc9_65%,#f2da9f_100%)] p-3 text-left text-[#152d3c] ring-1 ring-inset ring-[#fff8e6]/80 shadow-2xl ${
                    openUpward ? 'bottom-full mb-2.5' : 'top-full mt-2'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold">
                    <span className={done ? 'text-[#127662]' : 'text-[#b45811]'}>
                      {done ? 'Район восстановлен' : 'Доступен портал'}
                    </span>
                    <span className="font-math text-[#0d3347] tabular-nums">
                      <MathText text={district.mathTheme} />
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-snug font-semibold text-[#2b4d5f]">
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
                className="portal-ring absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f6c959]"
              />
            )}
            <span
              className={`relative flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-[0_8px_24px_rgba(6,24,36,0.6)] transition-transform duration-150 group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white ${
                allDistrictsDone
                  ? 'border-[#8e3d05] bg-gradient-to-b from-[#f08b2d] to-[#d46714] text-white'
                  : 'border-[#e6ba62]/85 bg-[#0d3347]/95 text-[#f6c959]'
              }`}
            >
              {allDistrictsDone ? (
                <Sparkles className="h-5 w-5" />
              ) : (
                <Lock className="h-5 w-5" />
              )}
            </span>
            <span
              className={`mt-1.5 rounded-full border-2 px-3.5 py-1 text-xs font-extrabold whitespace-nowrap shadow-[0_6px_16px_rgba(4,16,26,0.55)] ring-1 ring-inset ring-[#fff4d6]/55 tabular-nums ${
                allDistrictsDone
                  ? 'border-[#8b3c07] bg-gradient-to-b from-[#ef932e] to-[#c75b0e] text-white'
                  : 'border-[#e5b55c] bg-gradient-to-b from-[#14516c]/96 to-[#0a3145]/96 text-[#fff8e6]'
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
              className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 w-64 -translate-x-1/2 rounded-2xl border-[2.5px] border-[#df9d36] bg-[radial-gradient(ellipse_at_top_left,#fff9ea_0%,#faecc9_65%,#f2da9f_100%)] p-3 text-left text-[#152d3c] ring-1 ring-inset ring-[#fff8e6]/80 shadow-2xl"
            >
              <div className="text-[11px] font-extrabold text-[#b45811]">
                {allDistrictsDone
                  ? 'Финальное испытание открыто!'
                  : `Защитный купол (${completedDistricts.length}/4)`}
              </div>
              <p className="mt-1 text-xs leading-snug font-semibold text-[#2b4d5f]">
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
