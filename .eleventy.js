module.exports = function (eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/**");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addShortcode(
    "graphstate",
    (state, settings) => `<div class="desmos-container"></div><script>{ 
    let graphstate = ${state}; 
    let Calc = Desmos.GraphingCalculator(document.currentScript.previousSibling, ${settings});
    Calc.setState(graphstate);
  }</script>`
  );
  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};
