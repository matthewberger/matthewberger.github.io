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

# CS 4247 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/spring2023">Overview</a>
  <a class='active' href="/teaching/vis/spring2023/syllabus">Syllabus</a>
  <a href="/teaching/vis/spring2023/schedule">Schedule</a>
  <a href="/teaching/vis/spring2023/assignments">Assignments</a>
  <a href="/teaching/vis/spring2023/resources">Resources</a>
</div>

---

<br>

# Syllabus

## Course Description

Suppose you were provided a dataset, say a table of numbers, and you were interested in performing a set of analyses on the data. For instance, you might be interested to know if there exists trends, correlations, or outliers in the data. How does one conduct data analysis? One way is to perform statistical analysis, in order to _test_ for these considerations. Yet statistical techniques might only tell a very small story about the data, for instance a single number and confidence bounds. Furthermore, performing some statistical analysis presumes that you know _what to test_. What if your analysis objectives are a bit fuzzy, and you cannot precisely state what you want to compute?

**Data visualization** is concerned with helping users make sense of data. Within the context of data analysis, visualization is useful as an **aid** for users in support of existing analyses, helping people be _more efficient_, and more quickly arriving at conclusions. But visualization can also be useful as a form of knowledge discovery, noticing _something_ that you never would have thought of were you to not visualize your data.

In this course you will learn how to create effective visualizations, those that are suited for an end user's goals. To create an effective visualization:
1. We first require an understanding of how to visually encode data. Many software packages, tools, and libraries exist that offer accessible abstractions for users to create a visualization. In this course, you will learn the fundamentals on how we map a data item to its graphical mark, what is ultimately drawn on the screen. In this way, you will have full control over how to design a visualization, without adhering to existing libraries that implicitly make design choices for you.
2. We secondly require an understanding of design decisions. Visualization design is all about the choices that we make on how we visually encode data. This can be quite daunting! How do we know we are making the best decisions? You will learn how an understanding of visual perception, coupled with the goals of the user, can help us narrow the decisions that we should make, to the point that the visualizations we create seem almost self-evident.

## Learning Objectives

The set of topics that you will learn are broken down into three main sections: **Developing Visualizations**, **Design Principles** and **Visualization Techniques**.

### Developing Visualizations

You will learn how to write code for authoring data visualizations. You will learn the following technologies:

* **JavaScript.** The programming language for development.
* **SVG.** Our visual vocabulary, how we will create graphics.
* **D3.** How we will create data-driven and interactive graphics.
* **Observable notebooks.** Our development environment.

These technologies can go pretty deep - you will only need to learn what is necessary for visualization development.

### Design Principles

As you will quickly learn, visualization design is all about choices. A working knowledge of **design principles** will help you make _good_ choices, those that are optimized for human perception, and the goals that the user has in mind when using a visualization.

* **Data.** Formalizing data in terms of types and distribution, as well as data operations such as grouping, aggregating, and binning.
* **Graphical Marks and Visual Encodings.** Symbolizing data items with points, bars, lines, areas and composite marks. Visual channels used to encode data attributes, such as position, size, color, orientation.
* **Perception.** Gestalt laws, pre-attentive processing, effectiveness of visual encodings, ensemble coding.
* **Color.** Color theory, color spaces, designing visualizations with color.
* **Spatial Arrangements.** Layout choices, stacking, layered visualizations, small multiples, designing for multiple views.
* **Interactions.** View manipulation, selection, overview+detail, multiple coordinated views.
* **Tasks.** Objectives to satisfy, and design decisions that support these objectives.
* **Evaluation.** How do we know we have designed a good visualization?

### Visualization Techniques

As visualization design is all about choices, we need to know what choices are available to us. Some of these choices are rather straightforward (e.g. a scatterplot), but others are specific to certain types of data (e.g. a graph). Thus, you will learn about **visualization techniques**.

* **Geographic data.** Projections, cartograms, origin-destination flows.
* **Hierarchical data.** Treemaps, node-link diagrams.
* **Graph data.** Layered graph drawing, force-directed graph drawing, optimization techniques for drawing graphs.
* **High-dimensional data.** Dimensionality reduction: PCA, Isomap, tSNE, UMAP, interactively steering computation.
* **Uncertainty visualization.** Visual probabilistic queries, visualizing uncertainty in geographic data.
* **Spatially-referenced data.** Scalar, vector, and tensor field visualization techniques.

## Prerequisites

CS 3250/3251, MATH 2410 or 2501 or 2600, MATH 2810 or 2820

More specifically, data visualization is inherently an interdisciplinary field, as it relies on understanding the data at hand. That said, having a good understanding of data structures and algorithm design should enable you to (1) grasp the types of data we will work with, and (2) how to approach implementing visualization algorithms.

Now, another important aspect of visualization is _space_. Space is utilized in a myriad of ways in constructing data visualization. So you should be familiar with 2D geometric computing, as would be covered in linear algebra, in order to work with spatial transformations, scales, distances, and shapes. We will cover these basics throughout the course.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

Office: Sony building, Rm 4028

Office hours: Mondays & Thursdays 2pm-3pm

## Teaching Assistant

Jiacheng Wang

email: <a href="mailto:jiacheng.wang.1@vanderbilt.edu">jiacheng.wang.1@vanderbilt.edu</a><br>

Office: TBA

TA office hours: TBA

## Course Format

The course will consist of lectures, a set of programming assignments, a set of design critiques, and a final exam.

The lectures will typically be of two formats, what I call _theory_ and _practice_. In the theory portions of lectures, I will discuss the basic concepts behind visualization; e.g. data representations, perceptual principles, design guidelines, and visualization techniques. The practice portions of lectures will complement the theory by covering _how_ to actually implement the ideas that are discussed. The practice format will largely be focused on the details of D3, discussing how to use D3 for particular purposes, accompanied by sets of examples.

