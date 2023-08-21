[LINK TO THE SITE](https://radian628.github.io/unofficial-desmos-wiki/)

Instructions for development:

`npm i`

`npm run serve`

Then go to the website that 11ty tells you it's running at.

Other notes:

- Use the `graphstate` shortcode to put a desmos embed in a markdown page. This shortcode must be give a full JSON string as input. It can also be given an object identical to [the "options" parameter of `Desmos.GraphingCalculator`](https://www.desmos.com/api/v1.9/docs/index.html#document-graphing-calculator-constructor), which can be used to change settings (e.g. disabling graphpaper in cases where you only need the expressions list)
- Use the `textmode` shortcode to put a desmos embed using [Text Mode](https://www.desmodder.com/text-mode/) syntax. This also supports the "options" parameter.
- Use `prefixedEleventyNavigation` to render an Eleventy navigation list to markdown. This is necessary because the production site is deployed to a subdirectory, which for some reason isn't handled properly by the regular Eleventy navigation render functions.
- Use the `staticmath` shortcode to render LaTeX anywhere. It takes an optional JSON string as a second argument, which follows this type:

```ts
type StaticMathOptions = {
  copyButton?: boolean; // If true, adds a "copy to clipboard" button attached to the math field.
};
```

- `statictext` is identical to `staticmath`, except it uses Text Mode syntax.
