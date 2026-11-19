import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Generates a distortion-free SVG path for a storybook manuscript plaque with
 * graceful sculpted concave-bracketed corners matching the illustrated reference.
 */
function buildNotchedPlaquePath(
  w: number,
  h: number,
  inset: number,
  notch: number,
): string {
  const x0 = inset;
  const y0 = inset;
  const x1 = Math.max(inset + notch * 2 + 4, w - inset);
  const y1 = Math.max(inset + notch * 2 + 4, h - inset);
  const n = Math.min(notch, (x1 - x0) / 4, (y1 - y0) / 4);
  const s = n * 0.42; // subtle outer shoulder before concave scoop

  return [
    `M ${x0 + n} ${y0}`,
    `L ${x1 - n} ${y0}`,
    // Top-right sculpted scoop corner
    `Q ${x1 - n + s} ${y0 + n - s} ${x1} ${y0 + n}`,
    `L ${x1} ${y1 - n}`,
    // Bottom-right sculpted scoop corner
    `Q ${x1 - n + s} ${y1 - n + s} ${x1 - n} ${y1}`,
    `L ${x0 + n} ${y1}`,
    // Bottom-left sculpted scoop corner
    `Q ${x0 + n - s} ${y1 - n + s} ${x0} ${y1 - n}`,
    `L ${x0} ${y0 + n}`,
    // Top-left sculpted scoop corner
    `Q ${x0 + n - s} ${y0 + n - s} ${x0 + n} ${y0}`,
    'Z',
  ].join(' ');
}

interface ParchmentBackdropProps {
  /** Radius of sculpted corner notch in px */
  notch?: number;
  /** Render the subtle inner concentric ink frame */
  innerLine?: boolean;
}

/**
 * Pixel-accurate sculpted parchment SVG backdrop with warm radial illumination,
 * organic paper grain texture, double golden rim, and inner concentric ink border.
 * Must be placed inside a `relative` container; content sits in a `relative z-10` wrapper.
 */
export function ParchmentBackdrop({
  notch = 15,
  innerLine = true,
}: ParchmentBackdropProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const uid = useId().replace(/:/g, '');

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const nextW = Math.round(rect.width);
      const nextH = Math.round(rect.height);
      setSize((prev) =>
        prev.w === nextW && prev.h === nextH ? prev : { w: nextW, h: nextH },
      );
    };

    update();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, []);

  const hasMeasured = size.w > 24 && size.h > 24;
  const outerPath = hasMeasured
    ? buildNotchedPlaquePath(size.w, size.h, 2.5, notch)
    : '';
  const innerPath = hasMeasured
    ? buildNotchedPlaquePath(size.w, size.h, 8.5, Math.max(8, notch - 3))
    : '';

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
    >
      {hasMeasured ? (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          className="block h-full w-full overflow-visible drop-shadow-[0_18px_36px_rgba(5,20,32,0.58)]"
        >
          <defs>
            <radialGradient
              id={`parch-grad-${uid}`}
              cx="42%"
              cy="32%"
              r="76%"
              fx="38%"
              fy="28%"
            >
              <stop offset="0%" stopColor="#fffbf0" />
              <stop offset="56%" stopColor="#fbefd1" />
              <stop offset="86%" stopColor="#f3dda9" />
              <stop offset="100%" stopColor="#ebd091" />
            </radialGradient>

            <linearGradient
              id={`parch-rim-${uid}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f6cc68" />
              <stop offset="50%" stopColor="#e2a034" />
              <stop offset="100%" stopColor="#cb8520" />
            </linearGradient>

            <pattern
              id={`parch-grain-${uid}`}
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="7" cy="9" r="0.85" fill="#9c6a24" fillOpacity="0.11" />
              <circle cx="23" cy="5" r="0.65" fill="#7c5218" fillOpacity="0.08" />
              <circle cx="39" cy="14" r="0.9" fill="#a8742a" fillOpacity="0.1" />
              <circle cx="14" cy="26" r="0.7" fill="#8b5d1c" fillOpacity="0.09" />
              <circle cx="33" cy="31" r="0.85" fill="#9c6a24" fillOpacity="0.1" />
              <circle cx="44" cy="41" r="0.7" fill="#7c5218" fillOpacity="0.09" />
              <circle cx="6" cy="42" r="0.8" fill="#a8742a" fillOpacity="0.09" />
              <path
                d="M 10 18 Q 16 17 21 19 M 28 38 Q 34 37 40 39"
                stroke="#9c6a24"
                strokeOpacity="0.06"
                strokeWidth="0.8"
                fill="none"
              />
            </pattern>

            <clipPath id={`parch-clip-${uid}`}>
              <path d={outerPath} />
            </clipPath>
          </defs>

          {/* Outer subtle umber ink outline for crisp separation from painted backgrounds */}
          <path
            d={outerPath}
            fill="none"
            stroke="#8a5210"
            strokeOpacity="0.82"
            strokeWidth="6.5"
            strokeLinejoin="round"
          />

          {/* Warm sunlit parchment body fill */}
          <path d={outerPath} fill={`url(#parch-grad-${uid})`} />

          {/* Pure vector organic paper grain pattern — zero foreignObject compositing glitches */}
          <path d={outerPath} fill={`url(#parch-grain-${uid})`} />

          {/* Soft inner sunlit bevel highlight */}
          <path
            d={outerPath}
            fill="none"
            stroke="#fffaf0"
            strokeOpacity="0.72"
            strokeWidth="5"
            clipPath={`url(#parch-clip-${uid})`}
          />

          {/* Primary golden frame rim */}
          <path
            d={outerPath}
            fill="none"
            stroke={`url(#parch-rim-${uid})`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Concentric inner manuscript ink hairline */}
          {innerLine && (
            <path
              d={innerPath}
              fill="none"
              stroke="#c78a2e"
              strokeOpacity="0.65"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          )}
        </svg>
      ) : (
        <div className="h-full w-full rounded-[20px] border-[3px] border-[#df9d36] bg-[#faecc9] shadow-[0_18px_36px_rgba(5,20,32,0.55)]" />
      )}
    </div>
  );
}

interface StorybookTealCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Storybook deep cerulean-teal plaque framed with a soft cream-gold outer lip
 * matching the "Интерактивная модель" panel on the reference mockup.
 */
export function StorybookTealCard({
  children,
  className = '',
}: StorybookTealCardProps) {
  return (
    <div
      className={`relative rounded-[22px] border-[2.5px] border-[#f4dfaa] bg-gradient-to-b from-[#175773]/96 via-[#0f3f56]/97 to-[#08293a]/98 text-white ring-1 ring-inset ring-[#fff6de]/45 shadow-[0_0_0_2px_rgba(7,30,43,0.88),0_20px_42px_rgba(4,16,26,0.68)] ${className}`}
    >
      {/* Subtle warm top rim highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[3px] rounded-[17px] border border-[#84c7d8]/28"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function StorybookHeadingOrnament() {
  return (
    <span aria-hidden="true" className="hidden items-center sm:inline-flex">
      <span className="h-[2px] w-4 rounded-full bg-gradient-to-r from-[#d88318]/40 to-[#e09226]" />
      <span className="h-2.5 w-2.5 rotate-45 border-[1.75px] border-[#d67f16] bg-[#fff9ea] shadow-2xs" />
      <span className="h-[2px] w-3 rounded-full bg-gradient-to-r from-[#e09226] to-[#d88318]/50" />
    </span>
  );
}
