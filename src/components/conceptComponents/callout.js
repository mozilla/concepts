import React from 'react'

import { makeHandleClickLink } from '../../lib/ga-snippet'

const Callout = ({ callout, primaryLink, metaSecondaryLink, metaCleanName, metaVariant, hero, expire }) => {
  const { title, text, cta } = callout[0]
  return (
    <>
       {!expire && <p className="mzp-c-hero-cta center">
        <a
          onClick={makeHandleClickLink(metaCleanName, metaVariant, 'primary-bottom')}
          className="mzp-c-button mzp-t-download mzp-t-firefox mzp-t-product-firefox"
          target="__blank"
          rel="noopener noreferrer"
          href={primaryLink}
          dangerouslySetInnerHTML={{ __html: hero[0].cta }}
        />
      </p>}
      <section
        className="mzp-c-call-out-compact mzp-t-product-firefox mzp-t-firefox mzp-t-dark"
      >
        <div className="mzp-l-content">
          <div className="mzp-c-call-out-content">
            <div className="mzp-c-call-out-container">
              <h2 className="mzp-c-call-out-title">{title}</h2>
              <p className="mzp-c-call-out-desc">{text}</p>
            </div>
          </div>
          <div className="mzp-c-call-out-cta">
            <div className="mzp-c-call-out-cta-container">
              <div className="mzp-c-button-download-container">
                <a
                  onClick={makeHandleClickLink(metaCleanName, metaVariant, 'secondary')}
                  target="__blank"
                  rel="noopener noreferrer"
                  href={metaSecondaryLink}
                  className="mzp-c-button mzp-t-secondary mzp-t-dark"
                  dangerouslySetInnerHTML={{ __html: cta }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Callout
