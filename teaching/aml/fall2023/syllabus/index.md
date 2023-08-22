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
  <a href="/teaching/aml/fall2023">Overview</a>
  <a class='active' href="/teaching/aml/fall2023/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2023/schedule">Schedule</a>
  <a href="/teaching/aml/fall2023/assignments">Assignments</a>
  <a href="/teaching/aml/fall2023/project">Project</a>
</div>

---

<br>

# Syllabus

## Course description

This is a course on machine learning that studies probabilistic approaches to problems of prediction, generation, and discovery.

An emphasis of this course is **inference**: the modeling of uncertainty in our parameters. This is a different view from more traditional machine learning, where we might find it acceptable to compute a single point estimate for our model, e.g. what might be returned by an optimization method. Instead, inference is concerned with representing, and computing, a probability distribution over model parameters, conditioned on some data. This is also known as the **posterior distribution**. There are a number of benefits to this viewpoint: uncertainty quantification, more robust ways of making predictions, a means of comparing models, and methods for performing model selection.

The mathematical tools that underlie inference are foundational to understanding the problem formulations for many modern topics in machine learning. To have a good understanding of these algorithms requires a solid background in probability, statistics, linear algebra, and optimization. The intention of this course is to teach you these mathematical fundamentals, alongside machine learning algorithms, and in turn how to implement machine learning techniques, e.g. optimization and inference, using modern machine learning libraries.

To this end, the course is organized around 4 main sections:

## Prediction

We will start by covering prediction, or more traditional supervised machine learning. However we will take a Bayesian viewpoint, and along the way discuss some fundamentals that will appear throughout the course.

### Bayesian linear regression

* Bayesian statistics, and more broadly a review of probability, statistics, and linear algebra necessary for this course
* Parametric models: "recipes" for Bayesian inference, working with Gaussians and friends
* Nonparametric models: Gaussian processes
* Model selection

### Bayesian classification

* A primer on optimization, introduction to approximate inference
* Monte Carlo integration
* Binary and multinomial logistic regression
* Gaussian process classification

## Approximate inference

Exact inference is usually only possible in fairly limited settings. Thus we must turn to approximate inference for more complex problems. Arguably the two most common methods for approximate inference are variational inference, and Markov chain Monte Carlo.

### Variational inference

* A primer on information theory, the ELBO
* Mean-field approximation, coordinate ascent
* Mixture models and variational EM
* Gradient-based methods, stochastic variational inference
* Application: topic models

### Markov chain Monte Carlo

* Markov chains
* Metropolis-Hastings
* Gibbs sampling, sliced sampling
* Hamiltonian Monte Carlo

### Prediction topics

We will then turn to more specialized topics in wrapping up prediction.

* Scalable inference and learning in Gaussian processes
* Bayesian neural networks
* Domain adaptation
* Active learning

## Generation

Generative AI is seeing widespread use in society. As such, we will cover probabilistic approaches to generation.

### Variational autoencoders

* VAE basics
* Dealing with posterior collapse
* Vector-quantized VAE
* Disentangled representation learning

### Normalizing flows

* Fundamentals, applications
* Family of normalizing flow models, coupling layers
* Discrete-time flows
* Continuous-time flows

### Score matching

* Basics of energy-based models, MCMC approaches
* Basics of score matching
* Denoising score matching
* Sliced score matching

### Diffusion models

* Basics: Gaussian Markov chains, the variational lower bound
* Denoising diffusion probabilistic models, denoising diffusion implicit models
* Fun applications with conditional diffusion models

## Discovery

Last, we will discuss probabilistic approaches to discovery. These methods can roughly be categorized as latent variable models, where the discovered latents, hopefully, tell us something about the data we might not have known.

* Factor analysis basics: PCA, mixtures, GP-LVM
* Non-Gaussian priors
* Independent component analysis
* Multi-view factor anaysis

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

Office: Sony building, Rm 4028

Office hours: TR 2:00-3:00

## Lectures

MW 3:35-4:50pm, FGH 129

## Course Format

This course is lecture-based. I will primarily deliver lectures through slides, and on occasion use the whiteboard. All slides will be posted to the website (see [schedule](/teaching/aml/fall2023/schedule)) in pdf and keynote format.

We will primarily use Kevin Murphy's (updated) textbooks on Probabilistic Machine Learning:

[Probabilistic Machine Learning: An Introduction](https://vanderbilt.box.com/s/1mqd6fig2o3ntqbouzjqerezj6z9ei6b)

[Probabilistic Machine Learning: Advanced Topics](https://vanderbilt.box.com/s/zyn6044j1coy08y9wvp0w5efnv3pkw9g)

[Supplementary Material for Probabilistic Machine Learning: Advanced Topics](https://vanderbilt.box.com/s/hxyne4nl46cszhgl3gojzkt463w760fm)

For purposes of consistency, please use the above PDFs, rather than copies on Kevin Murphy's website. The books are periodically updated, so it is important that everyone is using the same books.

For content more specific to Gaussian Processes, we will use the following textbook:

[Gaussian Processes for Machine Learning](https://gaussianprocess.org/gpml/chapters/)

Please note the following conventions I use for the [schedule](/teaching/aml/fall2023/schedule):

* When making reference to **Probabilistic Machine Learning: An Introduction**, I will use the abbreviation (PML-1).
* When making reference to **Probabilistic Machine Learning: Advanced Topics**, I will use the abbreviation (PML-2).
* When making reference to **Supplementary Material for Probabilistic Machine Learning: Advanced Topics**, I will use the abbreviation (PML-2-supp).
* When making reference to **Gaussian Processes for Machine Learning**, I will use the abbreviation (GPML).

In addition to the above textbooks, we will draw on research papers, as necessary.

### Assignments

You will be expected to complete written assignments and programming assignments throughout the semester.

Written assignments will test your knowledge on the fundamentals that we cover in class.

Programming assignments are designed to put these fundamentals to practice.

We will be using Python for programming assignments. Further, we will use the NumPy library, primarily for matrix computations, and it is expected that you have experience in using NumPy, e.g. working with multidimensional arrays, slicing, broadcasting, etc.. Where relevant, we will also use the [JAX](https://github.com/google/jax) library, primarily for automatic differentiation.

### Project

The latter half of the semester will be devoted to a research project. You will form a team of 1-2 members, propose a project, submit a report halfway through to demonstrate current progress, and finally present your project to the class at the end of the semester. Please see the [project section](/teaching/aml/fall2023/project) of the course for more details.

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

A good reference for linear algebra is in the introductory book for Probabilistic Machine Learning (PML-1), Ch. 7. Even if you think you have a good background in linear algebra, I strongly recommend going through this chapter to refresh your knowledge.

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
