---
layout: default
title: Assignment 4
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

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
  });
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML"></script>

# CS 6362 - Advanced Machine Learning

---

<div class='topnav'>
  <a href="/teaching/aml/fall2021">Overview</a>
  <a href="/teaching/aml/fall2021/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2021/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2021/assignments">Assignments</a>
  <a href="/teaching/aml/fall2021/project">Project</a>
</div>

---

<br>

# Assignment 4

In this assignment you will implement sparse, variational Gaussian processes for regression. Please [go here](https://vanderbilt.box.com/s/u7gyuimpahypkjttndimlshbyxt3erp6) for data, and starter code.

## Data

The task for this assignment is to build a regression model for predicting housing prices.

The data you are provided consists of a set of features describing houses that are for sale. Namely, the attributes consist of:
* Number of bedrooms, number of bathrooms, number of floors
* Size of the house, and the lot it resides on
* The condition, and grade, of the house - view this as ordinal
* Year built, and where appropriate, year renovated
* Geographic coordinates

The housing prices themselves are in units of 100,000.

## A kernel for a house (20 points)

You should first setup a GP kernel for the housing data.

You may wish to use a squared-exponential kernel, or a dot-product kernel, depending on the attribute. You may also wish to exclude certain attributes that you do not think would be useful. You are free to make appropriate decisions as you see fit.

Critical to the kernel are hyperparameters. For this assignment, you will manually select hyperparameters. You will find that this is likely not easy. The next assignment will directly address this problem. But for now, you should settle on a set of hyperparameters. You may find it easier to select hyperparameters by inspecting the statistics of the individual fields, e.g. mean, standard deviation, min, max.

## Sparse, Variational GP (60 points)

You will implement a sparse GP using the variational approximation, as detailed in [Titsias](http://proceedings.mlr.press/v5/titsias09a/titsias09a.pdf) and [Hensman et al.](https://arxiv.org/pdf/1309.6835.pdf), and covered in class. This requires the following:
* Computing the variational distribution, given a set of inducing variables. _For now_, you should randomly sample points in the training input to serve as inducing variables.
* Computing the log marginal likelihood. This involves (1) the goodness-of-fit term, (2) the model complexity term, and (3) the trace term, unique to the variational approach. Your approach should be **scalable** with respect to the number of examples in the training data -- as in Assignment 3, the Woodbury matrix lemma will be useful here, as well as its closely related counterpart for efficiently computing determinants.
* Make predictions.

## Analysis (20 points)

For a set of hyperparameters that you have decided on, you should run experiments to see the effect of the sparse GP. Namely, you should put together a written document that covers the following:
* How you designed your kernel, and its hyperparameters, justifying your decisions.
* Report on, both, the accuracy of the model expressed as root mean squared error (see the test data), as well as the log marginal likelihood, as a function of both:
	* The number of input samples. Here, you may wish to vary the number of samples that you take from the input (`X_train` and `y_train`).
	* The number of inducing variables.

You may wish to report these results in tables, or optionally a heatmap. The choice is up to you, but your analysis should allow us to see the gains in the sparse approach, when we see diminishing returns, as well as the relationship between test error and the marginal likelihood.
