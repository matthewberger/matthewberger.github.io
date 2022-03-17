---
layout: default
title: Monday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Color

As we discussed, there are a number of color spaces that we can use for visualization, and D3 provides support for a variety of color spaces. One (suboptimal) option is HSL (hue-saturation-lightness):
```javascript
d3.hsl(h,s,l)
```
where `h`, `s`, `l` accept values in the range `[0,360]`, `[0,1]`, and `[0,1]`, respectively.

A better, perceptually uniform, color space is LAB:
```javascript
d3.lab(l,a,b)
```
where `l`, `a`, `b` accept values _typically_ in the range `[0,100]`, `[-160,160]`, and `[-160,160]`, respectively. I say typically, because there are LAB values that exist outside of the RGB gamut, and thus we cannot see them.

It is straightfoward to assign a value of `l`, corresponding to luminance, but the `a`-`b` plane for a given `l` is not entirely intuitive. A more user-friendly color space is HCL (hue-chroma-luminance):
```javascript
d3.hcl(l,a,b)
```
where `h` accepts values in the range [0,360]  and `c`, `l` accept values _typically_ in the range `[0,230]`, and `[0,100]`, respectively, for similar reasons above. In fact, HCL is just the LAB color space expressed in _cylindrical coordinates_.

## Categorical Colors

Here is an example for comparing the different color spaces, assuming we want to choose colors for a categorical (nominal) attribute, showing LAB color space (left), HSL color space (middle), HCL color space (right).
```javascript
{% include_relative example0.js %}
```
---
<svg id='svg0' width='800' height='250'></svg>
<script type='text/javascript' src="example0.js"></script>
---

## Ordinal / Quantitative Colors

If we want to use color to encode ordinal or quantitative data, then it is preferred to use luminance. Here we compare the HSL color space (middle), HCL color space (right), as a function of luminance (left-to-right) and saturation/chroma (top-to-bottom).
```javascript
{% include_relative example1.js %}
```
---
<svg id='svg1' width='800' height='360'></svg>
<script type='text/javascript' src="example1.js"></script>
---
