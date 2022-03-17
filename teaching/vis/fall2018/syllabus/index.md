---
layout: default
title: Syllabus
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

# CS 3891.06 / 5891.06 - Introduction to Visualization 

---

<div class='topnav'>
  <a href="/teaching/vis/fall2018">Overview</a>
  <a class='active' href="/teaching/vis/fall2018/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2018/schedule">Schedule</a>
  <a href="/teaching/vis/fall2018/assignments">Assignments</a>
  <a href="/teaching/vis/fall2018/project">Project</a>
  <a href="/teaching/vis/fall2018/resources">Resources</a>
</div>

---

<br>

# Syllabus

## Course Description

This course is all about visualizing data. At its core, data visualization is simply taking some set of data, and mapping it to a visual representation that is consumed in some way. We see data visualizations around us, all of the time. But how often do we think about how a visualization is conceived? As consumers of visualization, we tend to not think about the underlying foundations. This course is intended to get you to think more _systematically_ about visualization, so that you can determine why a visualization is _good_ or why it is _bad_, and to use this understanding when developing your own data visualizations.

## Objectives

The course will be broken down into two main sections: **Visualization Basics** and **Visualization Techniques**.

### Visualization Basics

In the first part of the course you will learn how to write code for developing data visualizations. You will learn the basics behind [D3](), a Javascript library for developing visualizations for the web, and how to use D3 to map data to a core set of visual encodings. Concurrently, you will also learn about the space of data types and visual marks that are used for visual encoding.

Knowing _how_ to visually encode data with D3 does not necessarily suggest _what_ should be shown. Thus, you will also learn about fundamental visualization properties: color theory, shape perception, preattentive processing, effectiveness of visual marks, user tasks, design, etc..

### Visualization Techniques

Equipped with an understanding of visualization basics, we will then delve into techniques. We will consider the following:

* Spatial arrangements: spatial layouts, small multiples
* Interaction: camera manipulation, transitions, linked views, brushing
* Time-series data: horizon maps, streamgraphs, sankey diagrams
* Hierarchical data: tree maps, sunburst
* Graph data: node-link diagrams, adjacency matrices, graph layout techniques
* High-dimensional data: parallel coordinates, scatterplot matrices, dimensionality reduction
* Text data: topic models, word embeddings
* Set data: containment, intersections
* Geospatial data: choropleth maps, density estimation
* Scalar data: color maps, contouring
* Vector data: glyphs, streamlines, image-based techniques

## Prerequisites

CS 2201 or CS 2204, CS 2212 or Math 2410

More specifically, data visualization is inherently an interdisciplinary research field, as it relies on understanding the data at hand. That said, having a good understanding of data structures should enable you to grasp the types of data we will work with.

Now, another important aspect of visualization is _space_. Space is utilized in a myriad of ways in constructing data visualization. So you should be familiar with 2D geometric computing, as would be covered in linear algebra, in order to work with spatial transformations, scales, distances, and shapes.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

office hours: MW 2:00-3:00, JH 379

### TA

Yubo Fan

email: <a href="mailto:yubo.fan@vanderbilt.edu">yubo.fan@vanderbilt.edu</a><br>

office hours: TH 2:00-3:00, JH 385

## Discussion

We will use Brightspace for any discussion related to the course: questions on lecture content, programming assignments, etc.. Brightspace will also be used for any announcements.

## Course Format

The course will consist of lectures, a set of programming assignments, and two exams: a mid-term and a final.

The lectures will draw from the textbooks mentioned below, as well as research papers. I expect _everyone_ to participate in the lectures, as you will be expected to interactively critique data visualizations during these times.

