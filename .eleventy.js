module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/**");
  eleventyConfig.addPassthroughCopy("./src/css");
  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
