import { BookOpen, Lock, X } from 'lucide-react';
import { motion } from 'motion/react';
import { CODEX_LAWS } from '../game/codexData';
import { MathText } from './MathText';

interface CodexModalProps {
  unlockedLaws: number[];
  onClose: () => void;
}

export function CodexModal({ unlockedLaws, onClose }: CodexModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Кодекс Равновесия"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#04101c]/82 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-amber-400/45 bg-[#09273f] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#3a7ca5]/40 bg-[#061c2e] px-5 py-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-amber-300" />
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Кодекс Равновесия
              </h2>
              <p className="text-xs text-slate-300 tabular-nums">
                Открыто законов: {unlockedLaws.length} из {CODEX_LAWS.length}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть Кодекс"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-sky-400/40 bg-[#0d3554] text-slate-200 transition-colors hover:bg-[#144a75] focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="quest-scroll grid flex-1 grid-cols-1 gap-3 overflow-y-auto p-5 sm:grid-cols-2">
          {CODEX_LAWS.map((law) => {
            const isUnlocked = unlockedLaws.includes(law.id);
            return (
              <div
                key={law.id}
                className={`rounded-lg border p-4 ${
                  isUnlocked
                    ? 'border-amber-400/45 bg-[#0d3454]'
                    : 'border-slate-600/40 bg-[#071f33]/80 opacity-75'
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                  <span className="font-medium text-sky-200/80">
                    Запись №{law.id}
                  </span>
                  {!isUnlocked && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Lock className="h-3.5 w-3.5" />
                      Запечатано
                    </span>
                  )}
                </div>

                {isUnlocked ? (
                  <>
                    <h3 className="text-base font-bold text-amber-200">
                      {law.title}
                    </h3>
                    <div className="my-2 rounded bg-[#051828] px-2.5 py-2 font-math text-xs font-semibold text-sky-200 tabular-nums">
                      <MathText text={law.formula} />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-200">
                      <MathText text={law.ruleText} />
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {law.episodeTitle} — реши испытание района, чтобы открыть этот закон в Кодексе.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
