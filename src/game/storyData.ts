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
        nextNodeId: 'prologue_2',
        isCorrect: true,
        recordDecision: { ep6FinalStance: 'precision' },
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
    mathTopic: 'x + 25 = 78',
    scene: 'forest',
    speaker: 'alyosha',
    speakerName: 'Алёша',
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
          'Запись 25x означает умножение (25 мешков по x камней). На чаше один мешок (x) и ещё 25 камней — это сложение: x + 25.',
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
          'Знак минус уменьшает величину. У нас к мешку добавлены 25 камней россыпью, поэтому правильно писать x + 25.',
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
      placeholder: 'Например: 53',
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
            'Вычти по разрядам: 70 − 20 = 50, а 8 − 5 = 3. Вместе получается 53!',
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
    mathTopic: 'Проверка: 53 + 25 = 78',
    scene: 'forest',
    speaker: 'alyosha',
    speakerName: 'Алёша',
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
          placeholder: '78',
        },
      ],
      expectedSummary: 'Левая чаша = 78, Правая чаша = 78',
      nextNodeId: 'ep1_outro',
      unlockLaw: 1,
      hintTier1: 'Сложи 53 и 25: должно получиться то же число, что лежит на правой чаше весов.',
      hintTier2: '53 + 25 = 78. Левая чаша (78) равна правой чаше (78), значит корень x = 53 найден верно!',
    },
  },

  ep1_outro: {
    id: 'ep1_outro',
    episodeId: 'ep1',
    episodeTitle: 'Эпизод 1 пройден · Мост опущен',
    scene: 'forest',
    speaker: 'narrator',
    speakerName: 'Хроника',
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
    ],
  },

  ep2_step1_gnome1: {
    id: 'ep2_step1_gnome1',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Выражение пути',
    mathTopic: 'S = v · t',
    scene: 'tunnel',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'tunnel_ep2',
    schematicStep: 1,
    text: [
      '«Пусть гномы работают до встречи x часов. Вспомни формулу пути (можешь подвигать ползунок времени на схеме слева!)».',
      'Сколько метров прокопает за x часов ПЕРВЫЙ гном (его скорость 2 м/ч)?',
    ],
    choices: [
      {
        id: 'ep2_g1_add',
        label: '2 + x',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Проверь на модели слева: за 1 час гном проходит 2 м, за 2 часа — 4 м, за 3 часа — 6 м. Какое действие связывает скорость 2 и время x?',
        hintTier2:
          'Чтобы найти путь S, нужно скорость умножить на время (S = v · t). Поэтому за x часов гном пройдёт 2 · x, то есть 2x метров.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep2_g1_ok',
        label: '2x',
        nextNodeId: 'ep2_step2_gnome2',
        isCorrect: true,
      },
    ],
  },

  ep2_step2_gnome2: {
    id: 'ep2_step2_gnome2',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 · Общее уравнение встречи',
    mathTopic: '2x + 3x = 120',
    scene: 'tunnel',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    schematic: 'tunnel_ep2',
    schematicStep: 2,
    formulaDisplay: '2x + 3x = 120',
    text: [
      '«Первый гном прокопает 2x метров, а второй (со скоростью 3 м/ч) — 3x метров. В момент встречи вместе они пройдут весь тоннель длиной 120 метров: 2x + 3x = 120».',
      'Посмотри на левую часть уравнения. Как упростить выражение 2x + 3x?',
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
          'Ты перемножил числа 2 и 3 вместо сложения! При приведении подобных слагаемых коэффициенты складываются: 2x + 3x = (2 + 3)x = 5x.',
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
          'Без неизвестного x мы потеряем время! Складываются коэффициенты, а буквенная часть сохраняется: 2x + 3x = 5x.',
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
    mathTopic: '5x = 120',
    scene: 'tunnel',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'tunnel_ep2',
    schematicStep: 3,
    formulaDisplay: '5x = 120',
    text: [
      '«Верно! За каждый час гномы сближаются на 2 + 3 = 5 метров».',
      'Реши уравнение 5x = 120 и введи в пульт, через сколько часов они встретятся (можешь проверить на симуляторе слева)!',
    ],
    numericTask: {
      prompt: 'Чему равен x в уравнении 5x = 120?',
      unit: 'часов',
      placeholder: 'Например: 24',
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
              'Чтобы найти неизвестный множитель x в уравнении 5x = 120, нужно произведение 120 РАЗДЕЛИТЬ на 5.',
            speaker: 'pi',
            integrityDelta: -10,
            category: 'expression_translation',
          };
        }
        if (attempt === 1) {
          return {
            feedback:
              'Проверь деление 120 : 5. Подсказка: раздели 100 на 5, а затем оставшиеся 20 на 5.',
            speaker: 'pi',
            integrityDelta: -10,
            category: 'arithmetic_check',
          };
        }
        return {
          feedback: '100 : 5 = 20, и 20 : 5 = 4. Итого x = 24 часа!',
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
    mathTopic: '2·24 + 3·24 = 120',
    scene: 'tunnel',
    speaker: 'gnome1',
    speakerName: 'Гном-рудокоп I',
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
          placeholder: '48',
        },
        {
          id: 'g2',
          label: 'Путь второго гнома (3 · 24)',
          prefix: '3 · 24 =',
          suffix: 'м',
          correctValue: 72,
          placeholder: '72',
        },
      ],
      expectedSummary: '48 + 72 = 120 м — гномы встретились ровно в точке стыковки!',
      nextNodeId: 'ep2_outro',
      unlockLaw: 2,
      completeDistrict: 'ep2_tunnel',
      hintTier1:
        'Умножь скорости 2 и 3 на найденное время 24 часа. Сумма двух чисел должна дать 120 метров.',
      hintTier2:
        '2 · 24 = 48 м, а 3 · 24 = 72 м. Проверяем: 48 + 72 = 120 м!',
    },
  },

  ep2_outro: {
    id: 'ep2_outro',
    episodeId: 'ep2',
    episodeTitle: 'Эпизод 2 пройден · Тоннель открыт',
    scene: 'tunnel',
    speaker: 'gnome2',
    speakerName: 'Гном-рудокоп II',
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
    mathTopic: 'Задачи «было — стало» · Перенос слагаемых',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
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
        isCorrect: false,
        mistakeCategory: 'unknown_designation',
        hintTier1:
          'Подумай: если большая полка — это x, то как записать вторую, которая в 3 раза меньше? Появится ли деление (x : 3)?',
        hintTier2:
          'Если первая полка в 3 раза больше, то вторую придётся записывать дробью (x : 3). Гораздо удобнее принять за x МЕНЬШУЮ величину — вторую полку, тогда первая просто 3x!',
        feedbackSpeaker: 'pi',
        integrityDelta: -5,
        recordDecision: { ep3TriedFirstShelfAsX: true },
      },
      {
        id: 'ep3_choose_second',
        label: 'Принять за x меньшую величину — вторую полку',
        nextNodeId: 'ep3_step2_table',
        isCorrect: true,
      },
    ],
  },

  ep3_step2_table: {
    id: 'ep3_step2_table',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Таблица «Было — Стало»',
    mathTopic: 'Составление математической модели',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'archive_table_ep3',
    schematicStep: 2,
    text: [
      '«Отличный выбор! Пусть на второй полке изначально было x свитков».',
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
          hintTier2: '«В 3 раза больше» — это умножение на 3, то есть 3x.',
        },
        {
          id: 'shelf1_after',
          label: 'Первая полка СТАЛО (сняли 16 свитков)',
          options: ['3x − 16', '3x + 16', '16 − 3x'],
          correctOption: '3x − 16',
          hintTier1: 'На первой полке было 3x свитков. Из них забрали 16 — что из чего нужно вычитать?',
          hintTier2: 'Если со 1-й полки сняли 16 свитков, из 3x нужно вычесть 16: 3x − 16.',
        },
        {
          id: 'shelf2_after',
          label: 'Вторая полка СТАЛО (добавили 22 свитка)',
          options: ['x − 22', '22x', 'x + 22'],
          correctOption: 'x + 22',
          hintTier1: 'На вторую полку к x свиткам поставили ещё 22 свитка. Какой знак поставим?',
          hintTier2: 'На вторую полку добавили 22 свитка, значит стало x + 22.',
        },
      ],
    },
  },

  ep3_step3_transfer: {
    id: 'ep3_step3_transfer',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Перенос слагаемых',
    mathTopic: '3x − 16 = x + 22',
    scene: 'archive',
    speaker: 'pi',
    speakerName: 'Сова Пи',
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
          'Ты забыл поменять знак при переносе числа −16 в правую часть! При переходе через «=» минус становится плюсом: 3x − x = 22 + 16.',
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
    mathTopic: '3x − x = 22 + 16',
    scene: 'archive',
    speaker: 'alyosha',
    speakerName: 'Алёша',
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
        },
        {
          id: 'rhs',
          label: 'Сумма справа (22 + 16)',
          prefix: '=',
          correctValue: 38,
          placeholder: '?',
        },
      ],
      nextNodeId: 'ep3_step4_dual_solve',
      mistakeCategory: 'like_terms',
      hintTier1:
        'Вспомни: перед одиночным x стоит коэффициент 1 (3x − 1x). Справа просто сложи 22 и 16.',
      hintTier2:
        '3x − x = (3 − 1)x = 2x, а справа 22 + 16 = 38. В итоге уравнение упрощается до 2x = 38.',
    },
  },

  ep3_step4_dual_solve: {
    id: 'ep3_step4_dual_solve',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 · Полный ответ реестра',
    mathTopic: '2x = 38',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
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
                ? 'Проверь, какую полку мы обозначили за x! x = 19 — это вторая (меньшая) полка, а не первая.'
                : 'Ты вписал 19 вместо первой полки! Вторая полка равна x = 19, а первая была в 3 раза больше: 3 · 19 = 57.',
            speaker: 'archivist',
            category: 'unknown_designation',
          };
        }
        if (second === 19 && first !== 57) {
          return {
            feedback:
              attempt === 1
                ? 'Вторая полка (x = 19) найдена верно! По условию на первой было в 3 раза больше свитков — пересчитай 3 · 19.'
                : 'Умножь 19 на 3 аккуратно: 10 · 3 = 30, 9 · 3 = 27. Вместе 57!',
            speaker: 'archivist',
            category: 'arithmetic_check',
          };
        }
        return {
          feedback:
            attempt === 1
              ? 'Сначала найди x из 2x = 38 (раздели 38 на 2), это будет вторая полка. А затем умножь на 3 для первой.'
              : 'x = 38 : 2 = 19 (вторая полка), а первая полка: 3 · 19 = 57.',
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
    mathTopic: '57 − 16 = 19 + 22',
    scene: 'archive',
    speaker: 'archivist',
    speakerName: 'Хранитель Архива',
    schematic: 'archive_table_ep3',
    schematicStep: 5,
    formulaDisplay: '57 и 19 свитков',
    text: [
      '«Прежде чем я отопру потайную дверь, проверь себя подстановкой: действительно ли на обеих полках после перестановки станет поровну?»',
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
          placeholder: '41',
        },
        {
          id: 's2',
          label: 'Вторая полка (19 + 22)',
          prefix: '19 + 22 =',
          correctValue: 41,
          placeholder: '41',
        },
      ],
      expectedSummary: '41 = 41 — симметрия хранилища восстановлена!',
      nextNodeId: 'ep3_outro',
      unlockLaw: 3,
      completeDistrict: 'ep3_archive',
      hintTier1:
        'Выполни действия для каждой полки: из 57 вычти 16, а к 19 прибавь 22. Должны получиться одинаковые числа!',
      hintTier2: '57 − 16 = 41 и 19 + 22 = 41. Поскольку 41 = 41, задача решена безупречно!',
    },
  },

  ep3_outro: {
    id: 'ep3_outro',
    episodeId: 'ep3',
    episodeTitle: 'Эпизод 3 пройден · Симметрия Архива',
    scene: 'archive',
    speaker: 'narrator',
    speakerName: 'Хроника',
    schematic: 'archive_table_ep3',
    schematicStep: 5,
    formulaDisplay: '57 − 16 = 41  и  19 + 22 = 41',
    text: [
      'Проверка сходится идеально: 41 = 41! Полки Архива с тихим гулом выравниваются, а парящие свитки складываются в аккуратные ряды.',
      'В Кодексе загорелась Запись №3: «В задачах "было — стало" за x бери меньшую величину, а при переносе слагаемого через знак равенства всегда меняй его знак на противоположный».',
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
    ],
  },

  ep4_step1_parts: {
    id: 'ep4_step1_parts',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Сборка долей',
    mathTopic: '(1/3)x + (1/4)x + 20 = x',
    scene: 'crystals',
    speaker: 'alyosha',
    speakerName: 'Алёша',
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
          '1/3 и 1/4 — это доли ОТ ВСЕЙ коллекции x, поэтому их нужно умножить на x: (1/3)x + (1/4)x + 20 = x.',
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
    mathTopic: 'Сложение дробей (1/3)x и (1/4)x',
    scene: 'crystals',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'crystals_ep4',
    schematicStep: 3,
    formulaDisplay: '(1/3)x + (1/4)x + 20 = x',
    text: [
      '«Чтобы сложить дроби (1/3)x и (1/4)x, приведём их к наименьшему общему знаменателю (можешь поэкспериментировать со шкалой долей слева!)».',
      'Какое наименьшее натуральное число делится без остатка и на 3, и на 4?',
    ],
    numericTask: {
      prompt: 'Введи наименьший общий знаменатель для 3 и 4:',
      placeholder: 'Например: 12',
      correctValue: 12,
      nextNodeId: 'ep4_step3_branch',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Подумай, какое самое маленькое число встречается в таблицах умножения и на 3, и на 4.'
            : 'Так как 3 и 4 не имеют общих делителей кроме 1, их наименьший общий знаменатель равен 3 · 4 = 12.',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'fractions_parts',
      }),
    },
  },

  ep4_step3_branch: {
    id: 'ep4_step3_branch',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Выбор пути рассуждения',
    mathTopic: '(7/12)x + 20 = x',
    scene: 'crystals',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'crystals_ep4',
    schematicStep: 4,
    formulaDisplay: '(7/12)x + 20 = x',
    text: [
      '«Прекрасно! (4/12)x + (3/12)x = (7/12)x. Получаем уравнение: (7/12)x + 20 = x».',
      'К этому шагу можно подойти двумя разными способами. Какой путь объяснения тебе ближе — этот выбор отразится на твоём стиле Мастера!',
    ],
    choices: [
      {
        id: 'ep4_path_algebra',
        label: 'Алгебраический путь: представить x как (12/12)x и перенести (7/12)x',
        nextNodeId: 'ep4_step4_algebraic',
        isCorrect: true,
        recordDecision: { ep4Method: 'algebraic' },
      },
      {
        id: 'ep4_path_logic',
        label: 'Логический путь: узнать, какая доля от целого осталась на зелёные кристаллы',
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
    mathTopic: '(5/12)x = 20',
    scene: 'crystals',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    schematic: 'crystals_ep4',
    schematicStep: 4,
    formulaDisplay: '20 = (12/12)x − (7/12)x  ⇒  (5/12)x = 20',
    text: [
      '«Запишем x как (12/12)x и вычтем (7/12)x: остаётся (5/12)x = 20».',
      'Сколько всего кристаллов в пещере? Найди целое x (вспомни: 5 двенадцатых — это 20)!',
    ],
    numericTask: {
      prompt: 'Введи общее количество кристаллов x:',
      unit: 'кристаллов',
      placeholder: 'Например: 48',
      correctValue: 48,
      nextNodeId: 'ep4_verify',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Если 5 долей равны 20 кристаллам, то сколько кристаллов в ОДНОЙ доле (1/12)? А потом умножь на все 12 долей.'
            : '20 : 5 = 4 кристалла в одной доле (1/12). Всего долей 12, значит 4 · 12 = 48!',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'fractions_parts',
      }),
    },
  },

  ep4_step4_logical: {
    id: 'ep4_step4_logical',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Логика долей',
    mathTopic: '(5/12)x = 20',
    scene: 'crystals',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'crystals_ep4',
    schematicStep: 4,
    formulaDisplay: '1 − 7/12 = 5/12 (доля зелёных = 20 шт.)',
    text: [
      '«Мудрый взгляд! Синие и красные вместе занимают 7/12 коллекции. Значит, зелёным достаётся 1 − 7/12 = 5/12 всей коллекции — и их ровно 20 штук!»',
      'Раз 5 долей — это 20 кристаллов, сколько всего кристаллов во всех 12 долях?',
    ],
    numericTask: {
      prompt: 'Введи общее количество кристаллов x:',
      unit: 'кристаллов',
      placeholder: 'Например: 48',
      correctValue: 48,
      nextNodeId: 'ep4_verify',
      mistakeCategory: 'fractions_parts',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Посмотри на шкалу слева: 5 зелёных кусочков дают 20 кристаллов. Сколько кристаллов в одном кусочке?'
            : 'Одна часть: 20 : 5 = 4. Во всей коллекции 12 таких частей: 4 · 12 = 48!',
        speaker: 'pi',
        integrityDelta: -10,
        category: 'fractions_parts',
      }),
    },
  },

  ep4_verify: {
    id: 'ep4_verify',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 · Проверка кристаллов по цветам',
    mathTopic: '16 + 12 + 20 = 48',
    scene: 'crystals',
    speaker: 'guardian',
    speakerName: 'Хранитель Пещер',
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
          placeholder: '16',
        },
        {
          id: 'red',
          label: 'Красные (¼ от 48)',
          prefix: '48 : 4 =',
          correctValue: 12,
          placeholder: '12',
        },
      ],
      expectedSummary: '16 + 12 + 20 = 48 — вся коллекция сошлась!',
      nextNodeId: 'ep4_outro',
      unlockLaw: 4,
      completeDistrict: 'ep4_crystals',
      hintTier1: 'Раздели 48 на 3 (для синих) и 48 на 4 (для красных). С зелёными (20) в сумме должно выйти 48.',
      hintTier2: 'Синих: 48 : 3 = 16, красных: 48 : 4 = 12. Проверяем: 16 + 12 + 20 = 48!',
    },
  },

  ep4_outro: {
    id: 'ep4_outro',
    episodeId: 'ep4',
    episodeTitle: 'Эпизод 4 пройден · Радуга Призмы',
    scene: 'crystals',
    speaker: 'narrator',
    speakerName: 'Хроника',
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
    ],
  },

  ep5_step1_way1: {
    id: 'ep5_step1_way1',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Первый и второй способы счёта',
    mathTopic: '5x + 10 = 7x − 4',
    scene: 'city',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'city_chests_ep5',
    schematicStep: 2,
    text: [
      '«По первому способу: в x сундуках по 5 монет (5x) да ещё 10 лишних рядом — всего (5x + 10) монет».',
      'А как записать общее число монет ВТОРЫМ способом: по 7 монет в x сундуках, но 4 монет НЕ ХВАТАЕТ?',
    ],
    choices: [
      {
        id: 'ep5_way2_wrong',
        label: '7x + 4',
        isCorrect: false,
        mistakeCategory: 'expression_translation',
        hintTier1:
          'Подумай: 7x — это столько монет, сколько нужно для ПОЛНОГО заполнения всех сундуков. Если 4 монет не хватает, их больше 7x или меньше 7x?',
        hintTier2:
          'Ошиб-ка! У нас дефицит! Четырёх монет НЕ ХВАТАЕТ до полного комплекта — их нужно вычесть: 7x − 4.',
        feedbackSpeaker: 'captain',
        integrityDelta: -10,
      },
      {
        id: 'ep5_way2_ok',
        label: '7x − 4',
        nextNodeId: 'ep5_step2b_scratchpad',
        isCorrect: true,
      },
    ],
  },

  ep5_step2b_scratchpad: {
    id: 'ep5_step2b_scratchpad',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Черновик уравнения',
    mathTopic: '5x + 10 = 7x − 4',
    scene: 'city',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    schematic: 'city_chests_ep5',
    schematicStep: 3,
    formulaDisplay: '5x + 10 = 7x − 4',
    text: [
      '«Приравниваем оба выражения: 5x + 10 = 7x − 4. Перенесём x вправо (чтобы не получить минус), а числа влево: 10 + 4 = 7x − 5x».',
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
        },
        {
          id: 'rhs_coef',
          label: 'Коэффициент справа (7x − 5x)',
          prefix: '=',
          suffix: 'x',
          correctValue: 2,
          placeholder: '?',
        },
      ],
      nextNodeId: 'ep5_step3_solve_chests',
      mistakeCategory: 'like_terms',
      hintTier1: 'Сложи 10 и 4 для левой части, а справа вычти 5x из 7x.',
      hintTier2: '10 + 4 = 14, а 7x − 5x = 2x. Получаем простое уравнение 14 = 2x.',
    },
  },

  ep5_step3_solve_chests: {
    id: 'ep5_step3_solve_chests',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 · Поиск числа сундуков',
    mathTopic: '14 = 2x',
    scene: 'city',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    schematic: 'city_chests_ep5',
    schematicStep: 3,
    formulaDisplay: '14 = 2x',
    text: [
      '«Можешь проверить на счётчике сундуков слева, при каком x оба способа дают одинаковое число монет!»',
      'Сколько же сундуков у автоматонов?',
    ],
    numericTask: {
      prompt: 'Введи количество сундуков x:',
      unit: 'сундуков',
      placeholder: 'Например: 7',
      correctValue: 7,
      nextNodeId: 'ep5_step4_coins',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Посмотри на уравнение 2x = 14. Раздели 14 на 2.'
            : '14 : 2 = 7. У автоматонов ровно 7 сундуков!',
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
    mathTopic: '5 · 7 + 10 = ?',
    scene: 'city',
    speaker: 'captain',
    speakerName: 'Капитан Автоматонов',
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
      placeholder: 'Например: 45',
      correctValue: 45,
      nextNodeId: 'ep5_step5_verify',
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Помни о порядке действий: сначала умножь 5 на 7, а затем прибавь 10.'
            : '5 · 7 = 35, и 35 + 10 = 45 монет!',
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
    mathTopic: '7 · 7 − 4 = 45',
    scene: 'city',
    speaker: 'pi',
    speakerName: 'Сова Пи',
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
    mathTopic: '7 · 7 − 4 = 45',
    scene: 'city',
    speaker: 'captain',
    speakerName: 'Капитан Автоматонов',
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
          placeholder: '45',
        },
      ],
      expectedSummary: '45 = 45 — оба способа дали одинаковый результат!',
      nextNodeId: 'ep5_outro',
      unlockLaw: 5,
      completeDistrict: 'ep5_city',
      recordDecision: { ep5VerificationDone: true },
      hintTier1: 'Сначала умножь 7 на 7, а затем вычти 4 недостающие монеты.',
      hintTier2: '7 · 7 = 49, и 49 − 4 = 45 монет. Оба способа сошлись!',
    },
  },

  ep5_outro: {
    id: 'ep5_outro',
    episodeId: 'ep5',
    episodeTitle: 'Эпизод 5 пройден · Город ожил',
    scene: 'city',
    speaker: 'narrator',
    speakerName: 'Хроника',
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
    schematic: 'boss_river_ep6',
    schematicStep: 2,
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
          'Наоборот! ПО течению река подталкивает катер (12 + x), а ПРОТИВ течения тормозит (12 − x).',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_spd_ok',
        label: 'По течению: (12 + x), против течения: (12 − x)',
        nextNodeId: 'ep6_phase2_equation',
        isCorrect: true,
        bossDamage: 25,
      },
    ],
  },

  ep6_phase2_equation: {
    id: 'ep6_phase2_equation',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Фаза 2: Уравнение со скобками',
    mathTopic: '3(12 + x) = 5(12 − x)',
    scene: 'temple',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    schematic: 'boss_river_ep6',
    schematicStep: 3,
    formulaDisplay: '3(12 + x) = 5(12 − x)',
    text: [
      '«За 3 часа по течению катер прошёл 3(12 + x) км, а за 5 часов обратно — 5(12 − x) км. Участок реки один и тот же, поэтому расстояния равны: 3(12 + x) = 5(12 − x)!»',
      'Тень Скобок сжимает выражение! Примени распределительный закон умножения — как правильно раскрыть скобки?',
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
          'Тень Скобок смеётся: множитель перед скобкой умножается на КАЖДОЕ слагаемое внутри! 3 · x = 3x и 5 · x = 5x.',
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
          'В правой скобке стоял знак МИНУС! Пять умножить на минус икс будет МИНУС 5x: 36 + 3x = 60 − 5x.',
        feedbackSpeaker: 'pi',
        integrityDelta: -10,
      },
      {
        id: 'ep6_strike_ok',
        label: '36 + 3x = 60 − 5x',
        nextNodeId: 'ep6_phase3b_scratchpad',
        isCorrect: true,
        bossDamage: 50,
      },
    ],
  },

  ep6_phase3b_scratchpad: {
    id: 'ep6_phase3b_scratchpad',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Черновик решающего удара',
    mathTopic: '3x + 5x = 60 − 36',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'boss_river_ep6',
    schematicStep: 4,
    formulaDisplay: '3x + 5x = 60 − 36',
    text: [
      '«Щит Тени Скобок треснул! Переносим иксы влево, числа вправо со сменой знака: 3x + 5x = 60 − 36. Заполни черновик упрощения!»',
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
        },
        {
          id: 'rhs',
          label: 'Разность справа (60 − 36)',
          prefix: '=',
          correctValue: 24,
          placeholder: '?',
        },
      ],
      nextNodeId: 'ep6_phase4_solve',
      mistakeCategory: 'like_terms',
      hintTier1: 'Сложи коэффициенты 3 и 5 слева, а справа вычти 36 из 60.',
      hintTier2: '3x + 5x = 8x, а 60 − 36 = 24. Получаем 8x = 24!',
    },
  },

  ep6_phase4_solve: {
    id: 'ep6_phase4_solve',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Фаза 3: Скорость течения',
    mathTopic: '8x = 24',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
    schematic: 'boss_river_ep6',
    schematicStep: 4,
    formulaDisplay: '8x = 24',
    text: [
      '«Уравнение готово: 8x = 24! Введи финальное значение скорости течения Реки Времени в центральный механизм шлюза!»',
    ],
    numericTask: {
      prompt: 'Чему равна скорость течения x?',
      unit: 'км/ч',
      placeholder: 'Например: 3',
      correctValue: 3,
      nextNodeId: 'ep6_verify',
      bossDamage: 25,
      mistakeCategory: 'arithmetic_check',
      evaluateWrong: (_val, attempt) => ({
        feedback:
          attempt === 1
            ? 'Посмотри на уравнение 8x = 24. На сколько нужно умножить 8, чтобы получить 24?'
            : 'Реши 8x = 24 делением: 24 : 8 = 3 км/ч!',
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
    mathTopic: '3(12+3) = 5(12−3)',
    scene: 'temple',
    speaker: 'alyosha',
    speakerName: 'Алёша',
    schematic: 'boss_river_ep6',
    schematicStep: 5,
    formulaDisplay: 'x = 3 км/ч',
    text: [
      '«Последняя проверка перед открытием Портала! Подставь скорость течения 3 км/ч и проверь, что путь туда (3 · (12 + 3)) равен пути обратно (5 · (12 − 3))!»',
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
          placeholder: '45',
        },
        {
          id: 'up',
          label: 'Против течения: 5 · (12 − 3)',
          prefix: '5 · 9 =',
          suffix: 'км',
          correctValue: 45,
          placeholder: '45',
        },
      ],
      expectedSummary: '45 км = 45 км — шлюз синхронизирован, Тень Скобок повержена!',
      nextNodeId: 'ep6_final_stance',
      unlockLaw: 6,
      hintTier1:
        'По течению скорость 12 + 3 = 15 км/ч (за 3 часа), против течения — 12 − 3 = 9 км/ч (за 5 часов).',
      hintTier2:
        '3 · 15 = 45 км и 5 · 9 = 45 км. Расстояния совпали!',
    },
  },

  ep6_final_stance: {
    id: 'ep6_final_stance',
    episodeId: 'ep6',
    episodeTitle: 'Эпизод 6 · Врата Портала открыты',
    scene: 'temple',
    speaker: 'pi',
    speakerName: 'Сова Пи',
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
