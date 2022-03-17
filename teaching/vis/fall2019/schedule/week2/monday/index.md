---
layout: default
title: Monday Lecture
---

# HTML, CSS, SVG, Javascript

Here we are going to go over the basics of how to code data visualizations using web technology. We will cover HTML, CSS, SVG, and Javascript.

## HTML

HTML stands for hyper-text markup language. It is a way to structure and format text, in order for web browsers to render content. For the purposes of visualization, we only require knowledge of a very small portion of HTML. To get started, let's take a look at the following HTML code:

```html
<!DOCTYPE html>
<html lang='en'>
	<head>
		<title>Example</title>
	</head>
	<body>
		<p>
			Here is a paragraph of awesome text.
		</p>
		Here is a non-paragraph of some not so awesome text.
	</body>
</html>
```

The very first line `<!DOCTYPE html>` is necessary to specify that this file is HTML. After this, you will see a certain pattern in the HTML: lots of open and closed brackets. The content within brackets are known as **elements**. And importantly, elements form a **hierarchy**. Collectively, the full hierarchy of elemements in an HTML webpage is known as the **Document Object Model**, more commonly abbreviated as DOM.

General takeaway: the types of elements tell the browser how to render content. And given the DOM, structure at a given element is inherited by all of its children. In general, an element can be defined as:

```html
<elem-name att1='thing1' att2='thing2'>
CONTENT
</elem-name>
```

**Important:** a major purpose of the code that you write will be to emit HTML that is rendered by the browser.

Having said that, most HTML elements we do not care about. There are a few important attributes associated with elements, however.

* `class`: `<elem-name class='theclassname'>CONTENT</elem-name>` ; allows us to access all elements with `theclassname`
* `id`: `<elem-name id='theidname'>CONTENT</elem-name>` ; allows us to access a single element with `id`

Classes and IDs can be used on any element.

## CSS

Cascading Style Sheets (CSS) allows us to style elements in flexible ways. We can associate a **type of element**, elements of a **class**, or an element containing an **id**, with a group of styles.

Let's look at a complete example for styling paragraph elements that correspond to distinct classes:

```css
.class1  {
	font-size: 24px;
	color: darkblue;
}
.class2  {
	font-size: 12px;
	color: darkred;
}
```

```html
<head>
   <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
	<p class='class1'>
		Here is a paragraph of awesome text.
	</p>
	<p class='class2'>
		Now here is a paragraph of some better text.
	</p>
</body>
```
---
<head>
   <link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body>
	<p class='class1'>
	Here is a paragraph of awesome text.
	</p>
	<p class='class2'>
	Now here is a paragraph of some better text.
	</p>
</body>
---
**Important:** this manner of selecting elements by type, class, or id will be frequently used in D3. Indeed, a major benefit of D3 is its power in selecting, and subsequently transforming (or styling), HTML elements.

CSS also adheres to the hierarchy of the DOM. We can select elements based on their hierarchical relationship. For instance, if a `<p>` element was a child of a `<div>` element, then we can select all such elements as follows:

```css
div p {
	style1: content1;
	style2: content2;
}
```

## SVG

Most elements that we will use are **SVG** elements. SVG stands for scalable vector graphics. They allow us to define geometric shapes that are rendered to the browser in an analytical manner. They are not rasterized at a fixed resolution, but rather rendered based on closed-form equations, like rectangles, circles, polygons. This will make our visualizations look real nice!

We include SVG elements just like any other element in HTML. Let's take a look at a basic example:
```html
<svg width='500' height='350'>
	<rect x='100' y='100' width='20' height='100'/>
	<circle cx='200' cy='200' r='20'/>
	<line x1='300' x2='350' y1='300' y2='320' stroke='black' stroke-width='1'/>
</svg>
```
---
<svg width='500' height='350'>
	<rect x='100' y='100' width='20' height='100'/>
	<circle cx='200' cy='200' r='20'/>
	<line x1='300' x2='350' y1='300' y2='320' stroke='black' stroke-width='1'/>
</svg>
---

An important SVG element is the **group** element, `<g>`. It allows us to group elements together, and apply styles to elements that are all contained within a group. Example:
```html
<svg width='500' height='350'>
	<g fill='red' stroke='blue' stroke-width='4' opacity='0.4'>
		<rect x='100' y='100' width='20' height='100'/>
		<circle cx='200' cy='200' r='20'/>
	</g>
</svg>
```
---
<svg width='500' height='350'>
	<g fill='red' stroke='blue' stroke-width='4' opacity='0.4'>
		<rect x='100' y='100' width='20' height='100'/>
		<circle cx='200' cy='200' r='20'/>
	</g>
</svg>
---

