import { splitPlaceholders } from '../placeholders'

interface PlaceholdersProps {
  text: string
}

// Renders copy with the [PROVOZOVATEL ...] parts in the .ph style.
export function Placeholders({ text }: PlaceholdersProps) {
  return (
    <>
      {splitPlaceholders(text).map((part, index) =>
        part.placeholder ? (
          <span className="ph" key={index}>
            {part.text}
          </span>
        ) : (
          part.text
        ),
      )}
    </>
  )
}
