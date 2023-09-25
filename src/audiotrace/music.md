---
title: Making Music with Audiotrace
eleventyNavigation:
  title: Making Music with Audiotrace
  parent: Main
  key: Making Music with Audiotrace
tags:
  - audiotrace
  - music
crosslinks:
  - audiotrace music
layout: base.liquid
---

Note: This guide assumes that you have some knowledge of music theory&mdash; the guide itself more concerns how you would apply it to Desmos.

## What is Audiotrace?

Audiotrace is primarily an accessibility feature designed to help those who are visually impaired understand the shape of Desmos graphs. [Refer to this link if you're not sure how to use audiotrace.](https://www.desmos.com/accessibility)

## How to make music with Audiotrace?

If you already know a bit of music theory, these facts should get you up and running with audiotrace quickly:

- Audiotrace is controlled by the graphpaper bounds. That is, if you shift the graphpaper bounds, all the frequencies of the audio will change. For that reason, you should probably lock the viewport if you're working with audiotrace.
- The X-axis represents time and the Y-axis represents pitch. Higher y-values represent higher pitches.
- Static is added to sounds with Y-values below 0.

## An example

Here's an E-major scale. Note that the audio won't play automatically.
{% desmos %}

settings @{
viewport: @{
xmin: -7.602813924771917,
xmax: 11.22071548699281,
ymin: 0,
ymax: 12,
},
squareAxes: false,
lockViewport: true
};

y = [0,2,4,5,7,9,11,11.999999][0.5 * x + 5];

{% enddesmos %}
