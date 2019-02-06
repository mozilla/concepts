import React from 'react'

import { makeHandleClickLink } from '../../lib/ga-snippet'

const Navigation = ({ hero, surveyUrl, metaCleanName, metaVariant }) => {
  const { cta } = hero[0]
  return (
    <>
      <div className="mzp-c-navigation">
        <div className="mzp-c-navigation-l-content">
          <div className="mzp-c-navigation-container">
            <div class="mzp-c-navigation-logo">
              <a href="https://www.mozilla.org/">Mozilla</a>
            </div>
            <div class="mzp-c-navigation-items" id="mzp-c-navigation-items">
              <div class="mzp-c-navigation-download">
                <div class="mzp-c-button-download-container">
                  <a
                    onClick={makeHandleClickLink(metaCleanName, metaVariant)}
                    href={surveyUrl}
                    class="mzp-c-button mzp-t-download mzp-t-secondary mzp-t-small"
                  >
                    {cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