We can do similar things with CSS, but the group element turns out to be a lot more convenient. Furthermore, we can apply **transformations** to groups, which will prove quite useful in designing visualizations. Here is an example:
```html
<svg width='500' height='380'>
	<g transform='translate(200,200) rotate(80) translate(-200,-200)'>
		<rect x='100' y='100' width='20' height='100'/>
		<circle cx='200' cy='200' r='20'/>
		<line x1='300' x2='350' y1='300' y2='320' stroke='black' stroke-width='10'/>
	</g>
</svg>
```
---
<svg width='500' height='380'>
	<g transform='translate(200,200) rotate(80) translate(-200,-200)'>
		<rect x='100' y='100' width='20' height='100'/>
		<circle cx='200' cy='200' r='20'/>
		<line x1='300' x2='350' y1='300' y2='320' stroke='black' stroke-width='10'/>
	</g>
</svg>
---

The types of attributes one can apply to SVG elements is quite large, please refer to [resources](/teaching/vis/fall2019/resources) for appropriate references. It is important to be familiar with how to edit SVG elements, as it is our primary way to realize **visual channels**.

### A note on SVG coordinate systems

Let's suppose we have specified in our `<g>` element a width of 500 and height of 800. Then the x-coordinate of 0 corresponds to the left part of the screen, and 500 corresponds to the right part of the screen. However, a y-coordinate of 0 corresponds to the **top** part of the screen, and 800 corresponds to the **bottom** part of the screen. So when we specify, say, the `height` of a rectangle, we need to be careful: this will correspond to the shape expanding towards the bottom!

This will trip you up, as it does everyone, so just be careful with the y-coordinate system. Later on, we will better handle this with scales.

## Javascript

So now we know how to draw shapes on a webpage. What is missing is how to link up **data** to **visual elements**. **Javascript** is going to be our glue.

Javascript is a loosely typed language. If you are familiar with Python, then a lot of the basic language constructs transfer over to Javascript.

### Variables

We define variables as such:

```javascript
var foo = 'bar'
var foo2 = 'bar2'
foo = 1.4;
```

Note that `foo` is reassigned to a different type, with no problem. Also, semicolons are optional.

### Arrays, Conditionals, Loops

Arrays, conditionals, and loops are defined and used as:

```javascript
var foos = ['bar1','bar2','bar3'];
for(var i = 0; i < foos.length; i++)  {
	if(foos[i] === 'bar2')  {
		console.log('got you bar2!');
	}
}
```

Couple points:

* We access the total number of elements in an array with `length`
* Notice `console.log`. This is a way to print text to the **console**. Very, very, very useful for debugging.
* Notice the `===` syntax. We can either use `==` and `===` to test for equality, but the former will not test for the type, and the latter will. So, if we have a variable that is `var foo = "5"`, and we test `foo==5`, it will return `true`. But if we test `foo===5`, then it will return false. Similar arguments hold for `!=` and `!==`.

### Objects

In Javascript, an **object** is a standalone entity comprised of a set of **properties**. A property can be either a variable, or a function (a function that is a property of an object is often referred to as a method). There are two main ways to add/set properties to an object: via `.`, or more generally with `['']`:

```javascript
var circle = {}; // initialize an empty object
circle.cx = 3;
circle['cy'] = 10;
circle.cr = 5;
```

We can also define properties all at once:

```javascript
var circle = {
	cx:3,
	cy:10,
	cr:5
};
```

Accessing properties is done via `circle.cx` or `circle['cx']`.

We set a function as a property via:

```javascript
circle.length = function()  {
	return Math.sqrt(this.cx*this.cx+this.cy*this.cy);
}
```

This is known as a **function expression**, which we will cover in more detail next lecture. We can then invoke the function as `circle.length()`.

Note `this`: like Java and C++, we use `this` to refer to the owner of an object.

### Pass-by

When calling a function, and passing a value as an argument of the function, Javascript takes on a **Pass by Value**. This means that for primitives (numbers, strings), their values are directly copied into the argument. On the other hand, when passing an object, the value is the reference to the object. Hence, modifying an argument corresponding to an object inside of a function will change the original object.

### Putting this to practice: mapping 2D data to circles

Ok, so now let's use Javascript to code up some data vis. Suppose we are given some 2D data: each item has two quantitative attributes.

```javascript
var data = [];
for(var i = 0; i < 13; i++)
	data.push([100+300*Math.random(),100+300*Math.random()]);
```

Javascript has access to the DOM via the `document` object, which we can use to emit html. So let's make a scatterplot from the data!

```javascript
var svg_elem = document.getElementsByTagName('svg');
for(var i = 0; i < data.length; i++)  {
	var circle_elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); // SVG quirks :)
	circle_elem.setAttribute('cx',data[i][0]);
	circle_elem.setAttribute('cy',data[i][1]);
	circle_elem.setAttribute('r',10);
	svg_elem[0].appendChild(circle_elem);
}
```
---
<svg id='svg1' width='500' height='420'></svg>
<script type='text/javascript' src="example1.js"></script>
---

A couple of rather important notes:
* The `getElementsByTagName` allows us to query the DOM for all elements of a specific type, in the above, an array of SVG elements is returned.
* The `createElementNS` function is our way of creating an element.
* We can call certain functions on the returned element. One of those shown above is `setAttribute`. This allows us to _programmatically_ set attributes for elements via Javascript.
* Another important function is `appendChild`. This will add an element as a child of another element (the element for which the function is invoked). This permits us to build the hierarchical structure of the DOM.
