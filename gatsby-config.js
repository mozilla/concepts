module.exports = {
  siteMetadata: {
    title: 'Fx Concepts',
    description: 'Quickly stub out landing pages for product concepts',
    author: 'jgruen@mozilla.com',
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'concepts',
        path: `${__dirname}/src/concepts`,
        ignore: ['**/copy-me/*'],
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [
          require('path').resolve(__dirname, 'node_modules')
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/firefox-logo.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: null,
        sitemap: null,
        policy: [{ userAgent: '*', disallow: '/' }]
      }
    },
    'gatsby-plugin-csp'
  ],
};
