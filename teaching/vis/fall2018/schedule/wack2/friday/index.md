---
layout: default
title: Friday Lecture
---

# D3: The Data Join

In this lecture we are going to cover how to bind data to elements, and create data-driven visualizations.

The general pattern of using a data join consists of: specifying data for a given selection, updating the data of existing elements, handling the creation of new elements from new data items, and removing elements corresponding to data that no longer exists.

In D3, data is "sticky": elements are provided with data. So first, lets see how to make the data stick.

## data()

The `data()` function is invoked on a `Selection` object, where you must provide either an array (corresponding to our data), or a function. Lets consider the case of providing an array first, starting from our trusty old array of circles, and a single `<svg>` element:

```javascript
var circle_data = [];
for(var i = 0; i < 13; i++)
	circle_data.push([100+300*Math.random(),100+300*Math.random()]);
var data_selection = d3.select('#svg').selectAll('circle').data(circle_data)
```

The `data` function returns ... another selection. But wait, there are no circles yet. So what does `d3.select('#svg').selectAll('circle')` return? An empty selection! What happens when we call `data` on an empty selection? [Lets take a look.](localhost:4000/example0.html)

So we see that the returned `Selection` is a bit special: we have `EnterNodes` and `ExitNodes`. Under the hood, D3 uses this to manage the creation and deletion of elements. So we never directly access these nodes, but rather invoke certain functions on the `data` selection: `enter` and `exit`.

## enter()

[Lets see what happens when we invoke enter](localhost:4000/example0.html).

So the result is quite similar to `_enter`, but we now have `_parents`. Now lets see what happened when we [append an element](localhost:4000/example0.html).

We got our circles! And they were added as children of `<svg>`, since it was our assigned parent. Furthermore, a `__data__` field is created for each element (data is sticky), assigning the appropriate data element - in this case based on the index of the array (i'th circle gets i'th datum).

So to recap, to add data in D3:

* perform a selection
* invoke the `data` function
* invoke the `enter` function on the resulting selection
* `append`

Thus far we have assumed that the selection we are concerned with is empty. What if it isn't? What if it already has data? First, lets assume that the length of the new data array is the same as the old. [Lets take a look.](localhost:4000/example1.html).

Ok, so we now see how to **update data**. What if the new data array is larger than the older one? [Lets take a look.](localhost:4000/example1.html).

So when we have **more data than elements**, in the `enter()` selection new elements can be created.

Note that I have been selecting the `<svg>` element first, and _then_ the circles. But what if I directly select all circles via `d3.selectAll`, and then perform the data binding? [Lets see...](localhost:4000/example2.html)

Now we see the role of the `parent`: it tells us where to append the elements. A similar issue arises with `select`, rather than `selectAll`.

## exit()

What if the new data array is smaller than the older one? That `_exit` field that we saw earlier now gets populated. [Lets take a look.](localhost:4000/example1.html).

So when we have **less data than elements**, in the `exit()` selection existing elements can be removed. We do so through `remove`, as we looked at in the previous class.

### What about elements that do not have data?

Note that the `data` selection matches **elements** with **data**, not **data** with **data**. Thus, if a selection returns elements that are not backed up by data, they will nevertheless bind with data in a similar manner. This circumstance is rare, however. Very likely whenever you create HTML elements it is through the `selection.data().enter().append()` sequence.

### If I want to exclusively create new elements from data, what should my selector be?

**Anything that returns an empty selection**.

```javascript
selection.selectAll('vandy')
selection.selectAll('blah')
selection.selectAll('viscoursewow')
```

Assuming that there does not exist elements whose types are the above...

## Keys: Object Constancy

So how does D3 know when and where to add elements and remove elements? Thus far, we have seen one way: **indices**. We are assuming that **data array indices** and **element indices** (as layed out in the DOM) are meaningful. When they match up, we update element data. When data indices exceed element indices, elements are created. When element indices exceed data indices, elements are removed.

