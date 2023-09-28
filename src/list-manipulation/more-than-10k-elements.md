---
title: How to make a List with more than 10000 Elements
eleventyNavigation:
  title: How to make a List with more than 10000 Elements
  parent: Main
  key: How to make a List with more than 10000 Elements
tags:
  - guide
crosslinks:
  - more than 1000 elements
layout: base.liquid
---

## Disclaimer: There is a chance that none of these will work

First things first, all of these solutions are quite clunky and are by no means perfect. There is no absolutely foolproof way to get more than 10000 elements in a list.

## Use a list of points

If you store a list of points, you can effectively store 20000 numbers in a single list.

## Pack multiple numbers into one number

If you don't need the full precision of the numbers offered by desmos (64-bit floating point numbers), you can relatively easily pack multiple numbers into each number. Let's say you want to store two numbers {% mq 'a' %} and {% mq 'b' %}&mdash; both of which are integers from 0 to 999&mdash; in a Desmos number {% mq 'N' %}. We can represent {% mq 'N' %} as follows:

{% mq 'N = 1000 * b + a' %}

Then to extract {% mq 'a' %} and {% mq 'b' %}, we can do the following:

{% mq 'a = mod(N, 1000)' %}

{% mq 'b = floor(N / 1000)' %}

This process can be expanded to store more numbers within numbers. However, keep in mind that Desmos numbers can only accurately store integers up to around {% mq '2^52' %}.

## Use Polygon .vertices (geometry calculator only)

The Desmos Geometry Calculator exposes a {% latex '\\operatorname{polygon}\\left(\\right).\\mathrm{vertices}' %} variable, which contains a list of a polygon's vertices. By storing a list of 10000 polygons, each with 10000 vertices, you can effectively store 100 million points in a single list, or 200 million numbers. You can effectively store a list of lists too because of this.

## Store Multiple Polygons in One Polygon (polygons only)

If you need to store a list of more than 10000 polygons, there is a chance you'll be able to get away with storing multiple polygons in a single call to {% mq 'polygon()' %}. They will have to be the same color and won't handle overlap very well, but this will work nonetheless. This works because {% mq 'polygon()' %} splits up polygons with undefined values like {% mq '(0/0, 0/0)' %}.

{% desmos %}

polygon((0, 0), (1, 1), (2, 0), (0/0, 0/0), (3, 0), (4, 1), (5, 0), (0/0, 0/0));

{% enddesmos %}
