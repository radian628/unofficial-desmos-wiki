---
title: Filter Undefined
eleventyNavigation:
  title: Filter Undefined From List
  parent: Main
  key: Filter Undefined From List
tags:
  - list-manipulation
  - tip
  - list-utility-fn
layout: base.liquid
crosslinks: []
---

{% mainPreview %}
Filter any undefined values from a ((list)). {% mq 'L' %} is the list you are trying to filter.

{% mq
  'filterUndefined(L) = L[abs(L) > -1]'
  %}

This works for both numbers and points.

{% endmainPreview %}
