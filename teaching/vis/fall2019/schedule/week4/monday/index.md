---
layout: default
title: Monday Lecture
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML" async>
</script>
<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Scales

We previously discussed scales in depth, and for good reason: D3 is heavily built around scales, in order to map a data attribute in the domain, to a visual variable.

Recall: scales map data from a domain to a range. The domain refers to an attribute of our data. The range refers to a visual channel: space, shape, size, orientation, color, and so on. And, we can use different types of scales based on the data type of the domain, and the data type of the visual range (e.g. quantitative, ordinal, nominal). We will now cover the prominent scales provided by D3.

## Continuous Scales

Continuous scales assume quantitative data in the domain and range.

### d3.scaleLinear()

A linear scale is constructed by specifying the minimum and maximum values for the domain and the range:

```javascript
scale = d3.scaleLinear()
	.domain([min_d,max_d])
	.range([min_x,max_x])
```

In the above, we first create a linear scale which returns itself (method chaining), followed by specifying the domain, and then the range, where method chaining is used in both cases. To use the scale, for a given data attribute value `d`, we simply pass it in to the scale to obtain the mapped value in the range: `scale(d)`.

Let's revisit our scatterplot, and see how much more flexible things get when we use scales:
```javascript
{% include_relative example0.js %}
```
---
<svg id='svg0' width='500' height='350'></svg>
<script type='text/javascript' src="example0.js"></script>
---

## Other Continuous Scales

D3 has a host of other continuous scales; we will not cover each one, please see the docs for more information.

### Color

The range need not only be numbers! D3 provides support for other types of values that can be readily interpolated. Among them: color!

D3 supports color in many different types of formats:

* prespecified names (`'red'`, `'green'`, `'blue'`)
* hexadecimal strings (`'0xff0000'`,`'0x00ff00'`,`'0x0000ff'`)
* explicit RGB values (`'rgb(255,0,0)'`, `'rgb(0,255,0)'`, `'rgb(0,0,255)'`)

You can mix and match these color types when specifying your `range` in any of the continuous scales. Let's see an example:
```javascript
{% include_relative example3.js %}
```
---
<svg id='svg3' width='400' height='350'></svg>
<script type='text/javascript' src="example3.js"></script>
---

Above I've used RGB as the color space. D3 also supports other color spaces, but we will hold off on that for now, and revisit this in some detail in the next couple of weeks.

### Time

Time can also be used, both as a domain and a range. `d3.scaleTime` assumes a time domain, and some range - it could be scalar values, colors, or even dates.

## Quantized Scales

D3 also has support for quantized scales, where the domain is quantitative and the range is ordinal, as covered earlier. Let's see how this works through an example:
```javascript
{% include_relative example4.js %}
```
---
<svg id='svg4' width='400' height='350'></svg>
<script type='text/javascript' src="example4.js"></script>
---

## Band Scales

D3 has support for band scales, where the domain is ordinal and the range is quantitative, as previously discussed. Band scales are a very useful way of associating discrete data with continuous visual ranges. As an example: we might want to plot bars, where each bar is identified with an ordinal value (positioning its base) and a quantitative value (positioning its height). We can also _nest_ band scales, allowing us to use one band scale to position a group of marks, and then within each group we use a band scale to position the individual bar marks.

D3 also supports **point scales**, which can be used for other types of marks and visual channels.

Let's revise our previous grouped bar marks example:
```javascript
{% include_relative example5.js %}
```
---
<svg id='svg5' width='700' height='350'></svg>
<script type='text/javascript' src="example5.js"></script>
---

## Axes

So we've now mastered scales, but we can't actually see them! This is unfortunate. But fortunately, displaying them is quite straightforward via `d3.axis`.

To use an axis, we need to first tell D3 where to position it. We use the group element `<g>` for this purpose, to specify an appropriate transformation. D3 axis actually returns a function, intended for D3 to be invoked in a specific way. D3 uses the `call` function (to be discussed) as a way to transform an element, in this case the group element. D3 will create the appropriate visual elements for an axis as children of the group element.

