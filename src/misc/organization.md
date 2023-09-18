---
title: Organizing Graphs
eleventyNavigation:
  title: Organizing Graphs
  parent: Main
  key: Organizing Graphs
tags:
  - guide
crosslinks:
  - organizing graphs
  - organize graphs
layout: base.liquid
---

This is a guide on how to organize your larger graphs.

## It's a lot like programming

Organizing graphs is a lot like organizing code. As such, many of the same tips apply. If you're a programmer and you treat Desmos like you're organizing a codebase, you will likely achieve great success in doing so.

### Use Descriptive Variable Names

With Desmos's status as a "mathematics" tool, it can be tempting to use single-letter variable names, like you may often see in mathematical equations. However, this hinders your graph's readability considerably, especially if it's large. How are you going to remember what any of these variables mean a week from now, especially if there are 30 of them?

The solution is to use subscripted variables. If you type an underscore (`_`) after a single-letter variable name, you will go into "subscript" mode. You can put any combination of numbers and letters into the subscript. For instance, if you type `t_est` (just to be clear, you have to _type_ this, not copy-and-paste), you will get the variable name {% mq 't_est' %}. With the ability to use subscripts, you can now write variable names that consist of entire words, allowing them to be descriptive and thus more memorable. To be clear, variables with the same starting letter but different subscripts are different variables (and vice-versa). For instance, {% mq 't_est' %}, {% mq 't_123' %}, and {% mq 'b_est' %} are all different variables.

Of course, there are downsides to this strategy: These variables take far longer to type out and take up more space. Both issues can be partially remedied with tools like [DesModder](https://desmodder.com). DesModder has Intellisense features that can auto-complete these long variable names, and has plugins like Multiline Expressions and Compact View for allowing you to see more expressions on the screen at once, mitigating the issue of space usage.

### The DRY (Don't Repeat Yourself) Principle

This is a big one. One of the major tenets of programming is to avoid repeating yourself. If you repeat yourself, you:

1. Add extra work for yourself copying and pasting.
2. Miss out on the opportunity of abstracting away common patterns in your code.
3. Make more work for yourself when you have to change something (because you then must change all of its copies).

When applied to Desmos, you can apply the DRY principle by:

- Putting common behavior in functions.
- Making use of wackscopes to avoid duplicating sub-expressions within functions.
- Writing build scripts to generate Desmos code at compile time. (this will be elaborated on later)

### Use Folders

One of the most powerful tools you have for organizing Desmos graphs is folders. Folders can be created by typing the word `folder` into an expression box, or by using the "+" dropdown in the top left of the expressions panel. They can then be given a descriptive name and then be filled with relevant expressions.

### Build Scripts

In some rare cases, your graph may require things that are unavoidably inconvenient to do in regular Desmos. For instance, you might need to frequently use functions nested with themselves many times (i.e. something like {% mq 'f(f(f(f(f(f(x))))))' %}). This is annoying to type out, especially if you have to do it with several different functions or find that you have to switch it to a different function.

Another case of unavoidable inconvenience is when your graph has to load external resources, such as SVG images or 3D models. These are generally impracticably annoying to import by hand.

To simplify these sorts of cases, you can avoid writing them out altogether and instead use an external script. The simplest way to do this is to use the [API](https://www.desmos.com/api/v1.8/docs/index.html) function `Calc.setExpression` to create expressions. If you want to generate an entire graph from code, use the `Calc.getState` function to get the entire state of a graph, modify it to your liking, and then use `Calc.setState` to put it back with your changes.
