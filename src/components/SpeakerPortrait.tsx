import { Compass, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useId, useState } from 'react';
import { getSpeakerPortrait, SPEAKER_META } from '../game/codexData';
import type { SpeakerEmotion, SpeakerId } from '../game/types';

interface SpeakerPortraitProps {
  speaker: SpeakerId;
  mood?: SpeakerEmotion;
  emotion?: SpeakerEmotion;
  variant?: 'inline' | 'popout';
  compact?: boolean;
}

const EMOTION_STYLE: Record<
  SpeakerEmotion,
  {
    border: string;
    rimTop: string;
    rimBottom: string;
    outline: string;
    label: string;
  }
> = {
  neutral: {
    border: 'border-[#e5b34f]',
    rimTop: '#fad26e',
    rimBottom: '#cf881f',
    outline: '#7f490c',
    label: 'Спокойствие',
  },
  surprised: {
    border: 'border-[#f5b83d]',
    rimTop: '#ffe07d',
    rimBottom: '#d97817',
    outline: '#853c09',
    label: 'Удивление',
  },
  thoughtful: {
    border: 'border-[#54a6bd]',
    rimTop: '#9ae2f2',
    rimBottom: '#3c8da6',
    outline: '#164d61',
    label: 'Задумчивость',
  },
  curious: {
    border: 'border-[#e5b34f]',
    rimTop: '#fad26e',
    rimBottom: '#cf881f',
    outline: '#7f490c',
    label: 'Поиск решения',
  },
  encourage: {
    border: 'border-[#33a88d]',
    rimTop: '#73edd0',
    rimBottom: '#1c8c72',
    outline: '#0d4e3f',
    label: 'Поддержка',
  },
  alert: {
    border: 'border-[#e3732b]',
    rimTop: '#ffb36b',
    rimBottom: '#c95514',
    outline: '#782d06',
    label: 'Внимание',
  },
  triumph: {
    border: 'border-[#f6c959]',
    rimTop: '#fff0a6',
    rimBottom: '#d48d18',
    outline: '#7f490c',
    label: 'Равновесие',
  },
};

/**
 * Arched storybook crest cartouche path (216x148):
 * Wide horizontal storybook window with a graceful domed top crest
 * so the character's head/hair rises proud above the top dialog rail.
 */
const ARCHED_CARTOUCHE_PATH = [
  'M 22 22',
  'L 50 22',
  'C 65 22, 74 4, 108 4',
  'C 142 4, 151 22, 166 22',
  'L 194 22',
  'Q 212 22 212 40',
  'L 212 126',
  'Q 212 144 194 144',
  'L 22 144',
  'Q 4 144 4 126',
  'L 4 40',
  'Q 4 22 22 22',
  'Z',
].join(' ');