Let's walk through an example, adding axes to our first plot:
```javascript
{% include_relative example6.js %}
```
<script type='text/javascript' src="example6.js"></script>

# D3: Shapes

We have thus far seen several shapes that are straightforward to draw with SVG: circles, rectangles, lines. But for common visualizations, these shapes are less than ideal for plotting.

Let's take the **line mark** as an example. We can realize a line mark in SVG using `path` elements, wherein we can draw polylines or smooth curves. However, path elements are difficult to construct, and quite tedious to work with (we'll see why shortly).

This is where D3 Shapes come in. Let's take a look at a few important ones.

## d3.line()

The `d3.line()` is a generator for line marks. It generates the coordinates we would like to specify in a `path` element. To use a `line` we need to tell it how to transform data into x-coordinates and y-coordinates, with respect to the coordinate system of the SVG element to which we are adding the line mark. As we saw in the previous lecture, scales are perfect for this! Let's see this in action:
```javascript
{% include_relative example7.js %}
```
---
<svg id='svg7' width='700' height='350'></svg>
<script type='text/javascript' src="example7.js"></script>
---

Takeaways:

* In the case of a line mark, although our data is an array of (x,y) coordinates, we generate a **single** element, rather than an element per datum.
* Also, `datum`: assigns _whatever_ is passed in to the selection. Kind of like a trivial data join, but useful in certain circumstances.

## d3.area()

We can also generate area marks in a similar manner, using `d3.area`. Here we prescribe the coordinates of the polygon that will bound the area: rather than x and y coordinates, we specify the lower and upper bounds for x and y. Typically x is fixed, and we vary y. Let's see an example:
```javascript
{% include_relative example8.js %}
```
---
<svg id='svg8' width='700' height='350'></svg>
<script type='text/javascript' src="example8.js"></script>
---

## d3.link()

D3 has a wide array of support for defining **curves**. We will not get into the details of how to create curves (this is one or more courses of material in and of itself). Instead, we will consider one very useful way of generating curves, intended for network visualization: **links**.

Let's suppose we wanted to layout a network, and we would like to see a natural progression of the network going from left to right. For instance, a **tree** would be a good example of this, where the root node starts at the left, and the leaf nodes are on the right. To show the network, we could draw straight lines between nodes, but ... thats a little boring, and leads to the perception of excessive clutter. Instead, we can use `d3.linkHorizontal`, which will generate a cubic Bezier curve between nodes that connects the nodes, and whose tangent vector at the nodes is _horizontal_. Similar reasoning holds for `d3.linkVertical`.

To setup a `link`, you must perform a data join on an array where each object in the array contains a `source` field and a `target` field containing some type of reference to the source and target nodes (forming an edge!). Furthermore, we specify `x` and `y` functions to link to tell it how to access actual positions from the nodes. Let's see this for drawing random trees:
```javascript
{% include_relative example9.js %}
```
---
<svg id='svg9' width='700' height='450'></svg>
<script type='text/javascript' src="example9.js"></script>
---

## Other shapes

D3 supports a wide variety of other shapes that we will not get in to. The intent behind these shapes, as shown in the above, is not to provide graphical representations of the shapes, but rather to **organize data** into a form that is easier to draw. This is super important: as you develop your own visualizations given some arbitrary data, you will have to be thinking in these terms.

# D3: Odds and Ends

## d3.call()

Suppose we would like to perform multiple transformations to a selection. This would normally require performing the same sequence of method chaining, which is redundant. A useful function to achieve this is `call`, which operates on a single selection and allows you to pass in an arbitrary function, as well as arguments to your liking.

For instance, let's suppose we wanted a way to modify a circle's visual channels in terms of radius, fill color, stroke color, and stroke width. First let's create the function that will achieve this, given the selection of circles, and the above arguments:

```javascript
function circle_styler(selection, radius, fill_color, stroke_color, stroke_width)  {
	selection.attr('r', radius)
		.attr('fill', fill_color).attr('stroke', stroke_color)
		.attr('stroke-width', stroke_width);
}
```

