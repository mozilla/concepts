import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from './../components/conceptComponents/layout'
import Navigation from './../components/conceptComponents/navigation'
import Hero from './../components/conceptComponents/hero'
import Facets from '../components/conceptComponents/facets'
import Callout from '../components/conceptComponents/callout'
import Footer from './../components/conceptComponents/footer'

const ConceptVariant = ({ data }) => {
  const {
    metaName,
    metaCleanName,
    metaVariant,
    metaSurveyUrl,
  } = data.markdownRemark.frontmatter
  const { hero, facets, callout } = data.markdownRemark.frontmatter.concept[0]

  const surveyUrl = `${metaSurveyUrl}/?concept=${metaCleanName}&variant=${metaVariant}`

  return (
    <>
      <Helmet>
        <title>{metaName} by Firefox</title>
      </Helmet>
      <Layout>
        <Navigation {...{ hero, surveyUrl }} />
        <Hero {...{ hero, surveyUrl }} />
        <Facets {...{ facets }} />
        <Callout {...{ callout, surveyUrl }} />
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