The lectures will draw from the textbooks mentioned below, as well as research papers.

Programming assignments will allow you to practice the implementation of visualization designs and techniques that will be covered during lectures.

Design critiques will provide you with practice in analyzing existing visualization designs. What makes a given visualization effective, or ineffective? How would you redesign a visualization to better address a set of user objectives? Having a critical eye is essential in ensuring that you make good design choices.

The final exam is meant to test your knowledge on everything that is covered during lectures, with an emphasis on design principles and techniques.

## Textbooks

### Required

[Visualization Analysis and Design](https://www.amazon.com/Visualization-Analysis-Design-AK-Peters/dp/1466508914) by [Tamara Munzner](http://www.cs.ubc.ca/~tmm/). This book will serve as the core for discussing visualization _principles_ and _techniques_. Copies have been reserved in the book store; if not available, you can always purchase it online.

### Optional

[Design for Information](https://www.amazon.com/Design-Information-Introduction-Histories-Visualizations/dp/1592538061) by [Isabel Meirelles](http://isabelmeirelles.com). This book covers the basic principles in how to design visualizations for a variety of data types, along with abundant examples.

[Making Data Visual](https://www.amazon.com/Making-Data-Visual-Practical-Visualization/dp/1491928468) by [Danyel Fisher](https://danyelfisher.info/) and [Miriah Meyer](https://www.cs.utah.edu/~miriah/). This book covers the _why_ behind visualizing data, namely, how do tasks drive our decisions in designing visualizations.

## Lectures

MWF, 11:15am-12:05pm, Featheringill Hall 129

## Lecture Slides

See [schedule](/teaching/vis/spring2023/schedule).

## Assignments

See [assignments](/teaching/vis/spring2023/assignments).

Assignments will be posted and introduced during class, and will be due at 11:59:59pm on their respective due dates. You will use Observable notebooks to complete programming assignments, and Brightspace will be used for submission of assignments. Please refer to [assignments](/teaching/vis/spring2023/assignments) for more information.

## Resources

See [resources](/teaching/vis/spring2023/resources).

### A note on Observable notebooks

Observable notebooks will serve as the main programming environment for the course, and how you will complete assignments. But more than that, Observable notebooks foster **interactivity** and **collaboration**.

* You can edit code on-the-fly in a notebook, as well as _fork_ a lecture notebook and experiment with your own modifications. Assuming you are new to Javascript and D3, this form of interactive coding will allow you to be more engaged with learning the language/library.
* You can _share_ your fork with me, or the TA, if you have any questions.
* If you have questions on programming assignments, you may also _share_ your assignment with me / TA, and we can discuss through email, or during office hours (preferably the latter).

See further details on Observable notebooks in [assignments](/teaching/vis/spring2023/assignments), as well as [resources](/teaching/vis/spring2023/resources). We will also cover the basics of Observable during lectures.

## Assessment

* Programming Assignments: 55%
* Design Critiques: 25%
* Final Exam : 15%
* Class Participation: 5%

## Grades

Your final grade will be numeric, and will be converted into a letter grade via the following (upper bounds are exclusive):

* 97+ : A+
* 94-97 : A
* 90-94 : A-
* 87-90 : B+
* 84-87 : B
* 80-84 : B-
* 77-80 : C+
* 74-77 : C
* 70-74 : C-
* 67-70 : D+
* 64-67 : D
* 60-64 : D-
* < 60 : F

### Late Submission Policy

If an assignment is not submitted on its due date, it may still be submitted within the proceeding 24 hours, but the submission will receive a 15% penality. Beyond 24 hours, no credit for assignments will be given. Exceptions might be made depending on health status of students throughout the semester.

### Regrading Policy

If you have disagreements with respect to grading of assignments, you will have **one week** after having received it to dispute the grade. You may submit a written request for a reassessment, and I will then review the request, determine whether or not to regrade the assignment, and perform the reassessment within one week of receiving the request.

## Department and University Academic Policies

### Academic Honesty

Students should adhere to the [Vanderbilt Honor System](https://www.vanderbilt.edu/student_handbook/the-honor-system/). Cheating or plagiarizing will not be tolerated in this course.

* Do not copy, in any way, another student's work when it comes to programming assignments.
* There are many D3 resources on the web, and you may be tempted to use some of this code to complete your programming assignments. I strongly discourage this, as you will not intellectually benefit from copying/pasting code on the web. Having said that, if you decide to use pieces of code from external resources, **cite it**. If you do not, then I will treat this as plagiarism.

### Academic Integrity

More generally, students should act in accordance with the academic integrity policies of the university, please see [Vanderbilt's Academic Integrity](https://www.vanderbilt.edu/studentaccountability/academic-integrity) for more information.

### Privacy

All student data and information will be protected under FERPA laws. Please refer to the [Vanderbilt Student Privacy Statement](https://registrar.vanderbilt.edu/ferpa/vanderbilt-student-privacy-statement.php). Please take care to not disclose any private information during lectures and when submitting assignments.

### Nondiscrimination and Anti-Harassment

Vanderbilt is committed to an environment that is free of discrimination and harassment of any kind. There is **zero tolerance for discrimination/harassment of anyone based on the color of their skin, or the gender that they identify with.** If you are Black / African American and feel that you are the target of racial discrimination, please reach out to the [University Counseling Center](https://www.vanderbilt.edu/ucc/). If you feel that you are being harassed based on your identified gender, please reach out to [Project Safe](https://www.vanderbilt.edu/projectsafe/).

## Subject to Change Statement

Information contained in the course syllabus, other than the general assessment, may be subject to change with advance notice, at the discretion of the instructor.
