import React from 'react'

import { makeHandleClickLink } from '../../lib/ga-snippet'

const Hero = ({ hero, surveyUrl, cobrand, metaCleanName, metaVariant }) => {
  const { title, text, cta, image } = hero[0]
  return (
    <section className="mzp-c-hero mzp-has-image mzp-t-product-firefox">
      <div className="mzp-l-content">
        <div className="mzp-c-hero-body">
          <h1 className="mzp-c-hero-title">{title}</h1>
          {cobrand !== '' && (
            <h4 class="cobrand">
              powered by <b>{cobrand}</b>
            </h4>
          )}
          <div className="mzp-c-hero-desc">
            <p dangerouslySetInnerHTML={{ __html: text }} />
          </div>
          <p className="mzp-c-hero-cta">
            <a
              onClick={makeHandleClickLink(metaCleanName, metaVariant, 'primary')}
              className="mzp-c-button mzp-t-download mzp-t-firefox mzp-t-product-firefox"
              href={surveyUrl}
              dangerouslySetInnerHTML={{ __html: cta }}
            />
          </p>
        </div>
      </div>
      <div className="mzp-c-hero-image">
        <img src={image.publicURL} alt={title} />
      </div>
    </section>
  )
}

export default Hero
