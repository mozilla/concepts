import React from 'react'
import { Link } from 'gatsby'

const ConceptLinks = ({ edges }) => (
  <ul>
    {edges.map((edge, index) => (
      <li>
        {edge.node.frontmatter.metaName}
        {` `}&raquo;{` `}
        <Link key={index} to={edge.node.fields.slug}>
          {edge.node.frontmatter.metaVariant}
        </Link>
      </li>
    ))}
  </ul>
)

export default ConceptLinks
