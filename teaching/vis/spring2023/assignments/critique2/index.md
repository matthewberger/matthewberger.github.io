---
layout: default
title: Assignments
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

# CS 4247 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/spring2023">Overview</a>
  <a href="/teaching/vis/spring2023/syllabus">Syllabus</a>
  <a href="/teaching/vis/spring2023/schedule">Schedule</a>
  <a class='active' href="/teaching/vis/spring2023/assignments">Assignments</a>
  <a href="/teaching/vis/spring2023/resources">Resources</a>
</div>

---

<br>

# Design Critique 2

In this assignment you will perform a critique of the following visualization:

{% include image.html url="/teaching/vis/spring2023/images/gdp-change.jpg" caption="Options" width=700 align="center" %}

This plot shows the **gross domestic product** (GDP) of different countries, measured in two ways:

1. What is reported by the country.
2. An estimate of the GDP by the brightness of a country's **night time lights** (NTL). This is based on an analysis of satellite imagery.

You may find the original article which this graphic supports [here](https://www.economist.com/graphic-detail/2022/09/29/a-study-of-lights-at-night-suggests-dictators-lie-about-economic-growth), based on a research article that you can find [here](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3093296). These links are provided for additional context; however it is not necessary to read these articles to complete the assignment.

In this visualization, a data item can be described by the following attributes, and associated attribute types:

1. Country name: nominal.
2. Level of freedom: ordinal.
3. GDP reported in 2021: quantitative.
4. GDP as estimated by NTL analysis in 2021: quantitative.
5. The percentage change in GDP from 2002 to 2021, as reported by the country: quantitative.
6. The percentage change in GDP from 2002 to 2021, as estimated from NTL in satellite images: quantitative.

## Visualization design

To start, provide a description of the visualization design for this plot. Break this down into:

1. What is the graphical mark used to symbolize a country? Hint: this is a **composite mark**.
2. For each attribute, identify the visual channel being used in the visual encoding. Describe what **part** of the mark the attribute is mapped to.

Please see the legend to help idenitify the visual encodings.

## Critique

Provide two reasons why this visualization is effective.

And provide two reasons why this visualization is ineffective.

In justifying why the visualization is effective/ineffective, you should consider the following:

1. The notion of (in-)effectiveness should be specific to a **task**. Consider task abstraction: different forms of _searching_ and _querying_ on <u>targets</u> within the visualization.
2. What part of the visualization design is your analysis based on? For instance, choice of graphical mark, the visual encoding of a particular attribute, etc..
3. You should consider perception as part of your argument. For instance, graphical perception, ensemble coding, pre-attentive processing, color design.

**Note**: please try to remain apolitical in your analysis. There is subjectivity involved in binning the "freedom" of a country into 3 levels. And approximating GDP via the brightness of cities has its own set of limitations.

## Redesign

Based on **one** of the reasons you have provided as to why this visualization is ineffective, propose a redesign.

Namely, give a specification of a visualization design: graphical marks, visual channels, and mappings from attributes to channels. If you like, you can _sketch_ out your design, if you think this would be more convincing than a description of the design. But sketching is optional.

Argue why this redesign would be an improvement on the **task** listed in your critique from above. Here, again, you should appeal to perceptual considerations as part of making your argument. Your redesign _does not_ need to use _all_ the attributes of the original data. You may choose a subset.

# Submission

You should submit your document (a Word doc is fine) to Brightspace.

# Grading Criteria

1. Visualization design specification: identification of graphical marks, visual channels, and mappings, in the original visualization. (30 points)
2. Critique: 2 reasons for effectiveness, 2 reasons for ineffectiveness. 10 points for each reason. (40 points total)
3. Redesign. (30 points)
	1. Description/sketch of your proposed visualization design. (15 points)
	2. Justification on why your redesign is an improvement for the task identified in your criticism. (15 points)
