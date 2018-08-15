---
layout: default
title: Wednesday Lecture
---

# D3: Selections and Transformations

There is a lot of ground to cover with D3. Today we are going to go in depth on two important pieces: selections and transformations. We will focus on how to perform selections and transformations only from a given set of elements, we will only briefly touch on the **data** aspect of **Data-Driven Documents** (next lecture we'll get into the details).

## Selections

At the core of D3 are **selections**. A selection is an array of **groups**, where each group is an **array of elements**. We use selections to access elements within the DOM.

**Is that all a selection is?**

Yep! But there are a number of subtleties to selections that you need to understand. Lets dive right into the D3 source to see what a selection is. First we will look at `d3.selectAll`:

```javascript
function selectAll(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([selector == null ? [] : selector], root);
}
```

It is common that we pass a string to tell D3 `what to select`. D3 then passes that along by querying the DOM, basically telling the DOM to _give me all elements that match this selector_ via the `querySelectorAll` call. But we can also pass it an element of the DOM directly.

Notice the `Selection` object that is returned. A `Selection` object is created with two arguments: an array of size 1 containing the group of elements that are returned by the DOM query, as well as another array of size 1 containing the root element of the DOM. The former represents our array of groups, and the latter represents our array of **parent nodes** for each group. The notion of **parent** in a selection is any ancestor of a node in the DOM, not just its direct ancestor. `d3.selectAll` will _always_ give us a single group, and the parent will _always_ be the root DOM node.

Next, lets look at `d3.select`:

```javascript
function select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}
```

Pretty similar, except that it calls `querySelector`, which will give us the element in the DOM that _first matches_ the selector. There is also a difference in how it handles selectors that are null.

Now, given a `Selection` object, we can perform more selections! However, these differ from the typical `d3.select`-style selections. Lets take a look at `selectAll`, a function of `Selection`:

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

Lets break this down:

* `selectorAll` is a function that, once invoked, will call `querySelectorAll`, similar to the above (omitted for brevity).
* The first `for` loop iterates over each group of the selection.
* The second `for` loop iterates over each element within each group.
* The new selection is constructed in the inner loop. Each element in our selection prompts a query to the DOM, and the result of the query gives us a new group. The parent of this group _is the element that is queried_ (`node`).
* Also note the remaining arguments `node.__data__, i, group`. We'll return to this later.

The big difference between `d3.selectAll` and `selection.selectAll` (where `selection` is a `Selection` object) is how parents are assigned. We can **nest selections** by calling `selectAll` on a selection. We will see the impact of this in several ways a bit later.

Now lets look at `select`:

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

* Note the `__data__` variable that is part of the returned query (`subnode`). It is assigned to the `node`'s parent. Thus, unlike `selectAll` `select` _propagates data_. We will see later why this can be useful.
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

Lets first take a closer look at selections [with an example](localhost:8000/example0.html).

Next, lets look at the impact of [nested selections](localhost:8000/example1.html).

Last, we will do some more [selection insanity](localhost:8000/example2.html).

## Transformations

So now that we have an understanding of how to select elements, modifying an element's properties, adding elements, and removing elements, all become straightforward. Rather than having to grab an array of elements, loop over the elements, and perform transformations, we perform transformations _directly on selections_.

### attr()

The `attr` function is part of a `Selection` object. It allows us to add, or modify, attributes of elements in a selection. There are two basic ways to do this, the first is by specifying a constant value for all elements:

```javascript
selection.attr('attname', 'attvalue')
```

The first argument specifies the attribute's name, and the second the value that we wish to specify. [Lets experiment with this](localhost:8000/example0.html).

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

Now, we are not working with data yet so `d` is null, but we can still [experiment with the remaining bits](localhost:8000/example0.html).

Furthermore, we can now start to see where nested selections make a difference. The index `i` will vary based on how the selection is grouped. [Lets see an example](localhost:8000/example2.html).

An important aspect of `attr`, and the other functions we will see, is that they return the original `selection` object. This is a process known as **method chaining**, and will allow us to write concise code for modifying selections, e.g.

```javascript
d3.selectAll('circle').attr('r', 10).attr('fill', 'blue')
```

### style()

The `style` function is very similar to `attr`, except it is specific to CSS styles.

### append()

How do we actually create new DOM elements? We use `append`! For a given selection, this will create a new node for each element in the selection and add it as a child to each element. [Lets experiment](localhost:8000/example2.html). Like `attr` and `style`, `append` chains too.

### remove()

And how do we remove DOM elements? We use `remove`! For a given selection, this will remove each element in the selection from the DOM. [Example](localhost:8000/example2.html).

So now that we know the details of D3 selections, and how to modify the DOM via selections, in the next lecture we will bring **data** into the picture. After all, we are using Data-Driven Documents!
