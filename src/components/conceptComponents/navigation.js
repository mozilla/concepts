import React from 'react'

const Navigation = ({ hero, surveyUrl }) => {
  const { cta } = hero[0]
  return (
    <>
      <div className="mzp-c-navigation">
        <div className="mzp-c-navigation-l-content">
          <div className="mzp-c-navigation-container">
            <button
              class="mzp-c-navigation-menu-button"
              type="button"
              aria-controls="map-c-navigation-items"
            >
              Menu
            </button>
            <div class="mzp-c-navigation-logo">
              <a href="https://www.mozilla.org/">Mozilla</a>
            </div>
            <div class="mzp-c-navigation-items" id="mzp-c-navigation-items">
              <div class="mzp-c-navigation-download">
                <div class="mzp-c-button-download-container">
                  <a
                    href={surveyUrl}
                    class="mzp-c-button mzp-t-download mzp-t-download mzp-t-secondary mzp-t-small"
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
