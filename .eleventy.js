module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/**");
  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
