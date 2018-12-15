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

# CS 8395-03 - Visual Analytics & Machine Learning

---

<div class='topnav'>
  <a href="/teaching/vaml/spring2019">Overview</a>
  <a href="/teaching/vaml/spring2019/syllabus">Syllabus</a>
  <a href="/teaching/vaml/spring2019/schedule">Schedule</a>
  <a href="/teaching/vaml/spring2019/project">Project</a>
  <a href="/teaching/vaml/spring2019/papers">Papers</a>
  <a class='active' href="/teaching/vaml/spring2019/resources">Resources</a>
</div>

---

<br>

# Resources

## High-Level Authoring Tools

When you are first gathering/cleaning data and you would like to produce some initial visualizations, I strongly recommend using one of the following tools:

* [matplotlib](https://matplotlib.org/) For python, this is a standard plotting library, but you can do a fair amount with it.
* [ggplot2](https://ggplot2.tidyverse.org/) For R, this library is more geared towards data visualization than matplotlib, as the `gg` is in reference to Leland Wilkinson's [Grammar of Graphics](https://www.amazon.com/Grammar-Graphics-Statistics-Computing/dp/0387245448/ref=as_li_ss_tl?ie=UTF8&qid=1477928463&sr=8-1&keywords=the+grammar+of+graphics&linkCode=sl1&tag=ggplot2-20&linkId=f0130e557161b83fbe97ba0e9175c431).
* [vega-lite](https://vega.github.io/vega-lite/) A so-called Grammar of Interactive Graphics, this is a tool that allows you to easily declare how to map your data to marks and channels. Support for multiple views, as well as a means of declaring interactions.
* [Data Illustrator](http://data-illustrator.com/) Like Adobe Illustrator, but for the creation of data visualizations. Intended to have visualization authoring be akin to creating graphics through design tools, and does not require any programming.
* [Charticulator](https://charticulator.com/) Akin to Data Illustrator, but has a larger emphasis on the creation of complex layouts.

## Libraries that support Bespoke Visualizations

The above tools may not be sufficient for creating more complex visualizations that require multiple views and intricate coordination of views. For these ends, please see the following:

* [d3](https://d3js.org/) Javascript library for creating visualizations - your vis is represented as SVG elements that are facilitated by d3.
* [React](https://reactjs.org/) Javascript library for building user interfaces.
* [Stardust](https://stardustjs.github.io/) Javascript library for creating visualizations that is scalable. Uses WebGL for efficient rendering, could be useful if you have a large amount of data you want to show.
