const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// NOTE: this is kind of a hack,
// but it makes the ignore list easy to maintain
// each page gets ignored dependent on slug
// the template still builds, but just with the 404 component
// this was done b/c we wanted to hide all templates at once
// and gatsby barks if you ignore all in gatsby-source-filesystem

const IGNORE_LIST = [
  '/copy-me/v1/',
  '/vpn/',
  '/fx-scroll/t2a/',
  '/browser-asst/v1/',
  '/fx-scroll/t2b/',
  '/proxy/v1/',
  '/proxy/v2/',
  '/proxy/v4/',
  '/proxy/v3/',
  '/scroll/v1a/',
  '/scroll/v1b/',
  '/scroll/v1c/',
  '/scroll/v2a/',
  '/scroll/v1d/',
  '/scroll/v2c/',
  '/scroll/v2d/',
  '/scroll/v2b/',
  '/scroll/v3a/',
  '/scroll/v3b/',
  '/scroll/v3c/',
  '/scroll/v3d/'
];

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'concepts' });
    const type = 'conceptVariant';
    const ignore = IGNORE_LIST.includes(slug);
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
    createNodeField({
      node,
      name: 'type',
      value: type,
    });
    createNodeField({
      node,
      name: 'ignore',
      value: ignore,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise(resolve => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                type
                ignore
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const componentPath = `./src/templates/${node.fields.type}/index.js`;
        createPage({
          path: node.fields.slug,
          component: path.resolve(componentPath),
          context: {
            slug: node.fields.slug,
            type: node.fields.type,
          },
        });
      });
      resolve();
    });
  });
};
