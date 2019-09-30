---
layout: default
title: Monday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Clicking and Hovering Around

Here we will cover a (tiny) portion of the design space for interactions. Our working example will be the following scatterplot:

```javascript
{% include_relative example0.js %}
```
---
<svg id='svg0' width='500' height='400'></svg>
<script type='text/javascript' src="example0.js"></script>
---

We want our SVG elements to be responsive to user interactions. D3 supports events triggered by inputs from the user (e.g. mouse, keyboard) via `on`, which is a function of a selection object. The `on` function has two arguments:

* The first argument is the interaction type. We will go through the most common below, but please [go here](https://www.w3schools.com/js/js_events.asp) for a more complete reference.
* The second argument is an anonymous function. Much like with `attr`, D3 will populate the data, index, and group for each element in the selection.

Hence, the first argument indicates the _type_ of interaction we are supporting, and with the second argument, we specify _what to do_ for the interaction. Furthermore, what we do can be customized for each element in the selection, since D3 provides us the data bound to elements.

So, let's now go through some examples.

## Click

Perhaps the simplest type of interaction is _clicking on a mark_. Through clicking, one potential response is that we change the appearance of the mark. So from the above visualization, let's change the color of a circle via its category:

```javascript
{% include_relative example1-click.js %}
```
---
<svg id='svg1' width='500' height='400'></svg>
<script type='text/javascript' src="example1-click.js"></script>
<script type='text/javascript' src="example1.js"></script>
---

## Click On, Click Off: classed

It is useful to think of interactions in terms of "what-ifs":

* What if the circle that a user clicked on has not previously been clicked? Let's change the color based on the category.
* What if the circle that a user clicked on already been clicked? Let's change the color back to the default.

A useful function of a selection object for realizing these interactions is `classed`, which can be called in 2 ways:

* If called with one argument, namely a string representing a class name, it will return a boolean of whether or not the element has this class name as an attribute. This is typically used when the selection is of a single element.
* If called with two arguments, namely a string for the class name and a boolean, then for each element in the selection it will either create a class with the given name, or remove the class, if the boolean is true or false, respectively. The second argument can also be an anonymous function, which returns a boolean, where you can use the data bound to the element in determining whether to create/remove the class.

Here is an example of using `classed` for clicking individual points on and off:

```javascript
{% include_relative example2-click.js %}
```
---
<svg id='svg2' width='500' height='400'></svg>
<script type='text/javascript' src="example2-click.js"></script>
<script type='text/javascript' src="example2.js"></script>
---

## Category Clicking: filter

We need not just click our graphical marks! Another option is to click the rectangles in our legend corresponding to categories, so that we may select a set of circles that correspond to a given category:

```javascript
{% include_relative example3-click.js %}
```
---
<svg id='svg3' width='500' height='400'></svg>
<script type='text/javascript' src="example3-click.js"></script>
<script type='text/javascript' src="example3.js"></script>
---

## Mouse Over

Rather than clicking, we can also change the appearance of a circle when the user mouses over a mark. This is a simple change of the event type to "mouseover":

```javascript
{% include_relative example4-mouse.js %}
```
---
<svg id='svg4' width='500' height='400'></svg>
<script type='text/javascript' src="example4-mouse.js"></script>
<script type='text/javascript' src="example4.js"></script>
---

## Mouse Over, Mouse Out

Importantly, we may associate selections with _multiple events_. So if we wanted to, say, trigger a category-based color when mousing over, and revert to the original color when mousing out, we specify two events: one for mousing over, one for mousing out.

```javascript
{% include_relative example5-mouse.js %}
```
---
<svg id='svg5' width='500' height='400'></svg>
<script type='text/javascript' src="example5-mouse.js"></script>
<script type='text/javascript' src="example5.js"></script>
---

# D3: View Navigation

We previously saw how to use a built-in D3 function -- `d3.zoom` -- for changing our viewpoint of graphical marks, e.g. panning and zooming in. However, it is also possible to customize view navigation, and one way to go about this is to directly adjust scales.

So let's suppose we wanted to adjust the zoom level for a _single_ scale, relative to a pressed mouse point. We can achieve this through the following sequence of operations, as applied to the `wheel` event (works for Macbooks!):
* Record the mouse position, the data value (via the scale) that corresponds to this position (**invert**: go from visual range to data domain).
* Obtain the amount by which we have changed the wheel, use this to compute an offset for our mouse position, and compute a zoom amount relative to the previous and new mouse positions.
* Update _both_ our scale and mark positions.

```javascript
{% include_relative example-axis-interaction.js %}
```
---
<svg id='svgaxis' width='500' height='400'></svg>
<script type='text/javascript' src="example-axis-interaction.js"></script>
<script type='text/javascript' src="example-axis.js"></script>
---

# D3: Brushing

Clicking is not always the most convenient way to select our marks. A more convenient form of selection is _brushing_, where the user specifies some geometric shape as part of their interactions, and all marks that are _within_ the shape are considered as selected.

## 2D Brush

D3 has support for brushing with rectangles via ... the `brush` object. There are three main things you need to do to use `brush`:

* Create the brush object. Additionally, it is useful to tell the brush its geometric extent.
* Call `on` on the brush to specify brush behavior. There are three main behaviors: "start", which is the start of a brush, "brush" which is the process of brushing, and "end", which is when the user has stopped brushing. Within your specified anonymous function, you may access the brush's rectangle coordinates via `d3.event.selection`, and then test whether your marks are contained within the rectangle.
* Last, you need to associate a group element with the brush, achieved via `call`. Importantly: the brush's rectangle coordinates are within the local coordinate system of the group element.

Here is an example of brushing:

```javascript
{% include_relative example6-brush.js %}
```
---
<svg id='svg6' width='500' height='400'></svg>
<script type='text/javascript' src="example6-brush.js"></script>
<script type='text/javascript' src="example6.js"></script>
---

## 1D Brush

D3 also has support for 1-dimensional brushing:

```javascript
{% include_relative example7-brush.js %}
```
---
<svg id='svg7' width='500' height='400'></svg>
<script type='text/javascript' src="example7-brush.js"></script>
<script type='text/javascript' src="example7.js"></script>
---

## Brush On, Brush Off

Thus far, when we brush, the visual highlighting of marks persist. How can we limit this highlighting to a single brush event? We may simply default the fill of _all_ circles, and _then_ perform the update:

```javascript
{% include_relative example8-brush.js %}
```
---
<svg id='svg8' width='500' height='400'></svg>
<script type='text/javascript' src="example8-brush.js"></script>
<script type='text/javascript' src="example8.js"></script>
---

# D3: Transitions

The primary way to realize animation in D3 is through [d3.transition](https://github.com/d3/d3-transition). Transitions are used to animate selections, to go from one setting of attributes to another. In particular, transitions are frequently used in conjunction with the full data join cycle: enter, exit, and update.

Let's consider the following example: suppose we want to collapse points that belong to a given category into a single point: the mean of the points. Conversely, we also want to take the mean point, and then expand it back to the original set of points. Consider both cases separately:
* For collapsing points, we perform a data join, composed of a single element: the datum representing the mean. We are then interested in both the enter and exit selections. The exit selection corresponds to _all of the points_ (excluding the mean). We invoke a `transition()` on the exit selection, and then tell the circles _where to go_: the mean. Note: the circles know how to move to the mean, because they already have their positions set from the original data join. Once the transition finishes, we remove them from the DOM. The enter selection corresponds to the mean: we need to first initialize it, for attributes both involved and not involved in the transition. We then invoke transition, and then tell the mean how to transition: in this case, we grow its radius.
* For expanding points we perform a similar, albeit inverse, process. The exit selection now corresponds to the mean point, where we simply shrink its radius to 0. The enter selection now corresponds to all of the points, where we need to initialize their attributes (where they are coming from), invoke transition, and then specify new positions and radii (where they are going to).

```javascript
{% include_relative example-mean-transition.js %}
```
---
<svg id='svgmean' width='500' height='400'></svg>
<script type='text/javascript' src="example-mean-transition.js"></script>
<script type='text/javascript' src="example-mean.js"></script>
---
