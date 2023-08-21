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

Here is a function that updates a single element in a list:

{% staticmath 'l_{ist}' %} - The list whose single element is changing.

{% staticmath 'i_{ndex}' %} - The one-based index of the element you're changing (e.g. pass in {% staticmath '3' %} to change the third element).

{% staticmath 'n_{ewValue}' %} - The new value you're replacing the element with.

{% textmode
'update(list, i_ndex, newValue) = { [1 ... length(list)] = i_ndex: newValue, list }', '{ "graphpaper": false }'
%}
