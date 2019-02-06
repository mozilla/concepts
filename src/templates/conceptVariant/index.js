import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Callout from '../../components/conceptComponents/callout'
import Facets from '../../components/conceptComponents/facets'
import Footer from '../../components/conceptComponents/footer'
import Hero from '../../components/conceptComponents/hero'
import Layout from '../../components/conceptComponents/layout'
import Navigation from '../../components/conceptComponents/navigation'

import sendToGA from '../../lib/ga-snippet'

// Overrides on Protocol CSS framework
import './index.css'

const ConceptVariant = ({ data }) => {
  const {
    metaName,
    metaCleanName,
    metaVariant,
    metaSurveyUrl,
    concept,
  } = data.markdownRemark.frontmatter
  const { hero, facets, callout } = concept[0]

  const surveyUrl = `${metaSurveyUrl}/?concept=${metaCleanName}&variant=${metaVariant}`

  if (typeof window === 'object') {
    sendToGA("pageview", metaCleanName, metaVariant)
  }

  return (
    <>
      <Helmet>
        <title>{metaName} by Firefox</title>
      </Helmet>
      <Layout>
        <Navigation {...{ hero, surveyUrl, metaCleanName, metaVariant }} />
        <Hero {...{ hero, surveyUrl, metaCleanName, metaVariant }} />
        <Facets {...{ facets }} />
        <Callout {...{ callout, surveyUrl, metaCleanName, metaVariant }} />
        <Footer />
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
      }
      frontmatter {
        metaName
        metaCleanName
        metaVariant
        metaSurveyUrl
        concept {
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