[D3](https://d3js.org/) will be the primary library that we will use for the programming assignments. If you are unfamiliar with web programming and Javascript, don't fret! We will cover the basics as part of the course.

The exams are meant to test your knowledge on everything that is covered during the lectures. The mid-term will cover material for the (roughly) first half of the course, and the final will cover the (roughly) second half, with some material from the first half thrown in for good measure.

Last but not least, there will be a project associated with the course. You will work in teams of size **2-3**. There will be two types of projects that you can choose from : a _technique project_ and a _design study project_. More information is available on [project](/teaching/vis/fall2018/project).

## Textbooks

### Required

[Visualization Analysis and Design](https://www.amazon.com/Visualization-Analysis-Design-AK-Peters/dp/1466508914/ref=sr_1_1?s=books&ie=UTF8&qid=1531694431&sr=1-1&keywords=visualization+analysis+and+design) by [Tamara Munzner](http://www.cs.ubc.ca/~tmm/). This book will serve as the core for discussing visualization _principles_ and _techniques_. Copies have been reserved in the book store; if not available, you can always purchase it online.

### Strongly Recommended

[Interactive Data Visualization for the Web](https://www.amazon.com/gp/product/1491921285/ref=as_li_qf_sp_asin_il_tl?ie=UTF8&tag=alignedleft0d-20&camp=1789&creative=9325&linkCode=as2&creativeASIN=1491921285&linkId=4cdde586d0adf0fe22931dc9f789cf3d) by [Scott Murray](http://alignedleft.com/). This book covers the basics behind D3, and its purpose is to get you to understand _how to code_ data visualizations. If your already familiar with D3, or are comfortable using the myriad of D3 resources on the web (see [Resources](/teaching/vis/fall2018/resources)), then you might not find this book necessary, otherwise I strongly recommend picking it up.

### Optional

[Visual Thinking for Design](https://www.amazon.com/Visual-Thinking-Kaufmann-Interactive-Technologies/dp/0123708966/ref=sr_1_1?s=books&ie=UTF8&qid=1531694531&sr=1-1&keywords=visual+thinking+for+design) by [Colin Ware](https://ccom.unh.edu/vislab/colin_ware.html). This book covers some basics behind _human perception_, and how this informs designing visualizations.

[Making Data Visual](https://www.amazon.com/Making-Data-Visual-Practical-Visualization/dp/1491928468) by [Danyel Fisher](https://danyelfisher.info/) and [Miriah Meyer](https://www.cs.utah.edu/~miriah/). This book covers the _why_ behind visualizing data, namely, how do tasks drive our decisions in designing visualizations.

## Lectures

MWF, 9:10-10:00, 129 Featheringill Hall

## Lecture Slides

See [schedule](/teaching/vis/fall2018/schedule).

## Assignments

See [assignments](/teaching/vis/fall2018/assignments).

Assignments will be posted at the beginning of class, and will be due at 11:59:59pm on their respective due dates. GitHub will be used to distribute assignments, and Brightspace will be used to submit assignments. _This means you will need to have a GitHub account registered with your Vanderbilt email_.

## Resources

See [resources](/teaching/vis/fall2018/resources).

## Assessment

* Programming Assignments: 40%
* Project: 35%
* Exams (mid-term and final combined): 20%
* Class Participation: 5%

### Late Submission Policy

If an assignment is not submitted on its due date, it may still be submitted within the proceeding 24 hours, but the submission will receive a 15% penality. Beyond 24 hours, no credit for assignments will be given. No exceptions.

### Regrading Policy

If you have disagreements with respect to grading of assignments, exams, or the project, you will have **one week** after having received it to dispute the grade. You may submit a written request for a reassessment, and I will then review the request, determine whether or not to regrade the assignment/exam/project, and perform the reassessment within one week of receiving the request.

## Department and University Academic Policies

### Academic Honesty

Studuents should adhere to the [Vanderbilt Honor System](https://www.vanderbilt.edu/student_handbook/the-honor-system/). Cheating or plagiarizing will not be tolerated in this course.

* Do not copy, in any way, another student's work when it comes to programming assignments.
* There are many D3 resources on the web, and you may be tempted to use some of this code to complete your programming assignments. I strongly discourage this, as you will not intellectually benefit from copying/pasting code on the web. Having said that, if you decide to use pieces of code from external resources, **cite it**. If you do not, then I will treat this as plagiarism.

### Academic Integrity

More generally, students should act in accordance with the academic integrity policies of the university, please see [Vanderbilt's Academic Integrity](https://www.vanderbilt.edu/studentaccountability/academic-integrity) for more information.

### Privacy

All student data and information will be protected under FERPA laws. Please refer to the [Vanderbilt Student Privacy Statement](https://registrar.vanderbilt.edu/ferpa/vanderbilt-student-privacy-statement.php). Please take care to not disclose any private information during lectures and when submitting assignments.

### Nondiscrimination and Anti-Harassment

Vanderbilt is committed to an environment that is free of discrimination and harassment of any kind. If you feel you are being sexually harassed, please see [Project Safe](https://www.vanderbilt.edu/projectsafe/). If you feel unsafe, taken advantage of in any way, or mentally/emotionally unwell, please reach out to the [Student Care Network](https://www.vanderbilt.edu/studentcarenetwork/).

## Subject to Change Statement

Information contained in the course syllabus, other than the general assessment, may be subject to change with advance notice, at the discretion of the instructor.

## Acknowledgements

The design of this course was influenced by other data visualization courses from [Alexander Lex](http://dataviscourse.net/2018/index.html), [Alvitta Ottley](https://classes.engineering.wustl.edu/cse557/spring2017/), [Hanspeter Pfister](http://www.cs171.org/2018/), and [Carlos Scheidegger](https://cscheid.net/courses/spr18/csc444/).
