---
title: Broadcasting Explained
eleventyNavigation:
  title: Broadcasting Explained
  parent: Main
  key: Broadcasting Explained
tags:
  - list-manipulation
  - explanation
crosslinks:
  - broadcasting
  - broadcast
layout: base.liquid
---

Broadcasting is a feature in Desmos that allows for operations involving ((lists)) that would normally not work with lists. In short, under certain contexts, operations on Desmos lists will instead be applied separately on each _element_ of the list, before being merged back together in the same order to create a new list. This is best shown with an example.

In an ordinary programming language, an expression like {% mq '[1,2,3]+1' %} would be an error&mdash; it doesn't usually make sense to add a _list of numbers_ to a _number_. However, Desmos uses broadcasting to apply the addition operation to each element separately. As a result, {% mq '[1,2,3]+1' %} evaluates to {% mq '[2,3,4]' %}. Broadcasting works on list-list operations too&mdash; {% mq '[1,2,3]+[4,5,6]' %} evaluates to {% mq '[5,7,9]' %}, for example. Here are a few more examples:

- {% mq '([1,2,3])^2'%} evaluates to {% mq '[1,4,9]'%}
- {% mq 'mod([1,2,3],2)'%} evaluates to {% mq '[1,0,1]'%}
- {% mq '([2,3,4], [5,6,7])' %} evaluates to {% mq '[(2,5),(3,6),(4,7)]' %}
- {% mq '{[1,2,3] = 2: 10, [4,5,6]}'%} evaluates to {% mq '[4,10,6]'%}

In some cases Desmos may end up broadcasting a list in _one_ context, but _not_ broadcast it in another context, even if both contexts exist within the _same expression_:

- {% mq 'L = [1,2,10]'%}
- {% mq 'max(L) + L'%}

The second expression here evaluates to {% mq '[11, 12, 20]' %}. In the {% mq 'max(L)' %} portion, the list {% mq 'L' %} is _not_ being broadcasted when it's used in {% mq 'max' %}, because {% mq 'max' %} treats it as a list to retrieve its maximum element (in this case {% mq '10' %}). However, when {% mq 'L' %} is added to its maximum via the "{% latex '+L' %}" part, it _is_ being broadcasted, because Desmos is trying to add a list to a number.

In some rare cases, you might want to force Desmos to broadcast a list. In these case you can use a list comprehension with the list you want to force-broadcast as a parameter. However, these cases tend to be very rare, so don't do this by default.
