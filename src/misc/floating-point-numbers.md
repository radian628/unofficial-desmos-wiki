---
title: Floating Point Numbers in Desmos
eleventyNavigation:
  title: Floating Point Numbers in Desmos
  parent: Main
  key: Floating Point Numbers in Desmos
tags:
  - explanation
crosslinks: []
layout: base.liquid
---

## The Problem

If you've used Desmos for a while, you may have encountered strange behavior like this:

{% desmos %}

"Why is this undefined?";

2 ^ 1024;

"Why is this 0?";

2^53 - (2^53 + 1);

"Why does this graph produce a weird staircase?";

2^51 + x^2 - 2^51;

{% enddesmos %}

All of these bugs are actually caused by the same underlying issue: **Floating Point Imprecision**

## What are Floating Point Numbers?

To understand floating point imprecision, you have to understand floating point numbers. If you want a more in-depth explanation of how these numbers work, see [this Wikipedia article](https://en.wikipedia.org/wiki/Floating-point_arithmetic).

### Binary Numbers

We work with decimal, or base-10 numbers&mdash; there are ten symbols we use to represent these numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. When we chain digits together to make larger numbers, we use powers of ten for place value. For instance, 384 is {% mq "3 * 10^2 + 8 * 10^1 + 4 * 10^0"%}.

Computers, on the other hand, work in binary, or base-2 numbers. There are only two symbols they use: 0 and 1. When we chain digits together in binaery, we use powers of _two_ for place value, not powers of _ten_. Binary can represent the exact same numbers as decimal. It just represents them differently. For example, 384 in binary is represented as the number 110000000, which can be thought of to be expanded as {% mq "1 * 2^8 + 1 * 2^7 + 0 * 2^6 + 0 * 2^5 + 0 * 2^4 + 0 * 2^3 + 0 * 2^2 + 0 * 2^1 + 0 * 2^0" %}.

### Integers

The simplest values that computers can represent are integers. For the purposes of this explanation, these can be thought of establishing a one-to-one correspondence between _sequences of bytes_ and _whole numbers_. For instance, the binary sequence 00000000 could represent the number 0; the sequence 00000001 could represent 1, the sequence 00000010 could represent 2, et cetera. The number of bytes allowed in the sequence is generally fixed. When you hear about "8-bit" numbers, that means that eight bits (binary digits) of data are included in the number. Because each bit doubles the number of possible binary sequences, there are {% mq "2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 = 2^8 = 256" %} possible 8-bit numbers. Generally, since the representation of these numbers counts up from 0, 8-bit numbers can range from 0 to 255. This limit to how big or small a number can be is the most important concept here, because it is precisely what causes all of the floating point errors you saw at the start of this article.

#### Signed Integers

Integers can also be _signed_, which means that they allow for negative numbers. The simplest way of doing this is to simply designate one of the bits as a "sign bit." If the bit is 1, the number represents a negative number. If the bit is 0, it represents a positive number. The most common approach in use today for integers, however, is [the "two's complement" approach](https://en.wikipedia.org/wiki/Two%27s_complement). Under this approach, a signed 8-bit generally ranges from -128 to 127. Notice how even though the range has been shifted, the integer can still store {% mq "2^8 = 256" %} distinct values.

### Floating Point-Numbers

The problem with integers, however, is that they can't represent numbers like 1.5, which are _between_ two integers. _Floating-point numbers_ are designed to get around this limitation. You can think of them like scientific notation: In scientific notation, we represent numbers using a mantissa to represent the "number" part and an exponent to represent what order of magnitude the number lies in. For instance {% mq "1.234 * 10^-6" %} is {% mq "0.000001234" %}. The mantissa is 1.234 and the exponent is -6.

Floating-point numbers do the exact same thing, except the exponent is a signed binary integer as described above, and the exponent represents a _power of two_, not a _power of ten_. The mantissa is a bit weirder, being a "normalized" integer that is divided such that it always is in the range [1, 2). In practice, it can't get infinitesimally close to 2, due to the limited precision of the mantissa. Think of this like how the mantissa in scientific notation ranges from [1, 10)&mdash; if this range actually included 10, we could just change it back to 1 and increase the exponent, so why include anything greater than 10? Similarly, if we had the mantissa be 0.9, we could simply just set it to 9 and decrease the exponent by 1. Restricting it to this range means that there is only _one_ valid representation of a given number in scientific notation.

Desmos in particular uses what are called "IEEE-754 double-precision floating point numbers," which are 64 bits in size. 53 bits are used for the mantissa (52 for the actual data, 1 for the sign) and 11 are used for the exponent.

## Floating Point Imprecision

### Why is 2^1024 Undefined?

I hope you can see the problem here now. Because the exponent of Desmos's floating pooint numbers is a 11-bit signed integer, it can represent {% mq "2^11 = 2048" %} values. These values range from -1024 to 1023, because it is a signed number. The highest number the mantissa can represent is _just under two_. Therefore, the largest number that can be represented in Desmos is _approximately_ {% mq "2^1023 * 1.999999999999999" %}. This is _just under_ {% mq "2^1024" %}. {% mq "2^1024" %} is just _barely_ out of the range of representable values. Since it is out of range, it is instead treated as "undefined."

### Why is 2^53 - (2^53 + 1) equal to 0?

The previous issue was due to lack of precision in the exponent. This one is due to lack of precision in the mantissa. Consider the integer {% mq "2^53" %}. Because we want the mantissa to stay between 1 and 2, the exponent of {% mq "2^53" %} in this case would be {% mq "53" %}. The mantissa would thus be {% mq "1" %}.

However, remember that the unsigned part of the mantissa only stores 52 bits. The most significant bit represents the {% mq "2^52" %}s place due to our exponent of {% mq "53" %}. The next bit represents the {% mq "2^51" %}s bit. The next represents the {% mq "2^50" %}s bit. If we continue this pattern for all the 52 bits of the mantissa, the _least significant bit_ in the mantissa ends up representing the {% mq "2^1" %}s place, or, in other words, the {% mq "2" %}s. place. As a consequence, when working with numbers as large as {% mq "2^53" %}, making the smallest possible change to the mantissa will either increase or decrease our number by 2. What this means is that we can _only represent multiples of 2_.

Ultimately, what this means is that {% mq "2^53 + 1" %} _cannot_ be represented as a floating-point number in Desmos, because it is larger than {% mq "2^53" %} yet isn't a multiple of 2. It's instead rounded down back to {% mq "2^53" %}. And as a result, {% mq "2^53 + 1" %} is equal to {% mq "2^53" %}.

Because of this, {% mq "2^53 - (2^53 + 1)" %} evaluates to {% mq "2^53 - 2^53" %}, which evaluates to {% mq "0" %}.

Exercise for the reader: What do you think would happen if you were to replace the 1 with a 2 to get {% mq "2^53 - (2^53 + 2)" %}?

### What about the weird 2^51 + x^2 - 2^51 staircase?

This happens for essentially the same reason as the previous example. Adding a very large floating point number to a very small floating point number effectively rounds off the less-significant bits of the mantissa in the smaller number. So, as a result, when we subtract the large number again to get the parabola back at the origin, it appears to have a strange "stairstep" effect.
