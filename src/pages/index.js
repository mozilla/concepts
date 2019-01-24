import React from 'react'
import { graphql } from 'gatsby';

import ConceptLinks from '../components/conceptLinks'

const IndexPage = ({data}) => {
  const edges = data.allMarkdownRemark.edges;
  return (
    <div style={{
      minHeight:'100vh',
      margin: '24px'
    }}>
      <h1>Fx Concepts</h1>
      <ConceptLinks {...{ edges }} />
    </div>
  )
};

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___metaDate], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            metaName
            metaVariant
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