Using indices to match data with elements may not always be useful, especially for more complicated visualizations where data is highly dynamic. Another way that D3 matches data with elements is through **keys**. Rather than just using an array of data, if we construct an array of `key:value` pairs, then we can associate elements with keys, and use this to match data with elements when we `enter()` and `exit()`. This forms the notion of **object constancy**, ensuring that we can uniquely identify elements through their data. [Lets look at an example](localhost:4000/example3.html).

Couple notes:

* There is a difference between the order of data in the array and the order of elements in the DOM when performing the `data()` selection. This is important to keep in mind.
* This example illustrates (most of) the basic steps of the **general update pattern**: issue a data selection, remove data elements that no longer exist, append new elements.

## Data-Driven Transformations

Ok, so now we know how to stick some data to some elements. Performing data-driven transformations becomes quite the simple task! Continuing from our most recent example, suppose we want to set circle positions to the bound data. This amounts to:

```javascript
d3.selectAll('circle')
	.attr('cx', function(d) { return d.value[0]; })
	.attr('cy', function(d) { return d.value[1]; })
	.attr('r', 4);
```

So this is ok, but there is one problem here...

... what if we only want to update those elements corresponding to new data? The downside is that `selectAll`, well, selects **ALL**.

### merge()

The `merge()` selection allows us to select elements that correspond to new data, beit data that creates new elements, or data that updates existing elements. `merge()` is invoked on a selection of newly created elements, and is passed the original data selection. Thus, the [full general update pattern follows](https://github.com/d3/d3-selection#selection_merge):

```javascript
var circle = svg.selectAll("circle").data(data) // UPDATE
    .style("fill", "blue");

circle.exit().remove(); // EXIT

circle = circle.enter().append("circle") // ENTER
    .style("fill", "green")
  .merge(circle) // ENTER + UPDATE
    .style("stroke", "black");
```

### A note on coding style

It is convention in D3 to use the indentation level to denote when functions return new selections, or existing selections.

* existing selections: indent of 4
* new selections: indent of 2

This can be useful to help you understand whats going on with selections, but I will not hold you to it. Just make your code readable.

## Nesting

Last, lets cover data joins where we specify a **function**, rather than a **data array**, perhaps one of the more difficult concepts in D3, yet also one of the most powerful.

By far the most common means of using functions for data joins is in **nesting data**. A multidimensional array is the common use case. Suppose we have a 2D array: we perform one data join that corresponds to the _first list of arrays_ (the array of arrays), and create elements from this data join. After all, this is just data: each element now has an array as its sticky data. But we can then perform a second data join from this new selection, and by passing a function into `data`, D3 will simply pass along the parent's datum (array) as the function argument. Thus, we can propagate the parent's array to its child, to give us a nested structure:

```javascript
var outer_selection = d3.select('#svg').selectAll('g')
	.data(data)
	.enter()
	.append('g')

outer_selection.selectAll('rect')
	.data(function(d) { return d; })
	.enter()
	.append('rect')
```

Lets experiment with this, for showing some [nested bar charts](localhost:4000/example5.html).

Of course you can imagine having deeper nesting structures. This provides us with a concise way to create rather involved visualizations from a pretty small amount of code. But you need to think carefully about how to represent your data. `d3.nest()` is a very useful way to organize data around nested data joins, [please see documentation](https://github.com/d3/d3-collection#nests), as well as [Mr. Nester](http://bl.ocks.org/shancarter/raw/4748131/) to experiment.

Now, what happens when we want to update data? The same principles we discussed above apply. [Lets take a look](localhost:4000/example6.html).

Ok, so updates are simple. What about adding new elements to nested selections? Removing elements? Once again, nothing changes, the general update pattern applies. However, you need to be careful about making appropriate changes to _all_ nested elements, which can conceptually be a bit tricky. In such cases your `enter()` and `exit()` selections will likely have multiple groups.

So that about covers the *data* in D3. Next week, we are going to get in to D3 concepts that are more tailored to creating visualizations.
