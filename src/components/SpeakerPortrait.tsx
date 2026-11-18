import { AlertTriangle, CheckCircle2, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { SPEAKER_META, SPEAKER_PORTRAITS } from '../game/codexData';
import type { SpeakerId, SpeakerMood } from '../game/types';

interface SpeakerPortraitProps {
  speaker: SpeakerId;
  mood?: SpeakerMood;
  variant?: 'inline' | 'popout';
}

const MOOD_STYLE: Record<
  SpeakerMood,
  { border: string; glow: string; emitter: string; label: string }
> = {
  neutral: {
    border: 'border-[#5be3f5]/70',
    glow: 'shadow-[0_0_28px_rgba(91,227,245,0.34)]',
    emitter: 'via-[#7ceeff]',
    label: 'Спокойствие',
  },
  curious: {
    border: 'border-sky-300/80',
    glow: 'shadow-[0_0_30px_rgba(56,189,248,0.4)]',
    emitter: 'via-sky-300',
    label: 'Поиск решения',
  },
  encourage: {
    border: 'border-emerald-300/80',
    glow: 'shadow-[0_0_30px_rgba(52,211,153,0.4)]',
    emitter: 'via-emerald-300',
    label: 'Поддержка',
  },
  alert: {
    border: 'border-amber-300/85',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.42)]',
    emitter: 'via-amber-300',
    label: 'Внимание',
  },
  triumph: {
    border: 'border-amber-300/90',
    glow: 'shadow-[0_0_32px_rgba(251,191,36,0.48)]',
    emitter: 'via-amber-300',
    label: 'Равновесие',
  },
};

// Flip portraits horizontally when source art faces right/front-right so all characters look left toward the dialogue
const FACE_LEFT_SPEAKERS = new Set<SpeakerId>([
  'alyosha',
  'pi',
  'gnome1',
  'gnome2',
  'archivist',
  'shadow',
]);

function MoodGlyph({ mood }: { mood: SpeakerMood }) {
  if (mood === 'curious') return <HelpCircle className="h-3.5 w-3.5 text-sky-300" />;
  if (mood === 'encourage') return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />;
  if (mood === 'alert') return <AlertTriangle className="h-3.5 w-3.5 text-amber-300" />;
  if (mood === 'triumph') return <Sparkles className="h-3.5 w-3.5 text-amber-300" />;
  return null;
}

export function SpeakerPortrait({
  speaker,
  mood = 'neutral',
  variant = 'popout',
  compact = false,
}: SpeakerPortraitProps & { compact?: boolean }) {
  const [imgFailed, setImgFailed] = useState(false);
  const portraitSrc = SPEAKER_PORTRAITS[speaker];
  const meta = SPEAKER_META[speaker];
  const moodStyle = MOOD_STYLE[mood];
  const shouldFlipLeft = FACE_LEFT_SPEAKERS.has(speaker);

  const isPopout = variant === 'popout';
  const sizeClass = isPopout
    ? compact
      ? 'h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36 rounded-t-2xl rounded-b-md border border-b-0'
      : 'h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 rounded-t-2xl rounded-b-md border border-b-0'
    : 'h-12 w-12 sm:h-14 sm:w-14 rounded-lg border';

  return (
    <motion.div
      key={`${speaker}-${mood}`}
      initial={{ opacity: 0.85, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      title={`${meta.name} · ${moodStyle.label}`}
      className={`relative shrink-0 overflow-hidden backdrop-blur-[2px] ${
        isPopout
          ? 'bg-gradient-to-t from-[#0b527c]/75 via-[#073657]/45 to-[#041b2e]/20'
          : 'bg-[#072640]'
      } ${sizeClass} ${moodStyle.border} ${moodStyle.glow}`}
    >
      {/* Portrait artwork (mirrored to face left toward dialogue when needed) */}
      <div
        className={`relative h-full w-full ${
          isPopout
            ? '[mask-image:linear-gradient(to_bottom,black_84%,transparent_100%)]'
            : ''
        }`}
      >
        {portraitSrc && !imgFailed ? (
          <img
            src={portraitSrc}
            alt={meta.name}
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover object-top select-none ${
              shouldFlipLeft ? '[transform:scaleX(-1)]' : ''
            } ${
              isPopout
                ? 'opacity-90 brightness-110 contrast-105 saturate-[0.82]'
                : ''
            } ${speaker === 'gnome2' ? 'hue-rotate-[-14deg]' : ''}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0e4b75]/75 to-[#041d33]/85">
            {speaker === 'narrator' ? (
              <svg
                viewBox="0 0 64 64"
                className={isPopout ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-9 w-9'}
                aria-hidden="true"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="25"
                  fill="#072a45"
                  fillOpacity="0.6"
                  stroke="#5be3f5"
                  strokeWidth="1.6"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="18"
                  fill="none"
                  stroke="#7ceeff"
                  strokeWidth="1.2"
                  strokeDasharray="4 3"
                />
                <text
                  x="32"
                  y="39"
                  textAnchor="middle"
                  fill="#a5f3fc"
                  fontSize="22"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                >
                  X
                </text>
              </svg>
            ) : speaker === 'shadow' ? (
              <ShieldAlert className="h-10 w-10 text-rose-300" />
            ) : (
              <span
                className="font-display text-3xl font-bold"
                style={{ color: meta.accent }}
              >
                {meta.shortGlyph}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Holographic cyan tint, scanlines, corner reticles & base emitter bar */}
      {isPopout && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#22d3ee]/28 via-[#38bdf8]/10 to-[#a5f3fc]/24 mix-blend-screen"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-75"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(125, 242, 255, 0.22) 0px, rgba(125, 242, 255, 0.22) 1px, transparent 1px, transparent 4px)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,transparent_48%,rgba(5,32,56,0.58)_100%)]"
          />
          {/* Top-left & top-right holographic bracket corners */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1.5 left-1.5 h-2.5 w-2.5 border-t-2 border-l-2 border-[#8bf3ff]/90"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1.5 right-1.5 h-2.5 w-2.5 border-t-2 border-r-2 border-[#8bf3ff]/90"
          />
          {/* Glowing hologram emitter rim along bottom edge */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent ${moodStyle.emitter} to-transparent shadow-[0_0_12px_rgba(91,227,245,0.95)]`}
          />
        </>
      )}

      {mood !== 'neutral' && (
        <span
          aria-label={moodStyle.label}
          className="absolute right-2 bottom-2.5 z-10 flex h-5.5 w-5.5 items-center justify-center rounded-full border border-[#5be3f5]/75 bg-[#041d33]/90 shadow-[0_0_10px_rgba(91,227,245,0.35)]"
        >
          <MoodGlyph mood={mood} />
        </span>
      )}
    </motion.div>
  );
}
