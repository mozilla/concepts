const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// NOTE: this is kind of a hack,
// but it makes the expire list easy to maintain
// each page gets expired dependent on slug

const EXPIRE_LIST = [
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
    const expire = EXPIRE_LIST.includes(slug);
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
      name: 'expire',
      value: expire,
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
                expire
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
