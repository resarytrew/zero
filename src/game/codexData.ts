import type {
  CodexLaw,
  DistrictInfo,
  ExplorerBadge,
  MistakeCategory,
  SceneId,
  SpeakerEmotion,
  SpeakerId,
} from './types';

export const SCENE_IMAGES: Record<SceneId, string> = {
  attic: '/src/assets/images/story_scene_attic_1795011707846.jpg',
  forest: '/src/assets/images/story_scene_forest_1795011709021.jpg',
  crossroads: '/src/assets/images/story_scene_crossroads_1795011709945.jpg',
  tunnel: '/src/assets/images/story_scene_tunnel_1795011709449.jpg',
  archive: '/src/assets/images/story_scene_archive_1795011710310.jpg',
  crystals: '/src/assets/images/story_scene_crystals_1795011710260.jpg',
  city: '/src/assets/images/story_scene_city_1795011712429.jpg',
  temple: '/src/assets/images/story_scene_temple_1795011712243.jpg',
};

export const SPEAKER_PORTRAITS: Partial<Record<SpeakerId, string>> = {
  alyosha: '/src/assets/images/story_alyosha_neutral_1795011713539.jpg',
  pi: '/src/assets/images/story_pi_neutral_1795011715473.jpg',
  gnome1: '/src/assets/images/story_gnome_miner_1795011718058.jpg',
  gnome2: '/src/assets/images/story_gnome_miner_1795011718058.jpg',
  archivist: '/src/assets/images/story_archivist_1795011719300.jpg',
  guardian: '/src/assets/images/story_crystal_guardian_1795011810450.jpg',
  captain: '/src/assets/images/story_captain_automaton_1795011811277.jpg',
  shadow: '/src/assets/images/story_shadow_brackets_1795011812174.jpg',
};

export const SPEAKER_EMOTION_PORTRAITS: Partial<
  Record<SpeakerId, Partial<Record<SpeakerEmotion, string>>>
> = {
  alyosha: {
    surprised: '/src/assets/images/story_alyosha_surprised_1795011713611.jpg',
    thoughtful: '/src/assets/images/story_alyosha_thoughtful_1795011713101.jpg',
    curious: '/src/assets/images/story_alyosha_thoughtful_1795011713101.jpg',
    alert: '/src/assets/images/story_alyosha_surprised_1795011713611.jpg',
    triumph: '/src/assets/images/story_alyosha_triumph_1795011716280.jpg',
    encourage: '/src/assets/images/story_alyosha_triumph_1795011716280.jpg',
  },
  pi: {
    surprised: '/src/assets/images/story_pi_surprised_1795011716952.jpg',
    alert: '/src/assets/images/story_pi_surprised_1795011716952.jpg',
    thoughtful: '/src/assets/images/story_pi_thoughtful_1795011717942.jpg',
    curious: '/src/assets/images/story_pi_thoughtful_1795011717942.jpg',
  },
};

export function getSpeakerPortrait(
  speaker: SpeakerId,
  emotion: SpeakerEmotion = 'neutral',
): string | undefined {
  return (
    SPEAKER_EMOTION_PORTRAITS[speaker]?.[emotion] ?? SPEAKER_PORTRAITS[speaker]
  );
}

export const SPEAKER_META: Record<
  SpeakerId,
  { name: string; role: string; accent: string; shortGlyph: string }
> = {
  narrator: { name: 'Повествование', role: 'Хроника Острова', accent: '#d66613', shortGlyph: 'X' },
  alyosha: { name: 'Алёша', role: 'Искатель, 5 класс', accent: '#f5b83d', shortGlyph: 'А' },
  pi: { name: 'Сова Пи', role: 'Хранительница логики', accent: '#1e7c96', shortGlyph: 'π' },
  gnome1: { name: 'Гном-рудокоп I', role: 'Бригадир запада', accent: '#d97706', shortGlyph: 'I' },
  gnome2: { name: 'Гном-рудокоп II', role: 'Бригадир востока', accent: '#c25e1a', shortGlyph: 'II' },
  archivist: { name: 'Хранитель Архива', role: 'Мастер реестра', accent: '#9d4322', shortGlyph: 'Ах' },
  guardian: { name: 'Хранитель Пещер', role: 'Кристальный страж', accent: '#158f74', shortGlyph: 'Кр' },
  captain: { name: 'Капитан Автоматонов', role: 'Глава энергоцеха', accent: '#276d8c', shortGlyph: 'Ка' },
  shadow: { name: 'Тень Скобок', role: 'Страж Вируса Хаоса', accent: '#6d35a3', shortGlyph: '( )' },
};

