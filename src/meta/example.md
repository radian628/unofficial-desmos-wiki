---
title: Example Page
eleventyNavigation:
  title: Example Page
  parent: Main
  key: Example Page
tags:
  - meta
layout: base.liquid
crosslinks: []
---

## Markdown Basics

[Look here](https://www.markdownguide.org/) for a more complete guide to Markdown.

### Text

When you type text in Markdown, it's rendered as-is.

### Italics & Bold

_Italics_ `*Italics*`

**Bold** `**Bold**`

### Links

[Hyperlink](https://www.desmos.com/calculator) `[Hyperlink](https://www.desmos.com/calculator)`

### Lists

- This
- is
- an
- unordered
- list

```md
- This
- is
- an
- unordered
- list
```

1. This
2. is
3. an
4. ordered
5. list

```md
1. This
2. is
3. an
4. ordered
5. list
```

### Header 3

#### Header 4

##### Header 5

###### Header 6

## Desmos Embeds and Equations

### Equations

Generate the equation {% mq 'y=x^2 + 1 + sin(x)/2' %} with the code `{{ '{' }}% mq 'y=x^2 + 1 + sin(x)/2' %{{ '}'}}`. [Learn more about the equation syntax (called "Text Mode") here.](https://www.desmodder.com/text-mode/).

### LaTeX Equations

Text Mode may not be sufficient if you're trying to render incomplete equations. Fortunately, there is a `latex` shortcode that does just that:

{% latex 'f\\left(x\\right)=' %} is `{{ '{' }}% latex 'f\\left(x\\right)=' %{{ '}' }}`

### Desmos Graphs

<div class="small-narrow-desmos float-right">

{% desmos %}

[(a, b) for a=[1...3], b=[1...3]]

{% enddesmos %}

</div>

Use the `desmos` shortcode to render an entire Desmos graph. You can optionally surround the graph in a `<div></div>` element with some special CSS classes to control its size and coloring. These classes are:

- `big-desmos` - Make the desmos embed take up approximately the entire screen.
- `small-narrow-desmos` - Make the desmos embed take up a smaller amount and only be 50% width. Good for pairing with `float-right`
- `float-right` - Allow the text to "flow" around the Desmos embed, appearing side-by-side with it.
- `tiny-desmos` - 50% width and very small size.
- `dont-invert-colors` - By default, Desmos graphs in this site will adjust their coloring to match dark theme. However, this change also messes with all the colors on the graphpaper, which can be bad for graphs which need specific color information. Use this class to preserve the colors of things being graphed, aside from the graphpaper.
