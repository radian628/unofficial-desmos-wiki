---
title: Wackscope Variables
eleventyNavigation:
  title: Wackscope Variables
  parent: Main
  key: Wackscope Variables
tags:
  - explanation
crosslinks:
  - wackscope
  - wackscopes
layout: base.liquid
---

## What are Wackscope Variables?

Wackscope variables are best described using an example:

{% textmode 'f(m, n) = a + 1; a = 3 * n + m; f(3, 4)', '{ "graphpaper": false }' %}

In this example, {% statictext 'a' %} is a wackscope variable. They've been named "wackscopes" because they defy normal scoping rules one would expect in a regular programming language&mdash; they look like they are part of the global scope and act like it too: The wackscope {% statictext 'a' %} complains that the variables it uses&mdash; {% statictext 'm' %} and {% statictext 'n' %}&mdash; aren't defined.

Despite this, {% statictext 'a' %} works without issue when used in the function {% statictext 'f(m, n)' %}, because {% statictext 'f' %} defines both {% statictext 'm' %} and {% statictext 'n' %} for it. This might seem super counterintuitive for people already familiar with programming. However, think of it like you're directly substituting in {% statictext '3 * n + m' %} for {% statictext 'a' %}.

In general, a "wackscope" variable is any such variable that fits the following criteria:

1. The wackscope uses other variables that _aren't in the global scope_.
2. The wackscope is used in another context that defines variables (e.g. function parameters, list comprehensions, sums) which have the same name as the ones the wackscope uses that aren't defined in the global scope.

## Why use Wackscope Variables?

When you write a complex function in Desmos, you will often want to use the same "sub-expression" twice. Consider the example below:

{% statictext 'f(a, b) = sin(a + b) + (a + 2^sin(a + b)) / sin(a + b)' %}

Notice how {% statictext 'sin(a + b)' %} is repeated three times throughout this function. We can fix this by moving {% statictext 'sin(a + b)' %} to a dedicated wackscope variable {% statictext 'w' %} and replacing all instances of {% statictext 'sin(a + b)' %} with {% statictext 'w' %}. This might seem a bit silly for a function this small, but keep in mind that you can write much larger functions in Desmos which will benefit much more from wackscopes. Here is what you will have with a wackscope applied:

{% statictext 'w = sin(a + b)' %}

{% statictext 'f(a, b) = w + (a + 2^w) / w' %}

As you can see, this example is a lot simpler. It's also a lot more performant&mdash; in the example above, {% statictext 'sin(a + b)' %} is calculated _three times_. In the example below, {% statictext 'sin(a + b)' %} is calculated _once_ and assigned to {% statictext 'w' %}, which is then reused without recalculating it. So not only did adding a wackscope make this function simpler&mdash; it also made it run faster.
