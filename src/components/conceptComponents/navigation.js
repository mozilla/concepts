import React from 'react'

const Navigation = ({ MozDark }) => {
  return (
    <>
      <div className="mzp-c-navigation">
        <div className="mzp-c-navigation-l-content">
          <div className="mzp-c-navigation-container">
            <a href="https://www.mozilla.org/">
              <img src={MozDark} alt="mozilla" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
