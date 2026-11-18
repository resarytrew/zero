import { Compass, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
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
  { border: string; badgeBg: string; label: string }
> = {
  neutral: {
    border: 'border-[#e5b34f]',
    badgeBg: 'bg-[#0d3549] border-[#e5b34f] text-[#f6c959]',
    label: 'Спокойствие',
  },
  surprised: {
    border: 'border-[#f5b83d]',
    badgeBg: 'bg-[#9b4417] border-[#ffd475] text-[#fff2cf]',
    label: 'Удивление',
  },
  thoughtful: {
    border: 'border-[#54a6bd]',
    badgeBg: 'bg-[#0e4259] border-[#82d3e8] text-[#dff8ff]',
    label: 'Задумчивость',
  },
  curious: {
    border: 'border-[#e5b34f]',
    badgeBg: 'bg-[#124963] border-[#e5b34f] text-[#ffe599]',
    label: 'Поиск решения',
  },
  encourage: {
    border: 'border-[#33a88d]',
    badgeBg: 'bg-[#105747] border-[#5be3c1] text-[#e1fff5]',
    label: 'Поддержка',
  },
  alert: {
    border: 'border-[#e3732b]',
    badgeBg: 'bg-[#9b3d0b] border-[#ffbe7b] text-[#fff2e2]',
    label: 'Внимание',
  },
  triumph: {
    border: 'border-[#f6c959]',
    badgeBg: 'bg-[#a6670c] border-[#ffe38e] text-[#fff8dc]',
    label: 'Равновесие',
  },
};

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

  useEffect(() => {
    setImgFailed(false);
  }, [portraitSrc]);

  const meta = SPEAKER_META[speaker];
  const emotionStyle = EMOTION_STYLE[activeEmotion];
  const isPopout = variant === 'popout';

  // Matches the wide horizontal storybook portrait window tucked into the top-right of the parchment dialog
  const sizeClass = isPopout
    ? compact
      ? 'h-20 w-28 sm:h-28 sm:w-40 lg:h-[118px] lg:w-[178px] rounded-[18px] border-[3px]'
      : 'h-20 w-28 sm:h-30 sm:w-44 lg:h-[132px] lg:w-[202px] rounded-[18px] border-[3px]'
    : 'h-12 w-12 sm:h-14 sm:w-14 rounded-xl border-2';

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
      className={`relative shrink-0 overflow-hidden bg-[#10384c] ring-1 ring-inset ring-[#fff5dc]/65 shadow-[0_0_0_1.5px_rgba(148,88,16,0.65),0_12px_26px_rgba(6,24,36,0.52)] ${sizeClass} ${emotionStyle.border}`}
    >
      {portraitSrc && !imgFailed ? (
        <img
          src={portraitSrc}
          alt={`${meta.name} (${emotionStyle.label})`}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className={`h-full w-full scale-[1.1] object-cover object-top select-none ${
            speaker === 'gnome2' ? 'hue-rotate-[-12deg] saturate-[0.95]' : ''
          }`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#164b64] via-[#10384c] to-[#0a2736]">
          {speaker === 'narrator' ? (
            <div className="flex flex-col items-center gap-1">
              <Compass
                className={
                  isPopout ? 'h-11 w-11 text-[#f6c959] sm:h-14 sm:w-14' : 'h-7 w-7 text-[#f6c959]'
                }
              />
              {isPopout && (
                <span className="font-math text-[11px] font-bold tracking-widest text-[#fae2a4]">
                  ХРОНИКА
                </span>
              )}
            </div>
          ) : speaker === 'shadow' ? (
            <ShieldAlert className="h-10 w-10 text-amber-300" />
          ) : (
            <span
              className="font-display text-3xl font-extrabold"
              style={{ color: meta.accent }}
            >
              {meta.shortGlyph}
            </span>
          )}
        </div>
      )}

      {/* Subtle warm storybook inner corner highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[13px] shadow-[inset_0_0_14px_rgba(7,25,36,0.35)]"
      />
    </motion.div>
  );
}
