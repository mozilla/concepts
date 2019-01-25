
# Fx Concepts

Fx Concepts is a simple tool for building and testing value propositons for hypothetical future Firefox products and features.

## Working With the Fx Concepts

This document explains how to create and update concept pages.

### Prerequisites

In order to add concepts to the Fx Concepts site, you'll first need to make sure you have the correct dependencies seet up on your computer:

1. Make sure you have a GitHub account and have Git running and configured on your computer. [docs](https://help.github.com/articles/set-up-git/).
1. A text editor like [VSCode](https://code.visualstudio.com/).
1. Modest familiarity with the Terminal app on your computer.
1. The latest Version of Node. [Install link](https://nodejs.org/en/download/current/)
1. The Gatsby command line interface. To install this, open your Terminal and paste `npm install --global gatsby-cli`.  Make sure you've installed Node (step 4) before you do this.

### Set Up Your Environment

Skip this section if you've already cloned the Fx Concepts repository.

1.  Probably a good idea to fork the Fx Concepts repo. You can do this from GitHub.
1. `cd` to wherever you want your local build of Fx Concepts
1. Clone your fork: `git clone https://github.com/{YOUR-FORK}/concepts.git`
1. `cd` into your local Fx Concepts folder
1. `npm i`

### Developing

`gatsby develop` to run locally at `localhost:8000`. You can test GraphQL queries at `localhost:8000/___graphql`

### Adding Content

Product concepts can be found in the `src/concepts` directory. Each concept has the following basic structure:

```
src/concepts/{concept-root-slug}
├── images
│   ├── image-1.png
│   ├── image-2.png
│   └── image-{...n}.png
├── index.md
├── v1.md
└── v{...n}.md
```

This directory structure is important to set up your experiment:
* The root folder `{concept-root-slug}` will be the top level path for your experiment.
* `index.md` becomes the control branch
* You can add variants by adding more markdown files. This will automatically create new pages so that, for example `v1.md` will become `localhost:8000/{concept-root-slug}/v1`
* any images in the image directory will be accessible within the context of your project.

#### copy-me

The `copy-me` folder in `src/concepts` should be used to bootstrap your concept. Gatsby ignores this directory at compile time so it doesn't produce any paths or content in, but if you copy it and change the name, Gaysby will pick up your new directory and generate a concept for you.

### Overview of concept fields

Concept variants are built on Markdown frontmatter which is really just YAML. Gatsby and YAML are both sticklers for syntactic completeness and accuracy. Below is an annotated version of a concept page:

```

---
metaName: "Copy Me" // A human-readable name for your project. This should be the same across all variants.
metaCleanName: "copyme" // A URL-friendly name for your project used as a query parameter in your survey. This should be the same across all variants.
metaVariant: "control" // A URL-friendly variant name. This should be different for each treatment in your test.
metaSurveyUrl: "valid url" // A surveyGizmo URL
metaDate: "creation date" // A human readable datestamp
concept: // The concept is what actually gets rendered onto the page
  -
    hero: // The hero is the big top thing on your concept page.
      -
        title: "Title"
        text: "Description"
        cta: "cta" // Button copy
        image: "./images/default-hero.png" // make this image a 1168 × 777 png
    facets: // facets pieces of the value propisiton. you can have as many of these as you like.
      -
        title: "Facet Title"
        text: "Make as many facets as you like!"
        image: "./images/default-facet.png" // make this image a 692 × 692 png
      -
        title: "Facet Title"
        text: "Make as many facets as you like!"
        image: "./images/default-facet.png"
    callout:
      -
        title: "Bottom Callout Title"
        text: "This is the thing at the bottom"
        cta: "secondary cta"
---


