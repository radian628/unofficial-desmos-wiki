<!--template=tips-tricks-template.html-->

# Two-argument Sort: Sorting One List with the Criteria of Another

<span class="math">\operatorname{sort}\left(A,B\right)</span>

## Parameters
| Name | Description |
| - | - |
| <span class="math">A</span> | List for sorting.
| <span class="math">B</span> | List for determining sorting criteria.

## Description
Sort a list <span class="math">A</span> using the sorting criteria of the list <span class="math">B</span>. As an example, let's say you did <span class="math">\operatorname{sort}\left(\left\[2,4,7\right\],\left\[14,5,27\right\]\right)</span>. As stated before, the first list is actually the one whose elements are rearranged. However, it is as if the function *thinks* it is sorting the second list, and rearranges the first list like so. To sort the second list in this case, it would have to swap the 5 and the 14 (the first and second elements) to produce <span class="math">\left\[5,14,27\right\]</span>. However, since it's actually rearranging the first list the exact same way, it will acttually swap *its* first and second elements. In other words, it will convert <span class="math">\left\[2,4,7\right\]</span> to <span class="math">\left\[4,2,7\right\]</span> and return that.