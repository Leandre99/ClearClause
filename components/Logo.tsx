export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="ClearClause logo"
    >
      <rect width="32" height="32" rx="9" fill="var(--accent)" />
      <rect x="8" y="8.5" width="16" height="3" rx="1.5" fill="var(--accent-foreground)" opacity="0.85" />
      <rect x="7" y="14" width="18" height="6" rx="1.5" fill="var(--marker)" />
      <rect x="8" y="14.2" width="10" height="3" rx="1.5" fill="var(--accent)" opacity="0.9" />
      <rect x="8" y="23" width="11" height="3" rx="1.5" fill="var(--accent-foreground)" opacity="0.85" />
    </svg>
  );
}
