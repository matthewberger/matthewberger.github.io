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
  <a href="/teaching/vis/fall2020">Overview</a>
  <a class='active' href="/teaching/vis/fall2020/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2020/schedule">Schedule</a>
  <a href="/teaching/vis/fall2020/assignments">Assignments</a>
  <a href="/teaching/vis/fall2020/project">Project</a>
  <a href="/teaching/vis/fall2020/resources">Resources</a>
</div>

---

<br>

# Syllabus

## Course Description

Suppose you were provided a dataset, say a table of numbers, and you were interested in performing a set of analyses on the data. For instance, you might be interested to know if there exists trends, correlations, or outliers in the data. How does one conduct data analysis? One way is to perform statistical analysis, in order to _test_ for these considerations. Yet statistical techniques might only tell a very small story about the data, for instance a single number and confidence bounds. How can we gain further insight about our data? A naive way is to look at the raw data directly, for instance in your favorite spreadsheet application. Certainly this will provide us with more detail, but is this useful for a higher-level understanding of the data?

**Data visualization** is concerned with the mapping of data into visual representations in order to support humans in gaining insight. In the above example, we considered one form of visualization, namely a tabular spreadsheet. Yet, there are other ways to visualize data that would more quickly lead to insight. For instance, we might map each data sample to a point, or summarize subsets of the data with bars. Certain visual representations are designed to leverage the human visual processing system for efficiently identifying patterns, and often these patterns reflect the analyses we care about. For instance, we might identify a correlation between two variables by plotting our data as a set of points, or identify an outlier by observing how a lone bar is really small or tall in a bar plot. This is the power of data visualization: the _efficient_ processing of visual representations that can amplify one's cognition for understanding data.

But when presented with a dataset, and a set of objectives we would like to address, how should one go about designing a visualization? What graphical marks should one choose? How should we customize the appearance of these marks? What is the set of operations that we should provide to the user so that they may interact with the visualization? The design space for creating visualizations is vast, especially as the complexity of the data increases. In this course, we are going to cover the fundamental aspects involved with effectively designing data visualizations.

## Objectives

The set of topics that you will learn are broken down into three main sections: **Developing Visualizations**, **Design Principles** and **Visualization Techniques**. These topics will be interspersed throughout the semester. 

### Developing Visualizations

You will learn how to write code for authoring data visualizations. You will learn the following technologies:

* JavaScript: the programming language for development
* SVG: our visual vocabulary, how we will create graphics
* D3: how we will create data-driven and interactive graphics
* Observable notebooks: our development environment

These technologies can go pretty deep - you will only need to learn what is necessary for visualization development.

### Design Principles

As you will quickly learn, visualization design is all about choices. A working knowledge of **design principles** will help you make _good_ choices, those that are optimized for human perception.

* Data: formalizing data in terms of types and distribution, as well as data operations such as grouping, aggregating, and binning.
* Graphical Marks and Visual Encodings: points, bars, lines, areas and composite marks, as well as spatial position, size, color, orientation
* Perception: Gestalt laws, pre-attentive processing, effectiveness of visual encodings, ensemble coding
* Color: color theory, color spaces, designing visualizations with color
* Spatial Arrangements: Cartesian layouts, radial layouts, layered visualizations, small multiples
* Interactions: view manipulation, selection, overview+detail, multiple coordinated views
* Tasks: objectives to satisfy, and design decisions that support these objectives
* Evaluation

### Visualization Techniques

As visualization design is all about choices, we need to know what choices are available to us! Some of these choices are rather straightforward (e.g. a scatterplot), but others are specific to certain types of data (e.g. a graph). Thus, you will learn about **visualization techniques**.

* Geographic data: projections, cartograms
* Graph data: graph layout techniques, adjacency matrices
* Hierarchical data: treemaps, node-link diagrams
* High-dimensional data: dimensionality reduction
* Uncertainty visualization
* Special topics

## Prerequisites

CS 2201 or CS 2204, CS 2212 or Math 2410

