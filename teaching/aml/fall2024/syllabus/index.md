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
  <a href="/teaching/aml/fall2024">Overview</a>
  <a class='active' href="/teaching/aml/fall2024/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2024/schedule">Schedule</a>
  <a href="/teaching/aml/fall2024/assignments">Assignments</a>
  <a href="/teaching/aml/fall2024/project">Project</a>
</div>

---

<br>

# Syllabus

## Course description

This is a course on machine learning that studies different types of learning scenarios. This "scenario" in which we learn is largely characterized by the following:

1. The specification of our model. Is our model linear? A neural network? This course is not too focused on the details of model design, e.g. we will not cover nuances of different flavors of neural networks. Rather, we assume a model (usually) has parameters that can be learned, it accepts something as input, it produces something as output.
2. The input we are provided for learning. How many data items are we provided? What is the data dimensionality? How many labeled examples do we have?
3. The output of a model. Are we making predictions about a given data item, or generating novel data? In the former case, are we performing regression, or classification?
4. What we expect as output by our learning method. Are we seeking the _best_ model? Or a _set_ of "good" models?

The course is focused on algorithms for learning, considering the different options we have about (1) specifying a model, (2) the input for learning, (3) the model's output, and (4) the learning method's output.

The first half of this course will cover fundamentals about optimization and inference. The second half of the course will then build on these concepts, and study different scenarios for supervised learning, generative models, and unsupervised learning more broadly.

## Fundamentals of optimization

We will first investigate algorithms for finding the _best_ model parameters, within the context of supervised learning.

**Stochastic gradient descent** will be emphasized, given its predominance in modern machine learning. We will first discuss what gradient descent is, why it works, and its limitations. We will then turn to stochastic gradient descent, and analyze it. As part of the discussion, we will review the necessary aspects of linear algebra, probability & statistics, and convexity for understanding gradient descent.

Once we have a good understanding of stochastic gradient descent, we will then study more specialized topics:

* Noise reduction methods
* Second-order methods
* Natural gradients
* Momentum
* And specific to neural networks, the neural tangent kernel

## Fundamentals of inference

We will next turn towards the scenario of finding a _set_ of models, rather than just one model. Specifically, we will be concerned with **Bayesian inference**, and forming the posterior distribution over model parameters.

We will first discuss the scenario in which the posterior distribution takes on a closed-form solution. In the process we will cover the following topics:

* Basics of Bayesian statistics
* Parametric models: "recipes" for Bayesian inference, working with Gaussians and friends
* Nonparametric models: Gaussian processes
* Model selection

Next, we will cover the more practical scenario whereby computing the posterior distribution is intractable. Here, we need to consider **approximate inference**:

* Laplace approximation
* Variational inference
* Markov chain Monte Carlo
* Neural network posteriors

## Supervised learning scenarios

We will next study supervised learning, organized by different data characteristics.

* Domain adaptation, and out-of-distribution detection
* Active learning
* Few-shot learning
* Semi-supervised learning

## Generation

Generative AI is seeing widespread use in society. As such, we will cover several basic approaches to generation.

* Variational autoencoders
* Normalizing flows
* Score matching
* Diffusion models

## Unsupervised learning

Last, we will discuss methods for unsupervised learning.

* Factor analysis methods
* Topic modeling
* Dimensionality reduction: tSNE, UMAP

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

Office: Sony building, Rm 4028

Office hours: TR 2:00-3:00

## Lectures

MW 3:35-4:50pm, FGH 129

## Course Format

This course is lecture-based. I will primarily deliver lectures through slides, and on occasion use the whiteboard. All slides will be posted to the website (see [schedule](/teaching/aml/fall2024/schedule)) in pdf and keynote format.

## Textbooks and reference material

This course draws from a number of machine learning references, namely books, review articles, as well as research papers. The [schedule](/teaching/aml/fall2024/schedule) will make mention of these references. The readings listed are intended to complement the lecture slides.

The references are organized by topic:

### Optimization

