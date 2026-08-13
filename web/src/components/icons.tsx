export function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="1.5" stroke="currentColor" />
      <path d="M3 6l9 7 9-7" stroke="currentColor" />
    </svg>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2C9.9 19 5 14.1 5 8a2 2 0 0 1 2-2z"
        stroke="currentColor"
      />
    </svg>
  );
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" />
      <path d="M7 10v7M7 7v.01M12 17v-4.5a2 2 0 0 1 4 0V17M12 10v7" stroke="currentColor" />
    </svg>
  );
}

/** Node-and-connector icons — echo the agent-orchestration motif used in the hero canvas. */
export function AgentsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="1" y="13" width="10" height="8" rx="1.5" stroke="#81c9fa" />
      <rect x="23" y="1" width="10" height="8" rx="1.5" stroke="#b9ffff" />
      <rect x="23" y="25" width="10" height="8" rx="1.5" stroke="#b9ffff" />
      <path d="M11 17H17V5H23" stroke="#81c9fa" />
      <path d="M11 17H17V29H23" stroke="#81c9fa" />
    </svg>
  );
}

export function AnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="2" y="20" width="6" height="12" fill="#1465bb" stroke="#81c9fa" />
      <rect x="14" y="12" width="6" height="20" fill="#1465bb" stroke="#81c9fa" />
      <rect x="26" y="4" width="6" height="28" fill="#1465bb" stroke="#b9ffff" />
    </svg>
  );
}

export function InfraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="26" height="18" rx="1.5" stroke="#81c9fa" />
      <path d="M11 27h12M17 22v5" stroke="#81c9fa" />
      <circle cx="10" cy="13" r="2" stroke="#b9ffff" />
      <circle cx="24" cy="13" r="2" stroke="#b9ffff" />
    </svg>
  );
}
