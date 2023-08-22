---
pagination:
  data: collections
  size: 1
  alias: tag
permalink: "{{ '/tag/' | append: tag | append: '/' }}"
eleventyComputed:
  title: "Tagged With {{ '' | append: tag }}"
---

<ol>
    {% for post in collections[tag] %}
        <li><a href="{{ post.url | url }}">{{ post.data.title }}</a></li>
    {% endfor %}
</ol>
