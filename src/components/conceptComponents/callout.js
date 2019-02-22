import React from 'react'

import { makeHandleClickLink } from '../../lib/ga-snippet'

const Callout = ({ callout, surveyUrl, metaCleanName, metaVariant }) => {
  const { title, text, cta } = callout[0]
  return (
    <section
      style={{background: '#eee', display: 'flex', padding: '96px', marginTop: '-96px', justifyContent: 'center' }}
    >

              <a
                onClick={makeHandleClickLink(metaCleanName, metaVariant, 'nav')}
                href={surveyUrl}
        className="mzp-c-button mzp-t-download mzp-t-firefox mzp-t-product-firefox"
        dangerouslySetInnerHTML={{ __html: cta }}
        style={{ textAlign: 'center' }}
              />
    </section>
  )
}

export default Callout
