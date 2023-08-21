---
title: Desmos Performance Techniques
eleventyNavigation:
  title: Desmos Performance Techniques
  parent: Tips
  key: Desmos Performance Techniques
---

Here are a list of guidelines that will generally make your graph run faster.

- In many cases, piecewise functions will compute every branch, even though they will resolve to only one branch. This is especially the case when you are not working with parametric, rectangular, or polar functions&mdash; for instance, if you are using points or polygons. Do not rely on piecewises for conditional execution in this case!
- Generally (but not always), implicit equations/inequalities are slow. Rectangular, polar, and parametric equations are faster. Points are faster still. Polygons are often the fastest.
- (Note: this may no longer be the case) Disable the line outlines on polygons for best performance. These outlines are expensive to render onto the screen!
- Do not directly update large lists with actions if at all possible, because the text underlying the displayed expression will have to be generated again. Instead, update the variable(s) that that list depends on; then, let the list update itself automatically.
- Large numbers of expressions (a few hundred or more) will reduce FPS for unclear reasons. This tends to become significant after about 1000 expressions.
- Add ?simulationFPS or ?timeInWorker to your graph link to display the FPS or the approximate time taken to render a frame, respectively.
- If possible, batch lists into individual equations, polygons, et cetera. GPUs are excellent at handling a few massive drawing operations, but are poor at handling many small drawing operations. For instance, you can use a single parametric to draw many objects. Similarly, you can split a single large polygon into multiple noncontiguous polygons by using points that contain undefined values (e.g. (0/0, 0/0)). Keep in mind that this optimization will not work properly if you want multiple colors.
- Desmos optimizes specific kinds of equations. For example, a linear equation will be drawn far faster than a sine wave.
- If you have equations that change over time as the result of an action, place them in a folder and close that folder. That way, the text itself won't be redrawn (very expensive!) when it changes.
- The right side of an action is computed whenever its dependencies change, regardless of whether the whole action itself is run. As a result, actions that "do nothing" most of the time will still decrease performance.
- Have no choice but to modify a large list with actions directly? In particular circumstances, This can be solved by storing multiple numbers inside of each number. For a simple example, let's say you are storing two numbers that range from 0-999, which we'll call n1 and n2. You can store both of these inside a single number by representing the one number as n1 + 1000 \* n2. We'll call this combined number "combined." To retrieve n1, we can do mod(combined, 1000). To retrieve n2, we can do floor(combined / 1000). We can actually store far more data in a Desmos number due than this to the fact that Desmos numbers are stored internally as <a href="https://en.wikipedia.org/wiki/Double-precision_floating-point_format">double-precision floating-point numbers.</a> For an example of this technique in action, see <a href="https://www.desmos.com/calculator/eqafyaphp7">this graph</a>, which stores a grid of 1000 boxes&mdash; which can either be "full" or "empty"&mdash; in a list only 20 elements long. You can see this list&mdash; named "cubes"&mdash; under the "stuff" folder.
