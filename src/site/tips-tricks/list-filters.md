<!--template=tips-tricks-template.html-->

# List Filters: Removing Multiple Elements from a List

<div class="math">`L=\left[1,2,3,4,5\right]`</div>

| Expression | Result |
| - | - |
| <div class="math">`L\left[L>3\right]`</div> | <div class="math">`\left[4,5\right]`</div> |
| <div class="math">`L\left[L\ge 3\right]`</div> | <div class="math">`\left[3,4,5\right]`</div> |
| <div class="math">`L\left[L=3\right]`</div> | <div class="math">`\left[3\right]`</div> |

List filters are a method of allowing some elements in a list while removing others. They let you index a list using a condition. The only elements that exist in the list after the filter are those that meet the condition. You can see some examples above.

## With Different Lists

<div class="math">`L=\left[1,2,3,4,5\right]`</div>
<div class="math">`M=\left[5,4,3,2,1\right]`</div>

| Expression | Result |
| - | - |
| <div class="math">`L\left[M>4\right]`</div> | <div class="math">`\left[1\right]`</div> |
| <div class="math">`L\left[M\ge 4\right]`</div> | <div class="math">`\left[1,2\right]`</div> |
| <div class="math">`L\left[M=4\right]`</div> | <div class="math">`\left[2\right]`</div> |

You can also filter a list using a different list. Think of it like this: Desmos *thinks* it's filtering the second list as it applies its condition to that list. However, it's *actually* filtering the *first list*. So if it *would've* filtered out the 1st and 2nd elements in the second list, had that been the one being filtered, it would actually remove the 1st and 2nd elements in the first list.