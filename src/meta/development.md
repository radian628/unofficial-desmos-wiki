---
title: Development
eleventyNavigation:
  title: Development
  parent: Main
  key: Development
---

## How to Contribute

### Prerequisites

- [Node.js](https://nodejs.org/en) and NPM (should be bundled with node.js by default) for building the site.
- Some form of Git client (If you're not sure, I recommend [GitHub Desktop](https://desktop.github.com/)) for sending over your changes.
- Some kind of code editor.
- A GitHub account.

### Steps to Contribute

1. Fork [this repository](https://github.com/radian628/unofficial-desmos-wiki). It contains all the code that's used to generate the site.
2. Clone the repository.
3. Navigate to the root directory of the repository in a terminal.
4. Run `npm i` to install dependencies
5. Run `npm run serve` to start the local dev server.
6. 11ty will tell you where the server is running (e.g. http://localhost:8080). Open that site in your browser to run the local copy of the site.
7. Make your changes. See the section below for more details.
8. Submit a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

## How do I make a page?

This site uses [11ty](https://11ty.dev/) for static site generation with the [Liquid](https://shopify.github.io/liquid/) templating engine.

All of the pages that make up the site are Markdown (`.md`) files under the `src` directory. Create a file ending in `.md` there. I recommend looking at other `.md` files to get a sense of the syntax and how it's used.

All files use [Markdown](https://www.markdownguide.org/) for syntax with YAML Front Matter for site navigation and metadata (e.g. page titles). Learning YAML syntax doesn't matter all that much&mdash; you can probably infer how the Front Matter should look based on how it looks on most pages. Front Matter is the stuff delimited by `---`s at the start of the pages.

Use shortcodes to embed Desmos content and equations into pages.

As an example, the shortcode {{ "`{% statictext 'f(x) = x/2 + 1' %}`" }} produces {% statictext 'f(x) = x/2 + 1' %}. Shortcodes used for Desmos are generally written in the format {{ "`{% SHORTCODENAME 'arg1', 'arg2', 'arg3' %}`" }} where `SHORTCODENAME` is the name of the shortcode and `'arg1'`, `'arg2'`, etc. are the arguments/parameters to the shortcode. Here are all the custom shortcodes:

- Use the `graphstate` shortcode to put a desmos embed in a markdown page. This shortcode must be give a full JSON string as input in the same format as the return value of Desmos's `Calc.getState()`. It can also be given an object identical to [the "options" parameter of `Desmos.GraphingCalculator`](https://www.desmos.com/api/v1.9/docs/index.html#document-graphing-calculator-constructor), which can be used to change settings (e.g. disabling graphpaper in cases where you only need the expressions list)
- Use the `textmode` shortcode to put a desmos embed using [Text Mode](https://www.desmodder.com/text-mode/) syntax. This also supports the "options" parameter.
- Use `prefixedEleventyNavigation` to render an Eleventy navigation list to markdown. This is necessary because the production site is deployed to a subdirectory, which for some reason isn't handled properly by the regular Eleventy navigation render functions.
- Use the `staticmath` shortcode to render LaTeX anywhere. It takes an optional JSON string as a second argument, which follows this type:

```ts
type StaticMathOptions = {
  copyButton?: boolean; // If true, adds a "copy to clipboard" button attached to the math field.
};
```

- `statictext` is identical to `staticmath`, except it uses Text Mode syntax.

When in doubt, look over other pages to see how they're using the shortcodes.
