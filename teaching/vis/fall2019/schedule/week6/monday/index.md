---
layout: default
title: Monday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Heatmaps

For creating a heatmap, recall that we require three data attributes:

* 2 ordered attributes to be mapped to the x and y axes
* 1 ordinal/quantitative attribute to be mapped to color

Often, however, we are not given this form of data. When we have attributes that take on discrete values, we typically have multiple data items that correspond to the same attributes. Hence, it becomes necessary to group (e.g. `d3.nest`).

In the following example, we are provided a dataset of barley statistics, where we will plot the average `yield` for each pair of `variety` and `site`. There are basic two ways (among others) we can implement this in D3. In our nested data join, we may create a grouped column per attribute, and then forego setting the x position in the subsequent data join on rectangles. Alternatively, we can forego the grouping, and instead directly set the x and y coordinates of the rectangles.

Here is the first option using groups:
```javascript
{% include_relative example0-0.js %}
```
---
<svg id='svg0-0' width='800' height='400'></svg>
<script type='text/javascript' src="example0-axes.js"></script>
<script type='text/javascript' src="example0-0.js"></script>
---

And without groups:
```javascript
{% include_relative example0-1.js %}
```
---
<svg id='svg0-1' width='800' height='400'></svg>
<script type='text/javascript' src="example0-axes.js"></script>
<script type='text/javascript' src="example0-1.js"></script>
---
Note that it was necessary to have a way to access the attribute values when setting the coordinates, unlike in the first example, where the `key` as part of `nest` gives us the attribute values at every nesting level. Here again is an example of "working backwards":
* I need to position the rectangles.
* In order to do so, I need to know each rectangle's corresponding `yield` and `variety`.
* To have access to these values, when I nest, upon rolling up I need to set these values.

## Not just color

It is quite straightforward to use a different visual channel within each cell. So, let's use **size**!

```javascript
{% include_relative example0-2.js %}
```
---
<svg id='svg0-2' width='800' height='400'></svg>
<script type='text/javascript' src="example0-axes.js"></script>
<script type='text/javascript' src="example0-2.js"></script>
---

## Deeper Maps

We can even go one level deeper. Associated with the data is another attribute, `year`, which is one of 2 years. We can add an _additional_ key to our nest, and by performing three data joins, we can plot a pair of bars in each cell.

```javascript
{% include_relative example0-3.js %}
```
---
<svg id='svg0-3' width='800' height='400'></svg>
<script type='text/javascript' src="example0-axes.js"></script>
<script type='text/javascript' src="example0-3.js"></script>
---

Note the impact of:
* The **order** of the attribute values.
* The **spacing** between bars.

As a further alternative, we can change the visual encoding to **length**:

```javascript
{% include_relative example0-4.js %}
```
---
<svg id='svg0-4' width='800' height='400'></svg>
<script type='text/javascript' src="example0-axes.js"></script>
<script type='text/javascript' src="example0-4.js"></script>
---

# D3: Parallel Coordinates

In creating a parallel coordinates plot, recall that our data consists of an "arbitrary" number of attributes that are of an ordered type. Parallel coordinates are quite different from the spatial arrangements we have thus far seen, as each attribute is to be mapped to a particular slice of space, e.g. a set of vertical slices. This somewhat unusual arrangement also impacts our approach for implementing this type of visualization:

* We require 1 scale _per_ attribute.
* In plotting 1 polyline per datum, each vertex in the polyline is determined by a different attribute, and this changes how we would generate lines via `d3.line`.

So with these considerations, let's look at a minimal implementation of parallel coordinates:
```javascript
{% include_relative example1.js %}
```
---
<svg id='svg1' width='800' height='400'></svg>
<script type='text/javascript' src="example1-axes.js"></script>
<script type='text/javascript' src="example1.js"></script>
---

# D3: Horizon Graphs

Recall that for a horizon graph, our input consists of 1 ordered attribute and 1 quantitative attribute. The standard way to plot this data would be with a line mark, or area mark. Let's take a look at the latter:

```javascript
{% include_relative example2.js %}
```
---
<svg id='svg2' width='800' height='400'></svg>
<script type='text/javascript' src="example2.js"></script>
---

Horizon graphs juxtapose multiple area marks, encoded with different colors, to better utilize limited space. In implementing horizon graphs, it is again useful to work backwards:

* We want to draw an area mark _per band_. So, we need to have a way of accessing the individual bands of our data.
* Now, it actually will not suffice to consider all of the data for a given band. We need to obtain the individual contiguous segments _within a band_, so that each area mark is self-contained (and does not connect to other area marks).
* So, we need the following: bands, and _contiguous groups_ within each band. We can solve this by performing a **sweep**, as we just covered. But more pertinent here, how should we design our data structures for capturing the bands and groups?
* `d3.nest`! Oh so useful. We can _derive_ a new dataset, where new attributes correspond to: `band` and `group`. We then nest, first along `band`, then `group`. We then perform a nested data join, giving us the individual data chunks that we need for our area marks.

```javascript
{% include_relative example3.js %}
```
---
<svg id='svg3' width='800' height='400'></svg>
<script type='text/javascript' src="example3.js"></script>
---
