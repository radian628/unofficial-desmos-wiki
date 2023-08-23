---
title: Development
eleventyNavigation:
  title: Development
  parent: Main
  key: Development
tags:
  - meta
  - explanation
layout: base.liquid
---

## How to Contribute

This is a guide for how to contribute to the wiki. It's geared toward people with little programming experience, if any. If you're already an experienced programmer and have NodeJS installed, all you really need to know is that:

1. To build it, you need to do `npm i` and `npm run serve`.
2. There's some custom shortcodes and macros and whatnot that this site uses. These are described in the "How do I make a page?" section.
3. Contributions are accepted through PRs and commits to [this GitHub repository](https://github.com/radian628/unofficial-desmos-wiki).

### Prerequisites

- Some form of Git client (If you're not sure, I recommend [GitHub Desktop](https://desktop.github.com/)) for sending over your changes.
- A GitHub account. The site is hosted on GitHub.
- Some kind of code editor for editing the files that make up the website. I recommend [VSCode](https://code.visualstudio.com/) if you're not sure what to choose.
- (REQUIRED for MacOS and Linux, OPTIONAL for Windows) NodeJS and NPM, which can both be installed [by downloading NodeJS from here](https://nodejs.org/).

### Steps to Contribute

The steps below assume that you are using GitHub Desktop. However, if you know what you're doing with Git then that shouldn't matter.

1. Fork [this repository](https://github.com/radian628/unofficial-desmos-wiki). It contains all the code that's used to generate the site.
   ![Image of the 'fork' button on the radian628/unofficial-desmos-wiki repository page](../../img/meta/fork.png)
2. Clone the repository.

<div class="side-by-side">

![Image of the 'Clone repository' option in the GitHub Desktop dropdown](../../img/meta/clone1.png)

![Searching the word 'unofficial' in the GitHub Desktop repository list. The repository found is listed as 'radian628/unofficial-desmos-wiki'](../../img/meta/clone2.png)

</div>

(note: If you clone your fork, this should say `YOURUSERNAME/unofficial-desmos-wiki` where `YOURUSERNAME` is your GitHub username)

3. Install dependencies. If you're on Windows, run the file `init.ps1`, which will open a terminal that installs NodeJS, NPM, and all the dependencies of the project. It will then generate a local copy the website.
   On any other platform (or if you already have NodeJS and NPM installed), you can alternatively run `npm i` to install dependencies and `npm run serve` to generate the website. This will require that you have NodeJS and NPM installed beforehand (as per the prerequisites listed above)
4. The terminal will tell you where the server is running. This should be a localhost URL&mdash; e.g. http://localhost:8080. Open that URL in your browser to view the local copy of the site.
5. Make your changes. The site in the browser will update to reflect the changes you made. _See the "How do I make a page?" section below for more details on how to make changes._
6. Upload your changes back to your fork on GitHub by committing and then pushing.
<div class="side-by-side">

![The GitHub Desktop commit screen with staged changes. The commit summary is listed as "you need a summary to commit!"](../../img/meta/commit.png)

![The "push origin" button in GitHub Desktop](../../img/meta/push.png)

</div>

7. Submit a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

## How do I make a page?

This site uses [11ty](https://11ty.dev/) for static site generation with the [Liquid](https://shopify.github.io/liquid/) templating engine.

All of the pages that make up the site are [Markdown](https://www.markdownguide.org/) (`.md`) files under the `src` directory. Create a file ending in `.md` there. I recommend looking at other `.md` files to get a sense of the syntax and how it's used.

All files use Markdown for syntax (with HTML support) with YAML Front Matter for site navigation and metadata (e.g. page titles). Learning YAML syntax doesn't matter all that much&mdash; you can probably infer how the Front Matter should look based on how it looks on most pages. Front Matter is the stuff delimited by `---`s at the start of the pages.

### Shortcodes

Use shortcodes to embed Desmos content and equations into pages.

As an example, the shortcode {{ "`{% statictext 'f(x) = x/2 + 1' %}`" }} produces {% statictext 'f(x) = x/2 + 1' %}. Shortcodes used for Desmos are generally written in the format {{ "`{% SHORTCODENAME 'arg1', 'arg2', 'arg3' %}`" }} where `SHORTCODENAME` is the name of the shortcode and `'arg1'`, `'arg2'`, etc. are the arguments/parameters to the shortcode. Here are all the custom shortcodes:

- Use the `graphstate` shortcode to put a desmos embed in a markdown page. This shortcode must be give a full JSON string as input in the same format as the return value of Desmos's `Calc.getState()`. It can also be given an object identical to [the "options" parameter of `Desmos.GraphingCalculator`](https://www.desmos.com/api/v1.9/docs/index.html#document-graphing-calculator-constructor), which can be used to change settings (e.g. disabling graphpaper in cases where you only need the expressions list)
- Use the `textmode` shortcode to put a desmos embed using [Text Mode](https://www.desmodder.com/text-mode/) syntax. This also supports the "options" parameter.
- Use `prefixedEleventyNavigation` to render an Eleventy navigation list to markdown. This is necessary because the production site is deployed to a subdirectory, which for some reason isn't handled properly by the regular Eleventy navigation render functions.
- Use the `staticmath` shortcode to render LaTeX anywhere. It takes an optional JSON string as a second argument, which follows this TypeScript type signature:

```ts
type StaticMathOptions = {
  copyButton?: boolean; // If true, adds a "copy to clipboard" button attached to the math field.
};
```

- `statictext` is identical to `staticmath`, except it uses Text Mode syntax.

When in doubt, look over other pages to see how they're using the shortcodes.
