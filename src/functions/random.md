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

## Before we Begin: What is a Random Seed?

For the most part, randomness on a computer is not _truly_ "random". Instead, these "random" functions tend to take in some sort of specific input, scramble it to the point of being unrecognizable, and then output the "scrambled" value as output. Crucially, if you have the same input, you will always get the same output. If the input `3` is scrambled to `0.3194380234`, then using `3` as the input to the random function will _always_ give you `0.3194380234`. This input value `3` is referred to as the _seed_, because you're using it as a "seed" to "grow" the output random value. Just like the same seed produces the same kind of tree, the same seed in a random number generator should produce the same output.

### What are seeds for?

Seeds are nice if you want consistent, repeatable output.

## WARNING: Seeds are weird in Desmos!

<div class="small-narrow-desmos float-right">

{% desmos %}

random(1, 1)[1];

random(1, 1)[1];

{% enddesmos %}

</div>

In Desmos, there are several overloads of the {% mq 'random()' %} function that let you specify a seed. Keep in mind that these seeds are only local to _one specific call_ of the {% mq 'random()' %} function. What this means is that even if you use the same seed for two calls to {% mq 'random()' %}, they will produce _different_ outputs. See the graph for an example of this. Think of it as if the specific function call is part of the seed as well.

In other words, you can still use seeds to keep {% mq 'random()' %} predictable, but don't expect _two different calls_ to {% mq 'random()' %} with the same seed to be the same. If you desire consistency, assign the random value to a variable and use _that_ everywhere you need.

Note that Desmos also uses a [graph-wide random seed](https://www.desmos.com/api/v1.8/docs/index.html#document-randomness) to determine random values as well.

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
