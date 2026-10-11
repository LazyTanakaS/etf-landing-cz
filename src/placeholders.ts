// Splits copy at the [PROVOZOVATEL ...] placeholders so a component can style
// them (.ph). Text outside the brackets is kept as is, brackets included in the
// placeholder part.
export interface TextPart {
  text: string
  placeholder: boolean
}

const placeholderPattern = /(\[PROVOZOVATEL[^\]]*\])/

export function splitPlaceholders(text: string): TextPart[] {
  return text
    .split(placeholderPattern)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, placeholder: placeholderPattern.test(part) }))
}
