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

// Arrow in front of the <summary> of the by-year breakdown. CSS rotates it when
// the <details> is open.
export function DisclosureIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M6 3.5l4.5 4.5L6 12.5"
        fill="none"
        stroke="#7A4A2B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <rect
        x="6"
        y="6"
        width="9"
        height="10"
        rx="1.5"
        fill="none"
        stroke="#411E0A"
        strokeWidth="2"
      />
      <path
        d="M3.5 12V3.5A1.5 1.5 0 0 1 5 2h7"
        fill="none"
        stroke="#411E0A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
