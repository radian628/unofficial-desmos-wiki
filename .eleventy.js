const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require("node:fs/promises");
const parse5 = require("parse5");
const { finished, Duplex } = require("node:stream");

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
  eleventyConfig.addPassthroughCopy("./src/img");
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
  eleventyConfig.addPairedAsyncShortcode(
    "crosslink",
    async function (content, otherPages, thisPageUrl) {
      const crosslinkList = new Set();

      for (const op of otherPages) {
        if (op.url === thisPageUrl) continue;

        const crosslinks = op.data.crosslinks;
        if (crosslinks) {
          for (const crosslink of crosslinks) {
            crosslinkList.add({
              phrase: new RegExp(`(\\W)(${crosslink})(\\W)`, "i"),
              link: op.url,
            });
          }
        }
      }

      const { RewritingStream } = await import("parse5-html-rewriting-stream");
      const rewriter = new RewritingStream();

      const tagStack = [];

      rewriter.on("startTag", (node, rawHTML) => {
        tagStack.push(node.tagName);
        rewriter.emitStartTag(node);
      });
      rewriter.on("endTag", (node, rawHTML) => {
        tagStack.pop();
        rewriter.emitEndTag(node);
      });

      rewriter.on("text", (node, raw) => {
        if (!["li", "p"].includes(tagStack[tagStack.length - 1])) {
          rewriter.emitRaw(raw);
          return;
        }

        let text = raw;
        for (const crosslink of crosslinkList) {
          let newText = text.replace(
            crosslink.phrase,
            `$1<a href="${eleventyConfig.getFilter("url")(
              crosslink.link
            )}">$2</a>$3`
          );
          if (text !== newText) {
            for (const crosslink2 of crosslinkList) {
              if (crosslink2.link === crosslink.link)
                crosslinkList.delete(crosslink2);
            }
          }
          text = newText;
        }

        rewriter.emitRaw(text);
      });

      const chunks = [];

      rewriter.on("data", (chunk) => chunks.push(chunk));

      rewriter.write(content);

      return chunks.join("");
    }
  );

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
