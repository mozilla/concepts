import React from 'react'

import { makeHandleClickLink } from '../../lib/ga-snippet'

const Navigation = ({ hero, surveyUrl, metaCleanName, metaVariant, MozDark }) => {
  const { cta } = hero[0]
  return (
    <>
      <div className="mzp-c-navigation">
        <div className="mzp-c-navigation-l-content">
          <div className="mzp-c-navigation-container">
            <a href="https://www.mozilla.org/">
              <img src={MozDark} alt="mozilla" />
            </a>
            <div className="mzp-c-navigation-items" id="mzp-c-navigation-items">
              <div className="mzp-c-navigation-download">
                <div className="mzp-c-button-download-container">
                  <a
                    onClick={makeHandleClickLink(metaCleanName, metaVariant, 'header')}
                    href={surveyUrl}
                    className="mzp-c-button mzp-t-download mzp-t-secondary mzp-t-small"
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
