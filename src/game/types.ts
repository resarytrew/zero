export type GameScreenState = 'title' | 'playing' | 'paused' | 'ending';

export type SceneId =
  | 'attic'
  | 'forest'
  | 'crossroads'
  | 'tunnel'
  | 'archive'
  | 'crystals'
  | 'city'
  | 'temple';

export type DistrictId = 'ep2_tunnel' | 'ep3_archive' | 'ep4_crystals' | 'ep5_city';

export type SpeakerId =
  | 'narrator'
  | 'alyosha'
  | 'pi'
  | 'gnome1'
  | 'gnome2'
  | 'archivist'
  | 'guardian'
  | 'captain'
  | 'shadow';

export type SpeakerEmotion =
  | 'neutral'
  | 'surprised'
  | 'thoughtful'
  | 'curious'
  | 'encourage'
  | 'alert'
  | 'triumph';

export type SpeakerMood = SpeakerEmotion;

export type EndingId =
  | 'master_of_balance'
  | 'architect_of_logic'
  | 'tamer_of_chaos'
  | 'chronicler_of_secrets'
  | 'seeker_of_squares';

export type BadgeId =
  | 'first_spark'
  | 'flawless_bridge'
  | 'district_ace'
  | 'first_try_virtuoso'
  | 'secret_finder'
  | 'all_secrets_master';

export type BadgeCategory = 'first_try' | 'secrets';

export interface ExplorerBadge {
  id: BadgeId;
  category: BadgeCategory;
  title: string;
  description: string;
  hint: string;
}

export type SchematicKind =
  | 'none'
  | 'compass'
  | 'scales_ep1'
  | 'crossroads_map'
  | 'tunnel_ep2'
  | 'archive_table_ep3'
  | 'crystals_ep4'
  | 'city_chests_ep5'
  | 'boss_river_ep6';

export type MistakeCategory =
  | 'unknown_designation'
  | 'expression_translation'
  | 'like_terms'
  | 'sign_transfer'
  | 'fractions_parts'
  | 'brackets_distribution'
  | 'arithmetic_check';

export interface MistakeRecord {
  nodeId: string;
  episodeId: string;
  category: MistakeCategory;
}

export interface PlayerDecisions {
  firstCrossroadsChoice?: DistrictId;
  ep1TriedGuessing?: boolean;
  ep3TriedFirstShelfAsX?: boolean;
  ep3ChosenModel?: 'first_shelf' | 'second_shelf';
  ep4Method?: 'algebraic' | 'logical';
  ep5VerificationDone?: boolean;
  ep6FinalStance?: 'harmony' | 'courage' | 'precision';
}

export interface TransferCheckResult {
  id: string;
  topic: string;
  attempts: number;
  solved: boolean;
  solvedFirstTry: boolean;
  method?: 'algebraic' | 'arithmetic';
  studentExpression?: string;
  referenceModel?: string;
  referenceArithmetic?: string;
  referenceAnswer?: string;
  explanation?: string;
}

export interface PlayerState {
  currentNodeId: string;
  completedDistricts: DistrictId[];
  unlockedLaws: number[];
  balanceIntegrity: number;
  mistakesCount: number;
  mistakesByEpisode: Record<string, number>;
  mistakesByCategory: Partial<Record<MistakeCategory, number>>;
  mistakeLog: MistakeRecord[];
  stepAttempts: Record<string, number>;
  decisions: PlayerDecisions;
  visitedNodes: string[];
  foundSecrets: string[];
  firstTryNodeIds: string[];
  unlockedBadges: BadgeId[];
  transferCheckResults: Record<string, TransferCheckResult>;
  bossShieldHp: number;
  endingId?: EndingId;
}

export interface StoryChoice {
  id: string;
  label: string;
  nextNodeId?: string;
  isCorrect?: boolean;
  secretId?: string;
  mistakeCategory?: MistakeCategory;
  adaptiveFeedback?: string;
  hintTier1?: string;
  hintTier2?: string;
  feedbackSpeaker?: SpeakerId;
  integrityDelta?: number;
  bossDamage?: number;
  recordDecision?: Partial<PlayerDecisions>;
  unlockLaw?: number;
  completeDistrict?: DistrictId;
  triggerEnding?: boolean;
  requiresAllDistricts?: boolean;
}

export interface NumericTask {
  prompt: string;
  unit?: string;
  placeholder?: string;
  correctValue: number;
  nextNodeId: string;
  mistakeCategory?: MistakeCategory;
  unlockLaw?: number;
  completeDistrict?: DistrictId;
  bossDamage?: number;
  evaluateWrong: (
    value: number,
    attemptNumber: number,
  ) => {
    feedback: string;
    speaker: SpeakerId;
    integrityDelta?: number;
    category?: MistakeCategory;
  };
}

