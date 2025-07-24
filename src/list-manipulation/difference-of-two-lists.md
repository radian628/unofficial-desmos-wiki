---
title: Set Operations Between Lists
eleventyNavigation:
  title: Set Operations Between Lists
  parent: Main
  key: Set Operations Between Lists
tags:
  - list-manipulation
  - tip
  - list-utility-fn
layout: base.liquid
crosslinks: []
---

{% mainPreview %}

Get a list representing the set-theoretic difference between the lists {% mq 'L1' %} and {% mq 'L2' %}.

{% mq 'SetDifference(L1, L2) = unique(join(L2, L1))[L2.length+1...]'  '{"copyButton": true}'%}

Set-theoretic intersection.

{% mq 'SetIntersection(L1, L2) = SetDifference(L1,SetDifference(L1, L2))'  '{"copyButton": true}'%}

{% endmainPreview %}