More specifically, data visualization is inherently an interdisciplinary research field, as it relies on understanding the data at hand. That said, having a good understanding of data structures should enable you to grasp the types of data we will work with.

Now, another important aspect of visualization is _space_. Space is utilized in a myriad of ways in constructing data visualization. So you should be familiar with 2D geometric computing, as would be covered in linear algebra, in order to work with spatial transformations, scales, distances, and shapes. We will cover these basics throughout the course.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

remote office hours: TR 2:00-3:00, via Zoom (link to be sent)

## Teaching Assistant

Ava Zhao

email: <a href="mailto:yayan.zhao@vanderbilt.edu">yayan.zhao@vanderbilt.edu</a><br>

remote TA office hours: TBA

## Discussion

We will use Brightspace for any discussion related to the course: questions on lecture content, programming assignments, etc..

## Course Format

The course will consist of lectures, a set of programming assignments, a set of written assignments, a project, a final exam.

The lectures will typically be of two formats, what I call _theory_ and _practice_. In the theory portions of lectures, I will discuss the basic concepts behind visualization; e.g. data representations, perceptual principles, design guidelines, and visualization techniques. The practice portions of lectures will complement the theory by covering _how_ to actually implement the ideas that are discussed. The practice format will largely be focused on the details of D3, discussing how to use D3 for particular purposes, accompanied by sets of examples.

The lectures will draw from the textbooks mentioned below, as well as research papers.

Programming assignments will allow you to practice the implementation of visualization designs and techniques that will be covered during lectures.

Written assignments will provide you with practice in analyzing existing visualization designs - formalizing design decisions, and performing design critiques.

There will, further, be a project associated with the course, towards the latter half of the semester. You will work in teams of size **2-3**. For the project, you will be expected to complete a design study: for a given dataset, you will create a set of objectives that comprise what you would like to learn about the data, a set of tasks that address these objectives, and design a visualization built around these tasks. More information is available on [project](/teaching/vis/fall2020/project).

The final exam is meant to test your knowledge on everything that is covered during lectures, with an emphasis on design principles and techniques.

## Textbooks

### Required

