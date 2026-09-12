/**
 * Abstract, code-drawn cover art — one variant per project.
 * Deliberately unbranded: no client UI, no logos, no real data is ever shown.
 */
export default function ProjectCover({ slug, hue }: { slug: string; hue: string }) {
  const id = `cv-${slug}`;
  return (
    <svg
      viewBox="0 0 1200 675"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Abstract cover artwork for ${slug}`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={hue} stopOpacity="0.20" />
          <stop offset="48%" stopColor="#16181D" />
          <stop offset="100%" stopColor="#08090B" />
        </linearGradient>
        <linearGradient id={`${id}-ln`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={hue} stopOpacity="0.9" />
          <stop offset="100%" stopColor={hue} stopOpacity="0.15" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1200" height="675" fill={`url(#${id}-bg)`} />
      <rect width="1200" height="675" fill={`url(#${id}-grid)`} />

      <g opacity="0.95">{variant(slug, hue)}</g>

      {/* id is namespaced per project: several covers share one page */}
      <rect width="1200" height="675" fill={`url(#${id}-fade)`} />
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stopColor="#0F1012" stopOpacity="0" />
          <stop offset="100%" stopColor="#0F1012" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function variant(slug: string, hue: string) {
  const stroke = { stroke: hue, fill: "none", strokeWidth: 1.6 };
  const soft = { stroke: "#ffffff", strokeOpacity: 0.18, fill: "none", strokeWidth: 1.2 };

  switch (slug) {
    /* Conduit — an agent loop: a node graph fanning out to tools */
    case "conduit":
      return (
        <>
          <circle cx="300" cy="330" r="52" {...stroke} />
          <circle cx="300" cy="330" r="88" {...soft} />
          <circle cx="300" cy="330" r="128" {...soft} strokeDasharray="4 10" />
          {[
            [720, 150],
            [860, 300],
            [760, 470],
            [600, 540],
          ].map(([x, y], i) => (
            <g key={i}>
              <path d={`M352 330 C 520 330, ${x - 160} ${y}, ${x - 54} ${y}`} {...stroke} strokeOpacity={0.55} />
              <rect x={x - 54} y={y - 30} width="216" height="60" rx="14" {...soft} />
              <rect x={x - 34} y={y - 8} width={90 - i * 14} height="6" rx="3" fill={hue} fillOpacity="0.5" />
            </g>
          ))}
          <text x="300" y="338" textAnchor="middle" fontFamily="monospace" fontSize="20" fill={hue}>
            agent
          </text>
        </>
      );

    /* TaskFlow — a drill-down: five nested bars stepping inward */
    case "taskflow":
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                x={140 + i * 70}
                y={120 + i * 76}
                width={900 - i * 140}
                height="56"
                rx="12"
                {...soft}
              />
              <rect
                x={156 + i * 70}
                y={136 + i * 76}
                width={(760 - i * 150) * (1 - i * 0.14)}
                height="24"
                rx="8"
                fill={hue}
                fillOpacity={0.55 - i * 0.08}
              />
            </g>
          ))}
          <path d="M140 108 H1040" {...stroke} strokeOpacity="0.6" />
        </>
      );

    /* Forge — three surfaces sharing one spine */
    case "forge":
      return (
        <>
          <path d="M600 80 V595" {...stroke} strokeOpacity="0.55" strokeDasharray="6 9" />
          {[
            [150, 150],
            [150, 360],
            [760, 255],
          ].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="290" height="170" rx="18" {...soft} />
              <rect x={x + 20} y={y + 22} width="120" height="8" rx="4" fill={hue} fillOpacity="0.65" />
              <rect x={x + 20} y={y + 46} width="200" height="6" rx="3" fill="#fff" fillOpacity="0.14" />
              <rect x={x + 20} y={y + 64} width="160" height="6" rx="3" fill="#fff" fillOpacity="0.1" />
              <rect x={x + 20} y={y + 96} width="250" height="50" rx="10" fill={hue} fillOpacity="0.12" />
              <path
                d={i === 2 ? `M600 340 H${x}` : `M${x + 290} ${y + 85} H600`}
                {...stroke}
                strokeOpacity="0.4"
              />
            </g>
          ))}
        </>
      );

    /* Ledger — two independent columns meeting only at a shared base */
    case "ledger":
      return (
        <>
          <rect x="150" y="120" width="380" height="330" rx="18" {...soft} />
          <rect x="670" y="120" width="380" height="330" rx="18" {...soft} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={180} y={160 + i * 56} width={320 - i * 30} height="18" rx="6" fill={hue} fillOpacity={0.42 - i * 0.06} />
              <rect x={700} y={160 + i * 56} width={200 + i * 26} height="18" rx="6" fill="#fff" fillOpacity={0.14} />
            </g>
          ))}
          <rect x="150" y="510" width="900" height="76" rx="18" {...stroke} />
          <text x="600" y="557" textAnchor="middle" fontFamily="monospace" fontSize="18" fill={hue} opacity="0.8">
            shared auth
          </text>
          <path d="M340 450 V510" {...soft} />
          <path d="M860 450 V510" {...soft} />
        </>
      );

    /* CRM — a pipeline of stages with a scanned card entering it */
    default:
      return (
        <>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={150 + i * 230} y="230" width="200" height="250" rx="16" {...soft} />
              <rect
                x={170 + i * 230}
                y="254"
                width={110 - i * 14}
                height="8"
                rx="4"
                fill={hue}
                fillOpacity={0.7 - i * 0.14}
              />
              {[0, 1, 2].map((j) => (
                <rect
                  key={j}
                  x={170 + i * 230}
                  y={290 + j * 46}
                  width="160"
                  height="34"
                  rx="8"
                  fill="#fff"
                  fillOpacity={0.05}
                />
              ))}
            </g>
          ))}
          <g>
            <rect x="430" y="86" width="330" height="104" rx="12" {...stroke} />
            <rect x="452" y="110" width="120" height="9" rx="4" fill={hue} fillOpacity="0.75" />
            <rect x="452" y="132" width="210" height="7" rx="3" fill="#fff" fillOpacity="0.16" />
            <rect x="452" y="150" width="170" height="7" rx="3" fill="#fff" fillOpacity="0.1" />
            <path d="M595 190 V230" {...stroke} strokeDasharray="5 7" />
          </g>
        </>
      );
  }
}
