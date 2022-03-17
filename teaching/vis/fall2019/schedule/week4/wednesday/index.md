---
layout: default
title: Monday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Nests and Stacks

## Grouping with d3.nest()

If we want to produce a grouped bar plot (as in the Graphical Perception paper), then there are three main bits of information associated with our data that we will need:
* a data attribute for the group (nominal/ordinal)
* a data attribute for a bar within the group (nominal/ordinal)
* a data attribute for the value that we will encode with the bar (quantitative)

We will use _nesting_ to reorganize our data array, giving us a data structure where `key` gives us the group, and `values` gives us an array of data for the given group. We will then create a _band scale_ for group, a _band scale_ for bars, and a _linear scale_ for the bar's height.

Here is code for achieving this:
```javascript
{% include_relative example0.js %}
```
---
<svg id='svg0' width='500' height='350'></svg>
<script type='text/javascript' src="example0.js"></script>
---

To summarize: we first nest along the `group` attribute, producing an array for which each item contains all data that have an equivalent `group` value (e.g. "g1", "g2"), and then perform a nested data join, first for the group, and then for each array with each group to give us individual bar marks.

## Stacking with d3.stack()

For producing stacked bars (as in Graphical Perception), we use `d3.stack`. This function assumes data is formatted in a specific way, namely, each object in our data array corresponds to a single stacking of data. Each object must be comprised of the individual attributes that are to be stacked, with each attribute as a unique property _name_, and its value being the quantitative data that we aim to encode. In the previous example, we saw that the quantitative value was assigned to a property `h`, and its bar id was assigned to a property `b`. For stacking, we need to pack _all_ values of a single group together, and so now, each object should have _one property per bar id_, assigned to the appropriate data values.

Given our data, the main thing we need to do is provide a way to access the individual values that will provide us the stacking. This is achieved by calling the `keys` function on a `stack` object, specifying data attributes that contain the values to be stacked. `d3.stack` actually produces a function, and it is necessary to call the returned result on the data array.

What is returned by stack is a multidimensional array that is a bit complicated. Stacking computes a _cumulative sum_ per data item. Let's break it down:
* The outer array corresponds to each bar in the stacking. So in the running example, this is the 5 individual bar marks that comprise a single stack.
* Each item in this array is another array that corresponds to individual stackings. So, this would be our 2 groups.
* The innermost array is comprised of 2 values: the start and end of a given value. We use this to position the bar mark. This can also have the original data item, depending on the data we used to call stack.

Here is an example:

```javascript
{% include_relative example1.js %}
```
---
<svg id='svg1' width='500' height='350'></svg>
<script type='text/javascript' src="example1.js"></script>
---
