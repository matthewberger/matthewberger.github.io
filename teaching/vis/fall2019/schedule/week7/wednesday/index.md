---
layout: default
title: Wednesday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Interactions in Juxtaposed Plots

For juxtaposed plots, we need to consider how the two views are related:

* What are shared attributes, if any?
* Are we aggregating data between views?

This helps determine how an interaction in one view could potentially impact the other view.

Let's look at a simple example for 2 views that come from Assignment 3:

* The left view is our scatterplot, where each circle is a day, encoding temperature and wind.
* The right view is our bar plot, showing the average minimum and maximum for each month.
* The interaction begins with the scatterplot: upon selecting points via brushing, the right view is updated. Specifically, only the points that have been selected will be used for aggregating data.

The example below shows how to use _data filtering_ -- rather than element filtering -- to both update our scatterplot view, as well as compute our averages which are then used to update the bar plot. Updating the bar plot, in particular, involves each stage of the data join: **exit**, **enter**, and **update**.

```javascript
{% include_relative weather-interaction.js %}
```
---
<svg id='svgweather' width='800' height='450'></svg>
<script type='text/javascript' src="weather-interaction.js"></script>
<script type='text/javascript' src="weather.js"></script>
---

# D3: Interactions in Small Multiples

## Hovering for detail

We can make certain assumptions about how to perform interactions when we are working with small multiples. Recall the following:

* All views correspond to the same data attributes.
* Each view shows a different partitioning of the data.

Due to the consistency between views, in terms of attributes, it is natural to simply _replicate_ an interaction from one view, into _all_ views.

This is quite easy to achieve with D3, assuming that your selections are properly set up. We need to perform the following:

* Select _all_ plots, such that they are all listening for events.
* If an event is triggered by a plot, determine the interaction for that individual plot.
* Apply this interaction to _all_ plots.

## Zooming for detail

Linked zooming can also be easily achieved, using a similar strategy: 

```javascript
{% include_relative sm_zoom.js %}
```
---
<svg id='svgzoom' width='900' height='500'></svg>
<script type='text/javascript' src="sm_zoom.js"></script>
<script type='text/javascript' src="example1.js"></script>
---

# D3: Selections in Parallel Coordinates

As discussed, brushing is a natural form of selection in parallel coordinates. We brush _attributes_, and this triggers the selection of _full polylines_.

Implementing this in D3 is pretty straightforward:

* We first associate a group with each attribute.
* Create our brush.
* Declare what we want to do with a brush event. For parallel coordinates, we simply need to determine whether a data's attribute value is within the data domain selected by the brush.
* Add the brush to _all groups_. By doing this, we are now associating a brush with _all attributes_.

```javascript
{% include_relative pcp-interaction.js %}
```
---
<svg id='svgpcp' width='900' height='500'></svg>
<script type='text/javascript' src="pcp-interaction.js"></script>
<script type='text/javascript' src="pcp-axes.js"></script>
<script type='text/javascript' src="pcp.js"></script>
---

There are many variations to brushing with parallel coordinates, with the above only showing perhaps the simplest option -- how else would you design interactions for parallel coordinate plots?

# D3: Selections in Scatterplot Matrices

Brushing in scatterplot matrices is intended to highlight a single data item in _all views_ via brushing the data's circle in _one view_. This is conceptually similar to brushing in juxtaposed plots:

* Brush in a single view to obtain the data items that have been selected.
* Update the remaining views.

Note in scatterplot matrices that we are duplicating _data items_ across views, but each view is showing only a _pair_ of data attributes. Hence, at the level of a data item, we have a correspondence between circles. Thus, we may perform a data join using _keys_ -- in this case, each key corresponds to each player's name:

* First select all groups that correspond to the plots.
* Next select all circles -- a set of circles for each plot. You can use `classed` to help minimize the number of points that are necessary to select, e.g. only select points that have already been brushed.
* Then perform a data join -- this will match the data that has been selected _with each plot_. We simply set the fill color, which is dependent on whether we are in the exit selection (revert back) or the returned data join (what was matched, and hence should be updated to reflect a selection).

```javascript
{% include_relative splom-interaction.js %}
```
---
<svg id='svgsplom' width='900' height='900'></svg>
<script type='text/javascript' src="splom-axes.js"></script>
<script type='text/javascript' src="splom-interaction.js"></script>
<script type='text/javascript' src="splom.js"></script>
---
