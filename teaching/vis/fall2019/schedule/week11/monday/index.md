---
layout: default
title: Monday Lecture
---

<script src="https://d3js.org/d3.v5.min.js"></script>

# D3: Maps

The first step in using D3 for drawing maps is shape data. In particular, we represent a **geographic entity** as a **polygon**. Entity, here, can mean many things:

* Country
* State
* County

So let's consider the United States. The US Census is quite good at maintaining shape data for different geographic entities. Click [here](https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html) for the data.

---

So we have our data, and in particular, we have a .shp file. D3 cannot read this file format, rather, we need json! However, there is a way to convert shp to json:

* Install node.js ([https://nodejs.org](https://nodejs.org))
* In your terminal, run: `npm install -g shapefile`
* Then, use the command `shp2json shp_file -o json_file`.

Now that we have json, we can parse it with D3, and use the _extensive_ projection support provided by D3. Here is a minimal example:

```javascript
{% include_relative example0.js %}
```
---
<svg id='svg0' width='600' height='600'></svg>
<script type='text/javascript' src="example0.js"></script>
---

Couple notes:

* The `projection` variable is a geographic projection, one of many from D3. Here I've used a particularly nice one (Albers projection) designed for displaying the US. `projection` has a basic purpose: it takes in an array of 2 numbers, corresponding to longitude and latitude, and returns its 2D projection that we use for drawing.
* The `d3.geoPath` function is akin to `d3.line` or `d3.shape`: it generates `d` attributes used as part of setting the geometry of `path` elements.
* Even though I specified the width and height, there is some additional space. It is easy enough to account for this via constructing scale objects, whose domain is the output of `projection` for all coordinates, and range is width and height (for the 2 separate scales).

What if we want more detailed shape files, e.g. at the level of counties? We simply access the dataset from the Census website, and plot it in the same manner.

There is one additional difficulty here, however: the data is provided as county polygons, not state polygons. So, how do we know the state that a county belongs to? This requires a bit of data wrangling. The county data _indeed_ has state identifiers, but they are not the names of states. On the other hand, the state data _has_ state names, as well as identifiers. Hence, we can filter out states based on name, gather their ids, then filter out counties that do not satisfy the state ids:

```javascript
{% include_relative example1.js %}
```
---
<svg id='svg1' width='600' height='600'></svg>
<script type='text/javascript' src="example1.js"></script>
---

An important aspect about D3's projection function is that it is not just limited to shape files. If we have _other_ geographic data - check-in locations, trajectories of people jogging, riding their bike, etc.. - then we can use the same projection function to plot this data on the map. Here is a minimal example:

```javascript
{% include_relative example2.js %}
```
---
<svg id='svg2' width='600' height='600'></svg>
<script type='text/javascript' src="example2.js"></script>
---

Further, everything we have discussed regarding interactivity extends quite nicely. Each region is a polygon, and thus if we wanted to, say, mouse over/off states, we perform the appropriate selection and event handling for their path elements:

```javascript
{% include_relative example3.js %}
```
---
<svg id='svg3' width='600' height='600'></svg>
<script type='text/javascript' src="example3.js"></script>
---