[Mathematics for Machine Learning](https://mml-book.github.io/) (**MdML**)

[Foundations of Machine Learning](https://cs.nyu.edu/~mohri/mlbook/) (**FML**)

[Optimization Methods for Large-Scale Machine Learning](https://epubs.siam.org/doi/10.1137/16M1080173) (**LSML**)

### Inference

[Probabilistic Machine Learning: An Introduction](https://probml.github.io/pml-book/book1.html) (**PML-1**)

[Probabilistic Machine Learning: Advanced Topics](https://probml.github.io/pml-book/book2.html) (**PML-2**)

[Gaussian Processes for Machine Learning](https://gaussianprocess.org/gpml/chapters/) (**GP**)

[Monte Carlo Gradient Estimation in Machine Learning](https://www.jmlr.org/papers/volume21/19-346/19-346.pdf) (**MCGE**)

## Assignments

You will be expected to complete programming assignments throughout the semester.

We will be using Python for programming assignments. Further, we will use the NumPy library, primarily for matrix computations, and it is expected that you have experience in using NumPy, e.g. working with multidimensional arrays, slicing, broadcasting, etc.. Where relevant, we will also use the [JAX](https://github.com/google/jax) library, primarily for automatic differentiation.

## Quizzes

Throughout the semester, you will be expected to complete brief (15 - 20 minute) **quizzes**, consisting of 1 - 2 questions relevant to the topic of discussion for that lecture, and/or previous lectures. These will be pop quizzes, distributed randomly over the semester. They will be completed at the end of class.

Quizzes are closed book, closed phone, closed ... any device. Please bring a pen/pencil with you to class, so you are prepared.

If you do not attend class when a quiz occurs, _or_, you are at least 25 minutes late for class, then you will receive **zero credit** for the quiz. Exceptions will be made on a case-by-case basis, for instance medical absence.

Your lowest-graded quiz will be dropped from the course assessment.

## Project

The latter half of the semester will be devoted to a research project. You will form a team of 1-2 members, propose a project, submit a report halfway through to demonstrate current progress, and finally present your project to the class at the end of the semester. Please see the [project section](/teaching/aml/fall2024/project) of the course for more details.

## Course Assessment

* Assignments: 45%
* Mid-term: 10%
* Quizzes: 10%
* Project: 30%
	* Proposal: 10%
	* Midway Report: 5%
	* Presentation: 5%
	* Full Submission: 10%
* Class Participation: 5%

## Prerequisites

It is expected that you have taken an introductory course in machine learning. Furthermore, it is expected that you have sufficient background in linear algebra, as well as probability and statistics.

We will cover relevant mathematical background over the course of the semester. What is covered in class should be treated as necessary, but not always sufficient. For any mathematical material that is not covered, it is your responsibility to fill in potential gaps.

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

Do not copy, in any way, another student's work when it comes to assignments.

### Use of LLMs for completing assignments

If you wish to use large language models (LLMs) to complete assignments, then this is acceptable, so long as you adhere to the following policies:

1. Acknowledge what specific LLM was used.
2. Distinguish your own work in completing the assignment from what was produced by the LLM.
3. Provide the prompt that was given to the LLM.

Your choice to use an LLM ultimately depends on what you want to get out of the course. The process of creation, e.g. figuring out a derivation, implementing an algorithm from scratch, is one of the best ways to learn. Using an LLM to create for you will, likely, limit what you learn in this course.

### Academic Integrity

More generally, students should act in accordance with the academic integrity policies of the university, please see [Vanderbilt's Academic Integrity](https://www.vanderbilt.edu/studentaccountability/academic-integrity) for more information.

### Privacy

All student data and information will be protected under FERPA laws. Please refer to the [Vanderbilt Student Privacy Statement](https://registrar.vanderbilt.edu/ferpa/vanderbilt-student-privacy-statement.php). Please take care to not disclose any private information during lectures and when submitting assignments.

### Nondiscrimination and Anti-Harassment

Vanderbilt is committed to an environment that is free of discrimination and harassment of any kind. If you feel you are being sexually harassed, please see [Project Safe](https://www.vanderbilt.edu/projectsafe/). If you feel unsafe, taken advantage of in any way, or mentally/emotionally unwell, please reach out to the [Student Care Network](https://www.vanderbilt.edu/studentcarenetwork/).

## Subject to Change Statement

Information contained in the course syllabus, other than the general assessment, may be subject to change with advance notice, at the discretion of the instructor.
