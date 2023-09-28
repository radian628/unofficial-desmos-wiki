---
title: Glossary
eleventyNavigation:
  title: Glossary
  parent: Main
  key: Glossary
tags:
  - explanation
crosslinks:
  - glossary
layout: base.liquid
---

This is a collection of terms that are Desmos-specific, are used in a different sense to how you would normally see them in a non-Desmos context, or just aren't that commonly known yet tend to be thrown around without regard by experienced Desmos users.

## Wackscope

A wackscope is a variable which is dependent on a variable which isn't in the global scope, producing an error, but is used in a scope where it _is_ defined, allowing it to work as normal. See the main article for more examples.

## Expression

"Expression" has several meanings in a Desmos context.

### Definition 1: Anything in the Expression Panel

It can refer to anything in the "expression panel" which by default is to the left of the screen on desktop and is on the bottom half of the screen on mobile. For example, in the graph below, {% mq 'y = x' %} is an expression, <code>this is an expression, and so is the thing above!</code> is an expression, the folder is an expression, and {% mq 'y = x^2' %} is an expression. Internally, these are also called "items."

{% desmos %}

y = x;

"this is an expression, and so is the thing above!";

folder "this is also considered an expression, and so is the thing inside of it" {

    y = x^2;

}

{% enddesmos %}

### Definition 2: Only Math Expressions

A more restricted definition states that an "expression" only refers to the mathematical expressions. Applied to the graph above, this would mean that only {% mq 'y = x' %} and {% mq 'y = x^2' %} are considered expressions.

### Definition 3: Anything that resolves to a value.

The more "programmer-y" definition to "Expression" is that it refers to something that resolves to a value. So, for instance {% mq '1 + 2' %} is an expression because it resolves to a value ({% mq '3' %}), but {% mq 'a = 1 + 2' %} is _not_ an expression because it's an _assignment_ operation which _doesn't_ resolve to a value. Sure, it assigns a value to {% mq 'a' %}, but the entire block of code _itself_ doesn't resolve to a value. You couldn't just do something like {% mq '1 + (a = 1 + 2)' %} and expect it to make sense.

## Expression Panel (Exppanel)

The exppanel is the thing on the left-hand side of a Desmos window (or on the bottom on smaller screens or on mobile) where you write all your mathematical expressions.

{% desmos %} {% enddesmos %}

## Rectangular or Cartesian Equation

A rectangular equation is one of the form {% mq 'y = f(x)' %}, where {% mq 'f(x)' %} can really be any function of {% mq 'x' %}. It's the classic kind of equation you might encounter in math class early on. Note that the variable on the left need not necessarily be {% mq 'y' %}. Here are some examples of rectangular equations:

{% desmos %}
y=x;
y=x^2;
y=sin(x);
a=cos(x);
f(x)=3 \* x + 2;
{% enddesmos %}

## Polar Equation

A polar equation is one of the form {% mq 'r = f(theta)' %}. These equations relate an _angle_ ({% mq 'theta' %}) to a _radius_ ({% mq 'r' %}), effectively making them spirals. Because they have potential to loop around the origin forever, producing an inordinate amount of lag, they are domain-restricted by default. Here are some examples of polars:

{% desmos %}
r=theta;
r=2\*theta;
r=2;
r=sin(theta);
r=sin(10\*theta);
{% enddesmos %}

## Parametric Equation

A parametric equation is one of the form {% mq '(X(t), Y(t))' %}. These equations are defined by defining a domain of {% mq 't' %}-values (e.g. that {% mq 't' %} must be between 0 and 1, though these bounds can be anything), plugging in those {% mq 't' %}-values into the {% mq 'X(t)' %} and {% mq 'Y(t)' %} functions, and then plotting the line formed as {% mq 't' %} changes. These ones can be rather confusing to explain, so here is an example:

{% desmos %}

(3 \* t, 2 \* t);

{% enddesmos %}

This parametric equation has {% mq 't' %} ranging from 0 to 1. Its x-axis is defined by {% mq '3*t' %}. Since t ranges from 0 to 1, the x-position of the line that's plotted ranges from {% mq '3*0' %} to {% mq '3*1' %}, or from 0 to 3. Similarly, since the y-axis is defined by {% mq '2*t' %}, the y-position of the line ranges from {% mq '2*0' %} to {% mq '2*1' %}, or from 0 to 2.

Parametrics can help answer questions like "An ant is crawling on a board. Plot its {% mq '(x, y)' %} position as a function of time {% mq 't' %}" and others where you want to convert a 1D variable into 2D data.

Here are some more examples of parametrics:

{% desmos %}

(t, 2 \* t);
(sin(t), cos(t));
(t ^ 2 + 1, t / 2);
{% enddesmos %}

## Implicit Equation

Roughly speaking, an implicit equation is an equation where you don't just have a single {% mq 'y' %} on one side. In other words, if you were to try to find a point on the implicit equation, you couldn't just plug in an {% mq 'x' %}-value&mdash; you would have to solve for {% mq 'y' %} first. Fortunately, Desmos can plot these anyway. Here are some examples.

{% desmos %}

sqrt(y) = x;
x^2 + y^2 = 4;
x + y = 3;
1 / y = x;

{% enddesmos %}

## Implicit Inequality

