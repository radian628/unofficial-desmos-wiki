---
title: Update a Single List Item
eleventyNavigation:
  title: Update a Single List Item
  parent: Main
  key: Update a Single List Item
tags:
  - list-manipulation
  - tip
---

## Update Single List Element Function

{% mainPreview %}
Here is a function that updates a single element in a list:

{% statictext
  'update(list, i_ndex, newValue) = { [1 ... length(list)] = i_ndex: newValue, list }', '{ "copyButton": true }'
  %}

{% endmainPreview %}

## Parameters

{% statictext 'list' %} - The list whose single element is changing.

{% statictext 'i_ndex' %} - The one-based index of the element you're changing (e.g. pass in {% staticmath '3' %} to change the third element).

{% statictext 'newValue' %} - The new value you're replacing the element with.

## How it Works

This function works using Desmos's [broadcasting](../broadcasting) feature. In the case of the {% statictext 'update'%} function above, the piecewise function is run separately for every element of the {% statictext '[1 ... length(list)]' %} list. This list essentially maps each element to its index&mdash; i.e. the first element is {% statictext '1' %}, the second element is {% statictext '2' %}, et cetera. What this means is that the piecewise condition is only true for the list element equal to {% statictext 'i_ndex' %}, and since this list's elements are the same as its indices, _the piecewise is only true for the {% statictext 'i_ndex' %}th list item_. This instance of the piecewise then evaluates to {% statictext 'newValue' %}. Otherwise, it just uses the original value at that index in {% statictext 'list' %}. In other words, only the {% statictext 'i_ndex' %}th list item changes&mdash; everything else remains as-is. Again, because of broadcasting, {% statictext 'list' %} in this context refers to an _element_ of the list, not the list itself.
