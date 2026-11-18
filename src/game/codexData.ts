import type {
  CodexLaw,
  DistrictInfo,
  MistakeCategory,
  SceneId,
  SpeakerId,
} from './types';

export const SCENE_IMAGES: Record<SceneId, string> = {
  attic: '/src/assets/images/scene_attic_prologue_1794939454086.jpg',
  forest: '/src/assets/images/scene_forest_bridge_1794939453432.jpg',
  crossroads: '/src/assets/images/scene_crossroads_hub_1794939456911.jpg',
  tunnel: '/src/assets/images/scene_gnome_tunnel_1794939456639.jpg',
  archive: '/src/assets/images/scene_archive_hall_1794939456977.jpg',
  crystals: '/src/assets/images/scene_crystal_cavern_1794939457179.jpg',
  city: '/src/assets/images/scene_clockwork_city_1794939458383.jpg',
  temple: '/src/assets/images/scene_temple_boss_1794939458968.jpg',
};

export const SPEAKER_PORTRAITS: Partial<Record<SpeakerId, string>> = {
  alyosha: '/src/assets/images/portrait_alyosha_1795006462545.jpg',
  pi: '/src/assets/images/portrait_owl_pi_1795006453566.jpg',
  gnome1: '/src/assets/images/portrait_gnome_miner_1795006448686.jpg',
  gnome2: '/src/assets/images/portrait_gnome_miner_1795006448686.jpg',
  archivist: '/src/assets/images/portrait_archivist_1795006449295.jpg',
  guardian: '/src/assets/images/portrait_crystal_guardian_1795006449685.jpg',
  captain: '/src/assets/images/portrait_captain_automaton_1795006450062.jpg',
  shadow: '/src/assets/images/portrait_shadow_brackets_1795006449376.jpg',
};

export const SPEAKER_META: Record<
  SpeakerId,
  { name: string; role: string; accent: string; shortGlyph: string }
> = {
  narrator: { name: 'Повествование', role: 'Хроника Острова', accent: '#94a3b8', shortGlyph: 'X' },
  alyosha: { name: 'Алёша', role: 'Искатель, 5 класс', accent: '#fbbf24', shortGlyph: 'А' },
  pi: { name: 'Сова Пи', role: 'Хранительница логики', accent: '#38bdf8', shortGlyph: 'π' },
  gnome1: { name: 'Гном-рудокоп I', role: 'Бригадир запада', accent: '#f59e0b', shortGlyph: 'I' },
  gnome2: { name: 'Гном-рудокоп II', role: 'Бригадир востока', accent: '#fb923c', shortGlyph: 'II' },
  archivist: { name: 'Хранитель Архива', role: 'Мастер реестра', accent: '#c084fc', shortGlyph: 'Ах' },
  guardian: { name: 'Хранитель Пещер', role: 'Кристальный страж', accent: '#34d399', shortGlyph: 'Кр' },
  captain: { name: 'Капитан Автоматонов', role: 'Глава энергоцеха', accent: '#60a5fa', shortGlyph: 'Ка' },
  shadow: { name: 'Тень Скобок', role: 'Страж Вируса Хаоса', accent: '#f87171', shortGlyph: '( )' },
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

export const TEMPLE_PORTAL_COORDS = { x: 60.5, y: 19.5 };

export const DISTRICTS: DistrictInfo[] = [
  {
    id: 'ep2_tunnel',
    title: 'Тоннель Двух Гномов',
    subtitle: 'Встречное движение и подобные слагаемые',
    mathTheme: 'ax + bx = c',
    entryNodeId: 'ep2_intro',
    scene: 'tunnel',
    portalCoords: { x: 26.5, y: 40.5 },
  },
  {
    id: 'ep3_archive',
    title: 'Архив Забытых Историй',
    subtitle: 'Задачи «было — стало» и перенос слагаемых',
    mathTheme: '3x − 16 = x + 22',
    entryNodeId: 'ep3_intro',
    scene: 'archive',
    portalCoords: { x: 27, y: 58 },
  },
  {
    id: 'ep4_crystals',
    title: 'Кристаллические Пещеры',
    subtitle: 'Нахождение целого по его дробным долям',
    mathTheme: '(1/3)x + (1/4)x + 20 = x',
    entryNodeId: 'ep4_intro',
    scene: 'crystals',
    portalCoords: { x: 64.5, y: 50.5 },
  },
  {
    id: 'ep5_city',
    title: 'Заводной Город Автоматонов',
    subtitle: 'Два способа выражения одной величины',
    mathTheme: '5x + 10 = 7x − 4',
    entryNodeId: 'ep5_intro',
    scene: 'city',
    portalCoords: { x: 74, y: 43.5 },
  },
];
