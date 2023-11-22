---
title: Things Desmos Can't Do (Yet)
eleventyNavigation:
  title: Things Desmos Can't Do (Yet)
  parent: Main
  key: Things Desmos Can't Do (Yet)
tags:
  - explanation
crosslinks: []
layout: base.liquid
---

There are a lot of things that seem like they _should_ be possible in Desmos, but aren't. These are listed below, along with explanations as to why they don't work and (in some cases) partial fixes.

## Recursion and/or Iteration

Desmos does not support recursion, nor does it support generalized iteration. However, you can simulate the _effects_ of recursion using the ((actions)) system, though the speed at which recursive steps can occur is limited to your screen refresh rate.

## Lists of Lists (Nested Lists)

Desmos does not support lists of lists, lists of lists of lists, or any other nesting of lists directly. However, there are a few partial workarounds for this:

### Polygon .vertices

Polygons in the [geometry calculator](https://www.desmos.com/geometry) have a {% latex ".\\operatorname{vertices}" %} property which can be used to access their points. Because polygons can themselves be put into lists, this feature can be used to access a _list of points_ inside of a _list of polygons_. In other words, you have a _list of lists of points_.

### Higher-dimensional indexing

If your inner lists are all the same length, lists can be indexed in a multi-dimensional manner. For instance, for a list representing a 10 by 10 grid, you could use a 100-element list to store all the elements. Here is a function that, given such a list {% mq "L" %}, gets an item at a 2D position: {% mq "getItem(x, y) = L[1 + (x - 1) + (y - 1) * 10]" %}. Note that we are trying to preserve Desmos's "indices start at 1" convention here.

## Lists greater than 10000 elements long

This does not work. However, there are [many workarounds that allow for >10000-element lists](../../list-manipulation/more-than-10k-elements/). Do keep in mind that all of these have their own caveats.

## Matrices

Desmos does not support matrices outside of its (somewhat limited) [Matrix Calculator](https://www.desmos.com/matrix). However, you can emulate them with lists and implement the matrix operations yourself.

## Complex Numbers

No Desmos calculator supports complex numbers. However, you can emulate them using points and by implementing the various complex number operations manually using those points. [Here is a graph that does just that](https://www.desmos.com/calculator/tuczbjt0ae).

## Viewport/Graphpaper Bounds Variables

Desmos does not have a way of telling your graph where on the graphpaper the user has currently focused. The developers have cited flickering-related bugs as the main reason why they have not implemented this feature yet. The closest thing that exists are the {% mq "width" %} and {% mq "height" %} variables, which get the size of the viewport in pixels. In practice, they're most useful for finding the aspect ratio (ratio of width to height) of the viewport and adjusting onscreen elements to work better on larger and smaller screens.

### Orientation Variables (3D Calculator)

In the [3D calculator](https://www.desmos.com/3d), Desmos does not have variables for determining the current camera orientation. As such, you cannot make graphs that change shape based on the direction in which the user is facing.