When you have an implicit equation but use a condition other than {% latex '=' %}, you get an implicit inequality. These generally have large, shaded-in regions. In common usage, even "solved" inequalities are called "implicit inequalities". Here are some examples.

{% desmos %}

y > x;
x > 2;
y > 2;
x^2 + y^2 < 4;

{% enddesmos %}

## Implicit

Short for "Implicit Inequality". This can also be used to mean "Implicit Equation"

## Note

<div class="tiny-desmos float-right">

{% desmos %}
"This is a note!"
{% enddesmos %}

</div>

A "note" is an expression containing regular text, generally used to explain how a graph works.

## Piecewise

A piecewise is the "if-statement" of Desmos, allowing one to put branching logic into an expression. Here is the absolute-value function defined using a piecewise:

{% mq 'absoluteValue(x) = { x > 0: x, x < 0: -x, 0}' %}

## Action

An ((action)) is an expression using the {% latex '\\to' %} operator. It's used to update the value of an expression.

## Ticker

<div class="tiny-desmos float-right">

{%desmos '{ "graphpaper": false }' %}

ticker a -> a + 1 @{
playing: true
};

a = 0;

{% enddesmos %}

</div>

The action in a graph that can be run repeatedly in a loop. The following graph has a ticker which repeatedly increments {% mq 'a' %}

## State / Graph State / State Object

The above terms can refer to many things, but in many conversations they refer to a specific data structure that can be used to unambiguously and completely define a Desmos graph. Desmos uses graph state internally to store Desmos graphs. You can also use the ((Desmos API)) function `Calc.getState()` to get the state of the current graph and `Calc.setState(state)` to modify the state (where `state` is the state object).

## Model / Item Model

A "model" is the internal representation of an expression _while the graph is running_. It contains both all the data necessary to store the item as graph state, but also contains information that's only useful while the graph is running and loaded in, such as a reference to the UI element for the expression, the actual value the expression evaluates to, et cetera.

## Graphpaper / Viewport

<div class="small-narrow-desmos float-right">

{% desmos %}

{% enddesmos %}

</div>

The part of the screen that shows the stuff that's actually being graphed. This is on the right of the screen on larger screens, and on the top of the screen on smaller/mobile screens.

## List Comprehension (Listcomp)

<div class="small-narrow-desmos float-right">

{% desmos %}
[(a, b) for a=[1...3], b=[1...3]]

{% enddesmos %}

</div>

A list comprehension is a feature in Desmos that aids in the construction of lists. For example, this list comprehension creates the list {% mq '[2,4,6,8,10]' %}:

{% mq '[2 * n for n = [1,2,3,4,5]]' %}.

List comprehensions can also be used like cartesian products, iterating over multiple lists pairwise. Here is an example that generates a 3x3 grid of points:

## Points

2D coordinate points, which can be created in the form {% mq '(x, y)' %} (where {%mq'x'%} and {%mq'y'%} are the x- and y-coordinates of the point, respectively).

## Regressions

The Desmos feature that allows you to fit a curve to data. See more about ((regressions)) here.

## Transformation

A "transformation" is generally a combination of the three following operations:

- Translation (moving something around)
- Rotation (rotating something about a point, or axis in 3D)
- Scale (making something bigger or smaller)

## List Filter

A specific feature in Desmos that allows you to filter values out of lists. For instance, if {% mq 'L=[1,2,3,4,5]' %}, then {% mq 'L[L>3]' %} is {% mq '[4,5]' %} because we only include the elements which are greater than 3. Note that you can also do things like {% mq 'A[B > 3]' %} where you're filtering one list using the criteria of another.

## Bernard

A famous shape that can generate in graphs of implicits with high-frequency data. Bernard is caused by a quirk in the quadtree algorithm used by Desmos. This is arguably the most famous example of Bernard:

{% desmos %}

tan(35.6\*x)=0

{% enddesmos %}

## Fill

The interior of a parametric, implicit inequality, polygon, et cetera.

## Stroke

The line drawn by an equation, the edge of a polygon, et cetera.

## Y-Up / Z-Up

The convention for what axis should be considered "up" in a 3D coordinate system. Y-Up coordinate systems have Y as the up-axis and Z-Up coordinate systems have Z as the up axis.

## Folder

<div class="tiny-desmos float-right">

{%desmos '{ "graphpaper": false }' %}

folder "This is a folder!" {
y = x;
}

{% enddesmos %}

</div>

Desmos supports folders, which allow you to put multiple expressions into a collapsible section for better organization.

You can create a folder by typing the word "folder" into an empty expression, or by using the "+" in the top left corner and selecting "folder".

## Label

<div class="small-narrow-desmos float-right">

{% desmos %}

(0, 0) @{
color: "#c74440",
label: @{
text: "Label",
size: 1,
orientation: "default",
angle: 0,
editableMode: "NONE",
},
}

{% enddesmos %}

</div>

Labels are text attached to coordinate points.

## DesModder

[DesModder](https://desmodder.com) is a browser extension which adds a lot of quality of life functionality to Desmos while still keeping graphs completely compatible with unmodded Desmos.

## Geo Calc

Short for "Geometry Calculator", referring to Desmos's [Geometry Calculator](https://www.desmos.com/geometry)
