import { DISTRICTS, MISTAKE_CATEGORY_META, SECRET_BRANCH_IDS } from './codexData';
import { evaluateEnding } from './endings';
import { STORY_NODES } from './storyData';
import type {
  BadgeId,
  DiagnosticItem,
  DistrictId,
  MistakeCategory,
  PlayerState,
  SpeakerEmotion,
  SpeakerId,
  StoryChoice,
  StoryNode,
} from './types';

export function createInitialPlayerState(): PlayerState {
  return {
    currentNodeId: 'prologue_1',
    completedDistricts: [],
    unlockedLaws: [],
    balanceIntegrity: 100,
    mistakesCount: 0,
    mistakesByEpisode: {},
    mistakesByCategory: {},
    mistakeLog: [],
    stepAttempts: {},
    decisions: {},
    visitedNodes: ['prologue_1'],
    foundSecrets: [],
    firstTryNodeIds: [],
    unlockedBadges: [],
    bossShieldHp: 100,
  };
}

export function canEnterTemple(state: PlayerState): boolean {
  return DISTRICTS.every((d) => state.completedDistricts.includes(d.id));
}

export function getDistrictProgress(state: PlayerState): {
  completed: number;
  total: number;
  remaining: DistrictId[];
} {
  const remaining = DISTRICTS.filter(
    (d) => !state.completedDistricts.includes(d.id),
  ).map((d) => d.id);
  return {
    completed: state.completedDistricts.length,
    total: DISTRICTS.length,
    remaining,
  };
}

function addLaw(laws: number[], lawId?: number): number[] {
  if (!lawId || laws.includes(lawId)) return laws;
  return [...laws, lawId].sort((a, b) => a - b);
}

function addDistrict(list: DistrictId[], district?: DistrictId): DistrictId[] {
  if (!district || list.includes(district)) return list;
  return [...list, district];
}

function addUnique<T extends string>(list: T[], item?: T): T[] {
  if (!item || list.includes(item)) return list;
  return [...list, item];
}

const DISTRICT_EPISODE_MAP: Record<DistrictId, string> = {
  ep2_tunnel: 'ep2',
  ep3_archive: 'ep3',
  ep4_crystals: 'ep4',
  ep5_city: 'ep5',
};

function recordFirstTryIfClean(state: PlayerState, nodeId: string): PlayerState {
  if ((state.stepAttempts[nodeId] ?? 0) > 0) return state;
  return {
    ...state,
    firstTryNodeIds: addUnique(state.firstTryNodeIds ?? [], nodeId),
  };
}

export function applyBadgeEvaluation(
  state: PlayerState,
  completedEnding = false,
): { nextState: PlayerState; newlyUnlocked: BadgeId[] } {
  const current = state.unlockedBadges ?? [];
  const candidateIds: BadgeId[] = [];

  if ((state.firstTryNodeIds ?? []).length >= 1) {
    candidateIds.push('first_spark');
  }
  if (state.unlockedLaws.includes(1) && (state.mistakesByEpisode.ep1 ?? 0) === 0) {
    candidateIds.push('flawless_bridge');
  }
  const flawlessDistrictsCount = state.completedDistricts.filter(
    (d) => (state.mistakesByEpisode[DISTRICT_EPISODE_MAP[d]] ?? 0) === 0,
  ).length;
  if (flawlessDistrictsCount >= 2) {
    candidateIds.push('district_ace');
  }
  if ((completedEnding || Boolean(state.endingId)) && state.mistakesCount === 0) {
    candidateIds.push('first_try_virtuoso');
  }
  if ((state.foundSecrets ?? []).length >= 1) {
    candidateIds.push('secret_finder');
  }
  if (SECRET_BRANCH_IDS.every((id) => (state.foundSecrets ?? []).includes(id))) {
    candidateIds.push('all_secrets_master');
  }

  const newlyUnlocked = candidateIds.filter((id) => !current.includes(id));
  if (newlyUnlocked.length === 0) {
    return { nextState: state, newlyUnlocked: [] };
  }
  return {
    nextState: {
      ...state,
      unlockedBadges: [...current, ...newlyUnlocked],
    },
    newlyUnlocked,
  };
}

