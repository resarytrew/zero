import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  Lock,
  Scale,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Fragment, useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { DISTRICTS } from '../game/codexData';
import {
  resolveDialogPortraitState,
  type FeedbackBanner,
} from '../game/engine';
import type {
  DistrictId,
  PlayerState,
  StoryChoice,
  StoryNode,
} from '../game/types';
import { FormulaBlock, MathText } from './MathText';
import { SpeakerPortrait } from './SpeakerPortrait';
import { ParchmentBackdrop, StorybookHeadingOrnament } from './StorybookFrames';

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

/** Highlights quoted spoken lines («...») in warm terracotta italic like the storybook mockup */
function ProseParagraph({ text }: { text: string }) {
  const segments = text.split(/(«[^»]+»)/g);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.startsWith('«') && seg.endsWith('»')) {
          return (
            <span key={i} className="font-semibold italic text-[#a8461c]">
              <MathText text={seg} />
            </span>
          );
        }
        return (
          <Fragment key={i}>
            <MathText text={seg} />
          </Fragment>
        );
      })}
    </>
  );
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

  const hasDraftInput =
    numericVal.trim().length > 0 ||
    firstVal.trim().length > 0 ||
    secondVal.trim().length > 0 ||
    Object.values(fieldValues).some((v) => v.trim().length > 0) ||
    Object.values(tableSelections).some((v) => v.trim().length > 0);

  const portraitState = resolveDialogPortraitState({
    node,
    feedback,
    completedDistrictsCount: playerState.completedDistricts.length,
    totalDistrictsCount: DISTRICTS.length,
    hasDraftInput,
  });
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

  const showTaskRibbon = Boolean(
    node.mathTopic ||
      node.numericTask ||
      node.dualNumericTask ||
      node.scratchpadTask ||
      node.verificationTask ||
      node.tableTask ||
      node.choices?.some((c) => c.isCorrect === false),
  );

  // Pre-sized visual novel container; Crossroads docks cleanly above bottom edge & clears side portal pins
  const positionClasses = node.isCrossroadsHub
    ? 'fixed right-3 bottom-3 left-3 z-20 max-h-[calc(100dvh-6rem)] md:right-auto md:left-[calc(50%+28px)] md:-translate-x-1/2 md:bottom-4 md:w-[560px] lg:w-[600px] md:max-h-[calc(100vh-14.5rem)]'
    : 'fixed right-3 bottom-3 left-3 z-20 max-h-[calc(100dvh-5.75rem)] sm:left-auto sm:right-5 sm:bottom-5 sm:max-h-[calc(100vh-6.75rem)] sm:w-[600px] lg:w-[680px]';

  return (
    <motion.section
      key={node.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      aria-label={node.episodeTitle}
      className={`${positionClasses} flex flex-col overflow-visible text-[#152d3c]`}
    >
      {/* Sculpted Concave-Notched Parchment Manuscript Frame with Paper Grain */}
      <ParchmentBackdrop notch={15} />

      {/* Arched-Crest Storybook Character Portrait rising proud above Top-Right Border */}
      <div
        className={`pointer-events-none absolute z-30 ${
          node.isCrossroadsHub
            ? '-top-9 right-3 sm:-top-11 sm:right-5'
            : '-top-9 right-3 sm:-top-12 sm:right-5'
        }`}
      >
        <SpeakerPortrait
          speaker={portraitState.speaker}
          emotion={portraitState.emotion}
          variant="popout"
          compact={node.isCrossroadsHub}
        />
      </div>

      {/* Main Parchment Content */}
      <div
        className={`quest-scroll relative z-10 flex-1 overflow-y-auto px-5 ${
          node.isCrossroadsHub
            ? 'space-y-2 pt-3.5 pb-3.5 sm:space-y-2.5 sm:px-7 sm:pt-4.5 sm:pb-4.5'
            : 'space-y-2.5 pt-3.5 pb-4 sm:space-y-3 sm:px-8 sm:pt-5.5 sm:pb-5.5'
        }`}
      >
        {/* Top-Left Speaker Kicker with Gold Diamond Ornament & Episode Subtitle */}
        <div
          className={`pb-2.5 ${
            node.isCrossroadsHub
              ? 'pr-32 sm:pr-44 lg:pr-50'
              : 'pr-34 sm:pr-50 lg:pr-56'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <StorybookHeadingOrnament />
            <h2 className="font-display text-[17px] leading-tight font-extrabold uppercase tracking-[0.02em] text-[#0d3347] sm:text-[24px]">
              {node.speakerName}
            </h2>
          </div>

          <div className="mt-0.5 text-xs font-semibold text-[#47687a] sm:text-[13.5px]">
            {node.episodeTitle}
          </div>

          {(() => {
            const inlineTaskIdx = node.text.findIndex((p) =>
              p.startsWith('Задача:'),
            );
            const hasInlineTaskRibbon = showTaskRibbon && inlineTaskIdx >= 0;

            return (
              <>
                {((!hasInlineTaskRibbon && showTaskRibbon) ||
                  node.mathTopic ||
                  node.formulaDisplay ||
                  (hasInteractiveModel && onToggleMobileModel)) && (
                  <div className="mt-2 flex flex-wrap items-center gap-2.5">
                    {!hasInlineTaskRibbon && showTaskRibbon && (
                      <span className="storybook-ribbon-border inline-flex shadow-xs">
                        <span className="storybook-ribbon inline-flex items-center bg-gradient-to-b from-[#fcd974] to-[#eaa72e] px-4 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-[#113144]">
                          Задача
                        </span>
                      </span>
                    )}
                    {node.mathTopic && (
                      <span className="text-xs font-bold text-[#355a6e]">
                        <MathText text={node.mathTopic} />
                      </span>
                    )}
                    {node.formulaDisplay && <FormulaBlock formula={node.formulaDisplay} />}
                    {hasInteractiveModel && onToggleMobileModel && (
                      <button
                        type="button"
                        onClick={onToggleMobileModel}
                        className="flex min-h-[36px] items-center gap-1.5 rounded-full border-2 border-[#ecd084]/85 bg-gradient-to-b from-[#16536f] to-[#0a3145] px-3.5 py-1 text-xs font-bold text-white shadow-xs hover:brightness-110 lg:hidden"
                      >
                        <Scale className="h-3.5 w-3.5 text-[#ffd859]" />
                        <span>Модель</span>
                      </button>
                    )}
                    {!hasInlineTaskRibbon && showTaskRibbon && (
                      <span
                        aria-hidden="true"
                        className="storybook-ink-divider hidden flex-1 sm:block"
                      />
                    )}
                  </div>
                )}
              </>
            );
          })()}

          <div aria-hidden="true" className="storybook-ink-divider mt-2.5" />
        </div>

        {/* Fixed-Height Narrative Prose Container: Ghost Full Text Sets Final Box Height Immediately */}
        {(() => {
          const inlineTaskIdx = node.text.findIndex((p) =>
            p.startsWith('Задача:'),
          );
          const hasInlineTaskRibbon = showTaskRibbon && inlineTaskIdx >= 0;
          const formatParagraph = (text: string, idx: number) =>
            hasInlineTaskRibbon && idx === inlineTaskIdx
              ? text.replace(/^Задача:\s*/, '')
              : text;

          return (
            <div
              onClick={!isFullyRevealed ? revealAll : undefined}
              className={`relative pr-1 text-[14.5px] leading-snug font-medium text-[#152d3c] sm:pr-4 sm:text-[16px] sm:leading-relaxed ${
                !isFullyRevealed ? 'cursor-pointer' : ''
              }`}
            >
              <div
                aria-hidden="true"
                className="invisible pointer-events-none select-none space-y-2.5"
              >
                {node.text.map((paragraph, idx) => (
                  <Fragment key={idx}>
                    {hasInlineTaskRibbon && idx === inlineTaskIdx && (
                      <div className="flex items-center gap-3 pt-0.5">
                        <span className="storybook-ribbon-border inline-flex">
                          <span className="storybook-ribbon inline-flex items-center px-4 py-0.5 text-[11px] font-extrabold uppercase tracking-wider">
                            Задача
                          </span>
                        </span>
                        <span className="storybook-ink-divider flex-1" />
                      </div>
                    )}
                    <p className="text-pretty">
                      <ProseParagraph text={formatParagraph(paragraph, idx)} />
                    </p>
                  </Fragment>
                ))}
              </div>

              <div className="absolute inset-0 space-y-2.5">
                {node.text.map((_, idx) => {
                  const rawVisible = visibleParagraphs[idx] ?? '';
                  const visible = formatParagraph(rawVisible, idx);
                  const showRibbonHere =
                    hasInlineTaskRibbon && idx === inlineTaskIdx;
                  if (!visible && idx > 0 && !showRibbonHere) return null;
                  return (
                    <Fragment key={idx}>
                      {showRibbonHere && (
                        <div className="flex items-center gap-3 pt-0.5">
                          <span className="storybook-ribbon-border inline-flex shadow-xs">
                            <span className="storybook-ribbon inline-flex items-center bg-gradient-to-b from-[#fcd974] to-[#eaa72e] px-4 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-[#113144]">
                              Задача
                            </span>
                          </span>
                          <span
                            aria-hidden="true"
                            className="storybook-ink-divider flex-1"
                          />
                        </div>
                      )}
                      {visible && (
                        <p className="text-pretty">
                          <ProseParagraph text={visible} />
                        </p>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Adaptive 2-Tier Scaffolding Feedback Callout */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            role="status"
            className={`rounded-xl border-2 px-3.5 py-2.5 text-sm leading-relaxed shadow-xs ${
              feedback.isError
                ? 'border-[#d97706] bg-[#fff4d4] text-[#612c05]'
                : 'border-[#1d856a] bg-[#e0f6ee] text-[#0b4536]'
            }`}
          >
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <span className="flex items-center gap-1.5 tracking-wide">
                {feedback.isError ? (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-[#c2580b]" />
                ) : (
                  <Sparkles className="h-4 w-4 shrink-0 text-[#137b61]" />
                )}
                <span>{feedback.speaker}</span>
              </span>
              {feedback.hintLevel && (
                <span className="text-[11px] font-bold text-[#9c480a]">
                  {feedback.hintLevel === 1
                    ? 'Подсказка 1/2 · Наводящий вопрос'
                    : 'Подсказка 2/2 · Разбор правила'}
                </span>
              )}
            </div>
            <p className="font-medium">
              <MathText text={feedback.text} />
            </p>
          </motion.div>
        )}

        {/* Crossroads Hub: Desktop guides to Map Pins + Mobile keeps touch list */}
        {node.isCrossroadsHub && (
          <>
            <div className="hidden border-t border-[#d8b46e]/60 pt-2.5 md:block">
              <div className="flex items-center justify-between gap-2 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-[#0e4259]">
                  <Compass className="h-4 w-4 text-[#c96814]" />
                  <span>Нажми на любой портал на карте острова выше</span>
                </span>
                <span className="font-math text-[#8e4b0c] tabular-nums">
                  {playerState.completedDistricts.length}/4 районов
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-[#d8b46e]/60 pt-3 md:hidden">
              {DISTRICTS.map((district) => {
                const done = playerState.completedDistricts.includes(district.id);
                return (
                  <button
                    key={district.id}
                    type="button"
                    onClick={() => onSelectDistrict(district.id)}
                    className={`flex min-h-[44px] w-full flex-col justify-between gap-1 rounded-xl border-2 px-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-[#d66613] ${
                      done
                        ? 'border-[#2f856d] bg-[#d6f3e8] text-[#0c3f31] hover:bg-[#c3ebd9]'
                        : 'border-[#3d768d] bg-gradient-to-b from-[#d2edf3] to-[#aad7e3] text-[#0d2e3f] hover:from-[#f08b2d] hover:to-[#d46714] hover:border-[#913e06] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm font-bold">
                        {done && (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#157a5e]" />
                        )}
                        <span>{district.title}</span>
                      </span>
                      <span className="shrink-0 font-math text-xs font-bold tabular-nums opacity-85">
                        {done ? 'Восстановлен' : <MathText text={district.mathTheme} />}
                      </span>
                    </div>
                    <div className="text-xs opacity-85">{district.subtitle}</div>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={onEnterTemple}
                className={`mt-1 flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border-2 px-3.5 py-3 text-left font-bold transition-colors focus-visible:outline-2 focus-visible:outline-[#0d3347] ${
                  allDistrictsDone
                    ? 'border-[#8f4207] bg-gradient-to-b from-[#f29132] to-[#d46511] text-white hover:from-[#f79f45] hover:to-[#df711c]'
                    : 'border-[#b99555] bg-[#ecd6a7] text-[#544020] hover:bg-[#e5cb94]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {allDistrictsDone ? (
                    <Sparkles className="h-4 w-4 shrink-0" />
                  ) : (
                    <Lock className="h-4 w-4 shrink-0 opacity-75" />
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

        {/* Standard Choices styled as tactile rounded-full storybook arrow capsules */}
        {node.choices && node.choices.length > 0 && (
          <div className="space-y-3 pt-1 pr-3 sm:pr-5">
            <div aria-hidden="true" className="storybook-ink-divider mb-3" />
            {node.choices.map((choice) => {
              const isSecret = Boolean(choice.secretId);
              const secretFound = Boolean(
                choice.secretId &&
                  (playerState.foundSecrets ?? []).includes(choice.secretId),
              );
              const isSingleContinue = node.choices!.length === 1 && !isSecret;

              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => onChoice(choice)}
                  className={`group flex min-h-[48px] w-full items-center justify-between gap-3 rounded-full px-5 py-2.5 text-left text-sm font-bold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] sm:text-[15.5px] ${
                    secretFound
                      ? 'border-2 border-[#2a8068] bg-gradient-to-b from-[#dcf7ec] to-[#bdebd9] text-[#0c3f31] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.75),0_3px_0_#1e624f] hover:brightness-97 active:translate-y-[2px]'
                      : isSecret
                        ? 'storybook-btn-secret'
                        : isSingleContinue
                          ? 'storybook-btn-primary'
                          : 'storybook-btn-sky'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {secretFound ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#157a5e]" />
                    ) : isSecret ? (
                      <Compass className="h-4 w-4 shrink-0 text-[#9c520a] transition-colors group-hover:text-white group-focus-visible:text-white" />
                    ) : null}
                    <span>
                      <MathText text={choice.label} />
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-2">
                    {isSecret && (
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                          secretFound
                            ? 'text-[#157a5e]'
                            : 'text-[#874308] group-hover:text-white group-focus-visible:text-white'
                        }`}
                      >
                        {secretFound ? 'Изучено' : 'Тайна'}
                      </span>
                    )}
                    <ArrowRight className="h-4.5 w-4.5 shrink-0 transition-transform duration-150 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Step-by-Step Equation Scratchpad */}
        {node.scratchpadTask && (
          <form
            onSubmit={handleScratchpadForm}
            className="space-y-3 border-t border-[#d8b46e]/60 pt-3.5"
          >
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-[#9c480a]">
                {node.scratchpadTask.title}
              </div>
              <p className="mt-0.5 text-xs font-semibold text-[#2d4d5e]">
                <MathText text={node.scratchpadTask.equationContext} />
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {node.scratchpadTask.fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={`scratch-${field.id}`}
                    className="mb-1 block text-xs font-bold text-[#2b4d5f]"
                  >
                    <MathText text={field.label} />
                  </label>
                  <div className="flex items-center gap-1.5 font-math">
                    {field.prefix && (
                      <span className="text-sm font-bold text-[#0e4259]">
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
                      className="font-math h-11 w-full min-w-0 rounded-xl border-2 border-[#c89643] bg-[#fffaf0] px-3 py-0 text-base leading-normal font-bold text-[#102d3e] placeholder:text-[#8a7550] focus:border-[#d46714] focus:outline-none tabular-nums"
                    />
                    {field.suffix && (
                      <span className="text-sm font-bold text-[#9c480a]">
                        <MathText text={field.suffix} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="storybook-btn-primary min-h-[48px] w-full rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347]"
            >
              Записать шаг черновика
            </button>
          </form>
        )}

        {/* Substitution Self-Check */}
        {node.verificationTask && (
          <form
            onSubmit={handleVerificationForm}
            className="space-y-3 border-t border-[#439b81]/45 pt-3.5"
          >
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wide text-[#0f6b53]">
                {node.verificationTask.title}
              </div>
              <p className="mt-0.5 text-xs font-semibold text-[#2d4d5e]">
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
                    className="mb-1 block text-xs font-bold text-[#2b4d5f]"
                  >
                    <MathText text={field.label} />
                  </label>
                  <div className="flex items-center gap-1.5 font-math">
                    {field.prefix && (
                      <span className="shrink-0 text-xs font-bold text-[#0f6b53]">
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
                      className="font-math h-11 w-full min-w-0 rounded-xl border-2 border-[#318f75] bg-[#fffaf0] px-3 py-0 text-base leading-normal font-bold text-[#102d3e] placeholder:text-[#8a7550] focus:border-[#0f6b53] focus:outline-none tabular-nums"
                    />
                    {field.suffix && (
                      <span className="shrink-0 text-xs font-semibold text-[#2d4d5e]">
                        {field.suffix}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="storybook-btn-emerald min-h-[48px] w-full rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347]"
            >
              Подтвердить проверку
            </button>
          </form>
        )}

        {/* Single Numeric Input Task */}
        {node.numericTask && (
          <form
            onSubmit={handleNumericForm}
            className="space-y-2.5 border-t border-[#d8b46e]/60 pt-3"
          >
            <label
              htmlFor="numeric-answer-input"
              className="block text-xs font-extrabold text-[#0e4259]"
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
                className="font-math h-11 min-w-0 flex-1 rounded-xl border-2 border-[#c89643] bg-[#fffaf0] px-3.5 py-0 text-base leading-normal font-bold text-[#102d3e] placeholder:text-[#8a7550] focus:border-[#d46714] focus:outline-none tabular-nums"
              />
              {node.numericTask.unit && (
                <span className="shrink-0 text-xs font-bold text-[#2d4d5e]">
                  {node.numericTask.unit}
                </span>
              )}
              <button
                type="submit"
                className="storybook-btn-primary min-h-[48px] shrink-0 rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347] whitespace-nowrap"
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
            className="space-y-3 border-t border-[#d8b46e]/60 pt-3"
          >
            <p className="text-xs font-extrabold text-[#0e4259]">
              <MathText text={node.dualNumericTask.prompt} />
            </p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="dual-first-input"
                  className="mb-1 block text-xs font-bold text-[#2b4d5f]"
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
                  className="font-math h-11 w-full rounded-xl border-2 border-[#c89643] bg-[#fffaf0] px-3 py-0 text-base leading-normal font-bold text-[#102d3e] placeholder:text-[#8a7550] focus:border-[#d46714] focus:outline-none tabular-nums"
                />
              </div>
              <div>
                <label
                  htmlFor="dual-second-input"
                  className="mb-1 block text-xs font-bold text-[#2b4d5f]"
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
                  className="font-math h-11 w-full rounded-xl border-2 border-[#c89643] bg-[#fffaf0] px-3 py-0 text-base leading-normal font-bold text-[#102d3e] placeholder:text-[#8a7550] focus:border-[#d46714] focus:outline-none tabular-nums"
                />
              </div>
            </div>
            <button
              type="submit"
              className="storybook-btn-primary min-h-[48px] w-full rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347]"
            >
              Подтвердить оба значения
            </button>
          </form>
        )}

        {/* Table Builder Task */}
        {node.tableTask && (
          <form
            onSubmit={handleTableForm}
            className="space-y-3 border-t border-[#d8b46e]/60 pt-3"
          >
            <p className="text-xs font-extrabold text-[#0e4259]">
              <MathText text={node.tableTask.prompt} />
            </p>
            <div className="divide-y divide-[#d8b46e]/45">
              {node.tableTask.rows.map((row) => (
                <div key={row.id} className="py-2.5 first:pt-0 last:pb-0">
                  <div className="mb-2 text-xs font-bold text-[#264657]">
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
                          className={`font-math min-h-[42px] rounded-full px-2 py-2 text-xs font-bold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#0d3347] ${
                            active ? 'storybook-btn-primary' : 'storybook-btn-sky'
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
              className="storybook-btn-primary min-h-[48px] w-full rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3347]"
            >
              Составить уравнение
            </button>
          </form>
        )}
      </div>

      {/* Bottom-Right Fast-Forward ">>" Action Button */}
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
          className="absolute right-3 bottom-2.5 z-20 flex h-8 w-9 items-center justify-center rounded-lg text-[#2c667d] transition-colors hover:bg-[#e5cb94]/70 hover:text-[#a8461c] focus-visible:outline-2 focus-visible:outline-[#0d3347]"
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
