---
layout: default
title: Monday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Selections and Transformations

There is a lot of ground to cover with D3. Today we are going to go in depth on the core pieces of D3: selections, transformations, and joins. We will focus on how to perform selections and transformations only from a given set of elements. Then, we will cover how to combine these operations with data joins for creating graphical marks from data.

## Selections

At the core of D3 are **selections**. A selection is an array of **groups**, where each group is an **array of elements**. We use selections to access elements within the DOM.

**Is that all a selection is?**

Yep! But there are a number of subtleties to selections that you need to understand. Let's dive right into the D3 source to see what a selection is. First we will look at `d3.selectAll`:

```javascript
function selectAll(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
}
```

It is common that we pass a string to tell D3 `what to select`. D3 then passes that along by querying the DOM, basically telling the DOM to _give me all elements that match this selector_ via the `querySelectorAll` call. But we can also pass it an element of the DOM directly.

Notice the `Selection` object that is returned. A `Selection` object is created with two arguments: an array of size 1 containing the group of elements that are returned by the DOM query, as well as another array of size 1 containing the root element of the DOM. The former represents our array of groups, and the latter represents our array of **parent nodes** for each group. The notion of **parent** in a selection is any ancestor of a node in the DOM, not just its direct ancestor. `d3.selectAll` will _always_ give us a single group, and the parent will _always_ be the root DOM node.

Next, let's look at `d3.select`:

```javascript
function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}
```

Pretty similar, except that it calls `querySelector`, which will give us the element in the DOM that _first matches_ the selector. There is also a difference in how it handles selectors that are null.

Now, given a `Selection` object, we can perform more selections! However, these differ from the typical `d3.select`-style selections. Let's take a look at `selectAll`, a function of `Selection`:

```javascript
function selection_selectAll(select) {
  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}
```

Let's break this down:

* `selectorAll` is a function that, once invoked, will call `querySelectorAll`, similar to the above (omitted for brevity).
* The first `for` loop iterates over each group of the selection.
* The second `for` loop iterates over each element within each group.
* The new selection is constructed in the inner loop. Each element in our selection prompts a query to the DOM, and the result of the query gives us a new group. The parent of this group _is the element that is queried_ (`node`).
* Also note the remaining arguments `node.__data__, i, group`. We'll return to this later.

The big difference between `d3.selectAll` and `selection.selectAll` (where `selection` is a `Selection` object) is how parents are assigned. We can **nest selections** by calling `selectAll` on a selection. We will see the impact of this in several ways a bit later.

Now let's look at `select`:

```javascript
function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}
```

Outside of selecting just the first matching element from the DOM, there are important differences compared to `selectAll` in the resulting `Selection`:

* Note the `__data__` variable that is part of the returned query (`subnode`). It is assigned to the `node`'s parent. Thus, unlike `selectAll` `select` _propagates data_.
* Also note the parent used in constructing the `Selection`: its the parent from the invoking `Selection` object. Thus, `select` _preserves the existing grouping_, and `selectAll` _creates new grouping structures_.

### What is selectable?

We can select **element types**, **classes**, and **ids**. The syntax for selection differs depending on what we select, but at the top level, selection is performed by issuing:

```javascript
d3.selectAll(selection_name)
```

Here `selection_name` is a selector string that refers to the elements in the DOM we wish to select.

To select elements of a particular type, say `rect`, then the syntax is:

```javascript
d3.selectAll('rect')
```

To select elements of a particular class, say `nameofclass`, we prefix the string with `.`:

```javascript
d3.selectAll('.nameofclass')
```

And to select a single element with a particular id, say `nameofid`, we prefix the string with `#`:

```javascript
d3.selectAll('#nameofid')
```

The same rules hold for `d3.select`, as well as the `selectAll` and `select` functions for `Selection` objects.

### Examples

Let's first take a closer look at selections:
<a name='selection0'></a>
```javascript
{% include_relative example0.js %}
```
---
<svg id='svg0' width='500' height='350'></svg>
<script type='text/javascript' src="example0.js"></script>
---
From here, we can perform some selections on the parent svg element (with id `svg0`), as well as select circles to see how the elements are structured.

Next, let's look at the impact of nested selections:
<a name='selection1'></a>
```javascript
{% include_relative example1.js %}
```
---
<svg id='svg1' width='500' height='350'></svg>
<script type='text/javascript' src="example1.js"></script>
---
Nested selections allow us to better see grouping structures:
* We can first select the svg element, and then all circles to get a flat list, the parent being the svg.
* From the svg element, we can select all groups. And then from the groups, we can select all circles. This gives us a nested structure.