function recordMistake(
  state: PlayerState,
  nodeId: string,
  episodeId: string,
  category: MistakeCategory,
  delta = -10,
): { nextState: PlayerState; attemptNumber: number } {
  const prevEp = state.mistakesByEpisode[episodeId] ?? 0;
  const prevCat = state.mistakesByCategory[category] ?? 0;
  const attemptNumber = (state.stepAttempts[nodeId] ?? 0) + 1;

  return {
    attemptNumber,
    nextState: {
      ...state,
      mistakesCount: state.mistakesCount + 1,
      mistakesByEpisode: {
        ...state.mistakesByEpisode,
        [episodeId]: prevEp + 1,
      },
      mistakesByCategory: {
        ...state.mistakesByCategory,
        [category]: prevCat + 1,
      },
      mistakeLog: [...state.mistakeLog, { nodeId, episodeId, category }],
      stepAttempts: {
        ...state.stepAttempts,
        [nodeId]: attemptNumber,
      },
      balanceIntegrity: Math.max(20, Math.min(100, state.balanceIntegrity + delta)),
    },
  };
}

export interface FeedbackBanner {
  text: string;
  speaker: string;
  speakerId?: SpeakerId;
  isError: boolean;
  hintLevel?: 1 | 2;
}

export interface ActionOutcome {
  nextState: PlayerState;
  feedback?: FeedbackBanner;
  unlockedLaw?: number;
  unlockedBadges?: BadgeId[];
  completedEnding?: boolean;
}

export function selectDistrictFromCrossroads(
  state: PlayerState,
  districtId: DistrictId,
): ActionOutcome {
  const district = DISTRICTS.find((d) => d.id === districtId);
  if (!district) {
    return { nextState: state };
  }
  const decisions = {
    ...state.decisions,
    firstCrossroadsChoice: state.decisions.firstCrossroadsChoice ?? districtId,
  };
  return {
    nextState: {
      ...state,
      currentNodeId: district.entryNodeId,
      decisions,
      visitedNodes: [...state.visitedNodes, district.entryNodeId],
    },
  };
}

export function enterTempleFromCrossroads(state: PlayerState): ActionOutcome {
  if (!canEnterTemple(state)) {
    return {
      nextState: state,
      feedback: {
        text: 'Купол Храма ещё не снят! Восстанови все четыре района острова на Перекрёстке.',
        speaker: 'Сова Пи',
        speakerId: 'pi',
        isError: true,
      },
    };
  }
  return {
    nextState: {
      ...state,
      currentNodeId: 'ep6_intro',
      visitedNodes: [...state.visitedNodes, 'ep6_intro'],
    },
  };
}

export function applyChoice(state: PlayerState, choice: StoryChoice): ActionOutcome {
  const currentNode = STORY_NODES[state.currentNodeId];
  if (!currentNode) return { nextState: state };

  let nextState: PlayerState = {
    ...state,
    decisions: {
      ...state.decisions,
      ...(choice.recordDecision ?? {}),
    },
  };

  if (choice.isCorrect === false) {
    const category = choice.mistakeCategory ?? 'expression_translation';
    const delta = choice.integrityDelta ?? -10;
    const tracked = recordMistake(nextState, currentNode.id, currentNode.episodeId, category, delta);
    nextState = tracked.nextState;

    const hintLevel: 1 | 2 = tracked.attemptNumber === 1 ? 1 : 2;
    const hintText =
      hintLevel === 1
        ? (choice.hintTier1 ?? choice.adaptiveFeedback)
        : (choice.hintTier2 ?? choice.adaptiveFeedback);

    if (choice.nextNodeId) {
      nextState = {
        ...nextState,
        currentNodeId: choice.nextNodeId,
        visitedNodes: [...nextState.visitedNodes, choice.nextNodeId],
      };
    }

    return {
      nextState,
      feedback: hintText
        ? {
            text: hintText,
            speaker: choice.feedbackSpeaker === 'captain' ? 'Капитан Автоматонов' : 'Сова Пи',
            speakerId: choice.feedbackSpeaker === 'captain' ? 'captain' : 'pi',
            isError: true,
            hintLevel,
          }
        : undefined,
    };
  }

  if (choice.secretId) {
    nextState = {
      ...nextState,
      foundSecrets: addUnique(nextState.foundSecrets ?? [], choice.secretId),
    };
  }

  const hasChallengeTraps = Boolean(
    currentNode.choices?.some((c) => c.isCorrect === false),
  );
  if (hasChallengeTraps) {
    nextState = recordFirstTryIfClean(nextState, currentNode.id);
  }

  if (typeof choice.integrityDelta === 'number') {
    nextState.balanceIntegrity = Math.max(
      20,
      Math.min(100, nextState.balanceIntegrity + choice.integrityDelta),
    );
  }
  if (typeof choice.bossDamage === 'number') {
    nextState.bossShieldHp = Math.max(0, nextState.bossShieldHp - choice.bossDamage);
  }
  if (choice.unlockLaw) {
    nextState.unlockedLaws = addLaw(nextState.unlockedLaws, choice.unlockLaw);
  }
  if (choice.completeDistrict) {
    nextState.completedDistricts = addDistrict(
      nextState.completedDistricts,
      choice.completeDistrict,
    );
  }

  if (choice.triggerEnding) {
    const ending = evaluateEnding(nextState);
    nextState.endingId = ending.id;
    const badgeEval = applyBadgeEvaluation(nextState, true);
    return {
      nextState: badgeEval.nextState,
      unlockedLaw: choice.unlockLaw,
      unlockedBadges:
        badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
      completedEnding: true,
    };
  }

  if (choice.nextNodeId && STORY_NODES[choice.nextNodeId]) {
    nextState.currentNodeId = choice.nextNodeId;
    nextState.visitedNodes = [...nextState.visitedNodes, choice.nextNodeId];
  }

  const badgeEval = applyBadgeEvaluation(nextState);
  return {
    nextState: badgeEval.nextState,
    unlockedLaw: choice.unlockLaw,
    unlockedBadges:
      badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
  };
}

