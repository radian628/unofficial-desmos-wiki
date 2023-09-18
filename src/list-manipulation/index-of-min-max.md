---
title: Index of Min/Max
eleventyNavigation:
  title: Index of Min/Max Array Element
  parent: Main
  key: Index of Min/Max Array Element
tags:
  - list-manipulation
  - tip
  - list-utility-fn
layout: base.liquid
crosslinks: []
---

{% mainPreview %}
Get the one-based index of the smallest or largest element of a ((list)).

{% mq
  'posMin(list) = [1 ... length(list)][list = min(list)][1]', '{ "copyButton": true }'
  %}

{% mq
  'posMax(list) = [1 ... length(list)][list = max(list)][1]', '{ "copyButton": true }'
  %}

{% endmainPreview %}
