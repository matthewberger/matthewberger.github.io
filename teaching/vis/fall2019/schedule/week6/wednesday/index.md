---
layout: default
title: Wednesday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Small Multiples

Recall that for small multiples, we are _partitioning data items_, based on _discrete attributes_. The simplest way to achieve this design in D3 is using ... nest. This is precisely the group-by operation. Except here, we are not necessarily aggregating (as we've seen with bars)! We want to show _all_ of the data, partitioned into different views.

This permits a fairly modular approach to creating visualizations: nest along the attributes that we are faceting our plots, and then in a rollup, we can specify how we would like to organize our data, downstream, for when we create our individual plots.

# D3: Scatterplot Matrix

With scatterplot matrices, each plot is showing _all_ of the data items, using only _some_ of the data attributes, namely all pairs of attributes. So unlike small multiples, we are not grouping data items by an attribute.

This complicates things a bit, but if we carefully approach how we perform data joins, then it is straightforward to create a scatterplot matrix. The main things to consider are:

* We need to perform a data join 3 times: one for columns of our matrix, one for rows of our matrix, and last, for the _actual_ data.
* This implies that in the third data join, we are simply supplying _all_ of our data, but restricted to the pair of attributes that correspond to a given cell in our matrix.
* Thus, the first two data joins are, in some sense, pretty trivial: they setup the matrix! Specifically, they provide us the row and column indices of our matrix.

```javascript
{% include_relative example1.js %}
```
---
<svg id='svg1' width='900' height='900'></svg>
<script type='text/javascript' src="example1.js"></script>
<script type='text/javascript' src="example1-axes.js"></script>
---
