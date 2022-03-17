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

# CS 3891.04 / 5891.04 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/fall2020">Overview</a>
  <a href="/teaching/vis/fall2020/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2020/schedule">Schedule</a>
  <a href="/teaching/vis/fall2020/assignments">Assignments</a>
  <a href="/teaching/vis/fall2020/project">Project</a>
  <a class='active' href="/teaching/vis/fall2020/resources">Resources</a>
</div>

---

<br>

# Resources

## JavaScript

* [Speaking JavaScript](http://speakingjs.com/es5/index.html): if you are new to JavaScript, then this is a great resource. It is comprehensive, yet accessible. In particular I recommend the following:
	* [Basic JavaScript](http://speakingjs.com/es5/ch01.html): this should get you up to speed on the language. If you are well-versed with Python, then the transition to JavaScript should not be too bad, it is largely learning new syntax of familiar concepts.
	* [Scope and Closures](http://speakingjs.com/es5/ch01.html#basic_var_scope_and_closures): as part of this chapter, pay particular attention to scope, and closures. Closures frequently arise in D3, in ways you may not realize!
	* [Functions](http://speakingjs.com/es5/ch15.html): you should get familiar with the different types of functions in JavaScript, namely function declarations and function expressions. The latter are of particular importance, as they permit us to define _anonymous functions_, which we will use frequently with D3.
	* [Arrays](http://speakingjs.com/es5/ch18.html): we will frequently use Arrays, so you should get acquainted with the basics, e.g. construction, access, slicing. There are also a number of Array methods that you will find useful: [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), amongst others.

## SVG

Although D3 might have a bit of a learning curve, at the end of the day, all we are doing is drawing a bunch of simple shapes :sweat_smile:. So, it is critical to understand _what we may draw_. We will use **Scalable Vector Graphics**, commonly referred by its acronym SVG, for programming graphics:
* SVG elements: [rect](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect), [circle](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle), [line](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line), [text](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text), amongst others. [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) is quite powerful, but also quite complicated; we will use D3 to emit path elements.
* Perhaps one of the most important SVG elements is [group](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g). Group elements are extremely useful in spatially organizing elements, and ultimately, allow us to think of a visualization design as a _hierarchy_, e.g. from a main plot, to child plots, down to graphical marks.
* For all elements, you should be familiar with their _attributes_, which control _how elements are drawn_. These consist of position, color (stroke and fill), opacity, stroke thickness, as well as the numerous options for formatting text. Attribute syntax is largely shared across elements when applicable, but there is some variation.

## D3

We will cover D3 in detail as part of the course. But for reference, there are a collection of excellent notebooks that discuss D3 ([link](https://observablehq.com/@d3)). Here are some of my favorites:

* [General Update Pattern](https://observablehq.com/@d3/general-update-pattern?collection=@d3/d3-selection)
* Working with Arrays in D3: [range](https://observablehq.com/@d3/d3-range?collection=@d3/d3-array), [shuffle](https://observablehq.com/@d3/d3-shuffle?collection=@d3/d3-array), [extent](https://observablehq.com/@d3/d3-mean-d3-median-and-friends?collection=@d3/d3-array), [sum](https://observablehq.com/@d3/d3-sum?collection=@d3/d3-array), [cross](https://observablehq.com/@d3/d3-cross?collection=@d3/d3-array)
* [Styling Axes](https://observablehq.com/@d3/styled-axes?collection=@d3/d3-axis)
* [Working with Color](https://observablehq.com/@d3/working-with-color?collection=@d3/d3-color)
* [Color Schemes](https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic)
* [Working with d3-shape](https://observablehq.com/@d3/multi-line-chart?collection=@d3/d3-shape)

## Observable notebooks

* [User Manual](https://observablehq.com/@observablehq/user-manual): excellent resource for understanding the ins and outs of Observable notebooks. In particular, you may want to start with the following quick reads:
	* [Five-minute Introduction](https://observablehq.com/@observablehq/five-minute-introduction)
	* [Introduction to HTML](https://observablehq.com/@observablehq/introduction-to-html): in many ways, Observable hides the nitty-gritty details of HTML, so that you can more directly, and concisely, program for the web.
	* [How Observable Runs](https://observablehq.com/@observablehq/how-observable-runs): it is good to know how Observable processes the cells that you define in your notebook.
	* [Introduction to Views](https://observablehq.com/@observablehq/introduction-to-views): the ease of use in creating, and using, user interface elements is a great feature of Observable. In particular, check out this [collection of inputs](https://observablehq.com/@jashkenas/inputs), super nice!

## Data Sources

* [Google Dataset Search](https://toolbox.google.com/datasetsearch)
* [Nashville Open Data](https://data.nashville.gov/)
* [US Government Open Data](https://www.data.gov/)
* [Kaggle](https://www.kaggle.com/)
* [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php)
* [SNAP: Network Data](https://snap.stanford.edu/data/)
* [Humanities Data](https://humanitiesdata.com/)

## Misc

* [Markdown syntax](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax)
