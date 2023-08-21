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

{% textmode
'update(list, i_ndex, newValue) = { [1 ... length(list)] = i_ndex: newValue, list }', '{ graphpaper: false }'
%}