export interface DualNumericTask {
  prompt: string;
  firstLabel: string;
  secondLabel: string;
  firstCorrect: number;
  secondCorrect: number;
  nextNodeId: string;
  mistakeCategory?: MistakeCategory;
  unlockLaw?: number;
  completeDistrict?: DistrictId;
  evaluateWrong: (
    first: number | null,
    second: number | null,
    attemptNumber: number,
  ) => {
    feedback: string;
    speaker: SpeakerId;
    category?: MistakeCategory;
  };
}

export interface ScratchpadField {
  id: string;
  prefix?: string;
  suffix?: string;
  label: string;
  correctValue: number;
  placeholder?: string;
  mistakeCategory?: MistakeCategory;
  hintTier1?: string;
  hintTier2?: string;
}

export interface ScratchpadTask {
  title: string;
  equationContext: string;
  fields: ScratchpadField[];
  nextNodeId: string;
  mistakeCategory: MistakeCategory;
  hintTier1: string;
  hintTier2: string;
  bossDamage?: number;
}

export interface VerificationTask {
  title: string;
  prompt: string;
  fields: ScratchpadField[];
  expectedSummary: string;
  nextNodeId: string;
  unlockLaw?: number;
  completeDistrict?: DistrictId;
  recordDecision?: Partial<PlayerDecisions>;
  hintTier1: string;
  hintTier2: string;
}

export interface TableRowSpec {
  id: string;
  label: string;
  options: string[];
  correctOption: string;
  hintTier1: string;
  hintTier2: string;
}

export interface TableBuilderTask {
  prompt: string;
  rows: TableRowSpec[];
  nextNodeId: string;
}

export interface EquationBuilderTask {
  /** Prompt above the equation/expression constructor */
  equationPrompt: string;
  /** Prompt above the final numeric answer field */
  answerPrompt: string;
  unit?: string;
  /** Valid roots for algebraic equation (supports dual x-designation!) */
  acceptedRoots: number[];
  /** Exact final numeric answer asked by the problem */
  correctAnswer: number;
  /** Quick-insert math token chips for desktop/mobile convenience */
  tokenChips?: string[];
  /** Reference algebraic equation shown only in post-test review */
  referenceModel: string;
  /** Reference arithmetic way shown only in post-test review */
  referenceArithmetic: string;
  /** Detailed review explanation shown AFTER all transfer tasks finish */
  reviewExplanation: string;
  nextNodeId: string;
  /** Optional detector for specific observed algebraic mistakes in the student's equation */
  diagnoseWrongEquation?: (
    root: number | null,
    normalizedEquation: string,
  ) => MistakeCategory;
}

export interface StoryNode {
  id: string;
  episodeId: string;
  episodeTitle: string;
  mathTopic?: string;
  scene: SceneId;
  speaker: SpeakerId;
  speakerName: string;
  emotion?: SpeakerEmotion;
  mood?: SpeakerMood;
  text: string[];
  formulaDisplay?: string;
  schematic?: SchematicKind;
  schematicStep?: number;
  isCrossroadsHub?: boolean;
  isSecretNode?: boolean;
  isIndependentCheck?: boolean;
  isTransferReview?: boolean;
  transferCheckTopic?: string;
  choices?: StoryChoice[];
  numericTask?: NumericTask;
  dualNumericTask?: DualNumericTask;
  scratchpadTask?: ScratchpadTask;
  verificationTask?: VerificationTask;
  tableTask?: TableBuilderTask;
  equationBuilderTask?: EquationBuilderTask;
}

export interface CodexLaw {
  id: number;
  episodeTitle: string;
  title: string;
  formula: string;
  ruleText: string;
  summaryShort: string;
}

export interface DistrictInfo {
  id: DistrictId;
  title: string;
  subtitle: string;
  mathTheme: string;
  difficulty: 1 | 2 | 3;
  recommendedHint: string;
  entryNodeId: string;
  scene: SceneId;
  portalCoords: { x: number; y: number };
}

export interface EndingResult {
  id: EndingId;
  title: string;
  subtitle: string;
  engraving: string;
  paragraphs: string[];
  accentTone: 'gold' | 'cyan' | 'emerald' | 'amber' | 'violet';
  pathSummary: string[];
}

export interface DiagnosticItem {
  category: MistakeCategory;
  title: string;
  count: number;
  codexLawId: number;
  advice: string;
}
