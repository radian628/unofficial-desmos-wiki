---
title: Does a List Contain some Value?
eleventyNavigation:
  title: Does a List Contain some Value?
  parent: Main
  key: Does a List Contain some Value
tags:
  - list-manipulation
  - tip
  - list-utility-fn
layout: base.liquid
crosslinks: []
---

{% mainPreview %}
Check to see whether a list contains a certain value. This can be used in the same way a piecewise domain restriction can be used.

{% mq
  'contains(n, L) = {L[L=n].length > 0}' '{ "copyButton": true }'
  %}

This works for both numbers and points.

{% endmainPreview %}

{% mq 'L' %} - The list.

{% mq 'n' %} - The item you're trying to see if the list contains.
