import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Callout from '../../components/conceptComponents/callout'
import Facets from '../../components/conceptComponents/facets'
import Footer from '../../components/conceptComponents/footer'
import Hero from '../../components/conceptComponents/hero'
import Layout from '../../components/conceptComponents/layout'
import Navigation from '../../components/conceptComponents/navigation'
import PageNotFound from '../../components/pageNotFound';
import MozLight from './images/moz-white.png';
import MozDark from './images/moz-black.png';

import { setupGA } from '../../lib/ga-snippet'

// Overrides on Protocol CSS framework
import './index.css'

const ConceptVariant = ({ data }) => {
  if (data.markdownRemark.fields.ignore) return <PageNotFound/>
  const {
    metaName,
    metaCleanName,
    metaVariant,
    metaPrimaryLink,
    metaSecondaryLink,
    concept,
  } = data.markdownRemark.frontmatter
  const { hero, facets, callout, cobrand, cobrandIcon } = concept[0]


  let params;
  if (typeof window === 'object') {
    params = new URLSearchParams(window.location.search)
  } else {
    params = {
      get: () => '',
      has: () => false
    }
  }

  // HACK...if coming from a bought add we should
  // convert UTM src and term to rc and rv
  let rc = encodeURIComponent(params.get('rc'))
  if (params.has('utm_source')) {
    rc = encodeURIComponent(params.get('utm_source'));
  }
  let rv = encodeURIComponent(params.get('rv'))
  if (params.has('utm_term')) {
    rv = encodeURIComponent(params.get('utm_term'));
  }

  const aid = metaCleanName
  const av = metaVariant
  const t = typeof window === 'object' ? navigator.doNotTrack === "1" : false
  const debug = encodeURIComponent(params.get('debug'))
  const primaryLink = `${metaPrimaryLink}/?rc=${rc}&rv=${rv}&aid=${aid}&av=${av}&t=${t}&debug=${debug}`

  setupGA(metaCleanName, metaVariant)

  return (
    <>
      <Helmet>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134031680-1"></script>
        {cobrand === '' ?
          <title>{metaName} by Firefox</title> :
          <title>Firefox + {cobrand}</title>
        }
      </Helmet>
      <Layout>
        <Navigation {...{ MozDark }} />
        <Hero {...{ hero, primaryLink, cobrand, cobrandIcon, metaCleanName, metaVariant }} />
        <Facets {...{ facets }} />
        <Callout {...{ callout, primaryLink, metaSecondaryLink, cobrand, metaCleanName, metaVariant, hero }} />
        <Footer {...{ MozLight }}/>
      </Layout>
    </>
  )
}

export default ConceptVariant

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        ignore
      }
      frontmatter {
        metaName
        metaCleanName
        metaVariant
        metaPrimaryLink
        metaSecondaryLink
        concept {
          cobrand
          cobrandIcon {
            publicURL
          }
          hero {
            title
            text
            cta
            image {
              publicURL
            }
          }
          facets {
            title
            text
            image {
              publicURL
            }
          }
          callout {
            title
            text
            cta
          }
        }
      }
    }
  }
`
