import { AlertCircle, Award, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { SCENE_IMAGES } from '../game/codexData';
import { buildDiagnosticReport } from '../game/engine';
import type { EndingResult, PlayerState } from '../game/types';
import { MathText } from './MathText';
import { ParchmentBackdrop, StorybookHeadingOrnament } from './StorybookFrames';

interface EndingScreenProps {
  ending: EndingResult;
  playerState: PlayerState;
  onRestart: () => void;
  onOpenCodex: () => void;
}

const TONE_CLASSES: Record<EndingResult['accentTone'], string> = {
  gold: 'border-[#e6ba62] bg-[#0d3347] text-[#ffd45c]',
  cyan: 'border-[#72bdd1] bg-[#0d3347] text-[#9ae3f5]',
  amber: 'border-[#f08b2d] bg-[#0d3347] text-[#ffb978]',
  violet: 'border-[#c4a7f5] bg-[#0d3347] text-[#e1d4ff]',
  emerald: 'border-[#4ef2ca] bg-[#0d3347] text-[#8affdf]',
};

export function EndingScreen({
  ending,
  playerState,
  onRestart,
  onOpenCodex,
}: EndingScreenProps) {
  const diagnostics = buildDiagnosticReport(playerState);
  const transferList = Object.values(playerState.transferCheckResults ?? {});
  const transferFirstTryCount = transferList.filter((r) => r.solvedFirstTry).length;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-y-auto bg-[#0e394e] p-4 sm:p-8">
      <img
        src={SCENE_IMAGES.attic}
        alt="Школьный чердак на закате"
        referrerPolicy="no-referrer"
        className="fixed inset-0 h-full w-full object-cover object-center select-none"
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-[#082433]/65"
      />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-auto w-full max-w-3xl overflow-visible p-7 text-[#152d3c] sm:p-9"
      >
        <ParchmentBackdrop notch={16} />
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#d4b068] pb-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#a8461c]">
              {ending.subtitle}
            </p>
            <div className="mt-1 flex items-center gap-2.5">
              <StorybookHeadingOrnament />
              <h1 className="font-display text-2xl font-extrabold text-[#0d3347] sm:text-4xl text-balance">
                {ending.title}
              </h1>
            </div>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 shadow-sm ${TONE_CLASSES[ending.accentTone]}`}
          >
            <Award className="h-5 w-5 shrink-0" />
            <span className="font-math text-sm font-extrabold tabular-nums">
              {playerState.balanceIntegrity}%
            </span>
          </div>
        </div>

        {/* Ending Narrative */}
        <div className="relative z-10 mt-5 space-y-3 text-[15px] leading-relaxed font-medium text-[#152d3c]">
          {ending.paragraphs.map((p, idx) => (
            <p key={idx}>
              <MathText text={p} />
            </p>
          ))}
        </div>

        {/* Compass Engraving Plaque */}
        <div className="relative z-10 mt-5 rounded-2xl border-2 border-[#e5b55c] bg-gradient-to-b from-[#14516c] to-[#0a3145] px-4 py-3.5 text-white shadow-sm">
          <div className="text-xs font-extrabold uppercase tracking-wider text-[#ffd859]">
            Гравировка на латунном компасе
          </div>
          <p className="font-serif-book mt-1 text-base italic text-[#fff4d6]">
            {ending.engraving}
          </p>
        </div>

        {/* Clean Unboxed Hairline Mastery Metrics */}
        <div className="mt-5 grid grid-cols-1 gap-4 border-y border-[#d4b068] py-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#d4b068]">
          <div className="sm:pr-4">
            <div className="text-xs font-bold text-[#47687a]">Законы Кодекса</div>
            <div className="font-math mt-1 text-2xl font-extrabold text-[#b45811] tabular-nums">
              {playerState.unlockedLaws.length} / 6
            </div>
          </div>
          <div className="sm:px-4">
            <div className="text-xs font-bold text-[#47687a]">Точность равновесия</div>
            <div className="font-math mt-1 text-2xl font-extrabold text-[#127662] tabular-nums">
              {playerState.balanceIntegrity}%
            </div>
          </div>
          <div className="sm:pl-4">
            <div className="text-xs font-bold text-[#47687a]">Ошибок в пути</div>
            <div className="font-math mt-1 text-2xl font-extrabold text-[#0d3347] tabular-nums">
              {playerState.mistakesCount}
            </div>
          </div>
        </div>

        {/* Independent Transfer Check Summary */}
        {transferList.length > 0 && (
          <section
            aria-label="Независимая итоговая проверка"
            className="relative z-10 mt-5"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <h2 className="text-sm font-extrabold text-[#0d3347]">
                Независимая проверка переноса навыка (без подсказок)
              </h2>
              <span className="font-math text-xs font-extrabold text-[#127662] tabular-nums">
                С первой попытки: {transferFirstTryCount} / {transferList.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {transferList.map((res) => (
                <div
                  key={res.id}
                  className={`rounded-xl border-2 px-3 py-2 text-xs ${
                    res.solvedFirstTry
                      ? 'border-[#2f856d] bg-[#d8f5ea] text-[#0c3f31]'
                      : 'border-[#d49a3a] bg-[#fff9eb] text-[#5e2d06]'
                  }`}
                >
                  <div className="font-extrabold">{res.topic}</div>
                  <div className="mt-0.5 font-semibold opacity-90">
                    {res.solvedFirstTry
                      ? 'Решено самостоятельно с 1-й попытки'
                      : `Решено за ${res.attempts} поп.`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Diagnostic Map of Difficulties */}
        <section aria-label="Карта типичных затруднений" className="relative z-10 mt-5">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <h2 className="text-sm font-extrabold text-[#0d3347]">
              Карта типичных затруднений и план повторения
            </h2>
            <span className="font-math text-xs font-bold text-[#47687a] tabular-nums">
              {diagnostics.length === 0
                ? 'Без затруднений'
                : `Тем на повторение: ${diagnostics.length}`}
            </span>
          </div>

          {diagnostics.length === 0 ? (
            <div className="flex items-start gap-2.5 rounded-xl border-2 border-[#2f856d] bg-[#d8f5ea] p-3.5 text-sm font-semibold text-[#0c3f31]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#157a5e]" />
              <p>
                Затруднений не выявлено! Все алгебраические навыки — от обозначения неизвестного до раскрытия скобок и проверки подстановкой — применены уверенно.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#d4b068] rounded-xl border-2 border-[#d49a3a] bg-[#fff9eb] px-4">
              {diagnostics.map((item) => (
                <div key={item.category} className="py-3 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 font-extrabold text-[#a8461c]">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-[#c96814]" />
                      <span>{item.title}</span>
                    </span>
                    <span className="font-math font-bold text-[#47687a] tabular-nums">
                      Ошибок: {item.count} · Закон №{item.codexLawId}
                    </span>
                  </div>
                  <p className="mt-1 leading-relaxed font-medium text-[#1b3a4b]">
                    <MathText text={item.advice} />
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <ul className="mt-4 space-y-1 text-xs font-semibold text-[#3c5969]">
          {ending.pathSummary.map((line, idx) => (
            <li key={idx}>· {line}</li>
          ))}
        </ul>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            data-start="true"
            onClick={onRestart}
            className="storybook-btn-primary flex min-h-[48px] items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Пройти снова и открыть другую концовку</span>
          </button>

          <button
            type="button"
            onClick={onOpenCodex}
            className="storybook-btn-sky flex min-h-[48px] items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347]"
          >
            <BookOpen className="h-4 w-4" />
            <span>Просмотреть все 6 правил и значки</span>
          </button>
        </div>
      </motion.main>
    </div>
  );
}
