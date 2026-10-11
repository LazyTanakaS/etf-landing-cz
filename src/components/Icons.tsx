// Small inline icons. Decorative: the text next to them carries the meaning.

export function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke="#7A4A2B"
        strokeWidth="1.5"
      />
      <path
        d="M7 6v4M7 3.6v.1"
        stroke="#7A4A2B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle
        cx="8"
        cy="8"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8 4.5v4.2M8 11v.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ChevronIcon() {
  return (
    <svg
      className="chev"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        d="M3.5 6l4.5 4.5L12.5 6"
        fill="none"
        stroke="#411E0A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
