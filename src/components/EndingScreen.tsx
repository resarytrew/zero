import { AlertCircle, Award, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { SCENE_IMAGES } from '../game/codexData';
import { buildDiagnosticReport } from '../game/engine';
import type { EndingResult, PlayerState } from '../game/types';
import { MathText } from './MathText';

interface EndingScreenProps {
  ending: EndingResult;
  playerState: PlayerState;
  onRestart: () => void;
  onOpenCodex: () => void;
}

const TONE_CLASSES: Record<EndingResult['accentTone'], string> = {
  gold: 'border-amber-300/70 text-amber-200',
  cyan: 'border-sky-300/70 text-sky-200',
  amber: 'border-orange-300/70 text-orange-200',
  violet: 'border-purple-300/70 text-purple-200',
  emerald: 'border-emerald-300/70 text-emerald-200',
};

export function EndingScreen({
  ending,
  playerState,
  onRestart,
  onOpenCodex,
}: EndingScreenProps) {
  const diagnostics = buildDiagnosticReport(playerState);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-y-auto bg-[#071b2b] p-4 sm:p-8">
      <img
        src={SCENE_IMAGES.attic}
        alt="Школьный чердак на закате"
        referrerPolicy="no-referrer"
        className="fixed inset-0 h-full w-full object-cover object-center select-none"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[#051422]/84"
      />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-auto w-full max-w-3xl rounded-xl border border-[#4a8ab5]/70 bg-[#082c48]/95 p-6 shadow-2xl sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#3a7ca5]/40 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">
              {ending.subtitle}
            </p>
            <h1 className="font-display mt-1 text-2xl font-bold text-white sm:text-4xl text-balance">
              {ending.title}
            </h1>
          </div>

          <div
            className={`flex items-center gap-2 rounded-lg border bg-[#051d30] px-3.5 py-2 ${TONE_CLASSES[ending.accentTone]}`}
          >
            <Award className="h-5 w-5 shrink-0" />
            <span className="font-math text-sm font-bold tabular-nums">
              {playerState.balanceIntegrity}%
            </span>
          </div>
        </div>

        {/* Ending Narrative */}
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-100">
          {ending.paragraphs.map((p, idx) => (
            <p key={idx}>
              <MathText text={p} />
            </p>
          ))}
        </div>

        {/* Compass Engraving Plaque (Clean Surface Contrast, No Nested Border Overload) */}
        <div className="mt-5 rounded-lg bg-[#051d30]/90 px-4 py-3.5">
          <div className="text-xs font-semibold text-amber-300">
            Гравировка на латунном компасе
          </div>
          <p className="font-display mt-1 text-base italic text-amber-100">
            {ending.engraving}
          </p>
        </div>

        {/* Clean Unboxed Hairline Mastery Metrics */}
        <div className="mt-5 grid grid-cols-1 gap-4 border-y border-[#3a7ca5]/40 py-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#3a7ca5]/35">
          <div className="sm:pr-4">
            <div className="text-xs text-slate-300">Законы Кодекса</div>
            <div className="font-math mt-1 text-2xl font-bold text-amber-300 tabular-nums">
              {playerState.unlockedLaws.length} / 6
            </div>
          </div>
          <div className="sm:px-4">
            <div className="text-xs text-slate-300">Точность равновесия</div>
            <div className="font-math mt-1 text-2xl font-bold text-emerald-300 tabular-nums">
              {playerState.balanceIntegrity}%
            </div>
          </div>
          <div className="sm:pl-4">
            <div className="text-xs text-slate-300">Ошибок в пути</div>
            <div className="font-math mt-1 text-2xl font-bold text-sky-200 tabular-nums">
              {playerState.mistakesCount}
            </div>
          </div>
        </div>

        {/* Diagnostic Map of Difficulties */}
        <section
          aria-label="Карта типичных затруднений"
          className="mt-5"
        >
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold text-sky-200">
              Карта типичных затруднений и план повторения
            </h2>
            <span className="font-math text-xs text-slate-300 tabular-nums">
              {diagnostics.length === 0
                ? 'Без затруднений'
                : `Тем на повторение: ${diagnostics.length}`}
            </span>
          </div>

          {diagnostics.length === 0 ? (
            <div className="flex items-start gap-2.5 rounded-lg bg-[#051d30]/75 p-3.5 text-sm text-emerald-200">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <p>
                Затруднений не выявлено! Все алгебраические навыки — от обозначения неизвестного до раскрытия скобок и проверки подстановкой — применены уверенно.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#3a7ca5]/30 rounded-lg bg-[#051d30]/75 px-4">
              {diagnostics.map((item) => (
                <div key={item.category} className="py-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-semibold text-amber-200">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                      <span>{item.title}</span>
                    </span>
                    <span className="font-math text-slate-300 tabular-nums">
                      Ошибок: {item.count} · Закон №{item.codexLawId}
                    </span>
                  </div>
                  <p className="mt-1 leading-relaxed text-slate-200">
                    <MathText text={item.advice} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <ul className="mt-4 space-y-1 text-xs text-slate-300">
          {ending.pathSummary.map((line, idx) => (
            <li key={idx}>· {line}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-start="true"
            onClick={onRestart}
            className="flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-white"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Пройти снова и открыть другую концовку</span>
          </button>

          <button
            type="button"
            onClick={onOpenCodex}
            className="flex min-h-[44px] items-center gap-2 rounded-lg border border-[#4a8ab5]/70 bg-[#0d3d61] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15527f] focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <BookOpen className="h-4 w-4 text-amber-300" />
            <span>Просмотреть все 6 правил</span>
          </button>
        </div>
      </motion.main>
    </div>
  );
}