Last, we will do some more selection insanity:
<a name='selection2'></a>
```javascript
{% include_relative example2.js %}
```
---
<svg id='svg2' width='500' height='350'></svg>
<script type='text/javascript' src="example2.js"></script>
---
In this example, a top-level grouping occurs to distinguish the four regions of space, and then for each group, another grouping occurs to distinguish different mark shapes. Last, the individual marks are added.
* We can perform a first selection of groups, and then a subsequent selection of the child groups. This gives us a group of groups.
* We can perform a first selection of groups, and then select all circles. This gives us a nested structure of circles, based on their specific locations. **Note**: `parent` here might seem a bit odd, because the group element shown as a parent is not the direct parent -- it is an ancestor.
* We can perform a first selection of groups, and then all groups, and _then_ all circles. Note here that the very first selection is nowhere to be found! Selections do not maintain the history of all subsequent selections, just the current selection and their parents (ancestors).

## Transformations

So now that we have an understanding of how to select elements, modifying an element's properties, adding elements, and removing elements, all become straightforward. Rather than having to grab an array of elements, loop over the elements, and perform transformations, we perform transformations _directly on selections_.

### attr()

The `attr` function is part of a `Selection` object. It allows us to add, or modify, attributes of elements in a selection. There are two basic ways to do this, the first is by specifying a constant value for all elements:

```javascript
selection.attr('attname', 'attvalue')
```

