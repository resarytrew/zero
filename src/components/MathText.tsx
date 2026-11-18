import { Fragment } from 'react';

interface MathTextProps {
  text: string;
  className?: string;
}

const FRACTION_RE =
  /\((\d+)\s*\/\s*(\d+)\)|(?<![\d/])(\d+)\s*\/\s*(\d+)(?![\d/])|([⅓¼])/g;

function normalizeUnicodeFraction(ch: string): [string, string] | null {
  if (ch === '⅓') return ['1', '3'];
  if (ch === '¼') return ['1', '4'];
  return null;
}

function StackedFraction({
  num,
  den,
  compact = false,
}: {
  num: string;
  den: string;
  compact?: boolean;
}) {
  return (
    <span
      className={`font-math mx-0.5 inline-flex flex-col items-center justify-center align-middle leading-none tabular-nums ${
        compact ? 'text-[0.78em]' : 'text-[0.82em]'
      }`}
      aria-label={`${num} делить на ${den}`}
    >
      <span className="border-b border-current px-0.5 pb-[1px]">{num}</span>
      <span className="px-0.5 pt-[1px]">{den}</span>
    </span>
  );
}

export function MathText({ text, className = '' }: MathTextProps) {
  const parts: Array<
    | { type: 'text'; value: string }
    | { type: 'frac'; num: string; den: string }
  > = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const regex = new RegExp(FRACTION_RE.source, 'g');

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: text.slice(lastIndex, match.index) });
    }

    if (match[1] && match[2]) {
      parts.push({ type: 'frac', num: match[1], den: match[2] });
    } else if (match[3] && match[4]) {
      parts.push({ type: 'frac', num: match[3], den: match[4] });
    } else if (match[5]) {
      const pair = normalizeUnicodeFraction(match[5]);
      if (pair) {
        parts.push({ type: 'frac', num: pair[0], den: pair[1] });
      } else {
        parts.push({ type: 'text', value: match[0] });
      }
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', value: text.slice(lastIndex) });
  }

  return (
    <span className={className}>
      {parts.map((part, idx) =>
        part.type === 'frac' ? (
          <StackedFraction key={idx} num={part.num} den={part.den} />
        ) : (
          <Fragment key={idx}>{part.value}</Fragment>
        ),
      )}
    </span>
  );
}

export function FormulaBlock({
  formula,
  className = '',
}: {
  formula: string;
  className?: string;
}) {
  return (
    <div
      className={`font-math inline-flex flex-wrap items-center gap-y-1 rounded-md border border-amber-400/35 bg-[#051d30] px-2.5 py-1 text-xs font-semibold text-amber-200 tabular-nums ${className}`}
    >
      <MathText text={formula} />
    </div>
  );
}