export function applyNumericAnswer(state: PlayerState, rawInput: string): ActionOutcome {
  const node = STORY_NODES[state.currentNodeId];
  if (!node?.numericTask) return { nextState: state };

  const trimmed = rawInput.trim().replace(',', '.');
  const parsed = Number(trimmed);
  if (!trimmed || Number.isNaN(parsed)) {
    return {
      nextState: state,
      feedback: {
        text: 'Введи целое число — например, цифрами на клавиатуре.',
        speaker: 'Сова Пи',
        speakerId: 'pi',
        isError: true,
      },
    };
  }

  const task = node.numericTask;
  if (parsed === task.correctValue) {
    let nextState: PlayerState = recordFirstTryIfClean(
      {
        ...state,
        currentNodeId: task.nextNodeId,
        unlockedLaws: addLaw(state.unlockedLaws, task.unlockLaw),
        completedDistricts: addDistrict(state.completedDistricts, task.completeDistrict),
        bossShieldHp:
          typeof task.bossDamage === 'number'
            ? Math.max(0, state.bossShieldHp - task.bossDamage)
            : state.bossShieldHp,
        visitedNodes: [...state.visitedNodes, task.nextNodeId],
      },
      node.id,
    );
    const badgeEval = applyBadgeEvaluation(nextState);
    nextState = badgeEval.nextState;
    return {
      nextState,
      unlockedLaw: task.unlockLaw,
      unlockedBadges:
        badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
    };
  }

  const attemptNumber = (state.stepAttempts[node.id] ?? 0) + 1;
  const wrong = task.evaluateWrong(parsed, attemptNumber);
  const category = wrong.category ?? task.mistakeCategory ?? 'arithmetic_check';
  const tracked = recordMistake(
    state,
    node.id,
    node.episodeId,
    category,
    wrong.integrityDelta ?? -10,
  );
  const hintLevel: 1 | 2 = attemptNumber === 1 ? 1 : 2;

  return {
    nextState: tracked.nextState,
    feedback: {
      text: wrong.feedback,
      speaker: wrong.speaker === 'archivist' ? 'Хранитель Архива' : 'Сова Пи',
      speakerId: wrong.speaker === 'archivist' ? 'archivist' : 'pi',
      isError: true,
      hintLevel,
    },
  };
}

