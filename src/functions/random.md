---
title: random()
eleventyNavigation:
  title: random()
  parent: Main
  key: random()
tags:
  - function
  - random
layout: base.liquid
crosslinks: ["random()"]
---

The {% mq 'random()' %} function in Desmos has many overloads (possible sets of parameters) that might make it confusing to use. These are as follows:

## random()

### Explanation

This overload generates a random number between 0 and 1.

### Examples

{% mq 'random()' %}

## random(count)

### Explanation

This overload generates a list of <code>count</code> random numbers between 0 and 1.

### Examples

{% mq 'random(5)' %} - Generate five random numbers between 0 and 1.

{% mq 'random(3)' %} - Generate three random numbers between 0 and 1.

## random(count, seed)

### Explanation

This overload generates a list of <code>count</code> random numbers between 0 and 1 using the random seed <code>seed</code>. Specifying a random seed allows the function to be used deterministically (i.e. the same inputs will always map to the same outputs).

### Examples

{% mq 'random(3, 1)' %} - Generate three random numbers with the seed 1.

## random(list, count?, seed?)

### Explanation

Pick <code>count</code> random numbers from a list <code>list</code>. If you omit the second parameter, this overload will output a single number instead of a list. You may optionally specify a seed.

### Examples

{% mq 'random([1,3,5])' %} - Pick either 1, 3, or 5.

{% mq 'random([1,3,5], 10)' %} - Create a list of 10 random numbers which can be 1, 3, or 5.

{% mq 'random([1,3,5], 1, 10)' %} - Pick either 1, 3, or 5 once, based on the seed 10.

## random(distribution, count?, seed?)

### Explanation

Sample <code>count</code> random numbers from a distribution. If <code>count</code> is omitted, this function will output a number instead of a list.

### Examples

{% mq 'random(normaldist())' %} - Sample a value from a standard normal distribution.

{% mq 'random(normaldist(), 100)' %} - Sample 100 values from a standard normal distribution.

{% mq 'random(normaldist(), 100, 5)' %} - Sample 100 values from a standard normal distribution, with the seed 5.
