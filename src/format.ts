const terFormat = new Intl.NumberFormat("cs-CZ", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// 0.0003 -> "0,03 %"
export function formatTer(ter: number): string {
  return terFormat.format(ter);
}

// "2026-04-28" -> "28. 4. 2026". Parsed by hand so the time zone cannot shift the day.
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day}.\u00A0${month}.\u00A0${year}`;
}
