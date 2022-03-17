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

# CS 6362 - Advanced Machine Learning

---

<div class='topnav'>
  <a href="/teaching/aml/fall2021">Overview</a>
  <a class='active' href="/teaching/aml/fall2021/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2021/schedule">Schedule</a>
  <a href="/teaching/aml/fall2021/assignments">Assignments</a>
  <a href="/teaching/aml/fall2021/project">Project</a>
</div>

---

<br>

# Syllabus

## Course Description

This is a course on machine learning, covering the fundamentals of learning, as well as different scenarios in which models are learned and ultimately used. As such, the course is split into two main parts.

### Learning Fundamentals

In the first half of the course we will study fundamental topics in machine learning under the lens of Gaussian Processes. Specifically, the topics that we will cover include, but are not limited to:

* Gaussian Process regression
* Gaussian Process classification
* Model selection
* Approximate inference for large-scale data
* Covariance function design and analysis
* Learning theory

Gaussian Processes are a useful class of models for learning, as they are nonparametric, admit tractable if not analytical solutions, easily allow the user to incorporate domain knowledge, and are inherently equipped with a notion of uncertainty.

### Learning Scenarios

In the second half of the course we will cover different types of learning scenarios:

* Multi-task learning
* Domain adaptation
* Online learning
* Active learning
* Few-shot (and zero-shot) learning

As machine learning is becoming pervasive in society, the ways in which models are trained, or used, are increasingly deviating from more traditional learning scenarios, where we do not have "clean" training/testing setups. The topics above are concerned with these situations.

## Learning Objectives

It is expected that you will learn the following by taking this course:

* How to analyze, formulate, and optimize nonparametric probabilistic models for a variety of learning tasks.
* How to approach different types of learning scenarios, distinguished by data distribution, and data availability.
* How to implement learning algorithms for practical situations, e.g. large datasets, high dimensionality.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

office hours: TR 2:00-3:00, FGH 379 or through Zoom

## Lectures

MW 8:45-10:00am, FGH 129

## Course Format

This course is lecture-based. I will primarily use the whiteboard to deliver lectures, occasionally mixed with slides for graphical depiction of concepts.

We will use the following textbook for the course:

[Gaussian Processes for Machine Learning](http://www.gaussianprocess.org/gpml/)

Further, we will use research papers as they pertain to Gaussian Processes, as well as the various learning scenarios we will study.

### Assignments

You will be expected to complete written assignments and programming assignments throughout the semester.

Written assignments will test your knowledge on the fundamentals that we cover in class.

Programming assignments are designed to put these fundamentals to practice. Specifically, you will build out a library for learning with Gaussian Process for regression and classification, a means of performing model selection, and approximate inference schemes for large-scale data. You will then purpose this library for the learning scenarios we cover in the second half of the course.

### Project

The latter half of the semester will be devoted to a research project. You will form a team of two, propose a project, submit a report halfway through to demonstrate current progress, and finally present your project to the class at the end of the semester. Please see the [project section](/teaching/aml/fall2021/project) of the course for more details.

## Course Assessment

* Assignments: 50%
* Mid-term: 15%
* Project: 30%
	* Proposal: 10%
	* Midway Report: 5%
	* Presentation: 5%
	* Full Submission: 10%
* Class Participation: 5%

## Prerequisites

It is expected that you have taken an introductory course in machine learning. Furthermore, it is expected that you have sufficient background in linear algebra, as well as probability and statistics. Multivariate distributions will be central objects of study in this course.

We will be using Python for programming assignments and for the project. Further, we will use the NumPy library, primarily for matrix computations, and it is expected that you have experience in using NumPy, e.g. working with multidimensional arrays, slicing, broadcasting, etc..

## Grades

Your final grade will be numeric, and will be converted into a letter grade via the following:

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

## Late Submission Policy

For all deadlines associated with the course, the late submission policy is as follows:

* One day late: 10% off
* Two days late: 20% off
* Past two days: no credit

The exception, here, is class presentation. You will be expected to present to the class two times throughout the semester, pertaining to your project. For each of these presentations, no credit will be given if you do not present in your alloted time.

## Covid-19 Policies and Guidance

### Classroom Restrictions

**Current as of August 12 2021**

In the classroom:
* If you are not vaccinated, then you must wear a mask, and you must be distanced at least 6 feet apart from other students and myself.
* If you are vaccinated, and not distanced at least 6 feet apart from other students and myself, then it is a requirement for you to wear a mask.
* This requirement pertains to myself as well: if I am unable to be distanced at least 6 feet apart from everyone else, then I will be wearing a mask.

If you have tested positive for Covid-19, then you should not attend class. If you come down with symptoms associated with Covid-19, and you have not yet been tested or awaiting test results, then you should not attend class.

If I test positive for the virus, or come down with symptoms, then I will not attend class. In these instances, lectures will be held remotely. If my illness prevents me from holding lectures remotely, then substitute/guest instructors will hold lectures instead.

If you come down with the virus, and are unable to keep up with progress, then please let me know. We will coordinate a schedule that will enable you to be successful in this course. Your health takes priority over this course, so do not feel that you need to "push through" this course if you are feeling unwell.

### Mental Health During Covid

If you begin to experience any kind of anxiety, please know there is plenty of support available at the university: the [Center for Student Wellbeing](https://www.vanderbilt.edu/healthydores/), [University Counseling Center](https://www.vanderbilt.edu/ucc/), and [Student Health Center](https://www.vumc.org/student-health/). I encourage you to take advantage of these resources.

## Department and University Academic Policies

### Academic Honesty

Studuents should adhere to the [Vanderbilt Honor System](https://www.vanderbilt.edu/student_handbook/the-honor-system/). Cheating or plagiarizing will not be tolerated in this course.

* Do not copy, in any way, another student's work when it comes to assignments.
* I expect you to work independently, and come up with your own solutions, for completing assignments. Grabbing solutions from the web, partial or full, to written assignments or programming assignments will be of minimal intellectual benefit.

### Academic Integrity

More generally, students should act in accordance with the academic integrity policies of the university, please see [Vanderbilt's Academic Integrity](https://www.vanderbilt.edu/studentaccountability/academic-integrity) for more information.

### Privacy

All student data and information will be protected under FERPA laws. Please refer to the [Vanderbilt Student Privacy Statement](https://registrar.vanderbilt.edu/ferpa/vanderbilt-student-privacy-statement.php). Please take care to not disclose any private information during lectures and when submitting assignments.

### Nondiscrimination and Anti-Harassment

Vanderbilt is committed to an environment that is free of discrimination and harassment of any kind. If you feel you are being sexually harassed, please see [Project Safe](https://www.vanderbilt.edu/projectsafe/). If you feel unsafe, taken advantage of in any way, or mentally/emotionally unwell, please reach out to the [Student Care Network](https://www.vanderbilt.edu/studentcarenetwork/).

## Subject to Change Statement

Information contained in the course syllabus, other than the general assessment, may be subject to change with advance notice, at the discretion of the instructor.