export function applyDualNumericAnswer(
  state: PlayerState,
  rawFirst: string,
  rawSecond: string,
): ActionOutcome {
  const node = STORY_NODES[state.currentNodeId];
  if (!node?.dualNumericTask) return { nextState: state };

  const task = node.dualNumericTask;
  const first = rawFirst.trim() === '' ? null : Number(rawFirst.trim());
  const second = rawSecond.trim() === '' ? null : Number(rawSecond.trim());

  if (
    (first !== null && Number.isNaN(first)) ||
    (second !== null && Number.isNaN(second)) ||
    (first === null && second === null)
  ) {
    return {
      nextState: state,
      feedback: {
        text: 'Заполни оба поля числами, чтобы восстановить реестр обеих полок!',
        speaker: 'Хранитель Архива',
        speakerId: 'archivist',
        isError: true,
      },
    };
  }

  if (first === task.firstCorrect && second === task.secondCorrect) {
    let nextState: PlayerState = recordFirstTryIfClean(
      {
        ...state,
        currentNodeId: task.nextNodeId,
        unlockedLaws: addLaw(state.unlockedLaws, task.unlockLaw),
        completedDistricts: addDistrict(state.completedDistricts, task.completeDistrict),
        visitedNodes: [...state.visitedNodes, task.nextNodeId],
      },
      node.id,
    );
    const badgeEval = applyBadgeEvaluation(nextState);
    nextState = badgeEval.nextState;
    return {
      nextState,
      unlockedLaw: task.unlockLaw,
      unlockedBadges:
        badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
    };
  }

  const attemptNumber = (state.stepAttempts[node.id] ?? 0) + 1;
  const wrong = task.evaluateWrong(first, second, attemptNumber);
  const category = wrong.category ?? task.mistakeCategory ?? 'arithmetic_check';
  const tracked = recordMistake(state, node.id, node.episodeId, category, -10);
  const hintLevel: 1 | 2 = attemptNumber === 1 ? 1 : 2;

  return {
    nextState: tracked.nextState,
    feedback: {
      text: wrong.feedback,
      speaker: wrong.speaker === 'archivist' ? 'Хранитель Архива' : 'Сова Пи',
      speakerId: wrong.speaker === 'archivist' ? 'archivist' : 'pi',
      isError: true,
      hintLevel,
    },
  };
}

export function applyScratchpadAnswer(
  state: PlayerState,
  values: Record<string, string>,
): ActionOutcome {
  const node = STORY_NODES[state.currentNodeId];
  if (!node?.scratchpadTask) return { nextState: state };

  const task = node.scratchpadTask;
  for (const field of task.fields) {
    const raw = (values[field.id] ?? '').trim().replace(',', '.');
    const num = Number(raw);
    if (!raw || Number.isNaN(num)) {
      return {
        nextState: state,
        feedback: {
          text: `Заполни поле «${field.label}» в черновике.`,
          speaker: 'Сова Пи',
          speakerId: 'pi',
          isError: true,
        },
      };
    }
    if (num !== field.correctValue) {
      const tracked = recordMistake(
        state,
        node.id,
        node.episodeId,
        task.mistakeCategory,
        -10,
      );
      const hintLevel: 1 | 2 = tracked.attemptNumber === 1 ? 1 : 2;
      return {
        nextState: tracked.nextState,
        feedback: {
          text: hintLevel === 1 ? task.hintTier1 : task.hintTier2,
          speaker: 'Сова Пи',
          speakerId: 'pi',
          isError: true,
          hintLevel,
        },
      };
    }
  }

  const nextState = recordFirstTryIfClean(
    {
      ...state,
      currentNodeId: task.nextNodeId,
      bossShieldHp:
        typeof task.bossDamage === 'number'
          ? Math.max(0, state.bossShieldHp - task.bossDamage)
          : state.bossShieldHp,
      visitedNodes: [...state.visitedNodes, task.nextNodeId],
    },
    node.id,
  );
  const badgeEval = applyBadgeEvaluation(nextState);
  return {
    nextState: badgeEval.nextState,
    unlockedBadges:
      badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
  };
}

export function applyVerificationAnswer(
  state: PlayerState,
  values: Record<string, string>,
): ActionOutcome {
  const node = STORY_NODES[state.currentNodeId];
  if (!node?.verificationTask) return { nextState: state };

  const task = node.verificationTask;
  for (const field of task.fields) {
    const raw = (values[field.id] ?? '').trim().replace(',', '.');
    const num = Number(raw);
    if (!raw || Number.isNaN(num)) {
      return {
        nextState: state,
        feedback: {
          text: `Введи результат проверки для пункта «${field.label}».`,
          speaker: 'Сова Пи',
          speakerId: 'pi',
          isError: true,
        },
      };
    }
    if (num !== field.correctValue) {
      const tracked = recordMistake(
        state,
        node.id,
        node.episodeId,
        'arithmetic_check',
        -5,
      );
      const hintLevel: 1 | 2 = tracked.attemptNumber === 1 ? 1 : 2;
      return {
        nextState: tracked.nextState,
        feedback: {
          text: hintLevel === 1 ? task.hintTier1 : task.hintTier2,
          speaker: 'Сова Пи',
          speakerId: 'pi',
          isError: true,
          hintLevel,
        },
      };
    }
  }

  // Successful verification gives a small +5 balance recovery (capped at 100)
  const verifiedState = recordFirstTryIfClean(
    {
      ...state,
      currentNodeId: task.nextNodeId,
      balanceIntegrity: Math.min(100, state.balanceIntegrity + 5),
      unlockedLaws: addLaw(state.unlockedLaws, task.unlockLaw),
      completedDistricts: addDistrict(state.completedDistricts, task.completeDistrict),
      decisions: {
        ...state.decisions,
        ...(task.recordDecision ?? {}),
      },
      visitedNodes: [...state.visitedNodes, task.nextNodeId],
    },
    node.id,
  );
  const badgeEval = applyBadgeEvaluation(verifiedState);

  return {
    nextState: badgeEval.nextState,
    unlockedLaw: task.unlockLaw,
    unlockedBadges:
      badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
  };
}

