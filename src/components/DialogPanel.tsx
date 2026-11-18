import {
  AlertTriangle,
  CheckCircle2,
  Compass,
  Lock,
  Scale,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { DISTRICTS, SPEAKER_META } from '../game/codexData';
import type { FeedbackBanner } from '../game/engine';
import type {
  DistrictId,
  PlayerState,
  SpeakerMood,
  StoryChoice,
  StoryNode,
} from '../game/types';
import { FormulaBlock, MathText } from './MathText';
import { SpeakerPortrait } from './SpeakerPortrait';

interface DialogPanelProps {
  node: StoryNode;
  playerState: PlayerState;
  feedback: FeedbackBanner | null;
  instantText: boolean;
  onChoice: (choice: StoryChoice) => void;
  onSubmitNumeric: (value: string) => void;
  onSubmitDualNumeric: (first: string, second: string) => void;
  onSubmitScratchpad: (values: Record<string, string>) => void;
  onSubmitVerification: (values: Record<string, string>) => void;
  onSubmitTable: (selections: Record<string, string>) => void;
  onSelectDistrict: (districtId: DistrictId) => void;
  onEnterTemple: () => void;
  onToggleMobileModel?: () => void;
}

function resolveMood(
  node: StoryNode,
  feedback: FeedbackBanner | null,
): SpeakerMood {
  if (feedback?.isError) return 'alert';
  if (feedback && !feedback.isError) return 'encourage';
  if (node.mood) return node.mood;
  if (node.speaker === 'shadow') return 'alert';
  if (node.id.includes('outro') || node.id.includes('victory')) return 'triumph';
  if (
    node.formulaDisplay ||
    node.numericTask ||
    node.scratchpadTask ||
    node.verificationTask ||
    node.tableTask ||
    node.dualNumericTask
  ) {
    return 'curious';
  }
  return 'neutral';
}

export function DialogPanel({
  node,
  playerState,
  feedback,
  instantText,
  onChoice,
  onSubmitNumeric,
  onSubmitDualNumeric,
  onSubmitScratchpad,
  onSubmitVerification,
  onSubmitTable,
  onSelectDistrict,
  onEnterTemple,
  onToggleMobileModel,
}: DialogPanelProps) {
  const [numericVal, setNumericVal] = useState('');
  const [firstVal, setFirstVal] = useState('');
  const [secondVal, setSecondVal] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [tableSelections, setTableSelections] = useState<Record<string, string>>({});

  const totalChars = useMemo(
    () => node.text.reduce((sum, p) => sum + p.length, 0),
    [node.text],
  );

  const shouldInstant = useMemo(() => {
    if (instantText) return true;
    if (typeof window !== 'undefined') {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, [instantText]);

  const [revealedChars, setRevealedChars] = useState(() =>
    shouldInstant ? totalChars : 0,
  );

  useEffect(() => {
    setNumericVal('');
    setFirstVal('');
    setSecondVal('');
    setFieldValues({});
    setTableSelections({});
    setRevealedChars(shouldInstant ? totalChars : 0);
  }, [node.id, shouldInstant, totalChars]);

  useEffect(() => {
    if (shouldInstant || revealedChars >= totalChars) return;
    const timer = window.setInterval(() => {
      setRevealedChars((prev) => {
        if (prev + 2 >= totalChars) {
          window.clearInterval(timer);
          return totalChars;
        }
        return prev + 2;
      });
    }, 20);
    return () => window.clearInterval(timer);
  }, [node.id, shouldInstant, totalChars, revealedChars >= totalChars]);

  const isFullyRevealed = revealedChars >= totalChars;

  const revealAll = useCallback(() => {
    setRevealedChars(totalChars);
  }, [totalChars]);

  useEffect(() => {
    if (isFullyRevealed) return;
    const onKeySkip = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
      e.preventDefault();
      revealAll();
    };
    window.addEventListener('keydown', onKeySkip);
    return () => window.removeEventListener('keydown', onKeySkip);
  }, [isFullyRevealed, revealAll]);

  const speakerMeta = SPEAKER_META[node.speaker];
  const speakerMood = resolveMood(node, feedback);
  const allDistrictsDone = DISTRICTS.every((d) =>
    playerState.completedDistricts.includes(d.id),
  );
  const hasInteractiveModel =
    node.schematic &&
    node.schematic !== 'none' &&
    node.schematic !== 'crossroads_map';

  const handleNumericForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmitNumeric(numericVal);
  };

  const handleDualForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmitDualNumeric(firstVal, secondVal);
  };

  const handleScratchpadForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmitScratchpad(fieldValues);
  };

  const handleVerificationForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmitVerification(fieldValues);
  };

  const handleTableForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmitTable(tableSelections);
  };

  // Compute revealed slice per paragraph cleanly
  const visibleParagraphs = useMemo(() => {
    let remaining = revealedChars;
    return node.text.map((p) => {
      if (remaining <= 0) return '';
      if (remaining >= p.length) {
        remaining -= p.length;
        return p;
      }
      const slice = p.slice(0, remaining);
      remaining = 0;
      return slice;
    });
  }, [node.text, revealedChars]);

  // Fast-forward / Advance chevron button handler matching screenshot bottom-right ">>"
  const singleLinearChoice =
    !node.isCrossroadsHub &&
    !node.numericTask &&
    !node.dualNumericTask &&
    !node.scratchpadTask &&
    !node.verificationTask &&
    !node.tableTask &&
    node.choices &&
    node.choices.length === 1
      ? node.choices[0]
      : null;

  const handleChevronAction = () => {
    if (!isFullyRevealed) {
      revealAll();
      return;
    }
    if (singleLinearChoice) {
      onChoice(singleLinearChoice);
    }
  };

  // Pre-sized visual novel container; Crossroads docks wide & low at bottom-center cleanly below portals
  const positionClasses = node.isCrossroadsHub
    ? 'fixed right-3 bottom-3 left-3 z-20 max-h-[62vh] sm:max-h-[68vh] md:right-auto md:left-1/2 md:-translate-x-1/2 md:bottom-4 md:w-[680px] lg:w-[740px] md:max-h-[calc(100vh-14rem)]'
    : 'fixed right-3 bottom-3 left-3 z-20 max-h-[62vh] sm:left-auto sm:right-5 sm:bottom-5 sm:max-h-[calc(100vh-7.5rem)] sm:w-[580px] lg:w-[640px]';

  return (
    <motion.section
      key={node.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      aria-label={node.episodeTitle}
      className={`${positionClasses} flex flex-col overflow-visible rounded-2xl border border-[#2f7ea8]/75 border-t-2 border-t-[#5be3f5] bg-gradient-to-b from-[#082d4b]/96 to-[#0b426a]/96 shadow-[0_22px_54px_rgba(2,12,24,0.82)]`}
    >
      {/* Enlarged Hologram Portrait anchored on Top-Right Cyan Rim */}
      <div
        className={`pointer-events-none absolute z-30 ${
          node.isCrossroadsHub
            ? '-top-[78px] right-3 sm:-top-[106px] sm:right-5 lg:-top-[118px] lg:right-6'
            : '-top-[92px] right-3 sm:-top-[118px] sm:right-5 lg:-top-[146px] lg:right-6'
        }`}
      >
        <SpeakerPortrait
          speaker={node.speaker}
          mood={speakerMood}
          variant="popout"
          compact={node.isCrossroadsHub}
        />
      </div>

      {/* Main Panel Content (pre-sized to full required node height immediately) */}
      <div
        className={`quest-scroll flex-1 overflow-y-auto px-5 ${
          node.isCrossroadsHub
            ? 'space-y-2 pt-3.5 pb-3.5 sm:px-6 sm:pt-4 sm:pb-4'
            : 'space-y-3 pt-4 pb-4 sm:px-7 sm:pt-5 sm:pb-5'
        }`}
      >
        {/* Top-Left Speaker Kicker & Episode Context (padded right to clear hologram) */}
        <div
          className={
            node.isCrossroadsHub
              ? 'pr-28 sm:pr-36 lg:pr-40'
              : 'pr-32 sm:pr-40 lg:pr-48'
          }
        >
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
            <span className="text-xs font-bold uppercase tracking-[0.13em] text-[#5be3f5] sm:text-[13px]">
              {node.speakerName}
            </span>
            <span aria-hidden="true" className="hidden text-sky-400/50 sm:inline">
              ·
            </span>
            <span className="text-xs font-medium text-sky-100/80">
              {node.episodeTitle}
            </span>
          </div>

          {(node.mathTopic || node.formulaDisplay || (hasInteractiveModel && onToggleMobileModel)) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {node.mathTopic && (
                <span className="text-xs text-slate-300/90">
                  <MathText text={node.mathTopic} />
                </span>
              )}
              {node.formulaDisplay && <FormulaBlock formula={node.formulaDisplay} />}
              {hasInteractiveModel && onToggleMobileModel && (
                <button
                  type="button"
                  onClick={onToggleMobileModel}
                  className="flex min-h-[32px] items-center gap-1.5 rounded-lg border border-sky-400/50 bg-[#0d3554] px-2.5 py-1 text-xs font-medium text-sky-100 hover:bg-[#144b75] lg:hidden"
                >
                  <Scale className="h-3.5 w-3.5 text-amber-300" />
                  <span>Модель</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Fixed-Height Narrative Prose Container: Ghost Full Text Sets Final Box Height Immediately */}
        <div
          onClick={!isFullyRevealed ? revealAll : undefined}
          className={`relative pr-8 text-[15px] leading-relaxed text-white sm:text-[16px] ${
            !isFullyRevealed ? 'cursor-pointer' : ''
          }`}
        >
          {/* Invisible full text locks exact height from frame 0 */}
          <div
            aria-hidden="true"
            className="invisible pointer-events-none select-none space-y-2"
          >
            {node.text.map((paragraph, idx) => (
              <p key={idx} className="text-pretty">
                <MathText text={paragraph} />
              </p>
            ))}
          </div>

          {/* Visible progressive typewriter overlay */}
          <div className="absolute inset-0 space-y-2">
            {node.text.map((_, idx) => {
              const visible = visibleParagraphs[idx] ?? '';
              if (!visible && idx > 0) return null;
              return (
                <p key={idx} className="text-pretty">
                  <MathText text={visible} />
                </p>
              );
            })}
          </div>
        </div>

        {/* Adaptive 2-Tier Scaffolding Feedback Callout */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            role="status"
            className={`border-t pt-3 text-sm leading-relaxed ${
              feedback.isError
                ? 'border-amber-400/45 text-amber-100'
                : 'border-emerald-400/45 text-emerald-100'
            }`}
          >
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1.5 tracking-wide">
                {feedback.isError ? (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-300" />
                ) : (
                  <Sparkles className="h-4 w-4 shrink-0 text-emerald-300" />
                )}
                <span>{feedback.speaker}</span>
              </span>
              {feedback.hintLevel && (
                <span className="text-[11px] font-medium text-amber-200/90">
                  {feedback.hintLevel === 1
                    ? 'Подсказка 1/2 · Наводящий вопрос'
                    : 'Подсказка 2/2 · Разбор правила'}
                </span>
              )}
            </div>
            <p className="rounded-lg bg-[#051d30]/75 px-3 py-2.5">
              <MathText text={feedback.text} />
            </p>
          </motion.div>
        )}

        {/* Crossroads Hub: Desktop guides to Map Pins + Mobile keeps touch list */}
        {node.isCrossroadsHub && (
          <>
            <div className="hidden border-t border-sky-300/20 pt-2.5 md:block">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-[#5be3f5]">
                  <Compass className="h-4 w-4 text-amber-300" />
                  <span>Нажми на любой портал на карте острова выше</span>
                </span>
                <span className="font-math font-semibold text-amber-200 tabular-nums">
                  {playerState.completedDistricts.length}/4 районов
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-sky-300/20 pt-3 md:hidden">
              {DISTRICTS.map((district) => {
                const done = playerState.completedDistricts.includes(district.id);
                return (
                  <button
                    key={district.id}
                    type="button"
                    onClick={() => onSelectDistrict(district.id)}
                    className={`flex min-h-[44px] w-full flex-col justify-between gap-1 rounded-xl border px-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                      done
                        ? 'border-emerald-400/45 bg-emerald-950/35 text-emerald-100 hover:bg-emerald-950/55'
                        : 'border-[#4a8ab5]/70 bg-[#0d3d61]/75 text-white hover:border-sky-300 hover:bg-[#15527f]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        {done && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        )}
                        <span>{district.title}</span>
                      </span>
                      <span className="shrink-0 font-math text-xs text-amber-200/90 tabular-nums">
                        {done ? 'Восстановлен' : <MathText text={district.mathTheme} />}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300/85">
                      {district.subtitle}
                    </div>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={onEnterTemple}
                className={`mt-1 flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 ${
                  allDistrictsDone
                    ? 'border-amber-300 bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'border-slate-500/45 bg-[#051d30] text-slate-300 hover:bg-[#0d3554]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {allDistrictsDone ? (
                    <Sparkles className="h-4 w-4 shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                  <span className="text-sm">
                    Храм Великого Баланса (Финал)
                  </span>
                </div>
                <span className="font-math text-xs tabular-nums">
                  {playerState.completedDistricts.length}/4
                </span>
              </button>
            </div>
          </>
        )}

        {/* Standard Choices */}
        {node.choices && node.choices.length > 0 && (
          <div className="space-y-2 border-t border-sky-300/20 pt-3 pr-8">
            {node.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                onClick={() => onChoice(choice)}
                className="min-h-[44px] w-full rounded-xl border border-[#4a8ab5]/70 bg-[#06243d]/75 px-4 py-2.5 text-left text-sm font-medium text-slate-50 transition-colors hover:border-[#5be3f5] hover:bg-[#114974] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                <MathText text={choice.label} />
              </button>
            ))}
          </div>
        )}

        {/* Step-by-Step Equation Scratchpad */}
        {node.scratchpadTask && (
          <form
            onSubmit={handleScratchpadForm}
            className="space-y-3 border-t border-sky-300/20 pt-3.5"
          >
            <div>
              <div className="text-xs font-semibold text-amber-300">
                {node.scratchpadTask.title}
              </div>
              <p className="mt-0.5 text-xs text-slate-200">
                <MathText text={node.scratchpadTask.equationContext} />
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {node.scratchpadTask.fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={`scratch-${field.id}`}
                    className="mb-1 block text-xs text-slate-300"
                  >
                    <MathText text={field.label} />
                  </label>
                  <div className="flex items-center gap-1.5 font-math">
                    {field.prefix && (
                      <span className="text-sm text-sky-200">
                        <MathText text={field.prefix} />
                      </span>
                    )}
                    <input
                      id={`scratch-${field.id}`}
                      type="number"
                      inputMode="numeric"
                      value={fieldValues[field.id] ?? ''}
                      onChange={(e) =>
                        setFieldValues((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder ?? '?'}
                      className="font-math h-11 w-full min-w-0 rounded-lg border border-[#4a8ab5]/80 bg-[#051d30] px-3 py-0 text-base leading-normal text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none tabular-nums"
                    />
                    {field.suffix && (
                      <span className="text-sm text-amber-200">
                        <MathText text={field.suffix} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-white"
            >
              Записать шаг черновика
            </button>
          </form>
        )}

        {/* Substitution Self-Check */}
        {node.verificationTask && (
          <form
            onSubmit={handleVerificationForm}
            className="space-y-3 border-t border-emerald-400/35 pt-3.5"
          >
            <div>
              <div className="text-xs font-semibold text-emerald-300">
                {node.verificationTask.title}
              </div>
              <p className="mt-0.5 text-xs text-slate-200">
                <MathText text={node.verificationTask.prompt} />
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {node.verificationTask.fields.map((field) => (
                <div
                  key={field.id}
                  className={
                    node.verificationTask!.fields.length === 1
                      ? 'sm:col-span-2'
                      : ''
                  }
                >
                  <label
                    htmlFor={`verify-${field.id}`}
                    className="mb-1 block text-xs text-slate-300"
                  >
                    <MathText text={field.label} />
                  </label>
                  <div className="flex items-center gap-1.5 font-math">
                    {field.prefix && (
                      <span className="shrink-0 text-xs text-emerald-200">
                        <MathText text={field.prefix} />
                      </span>
                    )}
                    <input
                      id={`verify-${field.id}`}
                      type="number"
                      inputMode="numeric"
                      value={fieldValues[field.id] ?? ''}
                      onChange={(e) =>
                        setFieldValues((prev) => ({
                          ...prev,
                          [field.id]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder ?? '?'}
                      className="font-math h-11 w-full min-w-0 rounded-lg border border-emerald-400/60 bg-[#051d30] px-3 py-0 text-base leading-normal text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none tabular-nums"
                    />
                    {field.suffix && (
                      <span className="shrink-0 text-xs text-slate-300">
                        {field.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-white"
            >
              Подтвердить проверку
            </button>
          </form>
        )}

        {/* Single Numeric Input Task */}
        {node.numericTask && (
          <form
            onSubmit={handleNumericForm}
            className="space-y-2.5 border-t border-sky-300/20 pt-3"
          >
            <label
              htmlFor="numeric-answer-input"
              className="block text-xs font-semibold text-sky-200"
            >
              <MathText text={node.numericTask.prompt} />
            </label>
            <div className="flex items-center gap-2">
              <input
                id="numeric-answer-input"
                type="number"
                inputMode="numeric"
                value={numericVal}
                onChange={(e) => setNumericVal(e.target.value)}
                placeholder={node.numericTask.placeholder ?? 'Введи число'}
                className="font-math h-11 min-w-0 flex-1 rounded-xl border border-[#4a8ab5]/80 bg-[#051d30] px-3.5 py-0 text-base leading-normal text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none tabular-nums"
              />
              {node.numericTask.unit && (
                <span className="shrink-0 text-xs font-medium text-slate-300">
                  {node.numericTask.unit}
                </span>
              )}
              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
              >
                Проверить
              </button>
            </div>
          </form>
        )}

        {/* Dual Numeric Input Task */}
        {node.dualNumericTask && (
          <form
            onSubmit={handleDualForm}
            className="space-y-3 border-t border-sky-300/20 pt-3"
          >
            <p className="text-xs font-semibold text-sky-200">
              <MathText text={node.dualNumericTask.prompt} />
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="dual-first-input"
                  className="mb-1 block text-xs text-slate-300"
                >
                  {node.dualNumericTask.firstLabel}
                </label>
                <input
                  id="dual-first-input"
                  type="number"
                  inputMode="numeric"
                  value={firstVal}
                  onChange={(e) => setFirstVal(e.target.value)}
                  placeholder="Число"
                  className="font-math h-11 w-full rounded-xl border border-[#4a8ab5]/80 bg-[#051d30] px-3 py-0 text-base leading-normal text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none tabular-nums"
                />
              </div>
              <div>
                <label
                  htmlFor="dual-second-input"
                  className="mb-1 block text-xs text-slate-300"
                >
                  {node.dualNumericTask.secondLabel}
                </label>
                <input
                  id="dual-second-input"
                  type="number"
                  inputMode="numeric"
                  value={secondVal}
                  onChange={(e) => setSecondVal(e.target.value)}
                  placeholder="Число"
                  className="font-math h-11 w-full rounded-xl border border-[#4a8ab5]/80 bg-[#051d30] px-3 py-0 text-base leading-normal text-white placeholder:text-slate-400 focus:border-amber-300 focus:outline-none tabular-nums"
                />
              </div>
            </div>
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Подтвердить оба значения
            </button>
          </form>
        )}

        {/* Table Builder Task */}
        {node.tableTask && (
          <form
            onSubmit={handleTableForm}
            className="space-y-3 border-t border-sky-300/20 pt-3"
          >
            <p className="text-xs font-semibold text-sky-200">
              <MathText text={node.tableTask.prompt} />
            </p>
            <div className="divide-y divide-[#3a7ca5]/30">
              {node.tableTask.rows.map((row) => (
                <div key={row.id} className="py-2.5 first:pt-0 last:pb-0">
                  <div className="mb-2 text-xs font-medium text-slate-200">
                    {row.label}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {row.options.map((option) => {
                      const active = tableSelections[row.id] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setTableSelections((prev) => ({
                              ...prev,
                              [row.id]: option,
                            }))
                          }
                          className={`font-math min-h-[40px] rounded-lg border px-2 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-amber-300 ${
                            active
                              ? 'border-amber-300 bg-amber-400 text-slate-950'
                              : 'border-[#4a8ab5]/60 bg-[#0d3d61]/70 text-slate-100 hover:bg-[#15527f]'
                          }`}
                        >
                          <MathText text={option} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="min-h-[44px] w-full rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Составить уравнение
            </button>
          </form>
        )}
      </div>

      {/* Bottom-Right Fast-Forward ">>" Action Button (Skips Typewriter or Advances Single-Path Dialogue) */}
      {(!isFullyRevealed || singleLinearChoice) && (
        <button
          type="button"
          onClick={handleChevronAction}
          aria-label={
            !isFullyRevealed
              ? 'Допечатать текст целиком'
              : `Далее: ${singleLinearChoice?.label ?? ''}`
          }
          title={
            !isFullyRevealed
              ? 'Допечатать текст (Пробел)'
              : singleLinearChoice?.label
          }
          className="absolute right-3.5 bottom-3 z-20 flex h-9 w-10 items-center justify-center rounded-lg text-[#58a6dc] transition-colors hover:bg-[#124d78]/60 hover:text-[#7ce8ff] focus-visible:outline-2 focus-visible:outline-[#5be3f5]"
        >
          <svg
            viewBox="0 0 24 16"
            className="h-3.5 w-5 fill-current"
            aria-hidden="true"
          >
            <polygon points="1,1 11,8 1,15" />
            <polygon points="12,1 22,8 12,15" />
          </svg>
        </button>
      )}
    </motion.section>
  );
}
