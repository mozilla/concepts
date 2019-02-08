import React from 'react'

const Callout = ({ callout, surveyUrl }) => {
  const { title, text, cta } = callout[0]
  return (
    <section
      className="mzp-c-call-out-compact mzp-t-product-firefox mzp-t-firefox mzp-t-dark"
      style={{ background: `#2a0140` }}
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
                href={surveyUrl}
                className="mzp-c-button mzp-t-secondary mzp-t-dark "
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
