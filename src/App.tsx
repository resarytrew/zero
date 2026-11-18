/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { CodexModal } from './components/CodexModal';
import { CrossroadsMapOverlay } from './components/CrossroadsMapOverlay';
import { DialogPanel } from './components/DialogPanel';
import { EndingScreen } from './components/EndingScreen';
import { GameUtilityBar } from './components/GameUtilityBar';
import { PauseModal } from './components/PauseModal';
import { SceneBackdrop } from './components/SceneBackdrop';
import { SchematicBoard } from './components/SchematicBoard';
import { TitleScreen } from './components/TitleScreen';
import { CODEX_LAWS } from './game/codexData';
import { evaluateEnding } from './game/endings';
import {
  applyChoice,
  applyDualNumericAnswer,
  applyNumericAnswer,
  applyScratchpadAnswer,
  applyTableSubmission,
  applyVerificationAnswer,
  createInitialPlayerState,
  enterTempleFromCrossroads,
  selectDistrictFromCrossroads,
  type FeedbackBanner,
} from './game/engine';
import { STORY_NODES } from './game/storyData';
import type {
  DistrictId,
  GameScreenState,
  PlayerState,
  StoryChoice,
} from './game/types';
import { soundEngine } from './utils/sound';

const SAVE_STORAGE_KEY = 'alesha_island_save_v2';
const PREFS_STORAGE_KEY = 'alesha_island_prefs_v1';