Then, for any arbitrary selection of circles `sel`, and our prescribed arguments, we can invoke call:

```javascript
sel.call(circle_styler, r, fill, stroke, width);
```

Call also returns the selection itself, thus permitting chaining as well.

## d3.each()

Call operates on a single selection. To specify an arbitrary function for _each_ element of a selection, use ... `each`. The `each` function takes in a function, for which its arguments will be populated by the element's datum and index (within the selection). Within the function, you may access the node itself, specifically the DOM element, with `this`.

## Data Structures

D3 has a lot of useful data structures. We will discuss some in more detail later in the semester. But for now, here are a few useful ones:

### d3.array()

D3 provides a number of useful functions for processing arrays (or more broadly "iterables", like maps, sets, strings). Please see the [full documentation](https://github.com/d3/d3-array) for more details. Here is a summary:

* **Statistics**: For computing a variety of statistics (min, max, mean, median, sum, etc..), D3 follows a consistent pattern. Consider `mean` for concreteness. If your array `arr` is composed of numbers, then simply call `d3.mean(arr)`. However, if your array is composed of objects, then you can pass in an anonymous function to access a particular property, like so: `d3.mean(arr, d => d.value)`.
* `d3.range()`: analogous to Python's built-in `range` function, you can pass in an optional start, required end, optional spacing, to produce an array of sequential numbers.

### d3.collection()

D3 allows for different ways of organizing and deriving data that is super useful. Please see the [full documentation](https://github.com/d3/d3-collection) for more details. A couple important functions:

* `d3.set()`: produces a JS set object, returning all unique items in a given array. You can also pass in an anonymous function to specify what attribute you want to access (for more general objects).

### d3.nest()

If you recall the "group-by" operation we went over in class, `d3.nest()` realizes this operation. It allows us to hierarchically group our data based on discrete attributes. There are two functions associated with a nest object that you will need to call:
* `key`: specify the attribute along which you will group. This can be called multiple times over different attributes to give us a hierarchical structure (the depth being the number of calls `key` is made).
* `entries`: pass in your data array.

Another useful, but optional, function is `rollup`. You typically call `rollup` after you have set up your key functions (completely specifying the hierarchy). This function accepts an anonymous function for which is passed in a single argument, an array that consists of all items in your data at a leaf in the hierarchy (e.g. all combinations of attributes specified by `key`). You must then return _something_ as a result. You can do whatever you want with this array: summarize the data with a single value, a set of values, or just return the array as-is. It depends on your visualization design.

The data structure returned by `d3.nest` is very handy for working with discrete data. Let's look at one example in detail:

* Assume we are provided an array of car data. Each car has attributes origin (country/continent) and a weight (in lbs).
* We would like to compare the _average_ weight of each country.
* But we are not provided the average! We need to _derive_ it.
* We do so with nest. We first "group-by" Origin, and then for all cars that have the same origin, we compute the mean of their weight.

```javascript
{% include_relative example10.js %}
```
---
<svg id='svg10' width='700' height='450'></svg>
<script type='text/javascript' src="example10.js"></script>
---

## Advice

* **D3 is not a visualization panacea**. In implementing a visualization technique, you will need to think carefully about the data you are given, what properties you may need to derive from the data, and the technique itself, whose implementation may have very little to do with its visual representation!
* **But also, keep D3 in mind when working with data**. It's sometimes useful to work backwards.
	* "I want to display my data in a particular way."
	* "To do so, I need to have a certain spatial organization, a partitioning/grouping of my data into certain spatial regions, as well as a certain set of visual elements."
	* "To support this, I need to use some set of D3 functions, which require me to represent my data in a particular way."
	* "Given this, my data structures should be ..."
* Debugging
	* **Use the console!** You may have a syntax error. If you do not, your elements may not be appearing in the DOM. If your elements aren't appearing in the DOM, your selection may not be what you think it is.
	* **Inspect your selections!** See what the groups and parents of a selection are. Is it what you intended?
	* **Sketch out your visualization!** On paper. It's easier to code your visualization to a concrete sketch then what you have in your head.
