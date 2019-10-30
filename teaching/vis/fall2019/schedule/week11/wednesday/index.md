---
layout: default
title: Wednesday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="https://unpkg.com/d3-simple-slider"></script>


# D3: Density

## Points

One way to plot density is on the points **directly**. We simply compute the KDE only on our points, and then apply an appropriate color scale. Let's revisit Assignment 3 to see how this helps better discern points:

---
<svg id='svg1' width='850' height='700'></svg>
<script type='text/javascript' src="point_density.js"></script>
---

## Contours

We can also plot density-based maps in D3 using `d3.contourDensity`. This performs kernel density estimation for us, where we can specify the parameters of interest - in particular, **bandwidth**. This will provide us with a way to generate path elements, where each path element corresponds to a binned region of density, and we can control how many path elements we would like to be drawn.

Here is an example for car crash incidents in Nashville:

```javascript
{% include_relative plot-crashes-contours.js %}
```
---
<svg id='svg0' width='700' height='700'></svg>
<script type='text/javascript' src="plot-crashes-contours.js"></script>
---
