---
layout: default
title: Wednesday Lecture
---

<script type="text/javascript" async
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML" async>
</script>
<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Scales

Thus far we have seen how to map data to visual elements in the DOM through D3, but we have assumed that the data values nicely map into the SVG viewport. When we set the width and height of the SVG element, this is defining a **coordinate system** and visual elements must be positioned and sized with respect to this coordinate system. For instance, if the SVG element is in a 500 x 500 rectangle positioned at (0,0), and our datum is a 2D point with coordinate (40, 50), then it might seem reasonable to directly position this datum with its coordinate. But what if our data was all completely outside of the SVG element's viewport? We need to have a way to map **abstract data** to **visual representations**.

## Scales map data from a domain to a range

Pretty simple, right? Scales in D3 are actually very straightforward, but prove to be quite powerful in performing a number of operations:

* Properly positioning and sizing arbitrary data through a variety of maps.
* Performing color mapping.
* Mapping time.
* Supporting quantization, padding, continuous vs. discrete data, etc..

To construct a scale, you must specify a **domain**, e.g. the input space, and **range**, e.g. the output space. Almost always: **data is the domain, visual encoding is the range**. There are a variety of scales that D3 provides, which are highly dependent on the data **attribute types** that we previously discussed: categorical, ordinal, quantitative, as well as the types of output that we are mapping data to: spatial position, size, color, time, etc..

To better understand this, lets consider the simplest scale: a **linear** scale.

### d3.scaleLinear()

A linear scale assumes **continuous** input and **continuous** output. Upon creating a scale, it is necessary to define the domain's sequence of values and the range's sequence of values. So a common way to construct `scaleLinear` is as follows:

```javascript
scale = d3.scaleLinear()
	.domain([min_d,max_d])
	.range([min_x,max_x])
```

Where `min_d` and `max_d` are the minimum and maximum of your data, respectively, and `min_x` and `max_x` are the minimum and maximum of the x-coordinate in the SVG coordinate system, respectively. D3 scales, like selections, support method chaining, hence the notation above. To use the scale, for a given datum `d`, we simply pass it in to the scale to obtain the mapped value in the range: `scale(d)`.

<p>
So what is actually being done here? Under the hood, <b>linear interpolation</b> is being performed. More specifically, a function \(f : \mathbb{R} \rightarrow \mathbb{R}\) is constructed such that \(f(min_d) = min_x\), \(f(max_d) = max_x\), and for \(d \in (min_d,max_d)\), \(f(d)\) is linear, namely it can be expressed by \(f(d) = \alpha \cdot d + \beta\), where \(\alpha\) and \(\beta\) are dependent on \(min_d, max_d, min_x, max_x\).
</p>

Continuous scales, like `scaleLinear`, are very useful when our data is continuous, like our 2D points visually encoded in a scatterplot. So lets [revisit our scatterplot](localhost:8000/example0.html), and see how much more flexible things get when we use scales.

### Other Continuous Scales

D3 has a host of other continuous scales; we will not cover each one, please see the docs for more information. However, we will cover two other continuous scales, as they relate to fairly common uses in data visualization.

### d3.scaleSqrt()

<p>
Naturally, this applies a \(\sqrt{x}\) transformation to the data. But where would we use this? Lets discuss how to map <b>size</b> to a visual channel. Suppose we had a third data attribute in our previous dataset, and we wanted to map it to circle radii. What would a linear scale do to the resulting <b>area</b> of the circle?
</p>

<p>
Recall: area is \(\pi r^2\). So a linear change in radius will result in a quadratic change in area. This is not a great mapping from data to visual property, as it will be difficult to distinguish small data values in their visual encodings. On the other hand, a square-root scale results in a linear change in the area, thus changes in data will map linearly to the area channel.
</p>

[Lets experiment with this](localhost:8000/example1.html).