export const MISTAKE_CATEGORY_META: Record<
  MistakeCategory,
  { title: string; codexLawId: number; advice: string }
> = {
  unknown_designation: {
    title: 'Выбор неизвестной величины x',
    codexLawId: 1,
    advice: 'Всегда перечитывай вопрос задачи и принимай за x меньшую или базовую искомую величину.',
  },
  expression_translation: {
    title: 'Перевод условия в выражение',
    codexLawId: 5,
    advice: 'Различай «на больше/меньше» (+ / −) и «в раз больше/меньше» (· / :), а нехватку записывай с минусом.',
  },
  like_terms: {
    title: 'Приведение подобных слагаемых',
    codexLawId: 2,
    advice: 'При сложении ax + bx складывай числа-коэффициенты перед буквой, а саму букву x сохраняй.',
  },
  sign_transfer: {
    title: 'Перенос слагаемых через знак «=»',
    codexLawId: 3,
    advice: 'При переносе любого слагаемого через знак равенства обязательно меняй его знак на противоположный.',
  },
  fractions_parts: {
    title: 'Дробные доли и целое',
    codexLawId: 4,
    advice: 'Приводи дроби к общему знаменателю и помни, что целое равно 1 (например, 12/12 x).',
  },
  brackets_distribution: {
    title: 'Раскрытие скобок со знаками',
    codexLawId: 6,
    advice: 'Умножай число перед скобкой на КАЖДОЕ слагаемое внутри и отдельно проверяй знаки (+ и −).',
  },
  arithmetic_check: {
    title: 'Вычислительная точность и проверка',
    codexLawId: 1,
    advice: 'Не торопись со счётом и обязательно подставляй найденный x обратно в исходное уравнение.',
  },
};

export const CODEX_LAWS: CodexLaw[] = [
  {
    id: 1,
    episodeTitle: 'Эпизод 1 · Лес Первых Рун',
    title: 'Икс — это маска неизвестного',
    formula: 'x + a = b  ⇒  x = b − a',
    ruleText:
      'Буква x (икс) — это не страшно. Это просто временная маска для числа, которое пока неизвестно, но связано с другими числами знаком равенства. Чтобы найти неизвестное слагаемое, нужно из суммы вычесть известное слагаемое.',
    summaryShort: 'Обозначение неизвестного и поиск слагаемого',
  },
  {
    id: 2,
    episodeTitle: 'Эпизод 2 · Тоннель Двух Гномов',
    title: 'Закон подобных слагаемых',
    formula: 'ax + bx = (a + b)x',
    ruleText:
      'Слагаемые, имеющие одинаковую буквенную часть, называются подобными. Их можно складывать и вычитать, просто складывая или вычитая числа (коэффициенты) перед буквой: 2x + 3x = 5x.',
    summaryShort: 'Приведение подобных слагаемых',
  },
  {
    id: 3,
    episodeTitle: 'Эпизод 3 · Архив Забытых Историй',
    title: 'Закон изменений («было — стало»)',
    formula: '3x − 16 = x + 22  ⇒  3x − x = 22 + 16',
    ruleText:
      'В задачах типа «было — стало» за x удобнее принимать меньшую начальную величину, затем математически записать все произошедшие изменения и приравнять конечные результаты. При переносе слагаемого через знак «=» его знак всегда меняется на противоположный.',
    summaryShort: 'Меньшее за x и перенос слагаемых',
  },
  {
    id: 4,
    episodeTitle: 'Эпизод 4 · Кристаллические Пещеры',
    title: 'Закон частей и целого',
    formula: '(1/3)x + (1/4)x + 20 = x  ⇒  (5/12)x = 20',
    ruleText:
      'Если в задаче неизвестно Целое, его удобно обозначить за x, а каждую часть выразить в виде дроби от x. Сумма всех частей всегда равна самому Целому (x).',
    summaryShort: 'Дробные доли и восстановление целого',
  },
  {
    id: 5,
    episodeTitle: 'Эпизод 5 · Заводной Город',
    title: 'Закон двойного счёта',
    formula: '5x + 10 = 7x − 4',
    ruleText:
      'Если одну и ту же неизвестную величину можно выразить через x двумя разными способами по условию задачи, то полученные алгебраические выражения можно приравнять друг к другу.',
    summaryShort: 'Два выражения одной величины',
  },
  {
    id: 6,
    episodeTitle: 'Эпизод 6 · Храм Великого Баланса',
    title: 'Закон раскрытия скобок',
    formula: 'a(b + c) = ab + ac,   a(b − c) = ab − ac',
    ruleText:
      'Чтобы раскрыть скобки, перед которыми стоит множитель, необходимо умножить этот множитель на КАЖДОЕ слагаемое внутри скобок, строго следя за знаками.',
    summaryShort: 'Распределительное свойство умножения',
  },
];

