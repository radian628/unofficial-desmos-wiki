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
---

Wackscope variables are best described using an example:

{% textmode 'f(m, n) = a + 1; a = 3 * n + m; f(3, 4)', '{ "graphpaper": false }' %}

In this example, {% statictext 'a' %} is a wackscope variable. They've been named "wackscopes" because they defy normal scoping rules one would expect in a regular programming language&mdash; they look like they are part of the global scope and act like it too: The wackscope {% statictext 'a' %} complains that the variables it uses&mdash; {% statictext 'm' %} and {% statictext 'n' %}&mdash; aren't defined.

Despite this, {% statictext 'a' %} works without issue when used in the function {% statictext 'f(m, n)' %}, because {% statictext 'f' %} defines both {% statictext 'm' %} and {% statictext 'n' %} for it. This might seem super counterintuitive for people already familiar with programming. However, think of it like you're directly substituting in {% statictext '3 * n + m' %} for {% statictext 'a' %}.

In general, a "wackscope" variable is any such variable that fits the following criteria:

1. The wackscope uses other variables that _aren't in the global scope_.
2. The wackscope is used in another context that defines variables (e.g. function parameters, list comprehensions, sums) which have the same name as the ones the wackscope uses that aren't defined in the global scope.