The first argument specifies the attribute's name, and the second the value that we wish to specify. [Let's experiment with this](#selection0).

The second way to use `attr` is by specifying an **anonymous function**. We specify a function that can have at most 3 arguments: data `d`, element index `i`, and the group `g`:

```javascript
selection.attr('attname', function(d,i,g)  {
	return 2*i; // some arbitrary function of its arguments
})
```

The trick here is that D3 will populate `d`, `i`, and `g` for us, we just need to specify what we want to do with these arguments. In particular, this is done in the following:

```javascript
function selection_each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}
```

Notice the similarities to `selectAll`. `callback` will (essentially) be the function we specify. D3 will apply our function to each element, passing in the element's data, index, and group.

We also do not need to specify all of `d`, `i`, and `g`, e.g. `selection.attr('attname', function(d)  {...})` works, but it must be in the proper order.

Now, we are not working with data yet so `d` is null, but we can still [experiment with the remaining bits](#selection0).

Furthermore, we can now start to see where nested selections make a difference. The index `i` will vary based on how the selection is grouped. [Let's see an example](#selection1).

An important aspect of `attr`, and the other functions we will see, is that they return the original `selection` object. This is a process known as **method chaining**, and will allow us to write concise code for modifying selections, e.g.

```javascript
d3.selectAll('circle').attr('r', 10).attr('fill', 'blue')
```

### style()

The `style` function is very similar to `attr`, except it is specific to CSS styles.

### append()

How do we actually create new DOM elements? We use `append`! For a given selection, this will create a new node for _each element in the selection_ and add it as a child to each element. In fact, `append` extends the `select` function, thus preserving the original grouping. Like `attr` and `style`, `append` chains too. We will see the use of append in a bit, when we cover data joins.

### remove()

And how do we remove DOM elements? We use `remove`! For a given selection, this will remove each element in the selection from the DOM.

# D3: The Data Join

Now let's move on to what makes D3 so powereful: data joins. The general pattern of using a data join consists of: specifying data for a given selection, updating the data of existing elements, handling the creation of new elements from new data items, and removing elements corresponding to data that no longer exists.

In D3, data is "sticky": elements are provided with data. So first, let's see how to make the data stick.

## data()

The `data()` function is invoked on a `Selection` object, where you must provide either an array (corresponding to our data), or a function. Let's consider the case of providing an array first, starting from our trusty old array of circles, and a single `<svg>` element:
<a name='dj0'></a>
```javascript
{% include_relative example3.js %}
```
---
<svg id='svg3' width='500' height='50'></svg>
<script type='text/javascript' src="example3.js"></script>
---

The `data` function returns ... another selection. But wait, there are no circles yet. So what does `d3.select('#svg').selectAll('circle')` return? An empty selection! Calling `data` on an empty selection sets up the data join. It returns a Selection object that is a bit special, containing `EnterNodes` and `ExitNode`. Under the hood, D3 uses this to manage the creation and deletion of elements. So we never directly access these nodes, but rather invoke certain functions on the `data` selection: `enter` and `exit`.

## enter()

Now let's invoke the `enter` function on the selection.

The result is quite similar to the `_enter` field, effectively isolating the `EnterNodes`. Now let's see what happens when we append an element.

We got our circles! And they were added as children of `<svg>`, since it was our assigned parent. Furthermore, a `__data__` field is created for each element (data is sticky), assigning the appropriate data element - in this case based on the index of the array (i'th circle gets i'th datum).

So to recap, to add data in D3:

* perform a selection
* invoke the `data` function
* invoke the `enter` function on the resulting selection
* `append`

Thus far we have assumed that the selection we are concerned with is empty. What if it isn't? What if it already has data? First, let's assume that the length of the new data array is the same as the old. Let's take a look:
<a name='dj1'></a>
```javascript
{% include_relative example4.js %}
```
---
<svg id='svg4' width='500' height='50'></svg>
<script type='text/javascript' src="example4.js"></script>
---

Ok, so we now see how to **update data**. What if the new data array is larger than the older one? [Let's take a look.](#dj1).

So when we have **more data than elements**, in the `enter()` selection new elements can be created.

Note that I have been selecting the `<svg>` element first, and _then_ the circles. But what if I directly select all circles via `d3.selectAll`, and then perform the data binding? [Let's see...](#dj0)

Now we see the role of the `parent`: it tells us where to append the elements. A similar issue arises with `select`, rather than `selectAll`.

## exit()

What if the new data array is smaller than the older one? That `_exit` field that we saw earlier now gets populated. [Let's take a look.](#dj1).

So when we have **less data than elements**, in the `exit()` selection existing elements can be removed. We do so through the `remove` function.

### What about elements that do not have data?

Note that the `data` selection matches **elements** with **data**, not **data** with **data**. Thus, if a selection returns elements that are not backed up by data, they will nevertheless bind with data in a similar manner. This circumstance is rare, however. Very likely whenever you create HTML elements it is through the `selection.data().enter().append()` sequence.

### If I want to only create new elements from data, what should my selector be?

**Anything that returns an empty selection**.

```javascript
selection.selectAll('vandy')
selection.selectAll('blah')
selection.selectAll('viscoursewow')
```

Assuming that there does not exist elements whose types are the above...

## Keys: Object Constancy

So how does D3 know when and where to add elements and remove elements? Thus far, we have seen one way: **indices**. We are assuming that **data array indices** and **element indices** (as layed out in the DOM) are meaningful. When they match up, we update element data. When data indices exceed element indices, elements are created. When element indices exceed data indices, elements are removed.

Using indices to match data with elements may not always be useful, especially for more complicated visualizations where data is highly dynamic. Another way that D3 matches data with elements is through **keys**. Rather than just using an array of data, if we construct an array of `key:value` pairs, then we can associate elements with keys, and use this to match data with elements when we `enter()` and `exit()`. This forms the notion of **object constancy**, ensuring that we can uniquely identify elements through their data. Let's look at an example:
<a name='dj2'></a>
```javascript
{% include_relative example5.js %}
```
---
<svg id='svg5' width='500' height='50'></svg>
<script type='text/javascript' src="example5.js"></script>
---

Couple notes:

* There is a difference between the order of data in the array and the order of elements in the DOM when performing the `data()` selection. This is important to keep in mind.
* This example illustrates (most of) the basic steps of the **general update pattern**: issue a data selection, remove data elements that no longer exist, append new elements.

## Data-Driven Transformations

Ok, so now we know how to stick some data to some elements. Performing data-driven transformations becomes quite the simple task! Continuing from our previous example, suppose we want to set circle positions to the bound data. This amounts to:

```javascript
d3.select('#svg5').selectAll('circle')
	.attr('cx', function(d) { return d.value[0]; })
	.attr('cy', function(d) { return d.value[1]; })
	.attr('r', 4);
```

A couple of notes:
* In contrast to the above, here we are using an anonymous function to access data, and then assigning an attribute to the element based on the data. This is, primarily, why D3 stands for Data-Driven Documents.
* The `d` argument in the anonymous function will be filled in with the appropriate datum, namely each item in the array used to perform the data join. We just need to specify how we are going to customize the visual appearance of an element, given the datum.

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

This can be useful to help you understand whats going on with selections, but I will not hold you to it. Please just make your code readable.

## Nesting

Last, let's cover data joins where we specify a **function**, rather than a **data array**, perhaps one of the more difficult concepts in D3, yet also one of the most powerful.

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

Let's experiment with this, for showing some nested bar marks:
<a name='dj3'></a>
```javascript
{% include_relative example6.js %}
```
---
<svg id='svg6' width='500' height='350'></svg>
<script type='text/javascript' src="example6.js"></script>
---

Of course you can imagine having deeper nesting structures. This provides us with a concise way to create rather involved visualizations from a pretty small amount of code. But you need to think carefully about how to represent your data.

Now, what happens when we want to update data? The same principles we discussed above apply. Let's take a look:
<a name='dj4'></a>
```javascript
{% include_relative example7.js %}
```
<script type='text/javascript' src="example7.js"></script>

The one trick here is that by _just_ calling data, the elements on which data is called will update (e.g. the group elements in the above), but _children will not update_. How do we propagate updates? As mentioned above: `select`.

Ok, so updates are relatively simple. What about adding new elements to nested selections? Removing elements? Once again, nothing changes, the general update pattern applies. However, you need to be careful about making appropriate changes to _all_ nested elements, which can conceptually be a bit tricky. In such cases your `enter()` and `exit()` selections will likely have multiple groups.
