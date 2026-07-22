export function PaddlesGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 260" className={className} aria-hidden="true">
      <g fill="none" stroke="#0f1f3d" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <g transform="rotate(-20 90 130)">
          <ellipse cx="90" cy="90" rx="55" ry="70" fill="#fcfbf3" />
          <rect x="80" y="160" width="20" height="55" rx="4" fill="#0f1f3d" />
          <line x1="83" y1="170" x2="97" y2="170" stroke="#fcfbf3" strokeWidth="2" />
          <line x1="83" y1="180" x2="97" y2="180" stroke="#fcfbf3" strokeWidth="2" />
          <line x1="83" y1="190" x2="97" y2="190" stroke="#fcfbf3" strokeWidth="2" />
          <line x1="83" y1="200" x2="97" y2="200" stroke="#fcfbf3" strokeWidth="2" />
        </g>
        <g transform="rotate(20 210 130)">
          <ellipse cx="210" cy="90" rx="55" ry="70" fill="#fcfbf3" />
          <rect x="200" y="160" width="20" height="55" rx="4" fill="#0f1f3d" />
          <line x1="203" y1="170" x2="217" y2="170" stroke="#fcfbf3" strokeWidth="2" />
          <line x1="203" y1="180" x2="217" y2="180" stroke="#fcfbf3" strokeWidth="2" />
          <line x1="203" y1="190" x2="217" y2="190" stroke="#fcfbf3" strokeWidth="2" />
          <line x1="203" y1="200" x2="217" y2="200" stroke="#fcfbf3" strokeWidth="2" />
        </g>
      </g>
      <circle cx="150" cy="70" r="22" fill="#b8d13a" stroke="#0f1f3d" strokeWidth="3" />
      <g fill="#0f1f3d">
        <circle cx="143" cy="63" r="2.5" />
        <circle cx="157" cy="63" r="2.5" />
        <circle cx="150" cy="70" r="2.5" />
        <circle cx="143" cy="77" r="2.5" />
        <circle cx="157" cy="77" r="2.5" />
      </g>
    </svg>
  );
}