function loadSavedState(): PlayerState | null {
  try {
    const raw = localStorage.getItem(SAVE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PlayerState;
    if (
      parsed &&
      typeof parsed.currentNodeId === 'string' &&
      STORY_NODES[parsed.currentNodeId] &&
      typeof parsed.mistakesByCategory === 'object' &&
      typeof parsed.stepAttempts === 'object'
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function loadInstantTextPref(): boolean {
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { instantText?: boolean };
    return Boolean(parsed?.instantText);
  } catch {
    return false;
  }
}

export default function App() {
  const [savedState, setSavedState] = useState<PlayerState | null>(() => loadSavedState());
  const [screenState, setScreenState] = useState<GameScreenState>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        return 'playing';
      }
    }
    return 'title';
  });
  const [playerState, setPlayerState] = useState<PlayerState>(() =>
    createInitialPlayerState(),
  );
  const [feedback, setFeedback] = useState<FeedbackBanner | null>(null);
  const [codexOpen, setCodexOpen] = useState(false);
  const [mobileModelOpen, setMobileModelOpen] = useState(false);
  const [lawBanner, setLawBanner] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [instantText, setInstantText] = useState<boolean>(() => loadInstantTextPref());

  useEffect(() => {
    const mappedState = screenState === 'ending' ? 'gameover' : screenState;
    document.body.dataset.state = mappedState;
  }, [screenState]);

  useEffect(() => {
    setMobileModelOpen(false);
  }, [playerState.currentNodeId]);

  useEffect(() => {
    if (screenState === 'playing') {
      try {
        localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(playerState));
        setSavedState(playerState);
      } catch {
        // Ignore storage errors
      }
    }
  }, [playerState, screenState]);

  useEffect(() => {
    try {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify({ instantText }));
    } catch {
      // Ignore storage errors
    }
  }, [instantText]);

  useEffect(() => {
    if (lawBanner === null) return;
    const timer = window.setTimeout(() => setLawBanner(null), 4200);
    return () => window.clearTimeout(timer);
  }, [lawBanner]);

  const handleStartNew = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    soundEngine.playClick();
    const fresh = createInitialPlayerState();
    setPlayerState(fresh);
    setFeedback(null);
    setCodexOpen(false);
    setMobileModelOpen(false);
    setLawBanner(null);
    try {
      localStorage.removeItem(SAVE_STORAGE_KEY);
      setSavedState(null);
    } catch {
      // Ignore
    }
    setScreenState('playing');
  }, []);

  const handleContinue = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    soundEngine.playClick();
    if (savedState) {
      setPlayerState(savedState);
    }
    setFeedback(null);
    setScreenState('playing');
  }, [savedState]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screenState === 'title') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (savedState) {
            handleContinue();
          } else {
            handleStartNew();
          }
        }
        return;
      }

      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';

      if (e.key === 'Escape') {
        if (codexOpen) {
          setCodexOpen(false);
          return;
        }
        if (mobileModelOpen) {
          setMobileModelOpen(false);
          return;
        }
        if (screenState === 'playing') {
          setScreenState('paused');
        } else if (screenState === 'paused') {
          setScreenState('playing');
        }
      } else if (
        (e.key === 'p' || e.key === 'P' || e.key === 'з' || e.key === 'З') &&
        !isTyping
      ) {
        if (screenState === 'playing' && !codexOpen) {
          setScreenState('paused');
        } else if (screenState === 'paused') {
          setScreenState('playing');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screenState, codexOpen, mobileModelOpen, savedState, handleContinue, handleStartNew]);

  const applyOutcome = (
    outcome: ReturnType<typeof applyChoice>,
    isBossMove = false,
  ) => {
    setPlayerState(outcome.nextState);
    setFeedback(outcome.feedback ?? null);

    if (outcome.feedback?.isError) {
      soundEngine.playError();
    } else if (outcome.completedEnding) {
      soundEngine.playVictory();
      setScreenState('ending');
      return;
    } else if (outcome.unlockedLaw) {
      soundEngine.playLawUnlock();
      setLawBanner(outcome.unlockedLaw);
    } else if (isBossMove) {
      soundEngine.playBossHit();
    } else {
      soundEngine.playCorrect();
    }
  };

  const handleChoice = (choice: StoryChoice) => {
    const isBoss =
      playerState.currentNodeId.startsWith('ep6_') && Boolean(choice.bossDamage);
    const outcome = applyChoice(playerState, choice);
    applyOutcome(outcome, isBoss);
  };

  const handleNumericSubmit = (val: string) => {
    const isBoss = playerState.currentNodeId === 'ep6_phase4_solve';
    const outcome = applyNumericAnswer(playerState, val);
    applyOutcome(outcome, isBoss);
  };

  const handleDualNumericSubmit = (first: string, second: string) => {
    const outcome = applyDualNumericAnswer(playerState, first, second);
    applyOutcome(outcome);
  };

  const handleScratchpadSubmit = (values: Record<string, string>) => {
    const outcome = applyScratchpadAnswer(playerState, values);
    applyOutcome(outcome);
  };

  const handleVerificationSubmit = (values: Record<string, string>) => {
    const outcome = applyVerificationAnswer(playerState, values);
    applyOutcome(outcome);
  };

  const handleTableSubmit = (selections: Record<string, string>) => {
    const outcome = applyTableSubmission(playerState, selections);
    applyOutcome(outcome);
  };

  const handleSelectDistrict = (districtId: DistrictId) => {
    soundEngine.playClick();
    const outcome = selectDistrictFromCrossroads(playerState, districtId);
    setPlayerState(outcome.nextState);
    setFeedback(null);
  };

  const handleEnterTemple = () => {
    const outcome = enterTempleFromCrossroads(playerState);
    applyOutcome(outcome);
  };

  const handleToggleMute = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleOpenCrossroadsHint = () => {
    if (playerState.currentNodeId !== 'crossroads_hub') {
      setFeedback({
        text: 'Заверши текущее испытание района, чтобы вернуться на Перекрёсток Четырёх Стихий.',
        speaker: 'Сова Пи',
        isError: false,
      });
    }
  };

  const currentNode = STORY_NODES[playerState.currentNodeId] ?? STORY_NODES.prologue_1;
  const inCrossroadsOrLater =
    playerState.unlockedLaws.length >= 1 ||
    playerState.currentNodeId === 'crossroads_hub' ||
    playerState.visitedNodes.includes('crossroads_hub');

  const unlockedLawObj =
    lawBanner !== null ? CODEX_LAWS.find((l) => l.id === lawBanner) : null;

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none">
      {screenState === 'title' && (
        <TitleScreen
          hasSavedProgress={Boolean(savedState)}
          onStartNew={handleStartNew}
          onContinue={handleContinue}
        />
      )}

      {(screenState === 'playing' || screenState === 'paused') && (
        <>
          <SceneBackdrop scene={currentNode.scene} alt={currentNode.episodeTitle} />

          {currentNode.isCrossroadsHub && (
            <CrossroadsMapOverlay
              completedDistricts={playerState.completedDistricts}
              onSelectDistrict={handleSelectDistrict}
              onEnterTemple={handleEnterTemple}
            />
          )}

          <GameUtilityBar
            unlockedLawsCount={playerState.unlockedLaws.length}
            balanceIntegrity={playerState.balanceIntegrity}
            completedDistrictsCount={playerState.completedDistricts.length}
            inCrossroadsOrLater={inCrossroadsOrLater}
            isMuted={isMuted}
            onOpenCodex={() => {
              soundEngine.playClick();
              setCodexOpen(true);
            }}
            onOpenCrossroadsHint={handleOpenCrossroadsHint}
            onToggleMute={handleToggleMute}
            onPause={() => {
              soundEngine.playClick();
              setScreenState('paused');
            }}
          />

          <AnimatePresence>
            {unlockedLawObj && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                role="status"
                className="fixed top-15 right-3 left-3 z-40 mx-auto flex w-auto max-w-md items-center justify-between gap-2.5 rounded-lg border border-amber-300/80 bg-[#062238]/97 px-3.5 py-2 text-xs shadow-2xl sm:top-16 sm:right-auto sm:left-1/2 sm:w-max sm:max-w-[calc(100vw-2rem)] sm:-translate-x-1/2 sm:text-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
                  <span className="truncate text-slate-100">
                    <strong className="text-amber-200">
                      Закон №{unlockedLawObj.id}:
                    </strong>{' '}
                    {unlockedLawObj.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLawBanner(null)}
                  aria-label="Скрыть уведомление"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded text-slate-300 hover:bg-[#0d3554] hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <SchematicBoard
            kind={currentNode.schematic}
            step={currentNode.schematicStep}
            formulaDisplay={currentNode.formulaDisplay}
            bossShieldHp={playerState.bossShieldHp}
            mobileOpen={mobileModelOpen}
            onCloseMobile={() => setMobileModelOpen(false)}
          />

          <DialogPanel
            node={currentNode}
            playerState={playerState}
            feedback={feedback}
            instantText={instantText}
            onChoice={handleChoice}
            onSubmitNumeric={handleNumericSubmit}
            onSubmitDualNumeric={handleDualNumericSubmit}
            onSubmitScratchpad={handleScratchpadSubmit}
            onSubmitVerification={handleVerificationSubmit}
            onSubmitTable={handleTableSubmit}
            onSelectDistrict={handleSelectDistrict}
            onEnterTemple={handleEnterTemple}
            onToggleMobileModel={() => setMobileModelOpen((o) => !o)}
          />
        </>
      )}

      {screenState === 'ending' && (
        <EndingScreen
          ending={evaluateEnding(playerState)}
          playerState={playerState}
          onRestart={handleStartNew}
          onOpenCodex={() => setCodexOpen(true)}
        />
      )}

      <AnimatePresence>
        {codexOpen && (
          <CodexModal
            unlockedLaws={playerState.unlockedLaws}
            onClose={() => setCodexOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {screenState === 'paused' && (
          <PauseModal
            balanceIntegrity={playerState.balanceIntegrity}
            unlockedLawsCount={playerState.unlockedLaws.length}
            completedDistrictsCount={playerState.completedDistricts.length}
            instantText={instantText}
            onToggleInstantText={() => setInstantText((v) => !v)}
            onResume={() => setScreenState('playing')}
            onRestart={handleStartNew}
            onReturnToTitle={() => {
              setCodexOpen(false);
              setScreenState('title');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
