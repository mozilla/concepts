import React from 'react'

import { makeHandleClickLink } from '../../lib/ga-snippet'

const Callout = ({ callout, surveyUrl, metaCleanName, metaVariant }) => {
  const { title, text, cta } = callout[0]
  return (
    <section
      class="mzp-c-call-out-compact mzp-t-product-firefox mzp-t-firefox mzp-t-dark"
      style={{ background: `#2a0140` }}
    >
      <div class="mzp-l-content">
        <div class="mzp-c-call-out-content">
          <div class="mzp-c-call-out-container">
            <h2 class="mzp-c-call-out-title">{title}</h2>
            <p class="mzp-c-call-out-desc">{text}</p>
          </div>
        </div>
        <div class="mzp-c-call-out-cta">
          <div class="mzp-c-call-out-cta-container">
            <div class="mzp-c-button-download-container">
              <a
                onClick={makeHandleClickLink(metaCleanName, metaVariant)}
                href={surveyUrl}
                class="mzp-c-button mzp-t-secondary mzp-t-dark"
              >
                {cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Callout
