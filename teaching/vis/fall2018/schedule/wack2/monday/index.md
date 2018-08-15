---
layout: default
title: Monday Lecture
---

# HTML, CSS, SVG, Javascript

Here we are going to go over the basics of how to code data visualizations using web technology. We will cover HTML, CSS, SVG, and Javascript.

## HTML

HTML stands for hyper-text markup language. It is a way to structure and format text, in order for web browsers to render content. For the purposes of visualization, we only require knowledge of a very small portion of HTML. To get started, lets take a look at the following HTML code:

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

[So lets look at this HTML rendered in the browser](localhost:8000/example0.html).

Takeaway: the types of elements tell the browser how to render content. And given the DOM, structure at a given element is inherited by all of its children. In general, an element can be defined as:

```html
<elem-name att1='thing1' att2='thing2'>
CONTENT
</elem-name>
```

**Important:** a major purpose of the code that you write will be to emit HTML that is rendered by the browser.

Having said that, most HTML elements we do not care about. There are a few important ones, however.

* `class`: `<elem-name class='theclassname'>CONTENT</elem-name>` ; allows us to access all elements with `theclassname`
* `id`: `<elem-name id='theidname'>CONTENT</elem-name>` ; allows us to access a single element with `id`

Classes and IDs can be used on any element.

## CSS

Cascading Style Sheets (CSS) allows us to style elements in flexible ways. We can associate a **type of element**, elements of a **class**, or an element containing an **id**, with a group of styles.

For styling elements of a certain type, [lets see an example](localhost:8000/example1.html).

This is somewhat inflexible: what if we want to style paragraphs differently? [Here we can use classes](localhost:8000/example2.html).

**Important:** this manner of selecting elements by type, class, or id will be frequently used in D3. Indeed, a major benefit of D3 is its power in selecting, and subsequently transforming (or styling), HTML elements.

CSS also adheres to the hierarchy of the DOM. We can select elements based on their hierarchical relationship. For instance, if a `<p>` element was a child of a `<div>` element, then we can select all such elements as follows:

```css
div p {
	style1: content1;
	style2: content2;
}
```

## SVG

Most elements that we will use are **SVG** elements. SVG stands for scalable vector graphics. They allow us to define _visual_ elements that are rendered to the browser in an analytical manner. They are not rasterized at a fixed resolution, but rather rendered based on closed-form equations, like rectangles, circles, polygons. This will make our visualizations look real nice!

We include SVG elements just like any other element in HTML. [Lets take a look at a basic example](localhost:8000/example3.html).

An important SVG element is the **group** element, `<g>`. It allows us to group elements together, and apply styles to elements that are all contained within a group. [Lets see an example](localhost:8000/example4.html).

We can do similar things with CSS, but the group element turns out to be a lot more convenient. Furthermore, we can apply **transformations** to groups, which will prove quite useful in designing visualizations. [Lets look at a basic example](localhost:8000/example5.html).

The types of attributes one can apply to SVG elements is quite large, please refer to [Resource]() for appropriate references. It is important to be familiar with how to edit SVG elements, as it is our primary way to realize **visual channels**.

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

Note that `foo` is reassigned to a different type, with no problem. Also, semicolons are optional, but appreciated.

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

In Javascript objects are used to group fields and functions for a given variable. We can define an empty object, and then populate fields, as follows:

```javascript
var circle = {};
circle.cx = 3;
circle['cy'] = 10;
circle.cr = 5;
```

We can also define fields all at once:

```javascript
var circle = {
	cx:3,
	cy:10,
	cr:5
};
```

Accessing fields is done via `circle.cx` or `circle['cx']`.

We can also associate a function with an object:

```javascript
circle.length = function()  {
	return Math.sqrt(this.cx*this.cx+this.cy*this.cy);
}
```

We can then invoke the function as `circle.length()`.

Note `this`: like Java, we use `this` to refer to the owner of an object. [Lets take a closer look in the browser](localhost:8000/example6.html).

### More on Functions

Notice how the function above did not have a name associated with it. There are actually two types of functions in Javascript. One is a **function declaration** where the function is created with a name, as you might be used to seeing in other languages:

```javascript
function length(x,y)  {
	return Math.sqrt(x*x+y*y);
}
```

The other is a **function operator**, as in the `circle.length = ...` example. The difference is that a function operator is treated as an **expression**, and is evaluated at runtime, whereas a function declaration results in a function being defined once the Javascript file is loaded, and is in fact moved to the beginning of the code. This is a process known as _hoisting_.

Function operators can be quite powerful: they provide us so-called **anonymous functions**, because the function does not have a name. As shown, they allow us to associate a function with an object. (sidebar: functions are technically objects in Javascript, but we won't get in to this). They are also useful for **events**: we can assign an event listener an anonymous function, and whenever something kicks off an event, it will then simply invoke the function that we passed it.

Anonymous functions also enable **function closures**, where we can define anonymous functions _within_ a function, and the inner function has access to the state of the outer function. We will revisit this when getting in to D3.

### Putting this to practice: mapping 2D data to circles

Ok, so now lets use Javascript to code up some data vis. Suppose we are given some 2D data: each item has two quantitative attributes.

```javascript
var data = [];
for(var i = 0; i < 13; i++)
	data.push([100+300*Math.random(),100+300*Math.random()]);
```

Javascript has access to the DOM via the `document` object, which we can use to emit html. So lets make a scatterplot from the data!

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

[Lets see this in action](localhost:8000/example7.html).

Alas, coding up data visualizations in this manner has a number of limitations:

* What if we want to add, remove, and modify 2D points?
* What if the data scale is completely different from the SVG canvas dimensions?
* How do we update the visual channels of certain data items that have prescribed categories?

These issues, and any more, are addressed by D3, which we will start covering next lecture.
