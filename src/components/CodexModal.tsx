import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Crown,
  KeyRound,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  CODEX_LAWS,
  EXPLORER_BADGES,
  SECRET_BRANCH_IDS,
} from '../game/codexData';
import type { BadgeId } from '../game/types';
import { MathText } from './MathText';

interface CodexModalProps {
  unlockedLaws: number[];
  unlockedBadges?: BadgeId[];
  foundSecretsCount?: number;
  initialTab?: 'laws' | 'badges';
  onClose: () => void;
}

function BadgeGlyph({ id, unlocked }: { id: BadgeId; unlocked: boolean }) {
  const colorClass = unlocked ? 'text-[#f6c959]' : 'text-[#89a5b3]';
  const props = { className: `h-5 w-5 ${colorClass}` };
  switch (id) {
    case 'first_spark':
      return <Sparkles {...props} />;
    case 'flawless_bridge':
      return <ShieldCheck {...props} />;
    case 'district_ace':
      return <Award {...props} />;
    case 'first_try_virtuoso':
      return <Crown {...props} />;
    case 'secret_finder':
      return <Compass {...props} />;
    case 'all_secrets_master':
      return <KeyRound {...props} />;
  }
}

export function CodexModal({
  unlockedLaws,
  unlockedBadges = [],
  foundSecretsCount = 0,
  initialTab = 'laws',
  onClose,
}: CodexModalProps) {
  const [activeTab, setActiveTab] = useState<'laws' | 'badges'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Кодекс Равновесия"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#061e2b]/78 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-[20px] border-[3px] border-[#df9d36] bg-[radial-gradient(ellipse_at_top_left,#fff9ea_0%,#faecc9_56%,#f2da9f_100%)] text-[#152d3c] shadow-[0_0_0_2px_rgba(148,92,18,0.75),0_24px_60px_rgba(4,18,28,0.75)]"
      >
        {/* Deep Teal-Gold Header */}
        <div className="flex items-center justify-between border-b-2 border-[#e5b55c] bg-gradient-to-b from-[#16516d] to-[#0a3145] px-5 py-4 text-[#fff8e6]">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 shrink-0 text-[#ffd859]" />
            <div>
              <h2 className="font-display text-lg font-extrabold uppercase tracking-wide text-[#fff8e6] sm:text-xl">
                Кодекс Равновесия
              </h2>
              <p className="text-xs font-semibold text-[#cbe5ec] tabular-nums">
                Законов: {unlockedLaws.length}/{CODEX_LAWS.length} · Значков:{' '}
                {unlockedBadges.length}/{EXPLORER_BADGES.length}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть Кодекс"
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#e5b55c] bg-[#14516c] text-[#fff8e6] ring-1 ring-inset ring-[#fff4d6]/45 transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-[#ffd859]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Codex Tab Switcher */}
        <div
          role="tablist"
          aria-label="Разделы Кодекса"
          className="grid grid-cols-2 border-b border-[#d4b068] bg-[#efe0b8]"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'laws'}
            onClick={() => setActiveTab('laws')}
            className={`flex min-h-[44px] items-center justify-center gap-2 border-b-[3px] px-3 py-2.5 text-xs font-extrabold transition-colors sm:text-sm ${
              activeTab === 'laws'
                ? 'border-[#d46714] bg-[#fdf3da] text-[#0d3347]'
                : 'border-transparent text-[#47687a] hover:bg-[#f6e8c4] hover:text-[#0d3347]'
            }`}
          >
            <BookOpen className="h-4 w-4 shrink-0 text-[#c96814]" />
            <span>Законы</span>
            <span className="font-math text-xs tabular-nums opacity-90">
              {unlockedLaws.length}/{CODEX_LAWS.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'badges'}
            onClick={() => setActiveTab('badges')}
            className={`flex min-h-[44px] items-center justify-center gap-2 border-b-[3px] px-3 py-2.5 text-xs font-extrabold transition-colors sm:text-sm ${
              activeTab === 'badges'
                ? 'border-[#0e5b75] bg-[#fdf3da] text-[#0d3347]'
                : 'border-transparent text-[#47687a] hover:bg-[#f6e8c4] hover:text-[#0d3347]'
            }`}
          >
            <Award className="h-4 w-4 shrink-0 text-[#0e5b75]" />
            <span>Значки исследователя</span>
            <span className="font-math text-xs tabular-nums opacity-90">
              {unlockedBadges.length}/{EXPLORER_BADGES.length}
            </span>
          </button>
        </div>

        {activeTab === 'laws' ? (
          <div className="quest-scroll grid flex-1 grid-cols-1 gap-3.5 overflow-y-auto p-5 sm:grid-cols-2">
            {CODEX_LAWS.map((law) => {
              const isUnlocked = unlockedLaws.includes(law.id);
              return (
                <div
                  key={law.id}
                  className={`rounded-xl border-2 p-4 ${
                    isUnlocked
                      ? 'border-[#d49a3a] bg-[#fff9eb] shadow-xs'
                      : 'border-[#ceb47e]/80 bg-[#efe0b9]/75 opacity-85'
                  }`}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-[#0e4d66]">
                      Запись №{law.id}
                    </span>
                    {!isUnlocked && (
                      <span className="flex items-center gap-1 font-semibold text-[#6e5c3b]">
                        <Lock className="h-3.5 w-3.5" />
                        Запечатано
                      </span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <>
                      <h3 className="text-base font-extrabold text-[#9c480a]">
                        {law.title}
                      </h3>
                      <div className="my-2 rounded-xl border-[1.5px] border-[#e5b55c]/85 bg-gradient-to-b from-[#14516c] to-[#0a3145] px-3 py-2 font-math text-xs font-bold text-[#ffd859] tabular-nums">
                        <MathText text={law.formula} />
                      </div>
                      <p className="text-xs leading-relaxed font-medium text-[#1b3a4b]">
                        <MathText text={law.ruleText} />
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-xs leading-relaxed font-medium text-[#52442c]">
                      {law.episodeTitle} — реши испытание района, чтобы открыть этот закон в Кодексе.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="quest-scroll flex-1 space-y-4 overflow-y-auto p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border-[1.5px] border-[#e5b55c]/90 bg-gradient-to-b from-[#14516c] to-[#0a3145] px-4 py-2.5 text-xs text-white">
              <span className="font-medium text-[#e3f4f7]">
                Выдаются за решения с первой попытки и найденные тайны Острова.
              </span>
              <span className="font-math font-bold text-[#ffd859] tabular-nums">
                Секретных веток: {foundSecretsCount}/{SECRET_BRANCH_IDS.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {EXPLORER_BADGES.map((badge) => {
                const isUnlocked = unlockedBadges.includes(badge.id);
                const categoryLabel =
                  badge.category === 'first_try'
                    ? 'С первой попытки'
                    : 'Секретная ветка';
                return (
                  <div
                    key={badge.id}
                    className={`rounded-xl border-2 p-4 transition-colors ${
                      isUnlocked
                        ? 'border-[#d49a3a] bg-[#fff9eb] shadow-xs'
                        : 'border-[#ceb47e]/80 bg-[#efe0b9]/75 opacity-85'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 ${
                          isUnlocked
                            ? 'border-[#e6ba62] bg-[#0d3549]'
                            : 'border-[#9db3be] bg-[#2a4d5f]'
                        }`}
                      >
                        <BadgeGlyph id={badge.id} unlocked={isUnlocked} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 text-[11px]">
                          <span
                            className={`font-extrabold uppercase tracking-wider ${
                              badge.category === 'first_try'
                                ? 'text-[#0e5b75]'
                                : 'text-[#a8461c]'
                            }`}
                          >
                            {categoryLabel}
                          </span>
                          {isUnlocked ? (
                            <span className="flex items-center gap-1 font-extrabold text-[#157a5e]">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Получен
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 font-semibold text-[#6e5c3b]">
                              <Lock className="h-3.5 w-3.5" />
                              Скрыто
                            </span>
                          )}
                        </div>

                        <h3
                          className={`mt-1 text-sm font-extrabold sm:text-base ${
                            isUnlocked ? 'text-[#0d3347]' : 'text-[#423929]'
                          }`}
                        >
                          {badge.title}
                        </h3>

                        <p className="mt-1.5 text-xs leading-relaxed font-medium text-[#2c4b5c]">
                          {isUnlocked ? badge.description : badge.hint}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
