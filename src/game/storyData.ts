import type { StoryNode } from './types';

export const STORY_NODES: Record<string, StoryNode> = {
  // ==================== ПРОЛОГ ====================
  prologue_1: {
    id: 'prologue_1',
    episodeId: 'prologue',
    episodeTitle: 'Пролог · Тайна школьного чердака',
    scene: 'attic',
    speaker: 'narrator',
    speakerName: 'Хроника',
    emotion: 'neutral',
    schematic: 'compass',
    schematicStep: 1,
    text: [
      'В старом крыле школы, прямо над кабинетом математики, находился чердак, куда ученикам вход был строго воспрещён. Именно туда после уроков заглянул пятиклассник Алёша в поисках закатившегося мяча.',
      'Лучи закатного солнца высвечивали списанные глобусы, плакаты и сломанные счёты. В углу на дубовом сундуке лежала старинная латунная шкатулка, а внутри — удивительный компас: вместо стрелки в центре парила светящаяся буква X.',
    ],
    choices: [
      {
        id: 'touch_x',
        label: 'Коснуться светящейся буквы X на компасе',
        nextNodeId: 'prologue_2',
        isCorrect: true,
      },
      {
        id: 'inspect_chest',
        label: 'Сначала осмотреть гравировку на крышке шкатулки',
        nextNodeId: 'prologue_secret_engraving',
        isCorrect: true,
        secretId: 'secret_attic_engraving',
        recordDecision: { ep6FinalStance: 'precision' },
      },
    ],
  },

  prologue_secret_engraving: {
    id: 'prologue_secret_engraving',
    episodeId: 'prologue',
    episodeTitle: 'Тайна чердака · Секретная заметка',
    mathTopic: 'Происхождение Кодекса',
    scene: 'attic',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'surprised',
    isSecretNode: true,
    schematic: 'compass',
    schematicStep: 1,
    text: [
      'Под слоем пыли на внутренней стороне крышки проступила тонкая гравировка: «Неизвестное прячется лишь до тех пор, пока ты не дашь ему имя x и не уравновесишь обе стороны».',
      'Алёша запомнил это правило, прежде чем прикоснуться к компасу.',
    ],
    choices: [
      {
        id: 'secret_attic_continue',
        label: 'Коснуться светящейся буквы X',
        nextNodeId: 'prologue_2',
        isCorrect: true,
      },
    ],
  },

  prologue_2: {
    id: 'prologue_2',
    episodeId: 'prologue',
    episodeTitle: 'Пролог · Тайна школьного чердака',
    scene: 'attic',
    speaker: 'narrator',
    speakerName: 'Хроника',
    emotion: 'surprised',
    schematic: 'compass',
    schematicStep: 2,
    text: [
      'Едва пальцы мальчика коснулись холодного металла, буква ослепительно вспыхнула. Пространство вокруг закружилось в вихре золотых искр, и Алёша оказался на каменистом утёсе посреди удивительного Острова Неизвестных.',
      'Когда-то этот живой механизм работал по Законам Равновесия, но теперь мосты зависли, тоннели обрушились, а в центре острова тревожно гудел перегревающийся Главный Двигатель.',
    ],
    choices: [
      {
        id: 'meet_pi',
        label: 'Оглянуться на мерцающее голубое облачко рядом',
        nextNodeId: 'prologue_3',
        isCorrect: true,
      },
    ],
  },

  prologue_3: {
    id: 'prologue_3',
    episodeId: 'prologue',
    episodeTitle: 'Пролог · Хранительница логики Пи',
    scene: 'crossroads',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'surprised',
    schematic: 'compass',
    schematicStep: 3,
    text: [
      '«Приветствую тебя, Искатель! Моё имя Пи. Я хранительница логики этого мира. Наш остров атаковал Вирус Хаоса — он перепутал числа, спрятал неизвестные величины и стёр знаки равенства».',
      '«Чтобы вернуться домой через портал в Храме Великого Баланса, тебе предстоит пройти шесть испытаний и научиться переводить истории реального мира на язык алгебры — составлять уравнения. Компас стал твоим Кодексом Равновесия. Ты готов?»',
    ],
    choices: [
      {
        id: 'open_codex_start',
        label: 'Открыть Кодекс и начать путь',
        nextNodeId: 'ep1_intro',
        isCorrect: true,
      },
    ],
  },

  // ==================== ЭПИЗОД 1 ====================
  ep1_intro: {
    id: 'ep1_intro',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 · Лес Первых Рун и Река Забвения',
    mathTopic: 'Уравнения вида x + a = b · Неизвестное слагаемое',
    scene: 'forest',
    speaker: 'narrator',
    speakerName: 'Задача Старого Моста',
    emotion: 'curious',
    schematic: 'scales_ep1',
    schematicStep: 1,
    text: [
      'Тропинка вывела Алёшу к бурлящей Реке Забвения. Массивный каменный мост поднят вверх, а у воды стоят бронзовые весы с каменной скрижалью: «Мост опустится, когда весы узнают скрытое число».',
      'Условие задачи: На левой чаше весов лежит запечатанный холщовый мешок с камнями и ещё 25 таких же камней россыпью. На правой чаше лежит ровно 78 камней. Весы в равновесии. Сколько камней спрятано в мешке?',
    ],
    choices: [
      {
        id: 'try_guess',
        label: 'Попробовать угадать на глаз: «Наверное, около сорока пяти!»',
        nextNodeId: 'ep1_step1_x',
        isCorrect: false,
        mistakeCategory: 'unknown_designation',
        hintTier1:
          'Остановись! Код моста блокируется от случайного перебора. Не угадывай — обозначь неизвестное буквой x и составь уравнение!',
        hintTier2:
          'Остановись! Код моста блокируется от случайного перебора. Не угадывай — обозначь неизвестное буквой x и составь уравнение!',
        feedbackSpeaker: 'pi',
        integrityDelta: -5,
        recordDecision: { ep1TriedGuessing: true },
      },
      {
        id: 'ask_pi_rule',
        label: 'Не гадать наугад, а обозначить неизвестное с помощью Кодекса',
        nextNodeId: 'ep1_step1_x',
        isCorrect: true,
        recordDecision: { ep1TriedGuessing: false },
      },
    ],
  },

  ep1_step1_x: {
    id: 'ep1_step1_x',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 · Обозначение неизвестного',
    mathTopic: 'Уравнения вида x + a = b',
    scene: 'forest',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'encourage',
    schematic: 'scales_ep1',
    schematicStep: 1,
    text: [
      '«Отлично! Первый шаг к решению любой алгебраической задачи — правильно выбрать, что именно мы примем за неизвестное x».',
      'Что в задаче Старого Моста является неизвестной величиной, которую мы обозначим буквой x?',
    ],
    choices: [
      {
        id: 'ep1_wrong_total',
        label: 'Общий вес всех камней на мосту',
        isCorrect: false,
        mistakeCategory: 'unknown_designation',
        hintTier1:
          'Подумай: нужно ли нам знать весь вес камней на мосту? Перечитай последний вопрос в условии задачи.',
        hintTier2:
          'Нет, нам не нужно знать общий вес. В вопросе прямо сказано: «Сколько камней спрятано в мешке?» Именно это количество мы и принимаем за x.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep1_right_sack',
        label: 'Количество камней в запечатанном мешке',
        nextNodeId: 'ep1_step2_expr',
        isCorrect: true,
      },
    ],
  },

  ep1_step2_expr: {
    id: 'ep1_step2_expr',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 · Составление уравнения',
    mathTopic: 'Перевод условия в выражение',
    scene: 'forest',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'scales_ep1',
    schematicStep: 2,
    formulaDisplay: '[ ? ] = 78',
    text: [
      '«Итак, пусть в мешке лежит x камней. На правой чаше лежит ровно 78 камней, и чаши уравновешены».',
      'Какое выражение описывает общее количество камней на ЛЕВОЙ чаше весов (мешок и ещё 25 камней россыпью)?',
    ],
    choices: [
      {
        id: 'ep1_expr_mul',
        label: '25x',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Обрати внимание на смысл фразы «и ещё 25 камней». Это умножение 25 мешков или добавление 25 камней?',
        hintTier2:
          'Запись 25x означает умножение (25 мешков по x камней). Когда к одному мешку x добавляют 25 камней россыпью, используется сложение.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep1_expr_sub',
        label: 'x − 25',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Посмотри на левую чашу: 25 камней убрали из мешка или добавили рядом с ним?',
        hintTier2:
          'Знак минус уменьшает величину. У нас к мешку добавлены 25 камней россыпью, значит нужно действие сложения.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep1_expr_add',
        label: 'x + 25',
        nextNodeId: 'ep1_step3_solve',
        isCorrect: true,
      },
    ],
  },

  ep1_step3_solve: {
    id: 'ep1_step3_solve',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 · Решение уравнения',
    mathTopic: 'x + 25 = 78',
    scene: 'forest',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'thoughtful',
    schematic: 'scales_ep1',
    schematicStep: 3,
    formulaDisplay: 'x + 25 = 78',
    text: [
      '«Уравнение готово: x + 25 = 78. Попробуй сначала на интерактивных весах слева снять 25 камней с обеих чаш — равновесие сохранится!»',
      'Вычисли, сколько камней спрятано в мешке, и введи ответ на каменном циферблате весов!',
    ],
    numericTask: {
      prompt: 'Чему равен x в уравнении x + 25 = 78?',
      unit: 'камней',
      placeholder: 'Введи число',
      correctValue: 53,
      nextNodeId: 'ep1_verify',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (val, attempt) => {
        if (val === 103) {
          if (attempt === 1) {
            return {
              feedback:
                'Наводящий вопрос: вся правая чаша весит 78 камней. Может ли один мешок на левой чаше весить 103 камня? Попробуй на весах слева убрать 25 камней с обеих чаш.',
              speaker: 'pi',
              integrityDelta: -10,
              category: 'sign_transfer',
            };
          }
          return {
            feedback:
              'Ты сложил сумму 78 и слагаемое 25! Правило Кодекса: чтобы найти неизвестное слагаемое, нужно ИЗ суммы ВЫЧЕСТЬ известное слагаемое (x = 78 − 25).',
            speaker: 'pi',
            integrityDelta: -10,
            category: 'sign_transfer',
          };
        }
        if (attempt === 1) {
          return {
            feedback:
              'Ход мыслей верный! Но проверь вычитание ещё раз: сколько будет, если из 78 вычесть 25 по разрядам (десятки и единицы)?',
            speaker: 'pi',
            integrityDelta: -10,
            category: 'arithmetic_check',
          };
        }
        return {
          feedback:
            'Вычти по разрядам: сначала десятки (70 − 20), затем единицы (8 − 5), а потом сложи полученные числа.',
          speaker: 'pi',
          integrityDelta: -10,
          category: 'arithmetic_check',
        };
      },
    },
  },

  ep1_verify: {
    id: 'ep1_verify',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 · Самопроверка подстановкой',
    mathTopic: 'Подстановка найденного корня',
    scene: 'forest',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'triumph',
    schematic: 'scales_ep1',
    schematicStep: 3,
    formulaDisplay: 'x = 53  →  53 + 25 = ?',
    text: [
      '«Я получил x = 53. Но давай перед запуском моста проверим ответ подстановкой, как настоящий мастер!»',
    ],
    verificationTask: {
      title: 'Самопроверка подстановкой',
      prompt: 'Подставь найденное число 53 вместо x в левую часть (x + 25) и убедись, что чаши равны:',
      fields: [
        {
          id: 'left',
          label: 'Левая чаша (53 + 25)',
          prefix: '53 + 25 =',
          correctValue: 78,
          placeholder: '?',
        },
      ],
      expectedSummary: 'Левая чаша = 78, Правая чаша = 78',
      nextNodeId: 'ep1_outro',
      unlockLaw: 1,
      hintTier1: 'Сложи 53 и 25: результат должен совпасть с количеством камней на правой чаше весов.',
      hintTier2: 'Складывай по разрядам: десятки (50 + 20) и единицы (3 + 5), затем объедини результат и сравни с правой чашей.',
    },
  },

  ep1_outro: {
    id: 'ep1_outro',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 пройден · Мост опущен',
    scene: 'forest',
    speaker: 'narrator',
    speakerName: 'Хроника',
    emotion: 'triumph',
    schematic: 'scales_ep1',
    schematicStep: 4,
    formulaDisplay: 'x = 78 − 25 = 53',
    text: [
      'Проверка сошлась (78 = 78)! Чаши весов вспыхивают изумрудным пламенем, руны на опорах оживают, и тяжёлый мост плавно опускается над Рекой Забвения.',
      'В Кодексе Равновесия зажглась Запись №1: «Буква x — это просто временная маска для числа, которое пока неизвестно, но связано с другими числами знаком равенства».',
    ],
    choices: [
      {
        id: 'go_crossroads',
        label: 'Перейти мост и выйти на Перекрёсток Четырёх Стихий',
        nextNodeId: 'crossroads_hub',
        isCorrect: true,
      },
    ],
  },

  // ==================== ПЕРЕКРЁСТОК ====================
  crossroads_hub: {
    id: 'crossroads_hub',
    episodeId: 'crossroads',
    episodeTitle: 'Перекрёсток Четырёх Стихий',
    mathTopic: 'Нелинейный выбор маршрута',
    scene: 'crossroads',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'curious',
    schematic: 'crossroads_map',
    isCrossroadsHub: true,
    text: [
      'Перейдя реку, Алёша оказался на круглой площади перед горой. На вершине сиял Храм Великого Баланса, но путь туда преграждали четыре энергетических щита.',
      '«Чтобы отключить защитный купол Храма, нужно восстановить работу всех четырёх районов острова. Выбирай любой путь — порядок испытаний зависит только от тебя!»',
    ],
  },

  // ==================== ЭПИЗОД 2 ====================
  ep2_intro: {
    id: 'ep2_intro',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Тоннель Двух Гномов',
    mathTopic: 'Приведение подобных слагаемых (ax + bx = c)',
    scene: 'tunnel',
    speaker: 'gnome1',
    speakerName: 'Гном-рудокоп I',
    emotion: 'alert',
    schematic: 'tunnel_ep2',
    schematicStep: 1,
    text: [
      '«Вирус Хаоса стёр наш рабочий график! Мы должны пробить заваленный тоннель длиной 120 метров с двух противоположных концов навстречу друг другу».',
      '«Я прокапываю 2 метра породы за один час, а мой напарник с другого конца — 3 метра за час. Мы начинаем одновременно. Через сколько часов мы встретимся?»',
    ],
    choices: [
      {
        id: 'ep2_start_plan',
        label: 'Обозначить время до встречи через x и составить схему пути',
        nextNodeId: 'ep2_step1_gnome1',
        isCorrect: true,
      },
      {
        id: 'ep2_inspect_blueprint',
        label: 'Осмотреть старинный маркшейдерский чертёж на стене тоннеля',
        nextNodeId: 'ep2_secret_blueprint',
        isCorrect: true,
        secretId: 'secret_tunnel_blueprint',
      },
    ],
  },

  ep2_secret_blueprint: {
    id: 'ep2_secret_blueprint',
    episodeId: 'ep2',
    episodeTitle: 'Тоннель · Секретный чертёж',
    mathTopic: 'Заметка мастеров',
    scene: 'tunnel',
    speaker: 'gnome1',
    speakerName: 'Гном-рудокоп I',
    emotion: 'surprised',
    isSecretNode: true,
    schematic: 'tunnel_ep2',
    schematicStep: 1,
    text: [
      '«Ого, ты заметил старый чертёж проходки! Прежние бригадиры оставили там подсказку: при встречном движении скорости складываются, а время работы у обеих бригад одно и то же — x».',
    ],
    choices: [
      {
        id: 'ep2_secret_back',
        label: 'Вернуться к задаче гномов',
        nextNodeId: 'ep2_intro',
        isCorrect: true,
      },
    ],
  },

  ep2_step1_gnome1: {
    id: 'ep2_step1_gnome1',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Сборка модели движения',
    mathTopic: 'Путь S = v · t и уравнение встречи',
    scene: 'tunnel',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'thoughtful',
    schematic: 'tunnel_ep2',
    schematicStep: 1,
    text: [
      '«Пусть гномы работают до встречи x часов. Собери математическую модель сам: вырази путь каждого гнома и составь уравнение для всего тоннеля длиной 120 м».',
    ],
    tableTask: {
      prompt: 'Выбери верные выражения для пути обоих гномов и итогового уравнения:',
      nextNodeId: 'ep2_step2_gnome2',
      rows: [
        {
          id: 'gnome1_path',
          label: 'Путь первого гнома за x часов (скорость 2 м/ч)',
          options: ['2 + x', '2x', 'x − 2'],
          correctOption: '2x',
          hintTier1:
            'Проверь на модели слева: за 1 час гном проходит 2 м, за 2 часа — 4 м. Какое действие связывает скорость и время?',
          hintTier2:
            'По формуле S = v · t путь равен произведению скорости на время. Для скорости 2 и времени x это произведение 2 и x.',
        },
        {
          id: 'gnome2_path',
          label: 'Путь второго гнома за x часов (скорость 3 м/ч)',
          options: ['3 + x', '3x', '3 : x'],
          correctOption: '3x',
          hintTier1:
            'Второй гном проходит 3 метра КАЖДЫЙ час. Как записать его путь за x часов?',
          hintTier2:
            'Как и для первого гнома, умножаем скорость (3 м/ч) на время (x ч).',
        },
        {
          id: 'tunnel_equation',
          label: 'Уравнение встречи (вместе прокопали 120 м)',
          options: ['2x + 3x = 120', '3x − 2x = 120', '2x · 3x = 120'],
          correctOption: '2x + 3x = 120',
          hintTier1:
            'Гномы идут навстречу друг другу с разных концов тоннеля. Их пути складываются, вычитаются или перемножаются?',
          hintTier2:
            'В момент встречи сумма пройденных ими отрезков составляет всю длину тоннеля — 120 метров.',
        },
      ],
    },
  },

  ep2_step2_gnome2: {
    id: 'ep2_step2_gnome2',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Приведение подобных слагаемых',
    mathTopic: 'Упрощение уравнения 2x + 3x = 120',
    scene: 'tunnel',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'tunnel_ep2',
    schematicStep: 2,
    formulaDisplay: '2x + 3x = 120',
    text: [
      '«Модель собрана: 2x + 3x = 120! Теперь нужно упростить левую часть».',
      'Как правильно привести подобные слагаемые в выражении 2x + 3x?',
    ],
    choices: [
      {
        id: 'ep2_simp_6x',
        label: '6x',
        isCorrect: false,
        mistakeCategory: 'like_terms',
        hintTier1:
          'Обрати внимание на знак между 2x и 3x! Представь, что x — это ящик породы: сколько будет 2 ящика ПЛЮС 3 ящика?',
        hintTier2:
          'Ты перемножил коэффициенты 2 и 3 вместо сложения! При приведении подобных слагаемых коэффициенты складываются: (2 + 3)x.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep2_simp_5',
        label: '5',
        isCorrect: false,
        mistakeCategory: 'like_terms',
        hintTier1:
          'Ты верно сложил 2 и 3, но куда же исчезла буква x? Ведь 5 метров — это путь за 1 час, а нам нужно выражение за x часов.',
        hintTier2:
          'Без неизвестного x мы потеряем время! Складывай коэффициенты перед буквой, а саму букву x обязательно сохраняй рядом.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep2_simp_5x',
        label: '5x',
        nextNodeId: 'ep2_step4_solve',
        isCorrect: true,
      },
    ],
  },

  ep2_step4_solve: {
    id: 'ep2_step4_solve',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Час встречи',
    mathTopic: 'Решение уравнения 5x = 120',
    scene: 'tunnel',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'encourage',
    schematic: 'tunnel_ep2',
    schematicStep: 3,
    formulaDisplay: '5x = 120',
    text: [
      '«Верно! За каждый час гномы сближаются на 5 метров».',
      'Реши уравнение 5x = 120 и введи, через сколько часов они встретятся (гипотезу можно проверить на симуляторе слева).',
    ],
    numericTask: {
      prompt: 'Чему равен x в уравнении 5x = 120?',
      unit: 'часов',
      placeholder: 'Введи число',
      correctValue: 24,
      nextNodeId: 'ep2_verify',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (val, attempt) => {
        if (val === 600) {
          if (attempt === 1) {
            return {
              feedback:
                'Остановись! Может ли 5 · 600 равняться 120? Подумай, какое действие нужно выполнить, чтобы найти неизвестный множитель.',
              speaker: 'pi',
              integrityDelta: -10,
              category: 'expression_translation',
            };
          }
          return {
            feedback:
              'Чтобы найти неизвестный множитель x в уравнении 5x = 120, нужно произведение 120 РАЗДЕЛИТЬ на известный множитель 5.',
            speaker: 'pi',
            integrityDelta: -10,
            category: 'expression_translation',
          };
        }
        if (attempt === 1) {
          return {
            feedback:
              'Проверь деление 120 : 5. Подсказка: разбей 120 на удобные слагаемые 100 и 20 и раздели каждое на 5.',
            speaker: 'pi',
            integrityDelta: -10,
            category: 'arithmetic_check',
          };
        }
        return {
          feedback:
            'Правило деления суммы: раздели отдельно 100 : 5 и отдельно 20 : 5, а затем сложи два получившихся частных.',
          speaker: 'pi',
          integrityDelta: -10,
          category: 'arithmetic_check',
        };
      },
    },
  },

  ep2_verify: {
    id: 'ep2_verify',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Проверка пути подстановкой',
    mathTopic: 'Подстановка x = 24 в условие',
    scene: 'tunnel',
    speaker: 'gnome1',
    speakerName: 'Гном-рудокоп I',
    emotion: 'surprised',
    schematic: 'tunnel_ep2',
    schematicStep: 4,
    formulaDisplay: 'x = 24 ч',
    text: [
      '«24 часа! Давай проверим подстановкой, сколько метров пройдёт каждый из нас за эти 24 часа, чтобы в сумме вышли ровно 120 метров!»',
    ],
    verificationTask: {
      title: 'Проверка пути обоих гномов',
      prompt: 'Вычисли путь каждого гнома при x = 24:',
      fields: [
        {
          id: 'g1',
          label: 'Путь первого гнома (2 · 24)',
          prefix: '2 · 24 =',
          suffix: 'м',
          correctValue: 48,
          placeholder: '?',
        },
        {
          id: 'g2',
          label: 'Путь второго гнома (3 · 24)',
          prefix: '3 · 24 =',
          suffix: 'м',
          correctValue: 72,
          placeholder: '?',
        },
      ],
      expectedSummary: '48 + 72 = 120 м — гномы встретились ровно в точке стыковки!',
      nextNodeId: 'ep2_outro',
      unlockLaw: 2,
      completeDistrict: 'ep2_tunnel',
      hintTier1:
        'Умножь скорости 2 и 3 на найденное время 24 часа. Сумма двух чисел должна дать 120 метров.',
      hintTier2:
        'Разбей 24 на 20 и 4: сначала вычисли 2 · 20 + 2 · 4 для первого гнома, затем 3 · 20 + 3 · 4 для второго и проверь, что их сумма равна 120.',
    },
  },

  ep2_outro: {
    id: 'ep2_outro',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 пройден · Тоннель открыт',
    scene: 'tunnel',
    speaker: 'gnome2',
    speakerName: 'Гном-рудокоп II',
    emotion: 'triumph',
    schematic: 'tunnel_ep2',
    schematicStep: 4,
    formulaDisplay: '48 + 72 = 120 м',
    text: [
      'Свод тоннеля озаряется тёплым золотым светом, каменный завал рассыпается, и оба гнома радостно салютуют кирками!',
      'В Кодексе Равновесия вспыхнула Запись №2: «Слагаемые, имеющие одинаковую буквенную часть, называются подобными. Их можно складывать и вычитать, работая с коэффициентами перед буквой».',
    ],
    choices: [
      {
        id: 'ep2_back',
        label: 'Вернуться на Перекрёсток Четырёх Стихий',
        nextNodeId: 'crossroads_hub',
        isCorrect: true,
      },
    ],
  },

  // ==================== ЭПИЗОД 3 ====================
  ep3_intro: {
    id: 'ep3_intro',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Архив Забытых Историй',
    mathTopic: 'Задачи «было — стало» · Выбор модели',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
    emotion: 'alert',
    schematic: 'archive_table_ep3',
    schematicStep: 1,
    text: [
      'Под сводами подземного Архива кружились сотни бумажных свитков. Седобородый старец вздохнул: «Вирус Хаоса нарушил симметрию хранилища!»',
      'Задача: Изначально на первой полке стояло в 3 раза больше свитков, чем на второй. Когда с первой полки сняли 16 свитков, а на вторую добавили 22 свитка, свитков стало поровну. Сколько свитков стояло на каждой полке первоначально?',
    ],
    choices: [
      {
        id: 'ep3_choose_first',
        label: 'Принять за x первую полку (ту, где больше свитков)',
        nextNodeId: 'ep3_alt_compare',
        isCorrect: true,
        recordDecision: {
          ep3TriedFirstShelfAsX: true,
          ep3ChosenModel: 'first_shelf',
        },
      },
      {
        id: 'ep3_choose_second',
        label: 'Принять за x вторую полку (ту, где меньше свитков)',
        nextNodeId: 'ep3_step2_table',
        isCorrect: true,
        recordDecision: { ep3ChosenModel: 'second_shelf' },
      },
    ],
  },

  ep3_alt_compare: {
    id: 'ep3_alt_compare',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Сравнение двух верных моделей',
    mathTopic: 'Обе модели математически верны',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'encourage',
    schematic: 'archive_table_ep3',
    schematicStep: 1,
    text: [
      '«Математически это совершенно верный выбор! Любую из неизвестных полок можно обозначить за x — обе модели приведут к одному и тому же ответу».',
      '«Посмотри на разницу в записи: если первая полка — это x, то вторая будет x/3 (появится дробь). Если же обозначить за x вторую полку, то первая — просто 3x (без дробей). Каким способом хочешь решить эту задачу?»',
    ],
    choices: [
      {
        id: 'ep3_alt_proceed',
        label: 'Решить через первую полку за x (с дробью x/3)',
        nextNodeId: 'ep3_alt_table',
        isCorrect: true,
        recordDecision: { ep3ChosenModel: 'first_shelf' },
      },
      {
        id: 'ep3_alt_switch',
        label: 'Перейти к модели без дробей (вторая полка = x)',
        nextNodeId: 'ep3_step2_table',
        isCorrect: true,
        recordDecision: { ep3ChosenModel: 'second_shelf' },
      },
    ],
  },

  ep3_alt_table: {
    id: 'ep3_alt_table',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Таблица «Было — Стало» (1-я полка = x)',
    mathTopic: 'Составление дробной модели',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'curious',
    schematic: 'archive_table_ep3',
    schematicStep: 2,
    text: [
      '«Смелый выбор! Пусть на первой полке изначально было x свитков».',
      'Заполни ячейки реестра «Было — Стало» для этой модели, чтобы получить уравнение!',
    ],
    tableTask: {
      prompt: 'Выбери верные выражения, если за x принята ПЕРВАЯ полка:',
      nextNodeId: 'ep3_alt_transfer',
      rows: [
        {
          id: 'alt_shelf2_before',
          label: 'Вторая полка БЫЛО (в 3 раза меньше, чем x)',
          options: ['x − 3', 'x/3', '3x'],
          correctOption: 'x/3',
          hintTier1:
            'На первой полке в 3 раза больше, значит на второй — в 3 раза МЕНЬШЕ. Какое действие отвечает за «в 3 раза меньше»?',
          hintTier2:
            '«В 3 раза меньше» записывается делением на 3, то есть в виде дроби x/3.',
        },
        {
          id: 'alt_shelf1_after',
          label: 'Первая полка СТАЛО (сняли 16 свитков)',
          options: ['x − 16', 'x + 16', '16 − x'],
          correctOption: 'x − 16',
          hintTier1:
            'На первой полке было x свитков, и 16 сняли. Что из чего нужно вычитать?',
          hintTier2:
            'Уменьшение на 16 записывается вычитанием из начального количества x.',
        },
        {
          id: 'alt_shelf2_after',
          label: 'Вторая полка СТАЛО (добавили 22 свитка)',
          options: ['x/3 − 22', 'x/3 + 22', '22x/3'],
          correctOption: 'x/3 + 22',
          hintTier1:
            'На вторую полку к x/3 свиткам добавили ещё 22 свитка. Какой знак связывает эти части?',
          hintTier2:
            'Добавление 22 свитков записывается знаком сложения рядом с x/3.',
        },
      ],
    },
  },

  ep3_alt_transfer: {
    id: 'ep3_alt_transfer',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Перенос слагаемых (дробная модель)',
    mathTopic: 'Перенос слагаемых через знак «=»',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'alert',
    schematic: 'archive_table_ep3',
    schematicStep: 3,
    formulaDisplay: 'x − 16 = x/3 + 22',
    text: [
      '«Свитков стало поровну, значит x − 16 = x/3 + 22. Перенеси слагаемые с x влево, а числа вправо, не забывая менять знак при переходе через «=»!»',
    ],
    choices: [
      {
        id: 'ep3_alt_tr_wrong1',
        label: 'x + x/3 = 22 − 16',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Проверь знаки перенесённых слагаемых: справа стояло +x/3, слева −16. Поменялись ли они на противоположные?',
        hintTier2:
          'При переносе через «=» положительное +x/3 становится −x/3, а отрицательное −16 становится +16.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep3_alt_tr_wrong2',
        label: 'x − x/3 = 22 − 16',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Слагаемое x/3 перенесено верно! А проверь знак числа 16 после переноса в правую часть.',
        hintTier2:
          'Слева было −16. При переходе через знак равенства минус меняется на плюс.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep3_alt_tr_ok',
        label: 'x − x/3 = 22 + 16',
        nextNodeId: 'ep3_alt_scratchpad',
        isCorrect: true,
      },
    ],
  },

  ep3_alt_scratchpad: {
    id: 'ep3_alt_scratchpad',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Черновик дробной модели',
    mathTopic: 'Упрощение x − x/3 = 22 + 16',
    scene: 'archive',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'archive_table_ep3',
    schematicStep: 4,
    formulaDisplay: 'x − x/3 = 22 + 16',
    text: [
      '«Представим целый x как 3/3 x и упростим обе стороны уравнения в черновике!»',
    ],
    scratchpadTask: {
      title: 'Черновик уравнения с дробью',
      equationContext: 'Упрости левую и правую части равенства (3/3)x − (1/3)x = 22 + 16:',
      fields: [
        {
          id: 'num',
          label: 'Числитель третей слева (3/3 − 1/3)',
          suffix: '/3 x',
          correctValue: 2,
          placeholder: '?',
          mistakeCategory: 'fractions_parts',
          hintTier1:
            'Из целого (3 трети) вычитаем 1 треть. Сколько третей останется?',
          hintTier2:
            'При вычитании дробей с одинаковым знаменателем вычитаются числители: 3 − 1, знаменатель 3 сохраняется.',
        },
        {
          id: 'rhs',
          label: 'Сумма справа (22 + 16)',
          prefix: '=',
          correctValue: 38,
          placeholder: '?',
          mistakeCategory: 'arithmetic_check',
          hintTier1: 'Проверь сложение в правой части: 22 + 16.',
          hintTier2: 'Сложи по разрядам: десятки (20 + 10) и единицы (2 + 6).',
        },
      ],
      nextNodeId: 'ep3_alt_dual_solve',
      mistakeCategory: 'fractions_parts',
      hintTier1: 'Из 3/3 x вычти 1/3 x, а справа сложи 22 и 16.',
      hintTier2: 'Вычти числители 3 − 1 слева и сложи 22 + 16 по разрядам справа.',
    },
  },

  ep3_alt_dual_solve: {
    id: 'ep3_alt_dual_solve',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Полный ответ реестра',
    mathTopic: 'Решение (2/3)x = 38',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
    emotion: 'thoughtful',
    schematic: 'archive_table_ep3',
    schematicStep: 4,
    formulaDisplay: '(2/3)x = 38',
    text: [
      '«Отлично: две трети первой полки равны 38 свиткам! Значит, сначала легко найти одну треть (вторую полку), а затем и всю первую полку x».',
      'Впиши начальное количество свитков на КАЖДОЙ полке!',
    ],
    dualNumericTask: {
      prompt: 'Впиши начальное число свитков для обеих полок:',
      firstLabel: 'Первая полка (это x)',
      secondLabel: 'Вторая полка (это x/3)',
      firstCorrect: 57,
      secondCorrect: 19,
      nextNodeId: 'ep3_verify',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (first, second, attempt) => {
        if (first === 19 && second !== 19) {
          return {
            feedback:
              attempt === 1
                ? 'Внимание: 38 : 2 — это ОДНА треть (вторая полка), а первая полка в 3 раза больше!'
                : 'Ты нашёл x/3 (вторую полку), разделив 38 на 2. Чтобы получить первую полку x, умножь это число на 3.',
            speaker: 'archivist',
            category: 'unknown_designation',
          };
        }
        if (second === 19 && first !== 57) {
          return {
            feedback:
              attempt === 1
                ? 'Вторая полка (x/3 = 19) найдена верно! А первая полка состоит из 3 таких долей — пересчитай 19 · 3.'
                : 'Умножь 19 на 3 по частям: 10 · 3 и 9 · 3, затем сложи два произведения.',
            speaker: 'archivist',
            category: 'arithmetic_check',
          };
        }
        return {
          feedback:
            attempt === 1
              ? 'Раз 2 трети равны 38, сначала раздели 38 на 2 (найдёшь вторую полку x/3), а потом умножь результат на 3 (найдёшь первую полку x).'
              : 'Шаг 1: найди 38 : 2 — это вторая полка. Шаг 2: умножь полученное число на 3 — это первая полка.',
          speaker: 'pi',
          category: 'arithmetic_check',
        };
      },
    },
  },

  ep3_step2_table: {
    id: 'ep3_step2_table',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Таблица «Было — Стало»',
    mathTopic: 'Составление математической модели',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'curious',
    schematic: 'archive_table_ep3',
    schematicStep: 2,
    text: [
      '«Отличный выбор — запись обойдётся без дробей! Пусть на второй полке изначально было x свитков».',
      'Заполни ячейки реестра «Было — Стало», чтобы перевести изменения на язык алгебры и составить уравнение!',
    ],
    tableTask: {
      prompt: 'Выбери верные алгебраические выражения для каждой строки реестра:',
      nextNodeId: 'ep3_step3_transfer',
      rows: [
        {
          id: 'shelf1_before',
          label: 'Первая полка БЫЛО (в 3 раза больше, чем x)',
          options: ['x + 3', '3x', 'x − 3'],
          correctOption: '3x',
          hintTier1: 'Обрати внимание на предлог: «В 3 раза больше», а не «НА 3 больше». Какое это действие?',
          hintTier2: 'Фраза «в 3 раза больше» всегда означает умножение величины x на 3.',
        },
        {
          id: 'shelf1_after',
          label: 'Первая полка СТАЛО (сняли 16 свитков)',
          options: ['3x − 16', '3x + 16', '16 − 3x'],
          correctOption: '3x − 16',
          hintTier1: 'На первой полке было 3x свитков. Из них забрали 16 — что из чего нужно вычитать?',
          hintTier2: 'Если со 1-й полки сняли 16 свитков, нужно вычесть 16 из исходного количества 3x.',
        },
        {
          id: 'shelf2_after',
          label: 'Вторая полка СТАЛО (добавили 22 свитка)',
          options: ['x − 22', '22x', 'x + 22'],
          correctOption: 'x + 22',
          hintTier1: 'На вторую полку к x свиткам поставили ещё 22 свитка. Какой знак поставим?',
          hintTier2: 'Добавление 22 свитков записывается сложением: к x прибавляем 22.',
        },
      ],
    },
  },

  ep3_step3_transfer: {
    id: 'ep3_step3_transfer',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Перенос слагаемых',
    mathTopic: 'Перенос слагаемых через знак «=»',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'alert',
    schematic: 'archive_table_ep3',
    schematicStep: 3,
    formulaDisplay: '3x − 16 = x + 22',
    text: [
      '«Свитков стало поровну, значит 3x − 16 = x + 22. Помни закон Архива: при переносе слагаемого через знак «=» его знак ВСЕГДА меняется на противоположный!»',
      'Выбери верную строчку после переноса всех x влево, а обычных чисел вправо:',
    ],
    choices: [
      {
        id: 'ep3_tr_wrong1',
        label: '3x + x = 22 − 16',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Посмотри на знаки перенесённых слагаемых: справа стоял +x, слева −16. Поменялись ли их знаки при переходе через знак «=»?',
        hintTier2:
          'Знаки поменялись ровно наоборот! Положительный +x при переносе влево становится −x, а отрицательное −16 при переносе вправо превращается в +16.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep3_tr_wrong2',
        label: '3x − x = 22 − 16',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Левая часть (3x − x) перенесена верно! А вот проверь правую часть: какой знак был у числа 16 слева?',
        hintTier2:
          'Ты забыл поменять знак при переносе числа −16 в правую часть! При переходе через «=» минус становится плюсом.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep3_tr_ok',
        label: '3x − x = 22 + 16',
        nextNodeId: 'ep3_step3b_scratchpad',
        isCorrect: true,
      },
    ],
  },

  ep3_step3b_scratchpad: {
    id: 'ep3_step3b_scratchpad',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Черновик решения',
    mathTopic: 'Приведение подобных слагаемых',
    scene: 'archive',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'encourage',
    schematic: 'archive_table_ep3',
    schematicStep: 4,
    formulaDisplay: '3x − x = 22 + 16',
    text: [
      '«Отлично! Теперь приведём подобные слагаемые в черновике перед тем, как находить ответ».',
    ],
    scratchpadTask: {
      title: 'Пошаговый черновик уравнения',
      equationContext: 'Упрости левую и правую части уравнения 3x − x = 22 + 16:',
      fields: [
        {
          id: 'coef',
          label: 'Коэффициент при x (3x − 1x)',
          suffix: 'x',
          correctValue: 2,
          placeholder: '?',
          mistakeCategory: 'like_terms',
          hintTier1:
            'Вспомни: перед одиночным x стоит невидимый коэффициент 1 (3x − 1x). Вычти коэффициенты.',
          hintTier2:
            'Вычитаем коэффициенты при одинаковой букве: 3 − 1. Получившееся число запиши перед x.',
        },
        {
          id: 'rhs',
          label: 'Сумма справа (22 + 16)',
          prefix: '=',
          correctValue: 38,
          placeholder: '?',
          mistakeCategory: 'arithmetic_check',
          hintTier1:
            'Коэффициент слева верный! Проверь сложение в правой части: 22 + 16.',
          hintTier2:
            'Сложи по разрядам: десятки (20 + 10) и единицы (2 + 6), затем объедини результат.',
        },
      ],
      nextNodeId: 'ep3_step4_dual_solve',
      mistakeCategory: 'like_terms',
      hintTier1:
        'Вспомни: перед одиночным x стоит коэффициент 1 (3x − 1x). Справа просто сложи 22 и 16.',
      hintTier2:
        'Слева вычти коэффициенты (3 − 1), а справа сложи 22 + 16 по разрядам.',
    },
  },

  ep3_step4_dual_solve: {
    id: 'ep3_step4_dual_solve',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Полный ответ реестра',
    mathTopic: 'Нахождение обеих величин из 2x = 38',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
    emotion: 'thoughtful',
    schematic: 'archive_table_ep3',
    schematicStep: 4,
    formulaDisplay: '2x = 38',
    text: [
      '«Из уравнения 2x = 38 легко найти x — количество свитков на второй полке».',
      'Но будь внимателен! Сколько свитков стояло на КАЖДОЙ полке изначально (и на первой, и на второй)?',
    ],
    dualNumericTask: {
      prompt: 'Впиши начальное число свитков для обеих полок:',
      firstLabel: 'Первая полка (было 3x)',
      secondLabel: 'Вторая полка (было x)',
      firstCorrect: 57,
      secondCorrect: 19,
      nextNodeId: 'ep3_verify',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (first, second, attempt) => {
        if (first === 19 && (second === null || second !== 57)) {
          return {
            feedback:
              attempt === 1
                ? 'Проверь, какую полку мы обозначили за x! Корень 38 : 2 — это вторая (меньшая) полка, а не первая.'
                : 'Полки перепутаны местами: вторая полка равна x, а первая была в 3 раза больше (нужно умножить x на 3).',
            speaker: 'archivist',
            category: 'unknown_designation',
          };
        }
        if (second === 19 && first !== 57) {
          return {
            feedback:
              attempt === 1
                ? 'Вторая полка (x = 19) найдена верно! По условию на первой было в 3 раза больше свитков — пересчитай 3 · 19.'
                : 'Умножь 19 на 3 по частям: сначала 10 · 3, затем 9 · 3, и сложи два произведения.',
            speaker: 'archivist',
            category: 'arithmetic_check',
          };
        }
        return {
          feedback:
            attempt === 1
              ? 'Сначала найди x из 2x = 38 (раздели 38 на 2), это будет вторая полка. А затем умножь на 3 для первой.'
              : 'Шаг 1: раздели 38 на 2 (разбей как 20 : 2 + 18 : 2) — это вторая полка. Шаг 2: умножь полученный x на 3 — это первая полка.',
          speaker: 'pi',
          category: 'arithmetic_check',
        };
      },
    },
  },

  ep3_verify: {
    id: 'ep3_verify',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Самопроверка реестра',
    mathTopic: 'Проверка условия «стало поровну»',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
    emotion: 'curious',
    schematic: 'archive_table_ep3',
    schematicStep: 5,
    formulaDisplay: '57 и 19 свитков',
    text: [
      '«Оба способа ведут к одному ответу: 57 и 19 свитков! Перед тем как я отопру дверь, проверь себя подстановкой: действительно ли после перестановки на полках станет поровну?»',
    ],
    verificationTask: {
      title: 'Проверка условия «стало поровну»',
      prompt: 'Вычисли итоговое число свитков на каждой полке:',
      fields: [
        {
          id: 's1',
          label: 'Первая полка (57 − 16)',
          prefix: '57 − 16 =',
          correctValue: 41,
          placeholder: '?',
        },
        {
          id: 's2',
          label: 'Вторая полка (19 + 22)',
          prefix: '19 + 22 =',
          correctValue: 41,
          placeholder: '?',
        },
      ],
      expectedSummary: '41 = 41 — симметрия хранилища восстановлена!',
      nextNodeId: 'ep3_outro',
      unlockLaw: 3,
      completeDistrict: 'ep3_archive',
      hintTier1:
        'Выполни действия для каждой полки: из 57 вычти 16, а к 19 прибавь 22. Должны получиться одинаковые числа!',
      hintTier2:
        'Считай по разрядам: для первой полки (50 − 10) и (7 − 6); для второй (19 + 20) и ещё + 2. Сравни оба результата.',
    },
  },

  ep3_outro: {
    id: 'ep3_outro',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 пройден · Симметрия Архива',
    scene: 'archive',
    speaker: 'narrator',
    speakerName: 'Хроника',
    emotion: 'triumph',
    schematic: 'archive_table_ep3',
    schematicStep: 5,
    formulaDisplay: '57 − 16 = 41  и  19 + 22 = 41',
    text: [
      'Проверка сходится идеально: 41 = 41! Полки Архива с тихим гулом выравниваются, а парящие свитки складываются в аккуратные ряды.',
      'В Кодексе загорелась Запись №3: «За x можно обозначить любую искомую величину — обе модели верны, но выбор меньшей величины часто избавляет от дробей. При переносе слагаемого через знак «=» его знак меняется на противоположный».',
    ],
    choices: [
      {
        id: 'ep3_back',
        label: 'Вернуться на Перекрёсток Четырёх Стихий',
        nextNodeId: 'crossroads_hub',
        isCorrect: true,
      },
    ],
  },

  // ==================== ЭПИЗОД 4 ====================
  ep4_intro: {
    id: 'ep4_intro',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Кристаллические Пещеры',
    mathTopic: 'Нахождение целого по дробным частям',
    scene: 'crystals',
    speaker: 'guardian',
    speakerName: 'Хранитель Пещер',
    emotion: 'curious',
    schematic: 'crystals_ep4',
    schematicStep: 1,
    text: [
      'За потайной дверью открылся подземный грот с потухшими синими, красными и зелёными кристаллами. Кристальный страж пророкотал: «Восстанови Целое, и Призма пропустит тебя».',
      'Задача: Треть всех кристаллов — синие, четверть всех кристаллов — красные, а остальные 20 кристаллов — изумрудно-зелёные. Сколько всего кристаллов в коллекции?',
    ],
    choices: [
      {
        id: 'ep4_whole_x',
        label: 'Принять всё Целое (общее число кристаллов) за x',
        nextNodeId: 'ep4_step1_parts',
        isCorrect: true,
      },
      {
        id: 'ep4_inspect_crystal',
        label: 'Прислушаться к поющему фиолетовому кристаллу в нише',
        nextNodeId: 'ep4_secret_prism',
        isCorrect: true,
        secretId: 'secret_crystal_resonance',
      },
    ],
  },

  ep4_secret_prism: {
    id: 'ep4_secret_prism',
    episodeId: 'ep4',
    episodeTitle: 'Пещеры · Секрет Призмы',
    mathTopic: 'Гармония долей',
    scene: 'crystals',
    speaker: 'guardian',
    speakerName: 'Хранитель Пещер',
    emotion: 'surprised',
    isSecretNode: true,
    schematic: 'crystals_ep4',
    schematicStep: 1,
    text: [
      'Фиолетовый кристалл зазвенел чистым аккордом: «Лишь немногие слышат отголосок целого! Помни — единица в задачах на доли равна 12/12 или любому общему знаменателю».',
    ],
    choices: [
      {
        id: 'ep4_secret_back',
        label: 'Вернуться к испытанию Призмы',
        nextNodeId: 'ep4_intro',
        isCorrect: true,
      },
    ],
  },

  ep4_step1_parts: {
    id: 'ep4_step1_parts',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Сборка долей',
    mathTopic: 'Составление уравнения из долей и целого',
    scene: 'crystals',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'surprised',
    schematic: 'crystals_ep4',
    schematicStep: 2,
    text: [
      '«Если всего кристаллов x, то синих — (1/3)x, красных — (1/4)x, а зелёных ровно 20. Сложив все части, мы получим всё Целое!»',
      'Какое уравнение объединяет все три группы кристаллов?',
    ],
    choices: [
      {
        id: 'ep4_eq_wrong',
        label: '1/3 + 1/4 + 20 = x',
        isCorrect: false,
        mistakeCategory: 'fractions_parts',
        hintTier1:
          'Посмотри: 1/3 и 1/4 — это части от чего? Если к дроби 1/3 просто прибавить 20, разве она зависит от общего числа кристаллов x?',
        hintTier2:
          '1/3 и 1/4 — это доли ОТ ВСЕЙ коллекции x, поэтому каждую дробь нужно умножить на неизвестное целое x.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep4_eq_ok',
        label: '(1/3)x + (1/4)x + 20 = x',
        nextNodeId: 'ep4_step2_lcm',
        isCorrect: true,
      },
    ],
  },

  ep4_step2_lcm: {
    id: 'ep4_step2_lcm',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Общий знаменатель',
    mathTopic: 'Приведение дробей к общему знаменателю',
    scene: 'crystals',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'thoughtful',
    schematic: 'crystals_ep4',
    schematicStep: 3,
    formulaDisplay: '(1/3)x + (1/4)x + 20 = x',
    text: [
      '«Чтобы сложить дроби (1/3)x и (1/4)x, приведём их к наименьшему общему знаменателю».',
      'Какое наименьшее натуральное число делится без остатка и на 3, и на 4?',
    ],
    numericTask: {
      prompt: 'Введи наименьший общий знаменатель для 3 и 4:',
      placeholder: 'Введи число',
      correctValue: 12,
      nextNodeId: 'ep4_step2b_fractions',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Подумай, какое самое маленькое число встречается в таблицах умножения и на 3, и на 4.'
            : 'У чисел 3 и 4 нет общих делителей кроме 1, поэтому их наименьший общий знаменатель находится умножением 3 на 4.',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'fractions_parts',
      }),
    },
  },

  ep4_step2b_fractions: {
    id: 'ep4_step2b_fractions',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Перевод долей в двенадцатые',
    mathTopic: 'Вычисление числителей при знаменателе 12',
    scene: 'crystals',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'crystals_ep4',
    schematicStep: 3,
    formulaDisplay: '(1/3)x + (1/4)x + 20 = x',
    text: [
      '«Общий знаменатель — 12! Теперь переведём каждую долю в двенадцатые самостоятельно, чтобы узнать, какая часть коллекции досталась зелёным кристаллам».',
    ],
    scratchpadTask: {
      title: 'Черновик приведения дробей',
      equationContext: 'Вырази доли синих, красных и оставшихся зелёных кристаллов со знаменателем 12:',
      fields: [
        {
          id: 'blue12',
          label: 'Синие: 1/3 = ?/12',
          suffix: '/12',
          correctValue: 4,
          placeholder: '?',
          mistakeCategory: 'fractions_parts',
          hintTier1: 'Во сколько раз 12 больше 3? На столько же умножь числитель 1.',
          hintTier2: 'Раздели 12 на 3 — получишь дополнительный множитель для числителя дроби 1/3.',
        },
        {
          id: 'red12',
          label: 'Красные: 1/4 = ?/12',
          suffix: '/12',
          correctValue: 3,
          placeholder: '?',
          mistakeCategory: 'fractions_parts',
          hintTier1: 'Во сколько раз 12 больше 4? Умножь числитель 1 на это число.',
          hintTier2: 'Раздели 12 на 4 — получишь числитель для доли красных кристаллов.',
        },
        {
          id: 'green12',
          label: 'Зелёные: 12/12 − синие − красные',
          suffix: '/12',
          correctValue: 5,
          placeholder: '?',
          mistakeCategory: 'fractions_parts',
          hintTier1: 'Сложи числители синих и красных долей, а затем вычти эту сумму из всего целого (12).',
          hintTier2: 'Всё целое — это 12 двенадцатых. Вычти из 12 сумму найденных числителей синих и красных.',
        },
      ],
      nextNodeId: 'ep4_step3_branch',
      mistakeCategory: 'fractions_parts',
      hintTier1: 'Переведи 1/3 и 1/4 к знаменателю 12, а затем вычти их сумму из 12/12.',
      hintTier2: 'Найди дополнительные множители 12 : 3 и 12 : 4, затем вычти их сумму из 12.',
    },
  },

  ep4_step3_branch: {
    id: 'ep4_step3_branch',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Выбор пути рассуждения',
    mathTopic: 'Уравнение (7/12)x + 20 = x и доля (5/12)x = 20',
    scene: 'crystals',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'surprised',
    schematic: 'crystals_ep4',
    schematicStep: 4,
    formulaDisplay: '(5/12)x = 20',
    text: [
      '«Ты сам вывел все доли: 4/12 синих, 3/12 красных и ровно 5/12 зелёных! Значит (5/12)x = 20».',
      'Как тебе удобнее осмыслить этот финальный шаг — этот выбор отразится на твоём стиле Мастера!',
    ],
    choices: [
      {
        id: 'ep4_path_algebra',
        label: 'Алгебраический путь: записать x как (12/12)x и решить уравнение (5/12)x = 20',
        nextNodeId: 'ep4_step4_algebraic',
        isCorrect: true,
        recordDecision: { ep4Method: 'algebraic' },
      },
      {
        id: 'ep4_path_logic',
        label: 'Логический путь: найти размер одной доли (1/12) и умножить на 12 частей',
        nextNodeId: 'ep4_step4_logical',
        isCorrect: true,
        recordDecision: { ep4Method: 'logical' },
      },
    ],
  },

  ep4_step4_algebraic: {
    id: 'ep4_step4_algebraic',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Алгебраическое преобразование',
    mathTopic: 'Нахождение целого по уравнению (5/12)x = 20',
    scene: 'crystals',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'crystals_ep4',
    schematicStep: 4,
    formulaDisplay: '(5/12)x = 20',
    text: [
      '«Мы получили уравнение (5/12)x = 20: чтобы найти x, нужно 20 разделить на дробь 5/12 (то есть разделить на 5 и умножить на 12)».',
      'Сколько всего кристаллов в пещере? Найди целое x!',
    ],
    numericTask: {
      prompt: 'Введи общее количество кристаллов x:',
      unit: 'кристаллов',
      placeholder: 'Введи число',
      correctValue: 48,
      nextNodeId: 'ep4_verify',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (val, attempt) => {
        const isFractionTrap = val === 4 || val === 100 || val === 240 || val === 25;
        return {
          feedback:
            attempt === 1
              ? 'Если 5 долей равны 20 кристаллам, то сколько кристаллов в ОДНОЙ доле (1/12)? А потом умножь на все 12 долей.'
              : 'Выполни два действия по очереди: сначала раздели 20 на 5 (найдёшь одну долю), затем умножь результат на 12.',
          speaker: 'pi',
          integrityDelta: -10,
          category: isFractionTrap ? 'fractions_parts' : 'arithmetic_check',
        };
      },
    },
  },

  ep4_step4_logical: {
    id: 'ep4_step4_logical',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Логика долей',
    mathTopic: 'Восстановление целого из 5/12 = 20',
    scene: 'crystals',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'encourage',
    schematic: 'crystals_ep4',
    schematicStep: 4,
    formulaDisplay: '5 долей из 12 = 20 кристаллов',
    text: [
      '«Мудрый взгляд! На схеме слева видно: 5 зелёных кусочков — это 20 кристаллов».',
      'Раз 5 долей — это 20 кристаллов, сколько всего кристаллов во всех 12 долях?',
    ],
    numericTask: {
      prompt: 'Введи общее количество кристаллов x:',
      unit: 'кристаллов',
      placeholder: 'Введи число',
      correctValue: 48,
      nextNodeId: 'ep4_verify',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (val, attempt) => {
        const isFractionTrap = val === 4 || val === 100 || val === 240 || val === 25;
        return {
          feedback:
            attempt === 1
              ? 'Посмотри на шкалу слева: 5 зелёных кусочков дают 20 кристаллов. Сколько кристаллов в одном кусочке?'
              : 'Сначала найди величину одной части (20 : 5), а затем умножь её на количество всех частей (12).',
          speaker: 'pi',
          integrityDelta: -10,
          category: isFractionTrap ? 'fractions_parts' : 'arithmetic_check',
        };
      },
    },
  },

  ep4_verify: {
    id: 'ep4_verify',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Проверка кристаллов по цветам',
    mathTopic: 'Подстановка x = 48 в условие',
    scene: 'crystals',
    speaker: 'guardian',
    speakerName: 'Хранитель Пещер',
    emotion: 'surprised',
    schematic: 'crystals_ep4',
    schematicStep: 5,
    formulaDisplay: 'x = 48 кристаллов',
    text: [
      '«48 кристаллов! Посчитай подстановкой, сколько среди них синих (треть от 48) и красных (четверть от 48), чтобы Призма открылась!»',
    ],
    verificationTask: {
      title: 'Проверка долей коллекции',
      prompt: 'Найди количество синих и красных кристаллов при x = 48:',
      fields: [
        {
          id: 'blue',
          label: 'Синие (⅓ от 48)',
          prefix: '48 : 3 =',
          correctValue: 16,
          placeholder: '?',
        },
        {
          id: 'red',
          label: 'Красные (¼ от 48)',
          prefix: '48 : 4 =',
          correctValue: 12,
          placeholder: '?',
        },
      ],
      expectedSummary: '16 + 12 + 20 = 48 — вся коллекция сошлась!',
      nextNodeId: 'ep4_outro',
      unlockLaw: 4,
      completeDistrict: 'ep4_crystals',
      hintTier1: 'Раздели 48 на 3 (для синих) и 48 на 4 (для красных). С зелёными (20) в сумме должно выйти 48.',
      hintTier2: 'Разбей 48 на удобные части: для деления на 3 это 30 + 18, а для деления на 4 это 40 + 8.',
    },
  },

  ep4_outro: {
    id: 'ep4_outro',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 пройден · Радуга Призмы',
    scene: 'crystals',
    speaker: 'narrator',
    speakerName: 'Хроника',
    emotion: 'triumph',
    schematic: 'crystals_ep4',
    schematicStep: 5,
    formulaDisplay: '16 + 12 + 20 = 48',
    text: [
      'Все 48 кристаллов запели в унисон: 16 синих, 12 красных и 20 зелёных! Призматическая Дверь растворилась в воздухе.',
      'В Кодексе засияла Запись №4: «Если неизвестно Целое, прими его за x, вырази доли в виде дробей от x и приравняй их сумму к самому x».',
    ],
    choices: [
      {
        id: 'ep4_back',
        label: 'Вернуться на Перекрёсток Четырёх Стихий',
        nextNodeId: 'crossroads_hub',
        isCorrect: true,
      },
    ],
  },

  // ==================== ЭПИЗОД 5 ====================
  ep5_intro: {
    id: 'ep5_intro',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Заводной Город Автоматонов',
    mathTopic: 'Выражение одной величины двумя способами',
    scene: 'city',
    speaker: 'captain',
    speakerName: 'Капитан Автоматонов',
    emotion: 'thoughtful',
    schematic: 'city_chests_ep5',
    schematicStep: 1,
    text: [
      'У подножия башни спорили Красные и Синие автоматоны возле груды золотых энергомонет и пустых железных сундуков.',
      'Задача: Если в каждый сундук положить по 5 монет, то 10 монет останутся лишними. А если положить по 7 монет, то для заполнения последнего сундука не хватит 4 монет. Сколько сундуков и сколько всего монет?',
    ],
    choices: [
      {
        id: 'ep5_start',
        label: 'Обозначить за x количество сундуков (и выразить монеты двумя способами)',
        nextNodeId: 'ep5_step1_way1',
        isCorrect: true,
      },
      {
        id: 'ep5_inspect_ledger',
        label: 'Заглянуть в потайной счётный журнал Капитана',
        nextNodeId: 'ep5_secret_ledger',
        isCorrect: true,
        secretId: 'secret_city_ledger',
      },
    ],
  },

  ep5_secret_ledger: {
    id: 'ep5_secret_ledger',
    episodeId: 'ep5',
    episodeTitle: 'Заводной Город · Секретный журнал',
    mathTopic: 'Сверка счетов',
    scene: 'city',
    speaker: 'captain',
    speakerName: 'Капитан Автоматонов',
    emotion: 'surprised',
    isSecretNode: true,
    schematic: 'city_chests_ep5',
    schematicStep: 1,
    text: [
      '«Ха! Ты отыскал мой резервный журнал энергоцеха! Запомни хитрость: если число слагаемых x в правой части больше (7x > 5x), переноси x именно туда — тогда не будет отрицательных коэффициентов!»',
    ],
    choices: [
      {
        id: 'ep5_secret_back',
        label: 'Вернуться к сундукам автоматонов',
        nextNodeId: 'ep5_intro',
        isCorrect: true,
      },
    ],
  },

  ep5_step1_way1: {
    id: 'ep5_step1_way1',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Сборка двух способов счёта',
    mathTopic: 'Выражение одной величины двумя способами',
    scene: 'city',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'curious',
    schematic: 'city_chests_ep5',
    schematicStep: 2,
    text: [
      '«Пусть у автоматонов x сундуков. Запиши общее число энергомонет обоими способами из условия — с избытком и с нехваткой!»',
    ],
    tableTask: {
      prompt: 'Выбери оба выражения для общего числа энергомонет:',
      nextNodeId: 'ep5_step2_transfer',
      rows: [
        {
          id: 'way1',
          label: 'Способ 1 (по 5 монет в x сундуков и 10 монет лишних)',
          options: ['5x − 10', '5x + 10', '10x + 5'],
          correctOption: '5x + 10',
          hintTier1:
            'В x сундуках лежит 5x монет, а ещё 10 лежат рядом сверх того. Прибавляем или вычитаем 10?',
          hintTier2:
            'Избыток означает, что монет больше, чем 5x, на 10 штук — значит прибавляем 10 к 5x.',
        },
        {
          id: 'way2',
          label: 'Способ 2 (по 7 монет в x сундуков, но 4 монет не хватает)',
          options: ['7x + 4', '7x − 4', '4x − 7'],
          correctOption: '7x − 4',
          hintTier1:
            '7x — это столько монет, сколько нужно для ПОЛНОГО заполнения всех сундуков. Если 4 монет не хватает, их больше 7x или меньше 7x?',
          hintTier2:
            'Нехватка означает, что до полного комплекта 7x недостаёт 4 монет — нужно вычесть 4.',
        },
      ],
    },
  },

  ep5_step2_transfer: {
    id: 'ep5_step2_transfer',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Перенос слагаемых',
    mathTopic: 'Перенос слагаемых через знак «=»',
    scene: 'city',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'city_chests_ep5',
    schematicStep: 3,
    formulaDisplay: '5x + 10 = 7x − 4',
    text: [
      '«Оба выражения описывают одну и ту же груду монет, значит 5x + 10 = 7x − 4. Чтобы коэффициент при x остался положительным, перенесём слагаемые с x вправо, а обычные числа — влево!»',
      'Какая строка получится после правильного переноса слагаемых?',
    ],
    choices: [
      {
        id: 'ep5_tr_wrong1',
        label: '10 − 4 = 7x − 5x',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Слагаемые с x перенесены верно! Проверь знак числа −4 после переноса через «=» в левую часть.',
        hintTier2:
          'Справа стояло −4. При переносе через знак равенства минус меняется на противоположный знак.',
        feedbackSpeaker: 'captain',
        integrityDelta: -10,
      },
      {
        id: 'ep5_tr_wrong2',
        label: '10 + 4 = 7x + 5x',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Числа слева перенесены верно! А проверь знак у 5x, которое перешло в правую часть.',
        hintTier2:
          'Слева было +5x. При переносе через знак равенства вправо оно должно поменять знак на минус.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep5_tr_ok',
        label: '10 + 4 = 7x − 5x',
        nextNodeId: 'ep5_step2b_scratchpad',
        isCorrect: true,
      },
    ],
  },

  ep5_step2b_scratchpad: {
    id: 'ep5_step2b_scratchpad',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Черновик уравнения',
    mathTopic: 'Приведение подобных слагаемых',
    scene: 'city',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'city_chests_ep5',
    schematicStep: 3,
    formulaDisplay: '10 + 4 = 7x − 5x',
    text: [
      '«Отлично! Упростим обе части равенства в черновике».',
    ],
    scratchpadTask: {
      title: 'Пошаговый черновик уравнения',
      equationContext: 'Упрости левую и правую части равенства 10 + 4 = 7x − 5x:',
      fields: [
        {
          id: 'lhs',
          label: 'Число слева (10 + 4)',
          correctValue: 14,
          placeholder: '?',
          mistakeCategory: 'arithmetic_check',
          hintTier1: 'Проверь сложение в левой части: сколько будет 10 + 4?',
          hintTier2: 'Прибавь к одному десятку (10) ещё 4 единицы.',
        },
        {
          id: 'rhs_coef',
          label: 'Коэффициент справа (7x − 5x)',
          prefix: '=',
          suffix: 'x',
          correctValue: 2,
          placeholder: '?',
          mistakeCategory: 'like_terms',
          hintTier1: 'Вычти коэффициенты перед одинаковой буквой x: 7 − 5.',
          hintTier2: 'При приведении подобных слагаемых вычитаем только числа перед x: 7 − 5.',
        },
      ],
      nextNodeId: 'ep5_step3_solve_chests',
      mistakeCategory: 'like_terms',
      hintTier1: 'Сложи 10 и 4 для левой части, а справа вычти 5x из 7x.',
      hintTier2: 'Слева вычисли сумму 10 + 4, а справа разность коэффициентов 7 − 5.',
    },
  },

  ep5_step3_solve_chests: {
    id: 'ep5_step3_solve_chests',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Поиск числа сундуков',
    mathTopic: 'Решение уравнения 14 = 2x',
    scene: 'city',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'triumph',
    schematic: 'city_chests_ep5',
    schematicStep: 3,
    formulaDisplay: '14 = 2x',
    text: [
      '«Найди x из уравнения 14 = 2x, а затем можешь проверить гипотезу на счётчике сундуков слева!»',
      'Сколько же сундуков у автоматонов?',
    ],
    numericTask: {
      prompt: 'Введи количество сундуков x:',
      unit: 'сундуков',
      placeholder: 'Введи число',
      correctValue: 7,
      nextNodeId: 'ep5_step4_coins',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Посмотри на уравнение 2x = 14. Какое число при умножении на 2 даёт 14?'
            : 'Чтобы найти неизвестный множитель x в 2x = 14, раздели произведение 14 на известный множитель 2.',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'arithmetic_check',
      }),
    },
  },

  ep5_step4_coins: {
    id: 'ep5_step4_coins',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Подсчёт энергомонет',
    mathTopic: 'Подстановка x = 7 в первое выражение',
    scene: 'city',
    speaker: 'captain',
    speakerName: 'Капитан Автоматонов',
    emotion: 'surprised',
    schematic: 'city_chests_ep5',
    schematicStep: 4,
    formulaDisplay: 'x = 7 сундуков',
    text: [
      '«Сундуков ровно 7! А сколько же всего энергомонет лежит на площади?»',
      'Подставь x = 7 в выражение (5x + 10) и введи общее количество монет!',
    ],
    numericTask: {
      prompt: 'Сколько всего энергомонет у автоматонов?',
      unit: 'монет',
      placeholder: 'Введи число',
      correctValue: 45,
      nextNodeId: 'ep5_step5_verify',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Помни о порядке действий: сначала умножь 5 на 7, а затем прибавь 10.'
            : 'Выполни по шагам: найди произведение 5 · 7 по таблице умножения, а к полученному числу прибавь один десяток.',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'arithmetic_check',
      }),
    },
  },

  ep5_step5_verify: {
    id: 'ep5_step5_verify',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Проверка вторым способом',
    mathTopic: 'Перекрёстная проверка',
    scene: 'city',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'triumph',
    schematic: 'city_chests_ep5',
    schematicStep: 4,
    formulaDisplay: '5 · 7 + 10 = 45',
    text: [
      '«45 монет! Автоматоны уже готовы запускать Главную Шестерню. Хочешь сразу двигаться дальше или выполнишь контрольную подстановку во второе выражение (7x − 4)?»',
    ],
    choices: [
      {
        id: 'ep5_verify_yes',
        label: 'Выполнить самопроверку вторым способом (7x − 4)',
        nextNodeId: 'ep5_verify_calc',
        isCorrect: true,
        recordDecision: { ep5VerificationDone: true },
      },
      {
        id: 'ep5_verify_skip',
        label: 'Довериться первому расчёту и сразу запустить шестерни',
        nextNodeId: 'ep5_outro',
        isCorrect: true,
        unlockLaw: 5,
        completeDistrict: 'ep5_city',
        recordDecision: { ep5VerificationDone: false },
      },
    ],
  },

  ep5_verify_calc: {
    id: 'ep5_verify_calc',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Самопроверка подстановкой',
    mathTopic: 'Подстановка x = 7 во второй способ',
    scene: 'city',
    speaker: 'captain',
    speakerName: 'Капитан Автоматонов',
    emotion: 'encourage',
    schematic: 'city_chests_ep5',
    schematicStep: 5,
    formulaDisplay: 'x = 7  →  7 · 7 − 4 = ?',
    text: [
      '«Отличный подход! Подставь x = 7 во второй способ (7x − 4) и проверь, совпадёт ли результат с 45 монетами!»',
    ],
    verificationTask: {
      title: 'Перекрёстная проверка',
      prompt: 'Вычисли значение второго выражения при x = 7:',
      fields: [
        {
          id: 'way2',
          label: 'Второй способ (7 · 7 − 4)',
          prefix: '7 · 7 − 4 =',
          suffix: 'монет',
          correctValue: 45,
          placeholder: '?',
        },
      ],
      expectedSummary: '45 = 45 — оба способа дали одинаковый результат!',
      nextNodeId: 'ep5_outro',
      unlockLaw: 5,
      completeDistrict: 'ep5_city',
      recordDecision: { ep5VerificationDone: true },
      hintTier1: 'Сначала умножь 7 на 7, а затем вычти 4 недостающие монеты.',
      hintTier2: 'Найди квадрат семи (7 · 7) по таблице умножения и вычти 4. Сравни результат с первым способом.',
    },
  },

  ep5_outro: {
    id: 'ep5_outro',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 пройден · Город ожил',
    scene: 'city',
    speaker: 'narrator',
    speakerName: 'Хроника',
    emotion: 'triumph',
    schematic: 'city_chests_ep5',
    schematicStep: 5,
    formulaDisplay: '7 сундуков · 45 монет',
    text: [
      'Автоматоны загружают 45 энергомонет в 7 сундуков. Раздаётся мощный гудок, маятники качаются, и Заводной Город оживает!',
      'В Кодексе засияла Запись №5: «Если одну и ту же неизвестную величину можно выразить через x двумя разными способами, эти выражения можно приравнять».',
    ],
    choices: [
      {
        id: 'ep5_back',
        label: 'Вернуться на Перекрёсток Четырёх Стихий',
        nextNodeId: 'crossroads_hub',
        isCorrect: true,
      },
    ],
  },

  // ==================== ЭПИЗОД 6 (ФИНАЛ) ====================
  ep6_intro: {
    id: 'ep6_intro',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 (Финал) · Храм Великого Баланса',
    mathTopic: 'Раскрытие скобок · Движение по реке',
    scene: 'temple',
    speaker: 'shadow',
    speakerName: 'Тень Скобок',
    emotion: 'alert',
    schematic: 'boss_river_ep6',
    schematicStep: 1,
    text: [
      'Защитные барьеры пали! Алёша вошёл в Храм Великого Баланса, где через зал протекала Река Времени с механическим катером. Арка Портала Домой была скована льдом, а путь преграждала Тень Скобок с клинками «( )».',
      '«Ты научился находить простые иксы, школьник... Но сумеешь ли ты освободить неизвестное, когда оно заперто внутри моих скобок? Одна ошибка в знаке — и шлюз закроется навсегда!»',
    ],
    choices: [
      {
        id: 'ep6_accept_battle',
        label: 'Принять вызов и прочитать задачу гидрошлюза',
        nextNodeId: 'ep6_phase1_speeds',
        isCorrect: true,
      },
    ],
  },

  ep6_phase1_speeds: {
    id: 'ep6_phase1_speeds',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Фаза 1: Скорости на Реке Времени',
    mathTopic: 'Движение по течению и против течения',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'alert',
    schematic: 'boss_river_ep6',
    schematicStep: 1,
    text: [
      'Задача: Катер прошёл участок Реки Времени по течению за 3 часа, а обратно против течения — за 5 часов. Собственная скорость катера равна 12 км/ч. Найди скорость течения x км/ч.',
      'Как записать скорость катера ПО течению и ПРОТИВ течения?',
    ],
    choices: [
      {
        id: 'ep6_spd_wrong',
        label: 'По течению: (12 − x), против течения: (12 + x)',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Подумай: когда ты плывёшь ПО течению, река тебя ускоряет или тормозит? А когда ПРОТИВ течения?',
        hintTier2:
          'Наоборот! ПО течению скорость течения прибавляется к скорости катера, а ПРОТИВ течения — вычитается.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_spd_ok',
        label: 'По течению: (12 + x), против течения: (12 − x)',
        nextNodeId: 'ep6_phase1b_assemble',
        isCorrect: true,
        bossDamage: 25,
      },
    ],
  },

  ep6_phase1b_assemble: {
    id: 'ep6_phase1b_assemble',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Составление уравнения пути',
    mathTopic: 'Равенство расстояний S = v · t',
    scene: 'temple',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'thoughtful',
    schematic: 'boss_river_ep6',
    schematicStep: 2,
    text: [
      '«Скорости готовы: (12 + x) по течению и (12 − x) против течения. Катер прошёл ОДИН И ТОТ ЖЕ участок реки: по течению за 3 часа, обратно за 5 часов».',
      'Собери уравнение, приравняв расстояние по течению к расстоянию против течения!',
    ],
    choices: [
      {
        id: 'ep6_eq_swap',
        label: '3(12 − x) = 5(12 + x)',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Проверь, сколько часов катер шёл ПО течению (быстрее), а сколько ПРОТИВ течения (медленнее).',
        hintTier2:
          'По течению катер плывёт быстрее, значит тратит меньше времени (3 ч на скорость 12 + x), а против течения — 5 ч на скорость 12 − x.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_eq_add',
        label: '3 + (12 + x) = 5 + (12 − x)',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Вспомни формулу пути: чтобы найти расстояние, время к скорости прибавляют или умножают на скорость?',
        hintTier2:
          'По формуле S = t · v время нужно УМНОЖАТЬ на выражение скорости в скобках.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_eq_ok',
        label: '3(12 + x) = 5(12 − x)',
        nextNodeId: 'ep6_phase2_equation',
        isCorrect: true,
        bossDamage: 15,
      },
    ],
  },

  ep6_phase2_equation: {
    id: 'ep6_phase2_equation',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Фаза 2: Раскрытие скобок',
    mathTopic: 'Распределительный закон умножения',
    scene: 'temple',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'surprised',
    schematic: 'boss_river_ep6',
    schematicStep: 3,
    formulaDisplay: '3(12 + x) = 5(12 − x)',
    text: [
      '«Уравнение собрано: 3(12 + x) = 5(12 − x)! Тень Скобок сжимает выражение!»',
      'Примени распределительный закон умножения — как правильно раскрыть скобки?',
    ],
    choices: [
      {
        id: 'ep6_trap1',
        label: '36 + x = 60 − x',
        isCorrect: false,
        mistakeCategory: 'brackets_distribution',
        hintTier1:
          'Посмотри на иксы внутри скобок: ты умножил 3 и 5 на число 12, а умножились ли сами x?',
        hintTier2:
          'Тень Скобок смеётся: множитель перед скобкой умножается на КАЖДОЕ слагаемое внутри — и на 12, и на x!',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_trap2',
        label: '36 + 3x = 60 + 5x',
        isCorrect: false,
        mistakeCategory: 'brackets_distribution',
        hintTier1:
          'Почти всё верно, но внимательно проверь знак внутри второй скобки: 5(12 − x).',
        hintTier2:
          'В правой скобке стоял знак МИНУС! При умножении положительного 5 на вычитаемый x знак минус сохраняется.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_strike_ok',
        label: '36 + 3x = 60 − 5x',
        nextNodeId: 'ep6_phase3_transfer',
        isCorrect: true,
        bossDamage: 35,
      },
    ],
  },

  ep6_phase3_transfer: {
    id: 'ep6_phase3_transfer',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Фаза 3: Перенос слагаемых',
    mathTopic: 'Перенос слагаемых через знак «=»',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'alert',
    schematic: 'boss_river_ep6',
    schematicStep: 4,
    formulaDisplay: '36 + 3x = 60 − 5x',
    text: [
      '«Щит Тени Скобок треснул! Теперь перенеси слагаемые с x в левую часть, а обычные числа — в правую».',
      'Выбери верную строку после переноса:',
    ],
    choices: [
      {
        id: 'ep6_tr_wrong1',
        label: '3x − 5x = 60 − 36',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Число 36 перенесено верно! А посмотри на −5x справа: поменялся ли его знак при переходе влево?',
        hintTier2:
          'При переносе −5x через знак равенства минус обязательно меняется на плюс.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_tr_wrong2',
        label: '3x + 5x = 60 + 36',
        isCorrect: false,
        mistakeCategory: 'sign_transfer',
        hintTier1:
          'Левая часть (3x + 5x) верна! А какой знак был у числа 36 слева до переноса?',
        hintTier2:
          'Число +36 переходит из левой части в правую с противоположным знаком — со знаком минус.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_tr_ok',
        label: '3x + 5x = 60 − 36',
        nextNodeId: 'ep6_phase3b_scratchpad',
        isCorrect: true,
        bossDamage: 10,
      },
    ],
  },

  ep6_phase3b_scratchpad: {
    id: 'ep6_phase3b_scratchpad',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Черновик решающего удара',
    mathTopic: 'Приведение подобных слагаемых',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'surprised',
    schematic: 'boss_river_ep6',
    schematicStep: 4,
    formulaDisplay: '3x + 5x = 60 − 36',
    text: [
      '«Верный перенос! Заполни черновик упрощения уравнения перед финальным выстрелом!»',
    ],
    scratchpadTask: {
      title: 'Финальный черновик уравнения',
      equationContext: 'Собери подобные слагаемые в уравнении 3x + 5x = 60 − 36:',
      fields: [
        {
          id: 'coef',
          label: 'Коэффициент при x (3x + 5x)',
          suffix: 'x',
          correctValue: 8,
          placeholder: '?',
          mistakeCategory: 'like_terms',
          hintTier1: 'Сложи коэффициенты 3 и 5 перед буквой x.',
          hintTier2: 'При приведении подобных слагаемых складываем коэффициенты 3 + 5, сохраняя x.',
        },
        {
          id: 'rhs',
          label: 'Разность справа (60 − 36)',
          prefix: '=',
          correctValue: 24,
          placeholder: '?',
          mistakeCategory: 'arithmetic_check',
          hintTier1: 'Коэффициент слева верный! Пересчитай вычитание 60 − 36.',
          hintTier2: 'Вычитай по частям: сначала 60 − 30, а из полученного результата вычти ещё 6.',
        },
      ],
      nextNodeId: 'ep6_phase4_solve',
      mistakeCategory: 'like_terms',
      hintTier1: 'Сложи коэффициенты 3 и 5 слева, а справа вычти 36 из 60.',
      hintTier2: 'Слева найди сумму 3 + 5, а справа выполни (60 − 30) − 6.',
    },
  },

  ep6_phase4_solve: {
    id: 'ep6_phase4_solve',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Фаза 4: Скорость течения',
    mathTopic: 'Решение уравнения 8x = 24',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'triumph',
    schematic: 'boss_river_ep6',
    schematicStep: 4,
    formulaDisplay: '8x = 24',
    text: [
      '«Уравнение готово: 8x = 24! Введи финальное значение скорости течения Реки Времени в центральный механизм шлюза!»',
    ],
    numericTask: {
      prompt: 'Чему равна скорость течения x?',
      unit: 'км/ч',
      placeholder: 'Введи число',
      correctValue: 3,
      nextNodeId: 'ep6_verify',
      bossDamage: 15,
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Посмотри на уравнение 8x = 24. На сколько нужно умножить 8, чтобы получить 24?'
            : 'Найди неизвестный множитель делением: раздели произведение 24 на известный множитель 8.',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'arithmetic_check',
      }),
    },
  },

  ep6_verify: {
    id: 'ep6_verify',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Проверка шлюза подстановкой',
    mathTopic: 'Подстановка x = 3 в условие задачи',
    scene: 'temple',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    emotion: 'triumph',
    schematic: 'boss_river_ep6',
    schematicStep: 5,
    formulaDisplay: 'x = 3 км/ч',
    text: [
      '«Щит Тени Скобок разрушен! Проверим подстановкой, что при скорости течения 3 км/ч путь туда (3 · (12 + 3)) равен пути обратно (5 · (12 − 3))!»',
    ],
    verificationTask: {
      title: 'Проверка Реки Времени',
      prompt: 'Вычисли длину участка реки в обе стороны при x = 3:',
      fields: [
        {
          id: 'down',
          label: 'По течению: 3 · (12 + 3)',
          prefix: '3 · 15 =',
          suffix: 'км',
          correctValue: 45,
          placeholder: '?',
        },
        {
          id: 'up',
          label: 'Против течения: 5 · (12 − 3)',
          prefix: '5 · 9 =',
          suffix: 'км',
          correctValue: 45,
          placeholder: '?',
        },
      ],
      expectedSummary: '45 км = 45 км — шлюз синхронизирован, Тень Скобок повержена!',
      nextNodeId: 'ep6_transfer_intro',
      unlockLaw: 6,
      hintTier1:
        'По течению скорость 12 + 3 = 15 км/ч (за 3 часа), против течения — 12 − 3 = 9 км/ч (за 5 часов).',
      hintTier2:
        'Вычисли два произведения отдельно: 3 · 10 + 3 · 5 для пути по течению и 5 · 9 по таблице умножения для обратного пути.',
    },
  },

  // ==================== НЕЗАВИСИМАЯ ПРОВЕРКА ПЕРЕНОСА НАВЫКА ====================
  ep6_transfer_intro: {
    id: 'ep6_transfer_intro',
    episodeId: 'transfer',
    episodeTitle: 'Испытание Печати · Независимая проверка',
    mathTopic: 'Пять новых задач без подсказок',
    scene: 'temple',
    speaker: 'narrator',
    speakerName: 'Печать Портала',
    emotion: 'curious',
    schematic: 'none',
    text: [
      'Тень Скобок рассеялась, но на золотой арке Портала вспыхнули пять рунических печатей. Голос Храма произнёс: «Кодекс собран, но прежде чем вернуться домой, докажи, что умеешь самостоятельно строить математические модели и решать задачи».',
      'Впереди пять новых задач всех изученных типов — без подсказок Совы Пи. Каждую задачу можно решить алгебраически (составив уравнение с x) или арифметически (записав обоснованное выражение по действиям). Подробный разбор откроется после завершения всех пяти задач.',
    ],
    choices: [
      {
        id: 'start_transfer_check',
        label: 'Приступить к самостоятельной проверке (5 задач)',
        nextNodeId: 'ep6_transfer_1',
        isCorrect: true,
      },
    ],
  },

  ep6_transfer_1: {
    id: 'ep6_transfer_1',
    episodeId: 'transfer',
    episodeTitle: 'Независимая проверка · Задача 1 из 5',
    mathTopic: 'Встречное движение',
    scene: 'temple',
    speaker: 'narrator',
    speakerName: 'Печать I · Встречное движение',
    emotion: 'thoughtful',
    isIndependentCheck: true,
    transferCheckTopic: 'Встречное движение',
    schematic: 'none',
    text: [
      'Задача: Два велосипедиста одновременно выехали навстречу друг другу из двух посёлков, расстояние между которыми 50 км. Скорость первого — 4 км/ч, второго — 6 км/ч. Через сколько часов они встретятся?',
    ],
    equationBuilderTask: {
      equationPrompt: 'Запиши уравнение по условию (или переключись на арифметический способ):',
      answerPrompt: 'Итоговый ответ (время до встречи):',
      unit: 'ч',
      acceptedRoots: [5],
      correctAnswer: 5,
      tokenChips: ['x', '+', '−', '·', '/', '(', ')', '='],
      referenceModel: '4x + 6x = 50',
      referenceArithmetic: '50 / (4 + 6)',
      reviewExplanation:
        'За x ч первый проедет 4x км, второй — 6x км. Суммарный путь: 4x + 6x = 50 ⇒ 10x = 50 ⇒ x = 5 ч. Арифметически: скорость сближения 4 + 6 = 10 км/ч, время 50 : 10 = 5 ч.',
      nextNodeId: 'ep6_transfer_2',
      diagnoseWrongEquation: (root, norm) => {
        if (root !== null && Math.abs(root - 25) < 1e-3) return 'sign_transfer';
        if (norm.includes('24x') || (root !== null && Math.abs(root - 50 / 24) < 1e-3)) {
          return 'like_terms';
        }
        return 'expression_translation';
      },
    },
  },

  ep6_transfer_2: {
    id: 'ep6_transfer_2',
    episodeId: 'transfer',
    episodeTitle: 'Независимая проверка · Задача 2 из 5',
    mathTopic: 'Задачи «было — стало»',
    scene: 'temple',
    speaker: 'narrator',
    speakerName: 'Печать II · Было — стало',
    emotion: 'thoughtful',
    isIndependentCheck: true,
    transferCheckTopic: 'Задачи «было — стало»',
    schematic: 'none',
    text: [
      'Задача: В первой корзине было в 2 раза больше яблок, чем во второй. Когда из первой корзины взяли 10 яблок, а во вторую положили 14, яблок в корзинах стало поровну. Сколько яблок было во ВТОРОЙ корзине изначально?',
    ],
    equationBuilderTask: {
      equationPrompt: 'Запиши уравнение (принимаются обе модели — за x можно взять любую корзину) или арифметическое решение:',
      answerPrompt: 'Итоговый ответ (во второй корзине было):',
      unit: 'яблок',
      // Accepts both x = 2nd basket (root 24) AND x = 1st basket (x - 10 = x/2 + 14 => root 48)
      acceptedRoots: [24, 48],
      correctAnswer: 24,
      tokenChips: ['x', '+', '−', '·', '/', '(', ')', '='],
      referenceModel: '2x − 10 = x + 14 (или x − 10 = x/2 + 14)',
      referenceArithmetic: '10 + 14 (или (10 + 14) / (2 − 1))',
      reviewExplanation:
        'Если во второй корзине x яблок, то в первой 2x. После перестановки: 2x − 10 = x + 14 ⇒ x = 24. (Если за x взять первую корзину: x − 10 = x/2 + 14 ⇒ x = 48, значит во второй 48 : 2 = 24.) Проверка: 48 − 10 = 38 и 24 + 14 = 38.',
      nextNodeId: 'ep6_transfer_3',
      diagnoseWrongEquation: (root) => {
        if (root !== null && (Math.abs(root - 4) < 1e-3 || Math.abs(root - 8) < 1e-3)) {
          return 'sign_transfer';
        }
        return 'expression_translation';
      },
    },
  },

  ep6_transfer_3: {
    id: 'ep6_transfer_3',
    episodeId: 'transfer',
    episodeTitle: 'Независимая проверка · Задача 3 из 5',
    mathTopic: 'Два способа счёта',
    scene: 'temple',
    speaker: 'narrator',
    speakerName: 'Печать III · Двойной счёт',
    emotion: 'thoughtful',
    isIndependentCheck: true,
    transferCheckTopic: 'Двойной счёт',
    schematic: 'none',
    text: [
      'Задача: Если разложить конфеты по 4 в каждый пакет, останется 6 лишних конфет. А если раскладывать по 6 конфет в пакет, то для заполнения всех пакетов не хватит 4 конфет. Сколько всего пакетов?',
    ],
    equationBuilderTask: {
      equationPrompt: 'Запиши уравнение или арифметическое выражение для числа пакетов:',
      answerPrompt: 'Итоговый ответ (количество пакетов):',
      unit: 'пакетов',
      acceptedRoots: [5],
      correctAnswer: 5,
      tokenChips: ['x', '+', '−', '·', '/', '(', ')', '='],
      referenceModel: '4x + 6 = 6x − 4',
      referenceArithmetic: '(6 + 4) / (6 − 4)',
      reviewExplanation:
        'Пусть пакетов x. Число конфет двумя способами: 4x + 6 и 6x − 4. Приравниваем: 4x + 6 = 6x − 4 ⇒ 10 = 2x ⇒ x = 5 пакетов. Арифметически: разница на каждый пакет 6 − 4 = 2 конфеты, общая разница 6 + 4 = 10 конфет ⇒ 10 : 2 = 5. Проверка: 4·5 + 6 = 26 и 6·5 − 4 = 26.',
      nextNodeId: 'ep6_transfer_4',
      diagnoseWrongEquation: (root) => {
        if (root !== null && Math.abs(root - 1) < 1e-3) return 'sign_transfer';
        return 'expression_translation';
      },
    },
  },

  ep6_transfer_4: {
    id: 'ep6_transfer_4',
    episodeId: 'transfer',
    episodeTitle: 'Независимая проверка · Задача 4 из 5',
    mathTopic: 'Уравнение со скобками',
    scene: 'temple',
    speaker: 'narrator',
    speakerName: 'Печать IV · Раскрытие скобок',
    emotion: 'thoughtful',
    isIndependentCheck: true,
    transferCheckTopic: 'Раскрытие скобок',
    schematic: 'none',
    text: [
      'Задача: Моторная лодка прошла по течению реки за 2 часа то же расстояние, что и против течения за 3 часа. Собственная скорость лодки равна 10 км/ч. Найди скорость течения реки (в км/ч).',
    ],
    equationBuilderTask: {
      equationPrompt: 'Запиши уравнение со скобками (или раскрытую форму) либо арифметическое выражение:',
      answerPrompt: 'Итоговый ответ (скорость течения):',
      unit: 'км/ч',
      acceptedRoots: [2],
      correctAnswer: 2,
      tokenChips: ['x', '+', '−', '·', '/', '(', ')', '='],
      referenceModel: '2(10 + x) = 3(10 − x)',
      referenceArithmetic: '(3 · 10 − 2 · 10) / (2 + 3)',
      reviewExplanation:
        'Скорость по течению (10 + x), против течения (10 − x). Уравнение: 2(10 + x) = 3(10 − x) ⇒ 20 + 2x = 30 − 3x ⇒ 5x = 10 ⇒ x = 2 км/ч. Проверка: 2 · (10 + 2) = 24 км и 3 · (10 − 2) = 24 км.',
      nextNodeId: 'ep6_transfer_5',
      diagnoseWrongEquation: (root) => {
        // Common bracket-distribution traps:
        // 20 + x = 30 - x (root 5), 20 + x = 30 - 3x (root 2.5), 20 + 2x = 30 - x (root 10/3)
        if (
          root !== null &&
          (Math.abs(root - 5) < 1e-3 ||
            Math.abs(root - 2.5) < 1e-3 ||
            Math.abs(root - 10 / 3) < 1e-3)
        ) {
          return 'brackets_distribution';
        }
        if (root !== null && Math.abs(root - 10) < 1e-3) {
          return 'sign_transfer';
        }
        return 'expression_translation';
      },
    },
  },

  ep6_transfer_5: {
    id: 'ep6_transfer_5',
    episodeId: 'transfer',
    episodeTitle: 'Независимая проверка · Задача 5 из 5',
    mathTopic: 'Дробные коэффициенты и части целого',
    scene: 'temple',
    speaker: 'narrator',
    speakerName: 'Печать V · Дробные доли',
    emotion: 'thoughtful',
    isIndependentCheck: true,
    transferCheckTopic: 'Дробные коэффициенты',
    schematic: 'none',
    text: [
      'Задача: Турист прошёл в первый день 1/2 всего маршрута, во второй день — 1/6 всего маршрута, а в третий день — оставшиеся 12 км. Какова длина всего маршрута (в км)?',
    ],
    equationBuilderTask: {
      equationPrompt: 'Запиши уравнение с дробями (например, через x/2 и x/6) или арифметическое выражение:',
      answerPrompt: 'Итоговый ответ (длина всего маршрута):',
      unit: 'км',
      acceptedRoots: [36],
      correctAnswer: 36,
      tokenChips: ['x', '+', '−', '·', '/', '(', ')', '='],
      referenceModel: 'x/2 + x/6 + 12 = x',
      referenceArithmetic: '12 / (1 − 1/2 − 1/6)',
      reviewExplanation:
        'Пусть весь маршрут x км. Тогда x/2 + x/6 + 12 = x. Приводим к знаменателю 6: (3/6 + 1/6)x + 12 = x ⇒ (4/6)x + 12 = x ⇒ (2/6)x = 12 ⇒ (1/3)x = 12 ⇒ x = 36 км. Проверка: 18 + 6 + 12 = 36 км.',
      nextNodeId: 'ep6_transfer_review',
      diagnoseWrongEquation: (_root, norm) => {
        if (norm.includes('/')) return 'fractions_parts';
        return 'expression_translation';
      },
    },
  },

  ep6_transfer_review: {
    id: 'ep6_transfer_review',
    episodeId: 'transfer',
    episodeTitle: 'Итоговый разбор самостоятельной проверки',
    mathTopic: 'Анализ всех 5 задач и способов решения',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'encourage',
    isTransferReview: true,
    schematic: 'none',
    text: [
      'Все пять рунических печатей прошли проверку! Теперь можно спокойно разобрать каждое задание, сравнить алгебраический и арифметический способы и сверить свои модели с эталоном.',
    ],
    choices: [
      {
        id: 'finish_transfer_review',
        label: 'Перейти к Вратам Портала Домой',
        nextNodeId: 'ep6_final_stance',
        isCorrect: true,
      },
    ],
  },

  ep6_final_stance: {
    id: 'ep6_final_stance',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Врата Портала открыты',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    emotion: 'triumph',
    schematic: 'boss_river_ep6',
    schematicStep: 5,
    formulaDisplay: '45 км = 45 км',
    text: [
      'Ледяные цепи на золотом Портале Домой растаяли! Потоки Реки Времени пришли в идеальную гармонию.',
      '«Ты открыл все Шесть Великих Правил Кодекса Равновесия, Алёша. Перед тем как шагнуть в портал, скажи: чему главному научил тебя Остров Неизвестных?»',
    ],
    choices: [
      {
        id: 'stance_harmony',
        label: '«Видеть в каждой задаче гармонию и уравнение равновесия»',
        isCorrect: true,
        recordDecision: { ep6FinalStance: 'harmony' },
        triggerEnding: true,
      },
      {
        id: 'stance_courage',
        label: '«Не бояться сложных задач и доверять смелой логике»',
        isCorrect: true,
        recordDecision: { ep6FinalStance: 'courage' },
        triggerEnding: true,
      },
      {
        id: 'stance_precision',
        label: '«Быть внимательным к каждому знаку и всегда проверять ответ»',
        isCorrect: true,
        recordDecision: { ep6FinalStance: 'precision' },
        triggerEnding: true,
      },
    ],
  },
};