export function applyTableSubmission(
  state: PlayerState,
  selections: Record<string, string>,
): ActionOutcome {
  const node = STORY_NODES[state.currentNodeId];
  if (!node?.tableTask) return { nextState: state };

  const task = node.tableTask;
  for (const row of task.rows) {
    const chosen = selections[row.id];
    if (!chosen) {
      return {
        nextState: state,
        feedback: {
          text: `Заполни все строки таблицы: выбери выражение для пункта «${row.label}».`,
          speaker: 'Сова Пи',
          speakerId: 'pi',
          isError: true,
        },
      };
    }
    if (chosen !== row.correctOption) {
      const tracked = recordMistake(
        state,
        node.id,
        node.episodeId,
        'expression_translation',
        -10,
      );
      const hintLevel: 1 | 2 = tracked.attemptNumber === 1 ? 1 : 2;
      return {
        nextState: tracked.nextState,
        feedback: {
          text: hintLevel === 1 ? row.hintTier1 : row.hintTier2,
          speaker: 'Сова Пи',
          speakerId: 'pi',
          isError: true,
          hintLevel,
        },
      };
    }
  }

  const nextState = recordFirstTryIfClean(
    {
      ...state,
      currentNodeId: task.nextNodeId,
      visitedNodes: [...state.visitedNodes, task.nextNodeId],
    },
    node.id,
  );
  const badgeEval = applyBadgeEvaluation(nextState);
  return {
    nextState: badgeEval.nextState,
    unlockedBadges:
      badgeEval.newlyUnlocked.length > 0 ? badgeEval.newlyUnlocked : undefined,
  };
}

export function buildDiagnosticReport(state: PlayerState): DiagnosticItem[] {
  const entries = Object.entries(state.mistakesByCategory) as [MistakeCategory, number][];
  return entries
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => {
      const meta = MISTAKE_CATEGORY_META[category];
      return {
        category,
        title: meta.title,
        count,
        codexLawId: meta.codexLawId,
        advice: meta.advice,
      };
    });
}

export function resolveDialogPortraitState(params: {
  node: StoryNode;
  feedback: FeedbackBanner | null;
  completedDistrictsCount: number;
  totalDistrictsCount: number;
  hasDraftInput?: boolean;
}): { speaker: SpeakerId; emotion: SpeakerEmotion } {
  const { node, feedback, completedDistrictsCount, totalDistrictsCount, hasDraftInput } = params;

  if (feedback) {
    const activeSpeaker = feedback.speakerId ?? node.speaker;
    if (feedback.isError) {
      return {
        speaker: activeSpeaker,
        emotion: feedback.hintLevel === 2 ? 'alert' : 'surprised',
      };
    }
    return {
      speaker: activeSpeaker,
      emotion: 'encourage',
    };
  }

  if (node.isCrossroadsHub) {
    if (completedDistrictsCount >= totalDistrictsCount) {
      return { speaker: node.speaker, emotion: 'triumph' };
    }
    if (completedDistrictsCount > 0) {
      return { speaker: node.speaker, emotion: 'encourage' };
    }
    return {
      speaker: node.speaker,
      emotion: node.emotion ?? node.mood ?? 'curious',
    };
  }

  const baseEmotion: SpeakerEmotion =
    node.emotion ??
    node.mood ??
    (node.speaker === 'shadow'
      ? 'alert'
      : node.id.includes('outro') || node.id.includes('victory')
        ? 'triumph'
        : node.scratchpadTask || node.verificationTask || node.tableTask
          ? 'thoughtful'
          : node.numericTask || node.dualNumericTask || node.formulaDisplay
            ? 'curious'
            : 'neutral');

  if (hasDraftInput && baseEmotion !== 'alert' && baseEmotion !== 'triumph') {
    return { speaker: node.speaker, emotion: 'thoughtful' };
  }

  return { speaker: node.speaker, emotion: baseEmotion };
}
