---
title: Regression Bug
eleventyNavigation:
  title: Regression Bug
  parent: Main
  key: Regression Bug
tags:
  - bugs
  - regression
  - reddit wiki
layout: base.liquid
crosslinks: ["Regression Bug"]
---

# Regression Bug

Note: the content here was taken from the Reddit Desmos Wiki

The regression bug is a quirk in desmos's regression code which allows you to define a variable in terms of itself, allowing the user to perform iteration indefinitely, without the slowdown or definitions nested too deeply errors of hard coding the iteration. Here's an example of the bug being used to simulate a car rolling along a hill: https://www.desmos.com/calculator/wohhfauliv (/u/Minerscale)
However the bug is (mostly) outdated as the ticker has been added.

## History

In early 2019, user swoyer2 discovered a nifty trick that lets you pause an animated slider by setting one of the bounds of the slider to be undefined: https://www.reddit.com/r/desmos/comments/bsp0z1/desmos_interaction_for_memory_and_a_mini_glitch/ This was the result of a continued conversation with users AlexRLJones, Heavenira, and vaultthestars on whether or not one could "lock" a slider into having a certain value, similar to the way computers store memory. 
Although this graph allowed a user to pause an animated variable based off of an external control variable, as soon as that external variable changed, the animated variable would begin moving again and therefore would erase the value it had previously held.

Not more than two days after, user vaultthestars accidentally discovered a new slider bug while playing around with regressions and posted this graph in response, which is one of the first examples of the regression bug being used: https://www.reddit.com/r/desmos/comments/bysg3j/a_slider_that_increases_without_bound/

Realizing that this bug could be essentially used to recursively define variables, similar to the way computer code works, user AlexRLJones set out to make a demonstration of the new glitch's capabilities. The following weekend, user AlexRLJones posted a beautiful implementation of a cellular automata called Conway's Game of Life using the same bug to store the state of each "cell" in the array: https://www.desmos.com/calculator/tkc686rvwh

Conway's Game of Life is "Turing Complete", which basically means that one can use it to create basic logic gates, which in turn can be scaled up to recreate virtually any computer simulation that exists. See "Turing Completeness" here: https://en.wikipedia.org/wiki/Turing_completeness. Thus, AlexRLJones's demonstration proved that there really is no limit to what a user can create in Desmos beyond the technical capabilities of their processor.

Recognizing the gravity of this discovery, it was clear that Desmos would never be the same again.

In June 2019, the lead calculator engineer at desmos [briefly mentioned](https://twitter.com/shapeoperator/status/1138938496880525313) an intention to fix the regression bug as it is unintended. He [later](https://twitter.com/shapeoperator/status/1141843196411957249) decided to leave the bug in since he recognized the value of having dynamical systems in desmos. The slider animation modes "Play once" and "Play indefinitely" were added soon after, perhaps inspired by what the community was doing with regressions.


## How does it work?

The essence of the Regression Bug is that it allows variables to be reset every time regressions are calculated using their values from their previous state. So, for example, we may want to increase some slider V by some value D on every update. That is, if D=1 then V should go 1, 2, 3, 4, 5, increasing very quickly. To do this we:

1. Make sliders V and D as desired.

2. Make regression v~V+D, thus storing the desired next-state in v.

3. Set both bounds of V to v and press play on V.

[Here's what that looks like.](https://www.desmos.com/calculator/cjdqtiucyl) Some people will build their regression by doing something like D~0 and then use the info in the residuals for calculations, but those extra steps aren't necessary and the variable names of the residuals can be tricky to manage. Start and reset variables are also common for additional control.

## Regression Jitter

Also called [variable oscillation](https://www.reddit.com/r/desmos/comments/cscpt4/on_variable_oscillation/), this is an effect that can arise when variables defined in terms of themselves interact with user input elsewhere in the graph. Regression variables update every time the graph does. However, rather then updating based on the previous state of the graph they seem to update based on the state right before that. The result is that two independent states are created when variables are defined in terms of themselves. The issue here is that user input and sliders can effect the two states differently, causing the graph to jitter between them. For instance if someone makes a game in desmos where the player character's position is held in some regressions updated by a point acting like a joystick, then there will inevitably be ways of jerking the point around that result in two separate jittery avatars. No remedy is known for this issue.

## Examples of use

[Interactive Puzzle Dungeon Game!](https://www.reddit.com/r/desmos/comments/btsxtg/interactive_puzzle_dungeon_game_desmos_monthly/) by u/vaultthestars

[Conway's Game of Life and the Gosper glider gun](https://www.reddit.com/r/desmos/comments/bzfjgv/conways_game_of_life_and_the_gosper_glider_gun/) by u/AlexRLJones

[Logistic map](https://twitter.com/apu_yokai/status/1221774502058586114) by [@apu_yokai](https://twitter.com/apu_yokai)

[Desert Bus Simulator](https://www.reddit.com/r/desmos/comments/hugayi/desert_bus_simulator/) by u/Knalb_a_la_Knalb