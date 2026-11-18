import assert from 'node:assert/strict';
import test from 'node:test';
import { getSpeakerPortrait, SECRET_BRANCH_IDS } from './codexData';
import {
  applyBadgeEvaluation,
  applyChoice,
  applyDualNumericAnswer,
  applyNumericAnswer,
  applyScratchpadAnswer,
  applyTableSubmission,
  applyVerificationAnswer,
  buildDiagnosticReport,
  canEnterTemple,
  createInitialPlayerState,
  enterTempleFromCrossroads,
  resolveDialogPortraitState,
  selectDistrictFromCrossroads,
} from './engine';
import { evaluateEnding } from './endings';
import { STORY_NODES } from './storyData';

test('Episode 1 uses 2-tier scaffolding hints and substitution verification before unlocking Law 1', () => {
  let state = createInitialPlayerState();
  state.currentNodeId = 'ep1_step3_solve';

  // 1st mistake -> Tier 1 guiding question
  const res103 = applyNumericAnswer(state, '103');
  assert.equal(res103.feedback?.isError, true);
  assert.equal(res103.feedback?.hintLevel, 1);
  assert.match(res103.feedback?.text ?? '', /Наводящий вопрос/);
  assert.equal(res103.nextState.mistakesByCategory.sign_transfer, 1);

  // 2nd mistake on same node -> Tier 2 full rule explanation
  const res103Again = applyNumericAnswer(res103.nextState, '103');
  assert.equal(res103Again.feedback?.hintLevel, 2);
  assert.match(res103Again.feedback?.text ?? '', /Правило Кодекса/);
  assert.equal(res103Again.nextState.mistakesByCategory.sign_transfer, 2);

  // Correct answer -> goes to ep1_verify
  const res53 = applyNumericAnswer(res103Again.nextState, '53');
  assert.equal(res53.nextState.currentNodeId, 'ep1_verify');
  assert.deepEqual(res53.nextState.unlockedLaws, []);

  // Substitution verification unlocks Law 1
  const verified = applyVerificationAnswer(res53.nextState, { left: '78' });
  assert.equal(verified.unlockedLaw, 1);
  assert.deepEqual(verified.nextState.unlockedLaws, [1]);
  assert.equal(verified.nextState.currentNodeId, 'ep1_outro');
});

test('Non-linear Crossroads blocks Temple until all 4 districts completed in any order', () => {
  let state = createInitialPlayerState();
  state.currentNodeId = 'crossroads_hub';
  state.unlockedLaws = [1];

  const blocked = enterTempleFromCrossroads(state);
  assert.equal(blocked.feedback?.isError, true);
  assert.equal(canEnterTemple(state), false);

  const startEp5 = selectDistrictFromCrossroads(state, 'ep5_city');
  assert.equal(startEp5.nextState.currentNodeId, 'ep5_intro');
  assert.equal(startEp5.nextState.decisions.firstCrossroadsChoice, 'ep5_city');

  state = {
    ...startEp5.nextState,
    completedDistricts: ['ep5_city', 'ep4_crystals', 'ep3_archive', 'ep2_tunnel'],
    currentNodeId: 'crossroads_hub',
  };
  assert.equal(canEnterTemple(state), true);

  const entered = enterTempleFromCrossroads(state);
  assert.equal(entered.nextState.currentNodeId, 'ep6_intro');
});

test('Episode 3 table builder, scratchpad, dual numeric check, and verification work end-to-end', () => {
  let state = createInitialPlayerState();
  state.currentNodeId = 'ep3_step2_table';

  const badTable = applyTableSubmission(state, {
    shelf1_before: 'x + 3',
    shelf1_after: '3x − 16',
    shelf2_after: 'x + 22',
  });
  assert.equal(badTable.feedback?.isError, true);
  assert.equal(badTable.feedback?.hintLevel, 1);

  const okTable = applyTableSubmission(badTable.nextState, {
    shelf1_before: '3x',
    shelf1_after: '3x − 16',
    shelf2_after: 'x + 22',
  });
  assert.equal(okTable.nextState.currentNodeId, 'ep3_step3_transfer');

  // Scratchpad step
  state = { ...okTable.nextState, currentNodeId: 'ep3_step3b_scratchpad' };
  const badScratch = applyScratchpadAnswer(state, { coef: '3', rhs: '38' });
  assert.equal(badScratch.feedback?.hintLevel, 1);

  const okScratch = applyScratchpadAnswer(badScratch.nextState, {
    coef: '2',
    rhs: '38',
  });
  assert.equal(okScratch.nextState.currentNodeId, 'ep3_step4_dual_solve');

  // Dual numeric solve -> verify
  const only19 = applyDualNumericAnswer(okScratch.nextState, '19', '');
  assert.equal(only19.feedback?.isError, true);

  const bothOk = applyDualNumericAnswer(only19.nextState, '57', '19');
  assert.equal(bothOk.nextState.currentNodeId, 'ep3_verify');

  const verified = applyVerificationAnswer(bothOk.nextState, {
    s1: '41',
    s2: '41',
  });
  assert.equal(verified.unlockedLaw, 3);
  assert.ok(verified.nextState.completedDistricts.includes('ep3_archive'));
});

