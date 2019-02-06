import React from 'react'
import { Link } from 'gatsby'

const ConceptLinks = ({ edges }) => (
  <ul>
    {edges.map((edge, index) => (
      <li key={index}>
        {edge.node.frontmatter.metaName}
        {` `}&raquo;{` `}
        <Link to={edge.node.fields.slug}>
          {edge.node.frontmatter.metaVariant}
        </Link>
      </li>
    ))}
  </ul>
)

export default ConceptLinks
