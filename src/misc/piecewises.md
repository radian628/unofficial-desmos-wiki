---
title: Piecewises
eleventyNavigation:
  title: Piecewises
  parent: Main
  key: Piecewises
tags:
  - explanation
layout: base.liquid
crosslinks: ["piecewise", "piecewises", "piece wise", "piece-wise"]
---

Piecewise functions are the "if-statements" of Desmos, allowing you to add arbitrary conditional logic to your Desmos expressions.

## Branching

Piecewises can be used to add multiple "branches" to a Desmos expression, choosing which expression to evaluate based on a comparison. For instance, this piecewise evaluates to {% mq 'x' %} if {% mq 'x' %} is greater than 0, {% mq '-x' %} if {% mq 'x' %} is less than 0, and 0 if neither of these conditions apply.

{% mq 'absoluteValue(x)={x>0:x,x<0:-x,0}' %}

## Left-to-right Evaluation

Piecewises are evaluated left-to-right. That is, they will try the leftmost condition first, then the next one, then the next one, then the next one, et cetera. That means that if you have more than one true condition in a piecewise, only the first one will run.

{% mq '{1=2: 2, 5=5: 3, 10=10: 4}' %}

This example, for instance, evaluates to 3, even though the {% latex '10=10: 4' %} branch would suggest that it could evaluate to 5. This is because the {% latex '5=5: 3' %} branch is the leftmost true branch.

## Default Values and Domain Restrictions

Piecewises have special behavior if the {% latex ':' %} is omitted, allowing them to be used as domain restrictions. Consider the following graph:

{% desmos %}

y = x \* {x > -2};

{% enddesmos %}

The line is drawn only where {% mq 'x' %} is greater than -2. This is possible because&mdash; without anything after the {% latex ':' %} to evaluate to, the piecewise defaults to evaluating to 1, effectively keeping its input the same under multiplication. However, if no condition is given _and_ there is no fallback branch at the end without a condition, the piecewise will default to NaN (Not a Number) instead. NaN multiplied by anything is also NaN, so the line disappears.

{% desmos %}

"No ':', so this evaluates to 1.";
{1 = 1};
"No fallback, so this evaluates to NaN.";
{1 = 2};
"A fallback exists, so this evaluates to 3.";
{1 = 2, 3}

{% enddesmos %}

## Logical Operators

Unfortunately, Desmos doesn't support logical operators (AND, OR, NOT, etc.) natively. However, you can emulate them by nesting piecewises. For simplicity's sake, the first condition in these examples will be notated {% mq 'a=b' %} and the second will be notated {% mq 'c=d' %}, but these could really be any conditions. {% mq 'T' %} represents the value to return if true; {% mq 'F' %} represents what to return if false.

### AND

{% mq '{ a=b: { c=d: T, F }, F }' %}

### OR

{% mq '{ a=b: T, c=d: T, F }' %}

### NOT

{% mq '{ a=b: F, T }' %}

### Logical Operators with Clever Conditions

Alternatively, you can define your own custom boolean type where (for example) 0 represents "false" and 1 represents "true". With numbers representing booleans, you can create logical operators accordingly and use them in piecewises by testing if a value is equal to 1 or 0.

#### AND

{% mq 'and(p, q) = p*q' %}

#### OR

{% mq 'or(p, q) = min(p + q, 1)' %}

#### NOT

{% mq 'not(p) = 1 - p' %}
