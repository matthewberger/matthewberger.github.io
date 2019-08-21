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

# CS 3891.04 / 5891.04 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/fall2019">Overview</a>
  <a class='active' href="/teaching/vis/fall2019/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2019/schedule">Schedule</a>
  <a href="/teaching/vis/fall2019/assignments">Assignments</a>
  <a href="/teaching/vis/fall2019/project">Project</a>
  <a href="/teaching/vis/fall2019/resources">Resources</a>
</div>

---

<br>

# Syllabus

## Course Description

Suppose you were provided a dataset, say a table of numbers, and you were interested in performing a set of analyses on the data. For instance, you might be interested to know if there exists trends, correlations, or outliers in the data. How does one conduct data analysis? One way is to perform statistical analysis, in order to _test_ for these considerations. Yet statistical techniques might only tell a very small story about the data, for instance a single number and confidence bounds. How can we gain further insight about our data? A naive way is to look at the raw data directly, for instance in your favorite spreadsheet application. Certainly this will provide us with more detail, but is this useful for a higher-level understanding of the data?

**Data visualization** is concerned with the mapping of data into visual representations in order to support humans in gaining insight. In the above example, we considered one form of visualization, namely a tabular spreadsheet. Yet, there are other ways to visualize data that would more quickly lead to insight. For instance, we might map each data sample to a point, or summarize subsets of the data with bars. Certain visual representations are designed to leverage the human visual processing system for efficiently identifying patterns, and often these patterns reflect the analyses we care about. For instance, we might identify a correlation between two variables by plotting our data as a set of points, or identify an outlier by observing how a lone bar is really small or tall in a bar plot. This is the power of data visualization: the _efficient_ processing of visual representations that can amplify one's cognition for understanding data.

But when presented with a dataset, and a set of objectives we would like to address, how should one go about designing a visualization? What graphical marks should one choose? How should we customize the appearance of these marks? What is the set of operations that we should provide to the user so that they may interact with the visualization? The design space for creating visualizations is vast, especially as the complexity of the data increases. In this course, we are going to cover the fundamental aspects involved with effectively designing data visualizations.

## Objectives

The set of topics that you will learn are broken down into two main sections: **Visualization Basics** and **Visualization Techniques**.

### Visualization Basics

The first part of the course will be dedicated to the underpinnings of data visualization:

* Data: formalizing data in terms of types and distribution, as well as data operations such as grouping, aggregating, and binning.
* Graphical Marks and Visual Encodings: points, bars, lines, areas and composite marks, as well as spatial position, size, color, orientation
* Perception: effectiveness of visual encodings, Gestalt laws, pre-attentive processing
* Color: color theory, color spaces, designing visualizations with color
* Visualization Design: from goals to tasks, from tasks to visualization, design principles
* Spatial Arrangements: Cartesian layouts, radial layouts, layered visualizations, small multiples
* Interactions: view manipulation, selection, overview+detail, multiple coordinated views