test('Episode 6 boss battle, diagnostic report, and branching endings work correctly', () => {
  let state = createInitialPlayerState();
  state.completedDistricts = ['ep2_tunnel', 'ep3_archive', 'ep4_crystals', 'ep5_city'];
  state.unlockedLaws = [1, 2, 3, 4, 5];
  state.decisions = {
    firstCrossroadsChoice: 'ep2_tunnel',
    ep4Method: 'algebraic',
    ep5VerificationDone: true,
    ep6FinalStance: 'harmony',
  };

  const masterEnding = evaluateEnding(state);
  assert.equal(masterEnding.id, 'master_of_balance');

  // Boss battle trap -> Tier 1 then Tier 2, then correct -> scratchpad -> solve -> verify
  state.currentNodeId = 'ep6_phase2_equation';
  const trap1 = applyChoice(state, STORY_NODES.ep6_phase2_equation.choices![0]);
  assert.equal(trap1.feedback?.hintLevel, 1);
  const trap2 = applyChoice(trap1.nextState, STORY_NODES.ep6_phase2_equation.choices![1]);
  assert.equal(trap2.feedback?.hintLevel, 2);

  const report = buildDiagnosticReport(trap2.nextState);
  assert.equal(report.length, 1);
  assert.equal(report[0].category, 'brackets_distribution');
  assert.equal(report[0].count, 2);
  assert.equal(report[0].codexLawId, 6);

  const strike = applyChoice(trap2.nextState, STORY_NODES.ep6_phase2_equation.choices![2]);
  assert.equal(strike.nextState.bossShieldHp, 50);
  assert.equal(strike.nextState.currentNodeId, 'ep6_phase3b_scratchpad');

  const scratchOk = applyScratchpadAnswer(strike.nextState, { coef: '8', rhs: '24' });
  assert.equal(scratchOk.nextState.currentNodeId, 'ep6_phase4_solve');

  const solveOk = applyNumericAnswer(scratchOk.nextState, '3');
  assert.equal(solveOk.nextState.currentNodeId, 'ep6_verify');
  assert.equal(solveOk.nextState.bossShieldHp, 25);

  const verifyOk = applyVerificationAnswer(solveOk.nextState, { down: '45', up: '45' });
  assert.equal(verifyOk.unlockedLaw, 6);
});

test('Character emotion system assigns emotions to STORY_NODES and switches hologram sprites dynamically', () => {
  for (const node of Object.values(STORY_NODES)) {
    assert.ok(node.emotion, `Node ${node.id} must declare an emotion`);
  }

  // Node emotion -> surprised Owl Pi sprite
  const prologuePi = resolveDialogPortraitState({
    node: STORY_NODES.prologue_3,
    feedback: null,
    completedDistrictsCount: 0,
    totalDistrictsCount: 4,
  });
  assert.deepEqual(prologuePi, { speaker: 'pi', emotion: 'surprised' });
  assert.match(getSpeakerPortrait('pi', 'surprised') ?? '', /story_pi_surprised/);

  // Draft input shifts Alyosha or Pi to thoughtful sprite
  const drafting = resolveDialogPortraitState({
    node: STORY_NODES.ep1_step1_x,
    feedback: null,
    completedDistrictsCount: 0,
    totalDistrictsCount: 4,
    hasDraftInput: true,
  });
  assert.deepEqual(drafting, { speaker: 'pi', emotion: 'thoughtful' });
  assert.match(getSpeakerPortrait('pi', 'thoughtful') ?? '', /story_pi_thoughtful/);

  // Hint Tier 1 -> surprised feedback speaker, Hint Tier 2 -> alert feedback speaker
  const hint1 = resolveDialogPortraitState({
    node: STORY_NODES.ep1_step2_expr,
    feedback: {
      text: 'Hint 1',
      speaker: 'Сова Пи',
      speakerId: 'pi',
      isError: true,
      hintLevel: 1,
    },
    completedDistrictsCount: 0,
    totalDistrictsCount: 4,
  });
  assert.deepEqual(hint1, { speaker: 'pi', emotion: 'surprised' });

  const hint2 = resolveDialogPortraitState({
    node: STORY_NODES.ep1_step2_expr,
    feedback: {
      text: 'Hint 2',
      speaker: 'Сова Пи',
      speakerId: 'pi',
      isError: true,
      hintLevel: 2,
    },
    completedDistrictsCount: 0,
    totalDistrictsCount: 4,
  });
  assert.deepEqual(hint2, { speaker: 'pi', emotion: 'alert' });

  // Alyosha distinct sprites (thoughtful, surprised, triumph) differ from base neutral
  const alyoshaBase = getSpeakerPortrait('alyosha', 'neutral');
  const alyoshaThought = getSpeakerPortrait('alyosha', 'thoughtful');
  const alyoshaSurprised = getSpeakerPortrait('alyosha', 'surprised');
  const alyoshaTriumph = getSpeakerPortrait('alyosha', 'triumph');
  assert.equal(new Set([alyoshaBase, alyoshaThought, alyoshaSurprised, alyoshaTriumph]).size, 4);

  // Crossroads completion progresses Owl Pi emotion to triumph at 4/4
  const crossroadsDone = resolveDialogPortraitState({
    node: STORY_NODES.crossroads_hub,
    feedback: null,
    completedDistrictsCount: 4,
    totalDistrictsCount: 4,
  });
  assert.deepEqual(crossroadsDone, { speaker: 'pi', emotion: 'triumph' });
});

