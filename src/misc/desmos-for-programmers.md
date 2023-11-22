---
title: Desmos for Programmers
eleventyNavigation:
  title: Desmos for Programmers
  parent: Main
  key: Desmos for Programmers
tags:
  - guide
  - explanation
crosslinks: []
layout: base.liquid
---

This is a guide to how to use the more complex features of Desmos, specifically geared to leverage prior programming experience and to avoid common pitfalls that programmers might fall into. There's no real structure to it&mdash; most of the sections stand on their own.

## Desmos as a Functional Programming Language

Desmos is effectively a programming language. Think of it like if you took a functional language and removed the first-class functions and the recursion. Think of actions like managed side effects, similar to the IO monads from Haskell.

## Lists are one-indexed

Desmos lists are one-indexed. In other words, if {% mq 'L' %} is a list, then {% mq 'L[1]' %} is its first element, _not_ {% mq 'L[0]' %}.

## Numbers are usually double-precision floating point

Desmos numbers are generally IEEE double-precision (64-bit) floating-point numbers. Desmos _will_ under certain circumstances use constant collapsing with exact rational numbers represented internally as a pair of integers, but many operations will force it to fall back on floats (such as graphing a line or performing a summation operation).

## Scoping is really weird

See the article on wackscopes for more about this phenomenon. Desmos scoping is strange because you can define a variable that uses variables that _don't exist_, then use that variable as an intermediate in a function where those variables _do exist_, and it'll work just fine despite the error message.

## Actions are simultaneous, not sequential

<div class="small-narrow-desmos float-right">

{% desmos %}

a = 3;
b = 4;
a -> b, b -> a;

{% enddesmos %}

</div>

When you define several actions separated by commas (e.g. something like {% mq 'a -> b, b -> a'%}), they are all executed simultaneously, not in sequence. This phenomenon allows actions like this to swap values, as is shown in the example.
