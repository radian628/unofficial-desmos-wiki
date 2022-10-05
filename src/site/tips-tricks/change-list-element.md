<!--template=tips-tricks-template.html-->

# Change/replce one element in a list

<span class="math copy main-expr">`c_{hange}\left(l_{ist},i_{ndex},n_{ewvalue}\right)=\left\{\left[1...\operatorname{length}\left(l_{ist}\right)\right]=i_{ndex}:n_{ewvalue},l_{ist}\right\}`</span>

## Parameters
| Name | Description |
| - | - |
| <span class="math">l_{ist}</span> | List for which one element should be replaced.
| <span class="math">i_{ndex}</span> | The index of the element to be replaced.
| <span class="math">n_{ewvalue}</span> | The new value that the element will be replaced with.

This function changes one element in a list. It works by running a piecewise over the list <span class="math">[1,2,3... length(l_{ist})]</span>. This implicitly runs the piecewise once per every element in this list. Since each element in thi list represents a list index, the <span class="math">n</span>th element has index <span class="math">n</span>. It then checks to see whether the given element is equal to <span class="math">i_{ndex}</span>, the index of the element to replace. If it is, we know to replace it, and set it to the new value of the element, <span class="math">n_{ewvalue}</span>. Otherwise, we return the corresponding element from the old list, <span class="math">l_{ist}</span>.