import { heroContent, type HeroVariant } from '../content'
import { track } from '../track'

interface HeroProps {
  variant: HeroVariant
}

export function Hero({ variant }: HeroProps) {
  const content = heroContent[variant]

  return (
    <header className="hero on-dark">
      <div className="wrap">
        <div className="masthead" aria-hidden="true" />
        <div className="hero-grid">
          <h1>{content.heading}</h1>
          <div className="hero-side">
            <p className="lead">{content.subheading}</p>
            <div>
              <a
                className="btn btn-wide"
                href="#kalkulacka"
                onClick={() => track('cta_click')}
              >
                {content.cta}
              </a>
            </div>
            <p className="hero-note">
              {content.note} <a href="#rizika">{content.riskLinkLabel}</a>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
