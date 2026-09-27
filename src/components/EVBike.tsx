import { useId } from "react";

type EVBikeProps = {
  body?: string;
  accent?: string;
  className?: string;
  spin?: boolean;
};

const SPOKES = [0, 30, 60, 90, 120, 150];

function Wheel({ cx, cy, accent, spin, motor }: { cx: number; cy: number; accent: string; spin: boolean; motor?: boolean }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={92} fill="#0b1e33" />
      <circle cx={cx} cy={cy} r={80} fill="none" stroke="#1e3a5f" strokeWidth={3} />
      <circle cx={cx} cy={cy} r={70} fill="#0f2740" stroke="#94a3b8" strokeWidth={4} />
      <g className={spin ? "animate-spin-slow" : undefined} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {SPOKES.map((a) => (
          <rect
            key={a}
            x={cx - 3}
            y={cy - 66}
            width={6}
            height={132}
            rx={3}
            fill="#cbd5e1"
            transform={`rotate(${a} ${cx} ${cy})`}
          />
        ))}
      </g>
      {motor ? (
        <>
          <circle cx={cx} cy={cy} r={34} fill={accent} className="animate-pulse-glow" />
          <circle cx={cx} cy={cy} r={22} fill="#0b1e33" />
          <path d={`M${cx - 6} ${cy - 12} L${cx + 6} ${cy - 12} L${cx - 2} ${cy + 1} L${cx + 7} ${cy + 1} L${cx - 7} ${cy + 14} L${cx - 2} ${cy + 3} L${cx - 9} ${cy + 3} Z`} fill={accent} />
        </>
      ) : (
        <>
          <circle cx={cx} cy={cy} r={42} fill="none" stroke={accent} strokeWidth={6} strokeDasharray="10 6" />
          <circle cx={cx} cy={cy} r={14} fill="#e2e8f0" />
        </>
      )}
    </g>
  );
}

/** Stylised side-view illustration of a Suneeta electric motorcycle. */
export default function EVBike({ body = "#0ea5e9", accent = "#22d3ee", className, spin = false }: EVBikeProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 800 480" className={className} role="img" aria-label="Suneeta electric bike illustration">
      <defs>
        <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={body} />
        </linearGradient>
        <linearGradient id={`light-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0.7" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`shadow-${id}`}>
          <stop offset="0%" stopColor="#0b1e33" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0b1e33" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx={400} cy={440} rx={330} ry={22} fill={`url(#shadow-${id})`} />

      {/* headlight beam */}
      <path d="M640 178 L800 130 L800 250 Z" fill={`url(#light-${id})`} className="animate-pulse-glow" />

      {/* swingarm */}
      <path d="M200 340 L360 292 L380 318 L214 360 Z" fill="#334155" />

      {/* front fork */}
      <path d="M560 160 L574 156 L624 336 L608 342 Z" fill="#94a3b8" />
      <rect x={582} y={250} width={18} height={60} rx={6} fill="#e2e8f0" transform="rotate(-16 591 280)" />

      <Wheel cx={200} cy={340} accent={accent} spin={spin} motor />
      <Wheel cx={610} cy={340} accent={accent} spin={spin} />

      {/* rear mudguard */}
      <path d="M110 300 Q130 230 210 222 L220 238 Q150 246 132 304 Z" fill={body} />

      {/* battery pack */}
      <rect x={330} y={238} width={190} height={82} rx={16} fill="#0b1e33" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={346 + i * 34}
          y={256}
          width={24}
          height={46}
          rx={5}
          fill={accent}
          opacity={0.35 + i * 0.15}
          className="animate-pulse-glow"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}

      {/* main body / tank */}
      <path
        d="M300 232 L360 176 Q420 150 500 150 L566 158 L600 190 L560 232 L520 238 L330 238 Z"
        fill={`url(#body-${id})`}
      />
      <path d="M380 184 Q440 168 520 168 L556 176" stroke="#ffffff" strokeOpacity={0.55} strokeWidth={5} fill="none" strokeLinecap="round" />

      {/* tail section */}
      <path d="M150 196 L300 206 L312 232 L200 236 Z" fill={`url(#body-${id})`} />
      <rect x={140} y={194} width={24} height={10} rx={5} fill="#f43f5e" />

      {/* seat */}
      <path d="M190 196 Q250 176 350 184 L372 196 Q300 212 196 208 Z" fill="#1e293b" />

      {/* front fairing + headlight */}
      <path d="M566 158 L628 170 L646 196 L600 214 L580 190 Z" fill={body} />
      <circle cx={630} cy={186} r={12} fill="#f8fafc" />
      <circle cx={630} cy={186} r={7} fill={accent} className="animate-pulse-glow" />

      {/* handlebar + display */}
      <path d="M540 132 L592 142" stroke="#1e293b" strokeWidth={10} strokeLinecap="round" />
      <path d="M566 140 L570 162" stroke="#1e293b" strokeWidth={8} strokeLinecap="round" />
      <rect x={574} y={126} width={30} height={20} rx={4} fill="#0b1e33" transform="rotate(12 589 136)" />
      <rect x={579} y={130} width={20} height={11} rx={2} fill={accent} transform="rotate(12 589 136)" />

      {/* front mudguard */}
      <path d="M560 262 Q610 228 668 262 L660 272 Q610 244 568 272 Z" fill={body} />

      {/* brand mark */}
      <text x={420} y={224} fill="#ffffff" fontSize={20} fontWeight={700} fontFamily="sans-serif" letterSpacing={3}>
        SUNEETA
      </text>
    </svg>
  );
}
