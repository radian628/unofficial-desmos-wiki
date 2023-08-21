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

Here is a function that updates a single element in a list:

{% statictext
'update(list, i_ndex, newValue) = { [1 ... length(list)] = i_ndex: newValue, list }', '{ "copyButton": true }'
%}

## Parameters

{% statictext 'list' %} - The list whose single element is changing.

{% statictext 'i_ndex' %} - The one-based index of the element you're changing (e.g. pass in {% staticmath '3' %} to change the third element).

{% statictext 'newValue' %} - The new value you're replacing the element with.

## How it Works

This function works using Desmos's "broadcasting" feature. This is a feature that defines operations between lists and non-lists by applying the operation to each element of the list separately and then re-creating a new list with the elements in the same order. This is best illustrated with an example: {% statictext '[1,2,3]+1' %} evaluates to {% statictext '[2,3,4]'%}. For a more complex example, {% statictext '{ [1,2,3,4,5] = 3: 9, [5,4,3,2,1]}' %} is {% statictext '[5,4,9,2,1]' %}

In the case of the {% statictext 'update'%} function above, the piecewise function is run separately for every element of the {% statictext '[1 ... length(list)]' %} list. This list essentially maps each element to its index&mdash; i.e. the first element is {% statictext '1' %}, the second element is {% statictext '2' %}, et cetera. What this means is that the piecewise condition is only true for the list element equal to {% statictext 'i_ndex' %}, and since this list's elements are the same as its indices, the piecewise is only true for the {% statictext 'i_ndex' %}th list item. This instance of the piecewise then evaluates to {% statictext 'newValue' %}. Otherwise, it just uses the original value at that index in {% statictext 'list' %}. Again, because of broadcasting, {% statictext 'list' %} in this context refers to an _element_ of the list, not the list itself.
