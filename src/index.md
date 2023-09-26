---
title: Unofficial Desmos Wiki
eleventyNavigation:
  title: Main
  key: Main
layout: frontpage.liquid
crosslinks: []
tags:
---

<div style=" height: 50px"></div>

## About

<div class="big-text">

Welcome to the Unofficial Desmos Wiki, the collaborative site for sharing knowledge about Desmos Studio PBC's [Desmos Graphing Calculator](https://www.desmos.com/calculator) and other Desmos tools!

Want to add content? [Submit a PR!](https://github.com/radian628/unofficial-desmos-wiki) If you're not sure how to write code for this project, check out the [development guide](./meta/development/)

Here's a small sampling of some of the content on this site.

</div>

<div class="frontpage-panels-h">
  <div class="frontpage-panels-v">
    <div>
      <h3>List Utility Functions</h3>
      <ul>
        {%- for post in collections["list-utility-fn"] -%}
          <li><a href="{{ post.page.url | url }}">{{ post.data.title }}</a></li>
        {%- endfor -%}
      </ul>
    </div>
  </div>
  <div class="frontpage-panels-v">
    <div>
      <h3>3D</h3>
      <ul>
        {%- for post in collections["3d"] -%}
          <li><a href="{{ post.page.url | url }}">{{ post.data.title }}</a></li>
        {%- endfor -%}
      </ul>
    </div>
    <div>
      <h3>Guides</h3>
      <ul>
        {%- for post in collections["guide"] -%}
          <li><a href="{{ post.page.url | url }}">{{ post.data.title }}</a></li>
        {%- endfor -%}
      </ul>
    </div>
  </div>
</div>

## All Tags

<ul>
{%- for key in collections | keys -%}
  <li> <a href="{{ "/tag/" | append: key[0] | append: "/" | url }}">{{key[0]}}</a></li>
{%- endfor -%}
</ul>

## All Pages

{{ collections.all | eleventyNavigation | prefixedEleventyNavigation }}
