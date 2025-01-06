---
layout: default
title: Resources
---

<style>
.topnav {
  overflow: hidden;
  background-color: #fdfdfd;
}

.topnav a {
  float: left;
  color: #aaaaaa;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  color: #555555;
}

.topnav a.active {
  color: #555555;
}
</style>

# CS 4247/5247 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/spring2025">Overview</a>
  <a href="/teaching/vis/spring2025/syllabus">Syllabus</a>
  <a href="/teaching/vis/spring2025/schedule">Schedule</a>
  <a href="/teaching/vis/spring2025/assignments">Assignments</a>
  <a class='active' href="/teaching/vis/spring2025/resources">Resources</a>
</div>

---

<br>

# Resources

## JavaScript

* [Speaking JavaScript](http://exploringjs.com/es5/index.html): if you are new to JavaScript, then this is a great resource. It is comprehensive, yet accessible. In particular I recommend the following:
	* [Basic JavaScript](http://exploringjs.com/es5/ch01.html): this should get you up to speed on the language. If you are well-versed with Python, then the transition to JavaScript should not be too bad, it is largely learning new syntax of familiar concepts.
	* [Scope and Closures](http://exploringjs.com/es5/ch01.html#basic_var_scope_and_closures): as part of this chapter, pay particular attention to scope, and closures. Closures frequently arise in D3, in ways you may not realize!
	* [Functions](http://exploringjs.com/es5/ch15.html): you should get familiar with the different types of functions in JavaScript, namely function declarations and function expressions. The latter are of particular importance, as they permit us to define _anonymous functions_, which we will use frequently with D3.
	* [Arrays](http://exploringjs.com/es5/ch18.html): we will frequently use Arrays, so you should get acquainted with the basics, e.g. construction, access, slicing. There are also a number of Array methods that you will find useful: [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), amongst others.
* **Observable resources for JS**
	* [JavaScript Introduction](https://observablehq.com/@observablehq/learn-javascript-introduction): I strongly recommend going through this notebook, an introduction to JavaScript syntax for concepts that should be familiar.
	* [JavaScript, coming from a Python background](https://observablehq.com/@observablehq/learn-just-enough-javascript-python-users): if you are experienced in using Python, then this is a nice notebook for translating Python concepts to JavaScript.
	* [Observable is almost, but not entirely, Javascript](https://observablehq.com/documentation/cells/observable-javascript): there are a few important distinctions between vanilla JavaScript, and how JavaScript is used within Observable.

## SVG

Although D3 might have a bit of a learning curve, at the end of the day, all we are doing is drawing a bunch of simple shapes. So, it is critical to understand _what we may draw_. We will use **Scalable Vector Graphics**, commonly referred by its acronym SVG, for programming graphics:
* SVG elements: [rect](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect), [circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle), [line](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line), [text](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text), amongst others. [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) is quite powerful, but also quite complicated; we will use D3 to emit path elements.
* Perhaps one of the most important SVG elements is [group](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g). Group elements are extremely useful in spatially organizing elements, and ultimately, allow us to think of a visualization design as a _hierarchy_, e.g. from a main plot, to child plots, down to graphical marks.
* For all elements, you should be familiar with their _attributes_, which control _how elements are drawn_. These consist of position, color (stroke and fill), opacity, stroke thickness, as well as the numerous options for formatting text. Attribute syntax is largely shared across elements when applicable, but there is some variation.

## Observable

* [Observable documentation](https://observablehq.com/documentation/): the primary resource for understanding the ins and outs of Observable notebooks. In particular, you may want to start with the following quick reads:
	* [A Taste of Observable](https://observablehq.com/@observablehq/a-taste-of-observable): start here to get broad overview of Observable.
	* [Introduction to cells](https://observablehq.com/documentation/cells/): this is a good introduction to the programming model of Observable, and how to think about cells.
	* [How Observable Runs](https://observablehq.com/@observablehq/how-observable-runs): it is good to know how Observable processes the cells that you define in your notebook.
	* [Introduction to Views](https://observablehq.com/@observablehq/views): the ease of use in creating, and using, user interface elements is a great feature of Observable. In particular, check out this [Observable inputs](https://observablehq.com/documentation/inputs/overview), super nice!

## D3

We will cover D3 in detail as part of the course. But for reference, there are a collection of excellent notebooks that discuss D3 ([link](https://observablehq.com/@d3)). Here are some of my favorites:

* [Joining data with elements](https://observablehq.com/@d3/selection-join), [Learning D3 Joins](https://observablehq.com/@d3/learn-d3-joins)
* Working with Arrays in D3: [range](https://observablehq.com/@d3/d3-range), [shuffle](https://observablehq.com/@d3/d3-shuffle), [extent](https://observablehq.com/@d3/d3-extent), [sum](https://observablehq.com/@d3/d3-sum), [cross](https://observablehq.com/@d3/d3-cross)
* To effectively use D3, we often need to have data formatted in a particular way. _Grouping data_ becomes essential for this purpose. See: [d3-group](https://observablehq.com/@d3/d3-group), [d3-flatgroup](https://observablehq.com/@d3/d3-flatgroup), and [grouping as a hierarchy](https://observablehq.com/@d3/d3-group-d3-hierarchy).
* [Learning D3 Scales](https://observablehq.com/@d3/learn-d3-scales); among the scales offered by D3, [linear scales](https://observablehq.com/@d3/d3-scalelinear), [point scales](https://observablehq.com/@d3/d3-scalepoint), and [band scales](https://observablehq.com/@d3/d3-scaleband) are arguably the most useful.
* [Styling Axes](https://observablehq.com/@d3/styled-axes)
* [Working with Color](https://observablehq.com/@d3/working-with-color)
* [Color Schemes](https://observablehq.com/@d3/color-schemes)
* [Learning D3 Shapes](https://observablehq.com/@d3/learn-d3-shapes), [Line plots](https://observablehq.com/@d3/multi-line-chart)


## Misc

* [Markdown syntax](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax)
