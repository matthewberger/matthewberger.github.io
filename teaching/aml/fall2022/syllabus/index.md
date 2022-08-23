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
  <a href="/teaching/aml/fall2022">Overview</a>
  <a class='active' href="/teaching/aml/fall2022/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2022/schedule">Schedule</a>
  <a href="/teaching/aml/fall2022/assignments">Assignments</a>
  <a href="/teaching/aml/fall2022/project">Project</a>
</div>

---

<br>

# Syllabus

## Course Description

This is a course on machine learning that studies probabilistic approaches to problems of prediction, generation, and discovery.

The course can roughly be viewed as Bayesian Machine Learning. We will "be Bayesian" about most things, representing model parameters and model outputs with uncertainty. A central concern in this course is the matter of **inference**, which boils down to computing posterior distributions. We will incremently build up our "inference toolbox" throughout the semester, which itself can be split into three main sections:

### Introduction to Bayesian Regression and Classification

In the first part of the course, we will consider methods where we can, largely, perform inference exactly. This will serve as an introduction to Bayesian methods for machine learning, where we will cover the relevant probability, statistics, and linear algebra necessary for developing such methods. We will study parametric models, namely **linear** models, and nonparametric models, namely **Gaussian processes**. We will consider regression and classification problems, as well as model selection. And for classification problems, approximate inference methods will be introduced.

### Approximate Inference

For a variety of reasons, ranging from scalability concerns, to variables that are hidden from us, it is often necessary to perform **approximate inference**. We will study two main groups of inference schemes: **variational methods** and **Markov chain Monte Carlo**. Topics covered will include, but are not limited to:

* Variational inference: mean field approximations, variational Expectation-Maximization, stochastic variational inference
* Markov chain Monte Carlo: Metropolis Hastings, Gibbs sampling, Hamiltonian Monte Carlo, Langevin dynamics

### Applications

Last, we will investigate applications of Bayesian approaches to machine learning. Topics covered will include, but are not limited to:

* Sparse Gaussian processes
* Bayesian deep learning
* Active learning
* Variational autoencoders
* Normalizing flows

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

Office: Sony building, Rm 4028

Office hours: TR 2:00-3:00, in-person or through Zoom (see Brightspace for Zoom information)

I am happy to meet with students remotely during office hours. However, I view this as the exception rather than the rule. If you would like to meet with me on Zoom, then you will need to send me an email beforehand to arrange the meeting. Otherwise, I will not keep Zoom open during the course of office hours.

## Lectures

MW 3:35-4:50pm, FGH 129

## Teaching Assistant

Sangwon Jeong

email: <a href="mailto:sangwon.jeong@vanderbilt.edu">sangwon.jeong@vanderbilt.edu</a><br>

Office: Sony building, Rm 4018

TA office hours: MW 11am-12pm

## Course Format

This course is lecture-based. I will primarily deliver lectures through slides, and on occasion use the whiteboard. All slides will be posted to the website (see [schedule](/teaching/aml/fall2022/schedule) in pdf and keynote format.

We will primarily use Kevin Murphy's (updated) textbooks on Probabilistic Machine Learning:

[Probabilistic Machine Learning: An Introduction](https://vanderbilt.box.com/s/54uxzkdxxftv3sf0xp4un2pxzxya7umz)

[Probabilistic Machine Learning: Advanced Topics](https://vanderbilt.box.com/s/xggzo49hg5jo7lobu73ixbhw9t7i27xx)

For purposes of consistency, please use the above PDFs, rather than copies on Kevin Murphy's website. The Advanced Topics book is still in draft form, and thus occasionally updated.

For content more specific to Gaussian Processes, we will use the following textbook:

[Gaussian Processes for Machine Learning](https://gaussianprocess.org/gpml/chapters/)

Please note the following conventions I use for the [schedule](/teaching/aml/fall2022/schedule):

* When making reference to **Probabilistic Machine Learning: An Introduction**, I will use the abbreviation (PML-1).
* When making reference to **Probabilistic Machine Learning: Advanced Topics**, I will use the abbreviation (PML-2).
* When making reference to **Gaussian Processes for Machine Learning**, I will use the abbreviation (GPML).

In addition to the above textbooks, we will draw on research papers, as necessary.

### Assignments

You will be expected to complete written assignments and programming assignments throughout the semester.

Written assignments will test your knowledge on the fundamentals that we cover in class.

Programming assignments are designed to put these fundamentals to practice.

We will be using Python for programming assignments. Further, we will use the NumPy library, primarily for matrix computations, and it is expected that you have experience in using NumPy, e.g. working with multidimensional arrays, slicing, broadcasting, etc.. Where relevant, we will also use the [JAX](https://github.com/google/jax) library, primarily for automatic differentiation.

### Project

The latter half of the semester will be devoted to a research project. You will form a team of 1-2 members, propose a project, submit a report halfway through to demonstrate current progress, and finally present your project to the class at the end of the semester. Please see the [project section](/teaching/aml/fall2022/project) of the course for more details.

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

It is expected that you have taken an introductory course in machine learning. Furthermore, it is expected that you have sufficient background in linear algebra, as well as probability and statistics.

We will cover relevant mathematical background over the course of the semester. What is covered in class should be treated as necessary, but not always sufficient. For any mathematical material that is not covered, it is your responsibility to fill in potential gaps.

A good reference for linear algebra is in the introductory book for Probabilistic Machine Learning (PML-1), Ch. 7.

## Grades

Your final grade will be numeric, and converted into a letter grade via the following:

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

The exception, here, is class presentation. You will be expected to present to the class two times throughout the semester, pertaining to your project. For each of these presentations, no credit will be given if you do not present in your allotted time.

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
