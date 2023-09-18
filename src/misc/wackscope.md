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

{% desmos '{ "graphpaper": false }'%}
f(m, n) = a + 1;
a = 3 \* n + m;
f(3, 4)
{% enddesmos %}

In this example, {% mq 'a' %} is a wackscope variable. They've been named "wackscopes" because they defy normal scoping rules one would expect in a regular programming language&mdash; they look like they are part of the global scope and act like it too: The wackscope {% mq 'a' %} complains that the variables it uses&mdash; {% mq 'm' %} and {% mq 'n' %}&mdash; aren't defined.

Despite this, {% mq 'a' %} works without issue when used in the function {% mq 'f(m, n)' %}, because {% mq 'f' %} defines both {% mq 'm' %} and {% mq 'n' %} for it. This might seem super counterintuitive for people already familiar with programming. However, think of it like you're directly substituting in {% mq '3 * n + m' %} for {% mq 'a' %}.

In general, a "wackscope" variable is any such variable that fits the following criteria:

1. The wackscope uses other variables that _aren't in the global scope_.
2. The wackscope is used in another context that defines variables (e.g. function parameters, list comprehensions, sums) which have the same name as the ones the wackscope uses that aren't defined in the global scope.

## Why use Wackscope Variables?

When you write a complex function in Desmos, you will often want to use the same "sub-expression" twice. Consider the example below:

{% mq 'f(a, b) = sin(a + b) + (a + 2^sin(a + b)) / sin(a + b)' %}

Notice how {% mq 'sin(a + b)' %} is repeated three times throughout this function. We can fix this by moving {% mq 'sin(a + b)' %} to a dedicated wackscope variable {% mq 'w' %} and replacing all instances of {% mq 'sin(a + b)' %} with {% mq 'w' %}. This might seem a bit silly for a function this small, but keep in mind that you can write much larger functions in Desmos which will benefit much more from wackscopes. Here is what you will have with a wackscope applied:

{% mq 'w = sin(a + b)' %}

{% mq 'f(a, b) = w + (a + 2^w) / w' %}

As you can see, this example is a lot simpler. It's also a lot more performant&mdash; in the example above, {% mq 'sin(a + b)' %} is calculated _three times_. In the example below, {% mq 'sin(a + b)' %} is calculated _once_ and assigned to {% mq 'w' %}, which is then reused without recalculating it. So not only did adding a wackscope make this function simpler&mdash; it also made it run faster.