[Visualization Analysis and Design](https://www.amazon.com/Visualization-Analysis-Design-AK-Peters/dp/1466508914) by [Tamara Munzner](http://www.cs.ubc.ca/~tmm/). This book will serve as the core for discussing visualization _principles_ and _techniques_. Copies have been reserved in the book store; if not available, you can always purchase it online.

### Strongly Recommended

[Interactive Data Visualization for the Web](https://www.amazon.com/gp/product/1491921285) by [Scott Murray](http://alignedleft.com/). This book covers the basics behind D3, and its purpose is to get you to understand _how to code_ data visualizations. If you are already familiar with D3, or are comfortable using the myriad of D3 resources on the web (see [Resources](/teaching/vis/fall2020/resources)), then you might not find this book necessary, otherwise I strongly recommend picking it up.

### Optional

[Design for Information](https://www.amazon.com/Design-Information-Introduction-Histories-Visualizations/dp/1592538061) by [Isabel Meirelles](http://isabelmeirelles.com). This book covers the basic principles in how to design visualizations for a variety of data types, along with abundant examples.

[Making Data Visual](https://www.amazon.com/Making-Data-Visual-Practical-Visualization/dp/1491928468) by [Danyel Fisher](https://danyelfisher.info/) and [Miriah Meyer](https://www.cs.utah.edu/~miriah/). This book covers the _why_ behind visualizing data, namely, how do tasks drive our decisions in designing visualizations.

## Lectures

MWF, 3:00-3:50, 258 Featheringill Hall

## Lecture Slides

See [schedule](/teaching/vis/fall2020/schedule).

## Assignments

See [assignments](/teaching/vis/fall2020/assignments).

Assignments will be posted and introduced during class, and will be due at 11:59:59pm on their respective due dates. You will use Observable notebooks to complete assignments - programming and written - and Brightspace will be used to submit assignments. Please refer to [assignments](/teaching/vis/fall2020/assignments) for more information.

For most programming assignments, graduate students will be expected to complete more advanced topics, which will typically serve as extra credit for undergraduates.

## Resources

See [resources](/teaching/vis/fall2020/resources).

## Assessment

* Programming Assignments: 50%
* Written Assignments: 10%
* Project: 25%
* Final Exam : 10%
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

If an assignment is not submitted on its due date, it may still be submitted within the proceeding 24 hours, but the submission will receive a 15% penality. Beyond 24 hours, no credit for assignments will be given. Exceptions will be made depending on health/safety of students throughout the semester (see **Pandemic Policies** below).

### Regrading Policy

If you have disagreements with respect to grading of assignments, exams, or the project, you will have **one week** after having received it to dispute the grade. You may submit a written request for a reassessment, and I will then review the request, determine whether or not to regrade the assignment/exam/project, and perform the reassessment within one week of receiving the request.

## Pandemic Policies and Guidance

The Covid-19 pandemic will necessitate a different way to administer the course.

### Classroom Restrictions

Up to **10 students** may attend any given lecture. All other students may attend, synchronously, via a remote connection. Lectures will be broadcast live, as well as recorded so that you may view the lecture afterwards. The students that physically attend lectures will be partitioned into groups that will _not change_ throughout the semester. This is strictly out of safety considerations, to help contain the potential spread of disease. **Note**: up through the add/drop deadline, this policy will be more ad-hoc as students add/drop the course, so, expect the first couple weeks to be a bit rocky.

For students that attend class in-person, it is necessary to wear a facial covering at all times. Furthermore, students will be expected to be at least 6 feet apart from all other students and myself.

If you have tested positive for Covid-19, then you should not attend class. If you come down with symptoms associated with Covid-19, and you have not yet been tested or awaiting test results, then you should not attend class.

If I test positive for the virus, or come down with symptoms, then I will not attend class. Instead, lectures will be held remotely. If my illness prevents me from holding lectures remotely, then substitute/guest instructors will hold lectures instead.

If you come down with the virus, and are unable to keep up with progress, then please let me know. We will coordinate a schedule that will enable you to be successful in this course. Your health takes priority over this course, so do not feel that you need to "push through" this course if you are feeling unwell.

### Observable Notebooks 

Due to the hybrid style of instruction, most of the time, any given student will not be physically present in class. Furthermore, out of health considerations, office hours will not be physically held, but rather, held remotely.

These challenges are the main reason why Observable notebooks will be used for the course. Observable notebooks foster **interactivity** and **collaboration**.

* You can edit code on-the-fly in a notebook, as well as _fork_ a lecture notebook and experiment with your own modifications. Assuming you are new to Javascript and D3, this form of interactive coding will allow you to be more engaged with learning the language/library.
* You can _share_ your fork with me, or the TA, if you have any questions.
* If you have questions on programming assignments, you may also _share_ your assignment with me / TA, and we can discuss through email, or during office hours (preferably the latter).

See further details on Observable notebooks in [assignments](/teaching/vis/fall2020/assignments), as well as [resources](/teaching/vis/fall2020/resources). We will also cover the basics of Observable during lectures.

### Mental Health During a Pandemic

These are strange times, and it is tempting to resist the myriad of changes in this course, your other courses, the university, your current way of living, and society as a whole. I think this type of resistance, however, often leads to anxiety and fear. These are bad mental states, and ultimately, they are not productive. So, rather than resist the current situation, I recommend _leaning into it_. Know that you are not alone, **everybody** is experiencing these changes throughout the world. I think this awareness is helpful for maintaining a balance of calmness and alertness that will support you, day-to-day (including in this class).

If you do begin to experience anxiety regarding the pandemic, however, there is plenty of support available at the university: the [Center for Student Wellbeing](https://www.vanderbilt.edu/healthydores/), [University Counseling Center](https://www.vanderbilt.edu/ucc/), and [Student Health Center](https://www.vumc.org/student-health/). I encourage you to take advantage of these resources.

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
