---
title: Update a Single List Item
eleventyNavigation:
  title: Update a Single List Item
  parent: Main
  key: Update a Single List Item
tags:
  - list-manipulation
  - tip
  - list-utility-fn
layout: base.liquid
crosslinks: []
---

## Update Single List Element Function

{% mainPreview %}
Here is a function that updates a single element in a ((list)):

{% mq
  'update(list, i_ndex, newValue) = { [1 ... length(list)] = i_ndex: newValue, list }', '{ "copyButton": true }'
  %}

{% endmainPreview %}

## Parameters

{% mq 'list' %} - The list whose single element is changing.

{% mq 'i_ndex' %} - The one-based index of the element you're changing (e.g. pass in {% latex '3' %} to change the third element).

{% mq 'newValue' %} - The new value you're replacing the element with.

## How it Works

This function works using Desmos's broadcasting feature. In the case of the {% mq 'update'%} function above, the piecewise function is run separately for every element of the {% mq '[1 ... length(list)]' %} list. This list essentially maps each element to its index&mdash; i.e. the first element is {% mq '1' %}, the second element is {% mq '2' %}, et cetera. What this means is that the piecewise condition is only true for the list element equal to {% mq 'i_ndex' %}, and since this list's elements are the same as its indices, _the piecewise is only true for the {% mq 'i_ndex' %}th list item_. This instance of the piecewise then evaluates to {% mq 'newValue' %}. Otherwise, it just uses the original value at that index in {% mq 'list' %}. In other words, only the {% mq 'i_ndex' %}th list item changes&mdash; everything else remains as-is. Again, because of broadcasting, {% mq 'list' %} in this context refers to an _element_ of the list, not the list itself.
