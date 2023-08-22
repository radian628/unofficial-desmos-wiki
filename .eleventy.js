const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require("node:fs/promises");

const createDesmosEmbedCode = (state, settings) =>
  `<div class="desmos-container invisible"><div>${state}</div><div>${settings}</div></div>`;

const createStaticMathCode = (state, settings) =>
  `<span class="static-math-container dcg-calculator-api-container ${
    settings.copyButton ? "has-copy-button" : ""
  }">${state}</span>`;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addWatchTarget("./src/**");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addShortcode("graphstate", (state, settings) =>
    createDesmosEmbedCode(state, settings)
  );
  eleventyConfig.addAsyncShortcode("textmode", async (state, settings) => {
    const tm = await import("@desmodder/text-mode-core");

    const cfg = tm.buildConfig({});
    const raw = tm.textToRaw(cfg, state);
    return createDesmosEmbedCode(JSON.stringify(raw[1]), settings);
  });
  eleventyConfig.addShortcode("staticmath", (state, settings) => {
    return createStaticMathCode(state, settings ? JSON.parse(settings) : {});
  });
  eleventyConfig.addShortcode("statictext", async (state, settings) => {
    const tm = await import("@desmodder/text-mode-core");

    const cfg = tm.buildConfig({});
    const raw = tm.textToRaw(cfg, state);
    return createStaticMathCode(
      JSON.stringify(raw[1].expressions.list[0].latex).slice(1, -1),
      settings ? JSON.parse(settings) : {}
    );
  });
  eleventyConfig.addPairedAsyncShortcode("mainPreview", function (content) {
    return content;
  });
  eleventyConfig.addFilter("getPreviews", async function (collection) {
    return await Promise.all(
      collection.map(async (page) => {
        const inputPath = page.data.page.inputPath;
        const inputData = (await fs.readFile(inputPath)).toString();
        const mainPreview = (await inputData).match(
          /\{%\s+mainPreview\s+%\}([\s\S]+)\{%\s+endmainPreview\s+%\}/g
        )?.[0];
        if (!mainPreview) return "";
        return `<h2><a href="${eleventyConfig.getFilter("url")(page.url)}">${
          page.data.title
        }</a></h2>\n${await this.liquid.parseAndRender(mainPreview, this)}`;
      })
    );
  });

  function handlePrefixedNav(nav) {
    return `<ul>
      ${nav
        .map((navItem) => {
          return `<li>
          <a href="${eleventyConfig.getFilter("url")(navItem.url)}">${
            navItem.title
          }</a>${
            navItem.children && navItem.children.length > 0
              ? handlePrefixedNav(navItem.children)
              : ""
          }
        </li>`;
        })
        .join("")}
    </ul>`;
  }

  eleventyConfig.addFilter("prefixedEleventyNavigation", (nav) => {
    return handlePrefixedNav(nav);
  });
  return {
    dir: {
      input: "src",
      output: "docs",
    },
    pathPrefix: "/unofficial-desmos-wiki/",
  };
};