export const TEMPLE_PORTAL_COORDS = { x: 31, y: 17 };

export const DISTRICTS: DistrictInfo[] = [
  {
    id: 'ep2_tunnel',
    title: 'Тоннель Двух Гномов',
    subtitle: 'Встречное движение и подобные слагаемые',
    mathTheme: 'ax + bx = c',
    entryNodeId: 'ep2_intro',
    scene: 'tunnel',
    portalCoords: { x: 14, y: 38 },
  },
  {
    id: 'ep3_archive',
    title: 'Архив Забытых Историй',
    subtitle: 'Задачи «было — стало» и перенос слагаемых',
    mathTheme: '3x − 16 = x + 22',
    entryNodeId: 'ep3_intro',
    scene: 'archive',
    portalCoords: { x: 21.5, y: 61 },
  },
  {
    id: 'ep4_crystals',
    title: 'Кристаллические Пещеры',
    subtitle: 'Нахождение целого по его дробным долям',
    mathTheme: '(1/3)x + (1/4)x + 20 = x',
    entryNodeId: 'ep4_intro',
    scene: 'crystals',
    portalCoords: { x: 82, y: 61 },
  },
  {
    id: 'ep5_city',
    title: 'Заводной Город Автоматонов',
    subtitle: 'Два способа выражения одной величины',
    mathTheme: '5x + 10 = 7x − 4',
    entryNodeId: 'ep5_intro',
    scene: 'city',
    portalCoords: { x: 85, y: 37 },
  },
];

export const SECRET_BRANCH_IDS = [
  'secret_attic_engraving',
  'secret_tunnel_blueprint',
  'secret_crystal_resonance',
  'secret_city_ledger',
] as const;

export const EXPLORER_BADGES: ExplorerBadge[] = [
  {
    id: 'first_spark',
    category: 'first_try',
    title: 'Искра точности',
    description: 'Решить первую алгебраическую задачу с первой попытки без единой ошибки.',
    hint: 'Ответь на любое задание в Кодексе с первого раза.',
  },
  {
    id: 'flawless_bridge',
    category: 'first_try',
    title: 'Безупречный мост',
    description: 'Пройти весь Эпизод 1 в Лесу Первых Рун без ошибок на всех этапах и проверке.',
    hint: 'Заверши испытание Старого Моста с первой попытки.',
  },
  {
    id: 'district_ace',
    category: 'first_try',
    title: 'Мастер без осечек',
    description: 'Восстановить любые два района Острова за Перекрёстком полностью без ошибок.',
    hint: 'Пройди два любых района (Тоннель, Архив, Пещеры или Город) с первой попытки.',
  },
  {
    id: 'first_try_virtuoso',
    category: 'first_try',
    title: 'Безошибочный логик',
    description: 'Пройти всю историю от Чердака до победы над Тенью Скобок с 0 ошибок.',
    hint: 'Сохрани 100% точность решений до самого финала.',
  },
  {
    id: 'secret_finder',
    category: 'secrets',
    title: 'Следопыт Острова',
    description: 'Найти первую скрытую ветку диалога и заглянуть глубже обычного маршрута.',
    hint: 'Обращай внимание на осмотр предметов и деталей в начале сцен.',
  },
  {
    id: 'all_secrets_master',
    category: 'secrets',
    title: 'Хранитель всех тайн',
    description: 'Обнаружить все 4 секретные ветки диалогов на Чердаке и в районах Острова.',
    hint: 'Ищи тайные заметки в Прологе, Тоннеле, Кристальных Пещерах и Заводном Городе.',
  },
];