export function SpeakerPortrait({
  speaker,
  mood,
  emotion,
  variant = 'popout',
  compact = false,
}: SpeakerPortraitProps) {
  const activeEmotion: SpeakerEmotion = emotion ?? mood ?? 'neutral';
  const portraitSrc = getSpeakerPortrait(speaker, activeEmotion);
  const [imgFailed, setImgFailed] = useState(false);
  const uid = useId().replace(/:/g, '');

  useEffect(() => {
    setImgFailed(false);
  }, [portraitSrc]);

  const meta = SPEAKER_META[speaker];
  const emotionStyle = EMOTION_STYLE[activeEmotion];
  const isPopout = variant === 'popout';

  const portraitContent =
    portraitSrc && !imgFailed ? (
      <img
        src={portraitSrc}
        alt={`${meta.name} (${emotionStyle.label})`}
        referrerPolicy="no-referrer"
        onError={() => setImgFailed(true)}
        className={`h-full w-full scale-[1.12] object-cover object-top select-none ${
          speaker === 'gnome2' ? 'hue-rotate-[-12deg] saturate-[0.95]' : ''
        }`}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#164b64] via-[#10384c] to-[#0a2736] pt-3">
        {speaker === 'narrator' ? (
          <div className="flex flex-col items-center gap-1">
            <Compass
              className={
                isPopout ? 'h-12 w-12 text-[#f6c959]' : 'h-7 w-7 text-[#f6c959]'
              }
            />
            {isPopout && (
              <span className="font-math text-[11px] font-bold tracking-widest text-[#fae2a4]">
                ХРОНИКА
              </span>
            )}
          </div>
        ) : speaker === 'shadow' ? (
          <ShieldAlert className="h-11 w-11 text-amber-300" />
        ) : (
          <span
            className="font-display text-3xl font-extrabold"
            style={{ color: meta.accent }}
          >
            {meta.shortGlyph}
          </span>
        )}
      </div>
    );

  if (!isPopout) {
    return (
      <motion.div
        key={`${speaker}-${activeEmotion}`}
        initial={{ opacity: 0.85, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        title={`${meta.name} · ${emotionStyle.label}`}
        data-speaker={speaker}
        data-emotion={activeEmotion}
        data-sprite={portraitSrc ?? 'svg'}
        className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 bg-[#10384c] shadow-md sm:h-14 sm:w-14 ${emotionStyle.border}`}
      >
        {portraitContent}
      </motion.div>
    );
  }

  // Sculpted arched-crest storybook cartouche tucked into the top-right corner of the dialog card
  const popoutSizeClass = compact
    ? 'h-[86px] w-[126px] sm:h-[122px] sm:w-[178px] lg:h-[132px] lg:w-[192px]'
    : 'h-[88px] w-[128px] sm:h-[132px] sm:w-[192px] lg:h-[146px] lg:w-[214px]';

  return (
    <motion.div
      key={`${speaker}-${activeEmotion}`}
      initial={{ opacity: 0.88, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      title={`${meta.name} · ${emotionStyle.label}`}
      data-speaker={speaker}
      data-emotion={activeEmotion}
      data-sprite={portraitSrc ?? 'svg'}
      className={`relative shrink-0 overflow-visible select-none ${popoutSizeClass}`}
    >
      <svg
        viewBox="0 0 216 148"
        className="block h-full w-full overflow-visible drop-shadow-[0_12px_24px_rgba(5,20,32,0.56)]"
      >
        <defs>
          <clipPath id={`portrait-clip-${uid}`}>
            <path d={ARCHED_CARTOUCHE_PATH} />
          </clipPath>
          <linearGradient
            id={`portrait-rim-${uid}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={emotionStyle.rimTop} />
            <stop offset="100%" stopColor={emotionStyle.rimBottom} />
          </linearGradient>
        </defs>

        {/* Outer umber contour for crisp separation against painted scenes */}
        <path
          d={ARCHED_CARTOUCHE_PATH}
          fill="#10384c"
          stroke={emotionStyle.outline}
          strokeWidth="6.5"
          strokeLinejoin="round"
        />

        {/* Character artwork clipped cleanly into the arched storybook crest */}
        <foreignObject
          x="0"
          y="0"
          width="216"
          height="148"
          clipPath={`url(#portrait-clip-${uid})`}
        >
          <div className="h-full w-full bg-[#10384c]">{portraitContent}</div>
        </foreignObject>

        {/* Soft inner vignette along the arched frame edge */}
        <path
          d={ARCHED_CARTOUCHE_PATH}
          fill="none"
          stroke="#061d2b"
          strokeOpacity="0.34"
          strokeWidth="6"
          clipPath={`url(#portrait-clip-${uid})`}
        />

        {/* Golden double bezel rim */}
        <path
          d={ARCHED_CARTOUCHE_PATH}
          fill="none"
          stroke={`url(#portrait-rim-${uid})`}
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Crisp sunlit cream inner highlight */}
        <path
          d={ARCHED_CARTOUCHE_PATH}
          fill="none"
          stroke="#fff7e2"
          strokeOpacity="0.6"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
