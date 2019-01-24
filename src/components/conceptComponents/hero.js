// import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

// import Image from '../components/image'

const Hero = ({ hero, surveyUrl }) => {
  const { title, text, cta, image } = hero[0]
  return (
    <section className="mzp-c-hero mzp-has-image mzp-t-product-firefox">
      <div className="mzp-l-content">
        <div className="mzp-c-hero-body">
          <h1 className="mzp-c-hero-title">{title}</h1>

          <div className="mzp-c-hero-desc">
            <p>{text}</p>
          </div>

          <p className="mzp-c-hero-cta">
            <a
              className="mzp-c-button mzp-t-download mzp-t-firefox mzp-t-product-firefox"
              href={surveyUrl}
            >
              {cta}
            </a>
          </p>
        </div>
      </div>

      <div className="mzp-c-hero-image">
        <img
          src={image.publicURL}
          alt=""
        />
      </div>
    </section>
  )
}

Hero.propTypes = {
  siteTitle: PropTypes.string,
}

Hero.defaultProps = {
  siteTitle: '',
}

export default Hero
