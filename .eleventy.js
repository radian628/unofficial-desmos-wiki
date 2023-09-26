const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require("node:fs/promises");
const parse5 = require("parse5");
const { finished, Duplex } = require("node:stream");
const slugify = require("slugify");
var less = require("less");
const path = require("path");
const externalCrosslinks = require("./crosslinks.json");

const desmosPlugin = require("11ty-desmos");

const createDesmosEmbedCode = (state, settings) =>
  `<div class="desmos-container invisible"><div>${state}</div><div>${settings}</div></div>`;

const createStaticMathCode = (state, settings) =>
  `<span class="static-math-container dcg-calculator-api-container ${
    settings.copyButton ? "has-copy-button" : ""
  }">${state}</span>`;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(desmosPlugin);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addWatchTarget("./src/**");
  eleventyConfig.addPassthroughCopy("./src/img");
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
        }</a></h2>\n${(
          await this.liquid.parseAndRender(mainPreview, this)
        ).replace(/\(\((.*?)\)\)/, "$1")}`;
      })
    );
  });

  function innerText(node) {
    if (node.nodeName === "#text") return node.value;
    return node?.childNodes.map((n) => innerText(n)).join("");
  }

  eleventyConfig.addAsyncShortcode(
    "generateHeaderNav",
    async function (content) {
      const headers = [];

      const level = (node) => (node ? Number(node.tagName[1]) : 0);

      const tree = parse5.parseFragment(content);

      function createHeaderTree(node) {
        if (node.tagName && node.tagName.match(/h[1-6]/)) {
          headers.push(node);
        }
        for (const child of node.childNodes ?? []) createHeaderTree(child);
      }

      createHeaderTree(tree);

      const headerTree = {
        header: undefined,
        children: [],
      };

      const headerStack = [headerTree];

      for (const h of headers) {
        let top = headerStack.at(-1);
        while (level(h) <= level(top.header)) {
          headerStack.pop();
          top = headerStack.at(-1);
        }

        const treeEntry = {
          header: h,
          children: [],
        };

        top.children.push(treeEntry);
        headerStack.push(treeEntry);
      }

      function generateHeaderNav({ header, children }) {
        const it = header ? innerText(header) : "";
        const headerHTML = header ? `<a href="#${slugify(it)}">${it}</a>` : "";
        const childrenListHTML =
          children && children.length > 0
            ? `<ul>${children
                .map((c) => {
                  return `<li>${generateHeaderNav(c)}</li>`;
                })
                .join("")}</ul>`
            : "";
        return `${headerHTML}${childrenListHTML}`;
      }
      return generateHeaderNav(headerTree);
    }
  );

  async function contentTransform(content, otherPages, thisPageUrl) {
    const warn = (msg) => console.warn(`⚠️  ${thisPageUrl}: ${msg}`);

    if (path.extname(this.page.inputPath) === ".md" && this.ctx) {
      const env = this?.ctx?.environments;
      if (!this.ctx.environments.pagination) {
        if (!env?.eleventyNavigation) warn("Missing eleventyNavigation");
        if (!env?.tags) warn("Missing tags (use an empty list for no tags)");
        if (!env?.crosslinks)
          warn("Missing crosslinks (use an empty list for no crosslinks)");
      }
      if (!env?.title) warn("Missing title");
      if (!env?.layout)
        warn("Missing layout (use an empty list for no layout)");
    }

    const crosslinkRegexp = (crosslink) =>
      new RegExp(`(\\W)${crosslink}(\\W)`, "i");

    const crosslinkList = new Set();

    for (const [phraseStr, link] of Object.entries(externalCrosslinks)) {
      crosslinkList.add({
        phrase: crosslinkRegexp(`\\(\\((${phraseStr})\\)\\)`),
        link,
      });
    }

    for (const op of otherPages) {
      if (op.url === thisPageUrl) continue;

      const crosslinks = op.data.crosslinks;
      if (crosslinks) {
        for (const crosslink of crosslinks) {
          crosslinkList.add({
            phrase: crosslinkRegexp(`(${crosslink})`),
            link: op.url,
          });
        }
      }
    }

    const tree = parse5.parseFragment(content);

    function containsLinks(node) {
      return node.childNodes.some(containsLinks) || node.tagName === "a";
    }

    function crosslinkify(node) {
      if (node.childNodes) {
        for (const child of node.childNodes) crosslinkify(child);
      }

      switch (node.tagName) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          const txt = innerText(node);
          const slug = slugify(txt);
          node.attrs.push({
            name: "id",
            value: slug,
          });
          node.childNodes.push(
            parse5.parseFragment(
              `<a class="link-to-header" href="#${slug}"> #</a>`
            ).childNodes[0]
          );
          break;
        case "li":
        case "p":
          node.childNodes = node.childNodes
            .map((cn) => {
              if (cn.nodeName === "#text") {
                let text = cn.value;

                for (const crosslink of crosslinkList) {
                  const newText = text.replace(
                    crosslink.phrase,
                    `$1<a href="${eleventyConfig.getFilter("url")(
                      crosslink.link
                    )}">$2</a>$3`
                  );

                  if (newText !== text) {
                    for (const crosslink2 of crosslinkList) {
                      if (crosslink2.link === crosslink.link)
                        crosslinkList.delete(crosslink2);
                    }

                    text = newText;
                  }
                }

                const fragment = parse5.parseFragment(text);

                return fragment.childNodes;
              }

              return cn;
            })
            .flat(1);
          break;
      }
    }

    crosslinkify(tree);

    return parse5.serialize(tree);
  }

  eleventyConfig.addPairedAsyncShortcode("contentTransform", contentTransform);

  eleventyConfig.addFilter("contentTransform", contentTransform);

  eleventyConfig.addFilter("keys", (obj) => {
    return Object.keys(obj);
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

  eleventyConfig.addTemplateFormats("less");

  eleventyConfig.addExtension("less", {
    outputFileExtension: "css",

    compile: async function (inputContent, inputPath) {
      const result = less.render(inputContent, {
        filename: inputPath,
      });

      return async (data) => {
        return (await result).css;
      };
    },
  });

  return {
    dir: {
      input: "src",
      output: "docs",
    },
    pathPrefix: "/unofficial-desmos-wiki/",
  };
};