The first part of the course will also focus on how to write code for designing data visualizations. You will learn the basics behind [D3](https://d3js.org/), a Javascript library for developing visualizations for the web, and how to use D3 to map data to a core set of graphical marks and visual encodings.

### Visualization Techniques

Equipped with an understanding of visualization basics, we will then delve into techniques. We will consider the following:

* Hierarchical data: treemaps, node-link diagrams
* Graph data: graph layout techniques, adjacency matrices
* Probability distributions: communicating uncertainty, violin plots, quantile dot plots
* Geographic data: projections, choropleth maps, density estimation
* High-dimensional data: dimensionality reduction
* Spatial data: scalar fields, vector fields
* Special topics

## Prerequisites

CS 2201 or CS 2204, CS 2212 or Math 2410

More specifically, data visualization is inherently an interdisciplinary research field, as it relies on understanding the data at hand. That said, having a good understanding of data structures should enable you to grasp the types of data we will work with.

Now, another important aspect of visualization is _space_. Space is utilized in a myriad of ways in constructing data visualization. So you should be familiar with 2D geometric computing, as would be covered in linear algebra, in order to work with spatial transformations, scales, distances, and shapes.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

office hours: TH 2:00-3:00, JH 379

## Discussion

We will use Brightspace for any discussion related to the course: questions on lecture content, programming assignments, etc..

## Course Format

The course will consist of lectures, a set of programming assignments, a project, and two exams: a mid-term and a final.

The lectures will typically be of two formats, what I call _theory_ and _practice_. In the theory portions of lectures, I will discuss the basic concepts behind visualization; e.g. data representations, perceptual principles, design guidelines, and visualization techniques. The practice portions of lectures will complement the theory by covering _how_ to actually implement the ideas that are discussed. The practice format will largely be focused on the details of D3, discussing how to use D3 for particular purposes, accompanied by sets of examples.

The lectures will draw from the textbooks mentioned below, as well as research papers. I expect _everyone_ to participate in the lectures, as you will be expected to assess data visualizations during these times.

[D3](https://d3js.org/) will be the primary library that we will use for the programming assignments. If you are unfamiliar with web programming and Javascript, don't fret! We will cover the basics as part of the course.

The exams are meant to test your knowledge on everything that is covered during the lectures. The mid-term will cover material for the (roughly) first half of the course, and the final will cover the (roughly) second half, with a small amount of material from the first half thrown in for good measure.

Last but not least, there will be a project associated with the course. You will work in teams of size **2-3**. For the project, you will be expected to complete a design study: for a given dataset, you will create a set of objectives that comprise what you would like to learn about the data, a set of tasks that address these objectives, and design a visualization built around these tasks. More information is available on [project](/teaching/vis/fall2019/project).

## Textbooks

### Required

[Visualization Analysis and Design](https://www.amazon.com/Visualization-Analysis-Design-AK-Peters/dp/1466508914) by [Tamara Munzner](http://www.cs.ubc.ca/~tmm/). This book will serve as the core for discussing visualization _principles_ and _techniques_. Copies have been reserved in the book store; if not available, you can always purchase it online.

### Strongly Recommended

[Interactive Data Visualization for the Web](https://www.amazon.com/gp/product/1491921285) by [Scott Murray](http://alignedleft.com/). This book covers the basics behind D3, and its purpose is to get you to understand _how to code_ data visualizations. If you are already familiar with D3, or are comfortable using the myriad of D3 resources on the web (see [Resources](/teaching/vis/fall2019/resources)), then you might not find this book necessary, otherwise I strongly recommend picking it up.

### Optional

[Design for Information](https://www.amazon.com/Design-Information-Introduction-Histories-Visualizations/dp/1592538061) by [Isabel Meirelles](http://isabelmeirelles.com). This book covers the basic principles in how to design visualizations for a variety of data types, along with abundant examples.

[Making Data Visual](https://www.amazon.com/Making-Data-Visual-Practical-Visualization/dp/1491928468) by [Danyel Fisher](https://danyelfisher.info/) and [Miriah Meyer](https://www.cs.utah.edu/~miriah/). This book covers the _why_ behind visualizing data, namely, how do tasks drive our decisions in designing visualizations.

## Lectures

MW, 2:10-3:25, 258 Featheringill Hall

## Lecture Slides

See [schedule](/teaching/vis/fall2019/schedule).

## Assignments

See [assignments](/teaching/vis/fall2019/assignments).

Assignments will be posted at the beginning of class, and will be due at 11:59:59pm on their respective due dates. GitHub will be used to distribute assignments, and Brightspace will be used to submit assignments.

## Resources

See [resources](/teaching/vis/fall2019/resources).

## Assessment

* Programming Assignments: 50%
* Project: 25%
* Exams (mid-term and final combined): 20%
* Class Participation: 5%

## Grades

Your final grade will be numeric, and will be converted into a letter grade via the following:

* 97-100 : A+
* 94-96 : A
* 90-93 : A-
* 87-89 : B+
* 84-86 : B
* 80-83 : B-
* 77-79 : C+
* 74-76 : C
* 70-73 : C-
* 67-69 : D+
* 64-66 : D
* 60-63 : D-
* < 60 : F

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