test('Explorer Badges reward secret dialogue discovery and first-try task mastery', () => {
  // 1. Secret branches: prologue -> secret_finder, all 4 -> all_secrets_master
  let state = createInitialPlayerState();
  const chestChoice = STORY_NODES.prologue_1.choices!.find(
    (c) => c.id === 'inspect_chest',
  )!;
  const secret1 = applyChoice(state, chestChoice);
  assert.equal(secret1.nextState.currentNodeId, 'prologue_secret_engraving');
  assert.deepEqual(secret1.nextState.foundSecrets, ['secret_attic_engraving']);
  assert.deepEqual(secret1.unlockedBadges, ['secret_finder']);

  // Trigger remaining 3 secret branches across Tunnel, Crystal Caves, and Clockwork City
  const ep2Secret = applyChoice(
    { ...secret1.nextState, currentNodeId: 'ep2_intro' },
    STORY_NODES.ep2_intro.choices!.find((c) => c.id === 'ep2_inspect_blueprint')!,
  );
  assert.equal(ep2Secret.nextState.currentNodeId, 'ep2_secret_blueprint');

  const ep4Secret = applyChoice(
    { ...ep2Secret.nextState, currentNodeId: 'ep4_intro' },
    STORY_NODES.ep4_intro.choices!.find((c) => c.id === 'ep4_inspect_crystal')!,
  );
  assert.equal(ep4Secret.nextState.currentNodeId, 'ep4_secret_prism');

  const ep5Secret = applyChoice(
    { ...ep4Secret.nextState, currentNodeId: 'ep5_intro' },
    STORY_NODES.ep5_intro.choices!.find((c) => c.id === 'ep5_inspect_ledger')!,
  );
  assert.equal(ep5Secret.nextState.currentNodeId, 'ep5_secret_ledger');
  assert.equal(ep5Secret.nextState.foundSecrets.length, SECRET_BRANCH_IDS.length);
  assert.deepEqual(ep5Secret.unlockedBadges, ['all_secrets_master']);

  // 2. First-try Episode 1 path awards first_spark and flawless_bridge
  let cleanEp1 = createInitialPlayerState();
  cleanEp1.currentNodeId = 'ep1_step1_x';
  const step1 = applyChoice(
    cleanEp1,
    STORY_NODES.ep1_step1_x.choices!.find((c) => c.isCorrect)!,
  );
  assert.ok(step1.unlockedBadges?.includes('first_spark'));

  const step2 = applyChoice(
    step1.nextState,
    STORY_NODES.ep1_step2_expr.choices!.find((c) => c.isCorrect)!,
  );
  const step3 = applyNumericAnswer(step2.nextState, '53');
  const verifyEp1 = applyVerificationAnswer(step3.nextState, { left: '78' });
  assert.equal(verifyEp1.unlockedLaw, 1);
  assert.ok(verifyEp1.unlockedBadges?.includes('flawless_bridge'));

  // 3. Mistakes in Ep 1 block flawless_bridge
  let flawedEp1 = createInitialPlayerState();
  flawedEp1.currentNodeId = 'ep1_step3_solve';
  const errEp1 = applyNumericAnswer(flawedEp1, '103');
  const fixEp1 = applyNumericAnswer(errEp1.nextState, '53');
  const verifyFlawed = applyVerificationAnswer(fixEp1.nextState, { left: '78' });
  assert.equal(verifyFlawed.unlockedLaw, 1);
  assert.equal(
    verifyFlawed.nextState.unlockedBadges.includes('flawless_bridge'),
    false,
  );

  // 4. Two flawless districts award district_ace; clean ending awards first_try_virtuoso
  const twoCleanDistricts = applyBadgeEvaluation({
    ...verifyEp1.nextState,
    completedDistricts: ['ep2_tunnel', 'ep4_crystals'],
  });
  assert.ok(twoCleanDistricts.newlyUnlocked.includes('district_ace'));

  const virtuoso = applyBadgeEvaluation(twoCleanDistricts.nextState, true);
  assert.ok(virtuoso.newlyUnlocked.includes('first_try_virtuoso'));

  const nonVirtuoso = applyBadgeEvaluation(
    { ...twoCleanDistricts.nextState, mistakesCount: 1 },
    true,
  );
  assert.equal(nonVirtuoso.newlyUnlocked.includes('first_try_virtuoso'), false);
});
