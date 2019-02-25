import React from 'react'

const Facets = ({ facets }) => (
  <>
    {facets.map((facet, index) => {
      const flipClass =
        index % 2 === 0 ? 'mzp-l-billboard-right' : 'mzp-l-billboard-left'
      return (
        <div className={`mzp-c-billboard ${flipClass}`} key={index}>
          <div className="mzp-c-billboard-image-container">
            <img
              height="346"
              width="346"
              className="mzp-c-billboard-image"
              src={facet.image.publicURL}
              alt={facet.title}
            />
          </div>
          <div className="mzp-c-billboard-content">
            <div className="mzp-c-billboard-content-container">
              <div className="mzp-c-billboard-content-inner">
                <h2 className="mzp-c-billboard-title">{facet.title}</h2>
                <p className="mzp-c-billboard-desc">{facet.text}</p>
              </div>
            </div>
          </div>
        </div>
      )
    })}
  </>
)

export default Facets
