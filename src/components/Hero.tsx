import { heroContent, type HeroVariant } from '../content'

interface HeroProps {
  variant: HeroVariant
}

export function Hero({ variant }: HeroProps) {
  const content = heroContent[variant]

  return (
    <header className="hero">
      <h1>{content.heading}</h1>
      <p className="hero-lead">{content.subheading}</p>
      <a className="button" href="#kalkulacka">
        {content.cta}
      </a>
      <p className="small">
        {content.note} <a href="#rizika">{content.riskLinkLabel}</a>
      </p>
    </header>
  )
}
