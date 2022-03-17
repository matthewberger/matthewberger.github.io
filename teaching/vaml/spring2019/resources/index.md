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
* [Vega-Lite](https://vega.github.io/vega-lite/) A so-called Grammar of Interactive Graphics, this is a tool that allows you to easily declare how to map your data to marks and channels. Support for multiple views, as well as a means of declaring interactions.
* [Altair](https://altair-viz.github.io/) Python library built on Vega-Lite.
* [Bokeh](https://bokeh.pydata.org/en/latest/) Another Python library for data visualization. Good support for interactive visualizations.
* [Data Illustrator](http://data-illustrator.com/) Like Adobe Illustrator, but for the creation of data visualizations. Intended to have visualization authoring be akin to creating graphics through design tools, and does not require any programming.
* [Charticulator](https://charticulator.com/) Akin to Data Illustrator, but has a larger emphasis on the creation of complex layouts.

## Libraries that support Bespoke Visualizations

The above tools may not be sufficient for creating more complex visualizations that require multiple views and intricate coordination of views. For these ends, please see the following:

* [d3](https://d3js.org/) Javascript library for creating visualizations - your vis is represented as SVG elements that are facilitated by d3.
* [React](https://reactjs.org/) Javascript library for building user interfaces.
* [Stardust](https://stardustjs.github.io/) Javascript library for creating visualizations that is scalable. Uses WebGL for efficient rendering, could be useful if you have a large amount of data you want to show.
* [Three](https://threejs.org/) 3D rendering library in Javascript, backed by WebGL.
* [Leaflet](https://leafletjs.com/) Javascript library for interactive maps.
* [Crossfilter](http://square.github.io/crossfilter/) Javascript library for interactions with multivariate datasets, good support for linked views.
* [Shiny](https://shiny.rstudio.com/) For R, can create some reasonably complex, responsive, visualizations with this library.
* [VTK](https://www.vtk.org/) C++/Python library for creating 3D visualizations. Requires basic understanding of 3D graphics.
* [Paraview](https://www.paraview.org/) Visualization tool for creating 3D visualizations. Large support of filters for data processing and visualization. Has support for scripting, so it is customizable to a certain extent.
* [OpenGL](https://www.khronos.org/opengl/wiki/Getting_Started) When all else fails ... you can't beat using straight OpenGL for creating data visualizations. Available for most languages: C++/Python/Javascript, etc.. Steep learning curve, however.

## D3 Resources

Should you decide to use D3 as your library for visualization, please see the additional resources below for further reference:

### SVG Reference

* [Basic Shapes](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)
* [Attributes](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)
* [Group](https://developer.mozilla.org/en/docs/Web/SVG/Element/g)
* [Transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform)

### Javascript Basics

* [Javascript Guide](http://helephant.com/2008/08/23/javascript-anonymous-functions/)
* [Anonymous Functions](http://helephant.com/2008/08/23/javascript-anonymous-functions/)
* [Closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)

### D3 Basics

* [API Reference](https://github.com/d3/d3/blob/master/API.md)
* [How Selections Work](https://bost.ocks.org/mike/selection/)
* General Update Pattern [I](https://bl.ocks.org/mbostock/3808218), [II](https://bl.ocks.org/mbostock/3808221), and [III](https://bl.ocks.org/mbostock/3808234)
* [Nested Selections](https://bost.ocks.org/mike/nest/)
* [Thinking with Joins](https://bost.ocks.org/mike/join/)
* [Mister Nester](http://bl.ocks.org/shancarter/raw/4748131/)

### Useful Blocks

* [Mouse Enter/Exit](https://bl.ocks.org/mbostock/5247027)
* [Mouse Move](https://bl.ocks.org/mbostock/4198499)
* [Circle-Polygon Intersection](https://bl.ocks.org/mbostock/4218871)
* [Geometric Zooming](https://bl.ocks.org/mbostock/3680999)
* [Semantic Zooming](https://bl.ocks.org/mbostock/3680957)
* [Lab and HCL Color Spaces](https://bl.ocks.org/mbostock/3014589)

In addition, I have a series of lectures on D3 that you might find useful. These are intended for you to download and experiment with on your computer.

* [Web Programming, Javascript, SVG](https://vanderbilt.box.com/s/ffrsa8wy7kx3btf000oxkfjee5cxpav5)
* [D3: selection and transformation](https://vanderbilt.box.com/s/gvngrzplw9m7g2h51i9ocbqpo98f9ph0)
* [D3: the data join](https://vanderbilt.box.com/s/da6rxhggulrxue1vfj9g8kdvzjg742o9)
* [D3: scales](https://vanderbilt.box.com/s/yhvue3rujq6onehw1nwa9khct1uhteao)
* [D3: events and transitions](https://vanderbilt.box.com/s/dsuwqwg3lgjkk47cb6j3auj4sch0cwfm)
* [D3: odds and ends](https://vanderbilt.box.com/s/9frorw67d77gfegbmrkbkc023j6i9fqq)

## Machine Learning Libraries

* [TensorFlow](https://www.tensorflow.org/)
* [PyTorch](https://pytorch.org/) TensorFlow and PyTorch are the predominant deep learning libraries for Python. They allow one to build computation graphs (e.g. your network), loss functions, optimization methods, and some support for data management in training the model. They have similar learning curves.
* [Keras](https://github.com/keras-team/keras) Keras wraps a lot of the functionality in existing ML libraries, including TensorFlow, to make it easier for experimentation.
* [scikit-learn](https://scikit-learn.org/stable/) scikit-learn offers a whole host of ML techniques (classification, clustering, dimensionality reduction, etc..), but does not have support for training deep neural networks.

## Demos

Here are a set of web-enabled demos for some of the papers we will cover throughout the semester: 

* [InterAxis](http://va.gatech.edu/live-projects/interaxis/)
* [ConceptVector](http://conceptvector.org/#/concepts/7)
* [GAN Lab](https://poloclub.github.io/ganlab/)
* [Seq2SeqVis](http://seq2seq-vis.res.ibm.com/client/index.html?in=die%20l%C3%A4ngsten%20reisen%20fangen%20an%20,%20wenn%20es%20auf%20den%20stra%C3%9Fen%20dunkel%20wird%20.)
* [RNNBow](https://www.eecs.tufts.edu/~dcashm01/rnn_vis/d3_code/)
* [SeekAView](http://nyuvis.github.io/SeekAView/)
* [Word Embedding Vis](http://embvis.flovis.net/)

