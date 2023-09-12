---
layout: default
title: Assignment 2
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
  <a href="/teaching/aml/fall2023">Overview</a>
  <a href="/teaching/aml/fall2023/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2023/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2023/assignments">Assignments</a>
  <a href="/teaching/aml/fall2023/project">Project</a>
</div>

---

<br>

# Assignment 2

In this assignment you will be expected to implement standard Bayesian computations for performing Gaussian process regression, in addition to implementing empirical Bayes for model selection.

The code for this assignment can be [found here](https://vanderbilt.box.com/s/q13jjs8ou4up852m6z1ac62qghq6j3x6).

The assignment is structured into two parts.

# Part 1

For the first part of the assignment, you will be expected to implement a Gaussian process for 1D regression using a squared exponential kernel, and a Gaussian likelihood. Specifically, you should implement a squared exponential kernel, which has two associated hyperparameters: the length scale, and the signal variance. Moreover, a third hyperparameter, the noise variance, will need to be specified as part of the Gaussian likelihood.

You will then be expected to implement the following functionality:
1. Compute the posterior predictive mean, and variance, for a set of test inputs.
2. Draw from the posterior predictive distribution, limited to a set of test inputs.
3. Compute the log marginal likelihood. Note: this needs to be done in a numerically-stable way, see Implementation Tips below.
4. Compute the negative log likelihood on a given set of test inputs, using the posterior predictive mean and posterior predictive variance, evaluated on the corresponding targets for the test inputs. Note: this amounts to evaluating the negative log of a Gaussian whose mean parameter is the posterior predictive mean, but whose covariance is a diagonal matrix, with the posterior predictive variance on the diagonal, since test instances should be treated independent from one another.

Please see `regression.py` for the starting source code.

## Experiments

In the notebook named `exp1.ipynb`, you will run some experiments to evaluate your implementation.

Specifically, you will be provided 1D time-series data that corresponds to temperature measurements computed from a climate simulation. The time span ranges from 2006 - 2100, computed on a monthly basis; the measurements are taken near the southwestern part of Florida. The training and test data are random splits of this time-series data, with measurements split up uniformly-at-random. For simplicity, time is measured in integer increments, so a value of 1 indicates a single month.

Using the accompanying plotting code in the notebook, you should perform the following experiments:
1. Fixing the signal variance and noise variance to values of your choosing, pick a single length scale, and plot the posterior predictive mean, as well as the standard deviation (square root of the posterior predictive variance), over all time steps (train & test). You should also overlay the ground truth on the plot.
2. Fixing the signal variance and noise variance to values of your choosing, pick a set of length scales (e.g. 4 length scales), and for each length scale, superimpose draws from the posterior predictive distribution in a plot, alongside the full ground truth data and training data. Provide a discussion of your findings.
3. Fixing the signal variance to 10, pick a set of length scale and noise variance values (e.g. 20 length scales X 20 noise variance), and for each hyperparameter configuration compute the negative log likelihood on the test data, as well as the log marginal likelihood. Draw a scatterplot of the results, where the x-axis will correspond to the log marginal likelihood, and the y-axis the negative log likelihood. Provide a discussion of your findings.

# Part 2

In the second part of the assignment you will be expected to implement empirical Bayes, in order to automatically find the model hyperparameters.

The data in this part of the assignment will not be 1D, but rather you should assume arbitrary dimensionality in the input.

You will be expected to implement gradient ascent with momentum, in order to maximize the log marginal likelihood with respect to the hyperparameters. You will use [JAX](https://jax.readthedocs.io/en/latest/) to perform automatic differentiation, in turn giving us gradients; see below for tips on JAX.

You should consider the length scale, noise variance, and signal variance as hyperparameters to optimize. However, the length scale will no longer be a single scalar, but rather a vector, of same dimension as the data dimensionality. This necessitates a change to the kernel.

In forming the squared exponential kernel, you should divide _each_ dimension of a given data point by its dimension-specific length scale, prior to computing squared Euclidean distances. In effect, this corresponds to a Mahalanobis distance, under a diagonal matrix, where the squared distance between points will be computed as:

$d_ L^2(\mathbf{x}_ i,\mathbf{x}_ j) = (\mathbf{x}_ i - \mathbf{x}_ j)^T \mathbf{L}^{-1} (\mathbf{x}_ i - \mathbf{x}_ j)$

Given a set of length scales $(l_ 1,l_ 2,\ldots,l_ D)$, the matrix $\mathbf{L}$ is diagonal, with diagonal elements $\mathbf{L}_ {dd} = l_ d^2$.

Moreover, note that all hyperparameters should be strictly positive. Thus, you should transform the hyperparameters to guarantee positivity. Namely, for each hyperparameter, you can do this by applying the exponential function to the value. **Note:** this operation needs to be recorded as part of the automatic differentiation computation, e.g. when you are computing the log marginal likelihood. Further note that to initialize the hyperparameters to desired values, you will need to take the log.

As part of your implementation in Part 2, you may choose to build off of your code in Part 1, but you are also free to create a new class for your Gaussian process.

## Experiments

Please see the notebook named `exp2.ipynb` for evaluating your implementation of empirical Bayes.

Similar to Part 1, the data you are provided is climate simulation data. But now, we are interested in seeing whether outputs of a simulation, measuring temperature at different locations in the world, can be used to predict temperature at a novel location. Specifically, each data input corresponds to a collection of temperature measurements for different locations on Earth (around the United States, India, Panama, Brazil, and the Philippines). And each target corresponds to the temperature measurement of Australia, just off of Adelaide. Each pair of input & target corresponds to the same time observation (namely, same month & year). The objective is to build a model on training data, consisting of temperature measurements from 2006 - 2050, and use this for forecasting. The test data consists of temperature measurements from 2050 - 2080 for US, India, Panama, Brazil and the Philippines, and we want to predict what the temperature near Adelaide will be at these points in time.

Using the accompanying plotting code in the notebook, you should perform the following experiments:
1. Initialize the hyperparameters, e.g. both signal variance and noise variance set to 1, and length scale set to a constant vector of your choosing, and find the hyperparameters that optimize the marginal likelihood. Plot the posterior predictive mean and variance for the model that follows from the initialized hyperparameters, and separately, posterior predictive mean and variance for the model with optimized hyperparameters.
2. To demonstrate the benefits of optimization, choose a collection (say 10 - 20) of hyperparameter initializations, and then for each, run your optimization code to find new hyperparameters. Compare the negative log likelihood on the initial hyperparameters with the optimized hyperparameters as a scatterplot. Provide a discussion on your findings.

# Submission

When submitting your assignment to Brightspace, be sure to include all of your code, as well as the original data that came with the assignment. Please prepare your assignment so that I can easily run your notebooks.

This assignment is due on **September 20**.

# Grading criteria

## Part 1 (60 points)

* Construction of covariance matrix. (10 points)
* Formation of posterior predictive distribution. (10 points)
* Taking draws from the posterior predictive distribution. (10 points)
* Numerically-stable implementation of log marginal likelihood. (10 points)
* Negative log likelihood. (5 points)
* Experimental results and discussion. (15 points)

## Part 2 (40 points)

* Construction of covariance matrix (dimension-dependent length scale for squared exponential kernel). (10 points)
* Implementation of gradient ascent for the log marginal likelihood. (15 points)
* Experimental results and discussion. (15 points)

# Implementation Tips

## Numerical stability

Note: you should never explicitly invert matrices in this assignment.

Rather, you should compute the Cholesky decomposition, and use this in two ways:
1. Solving a linear system, or set of linear systems.
2. Computing the log determinant. The determinant can be easily computed from the lower/upper-triangular matrix returned by the Cholesky decomposition. But you will need to consider a _numerically-stable_ way of computing the log determinant.

## Computing the kernel

For two sets of points, it will be necessary to compute the squared Eucliean distance between all points from one set, to all points in the other set, returning a 2D array of pairwise distances. Think carefully about how to use vectorization with NumPy to efficiently compute this 2D array, e.g. you should not loop, or use list comprehension. Rather, consider broadcasting, and alternative formulations for computing the squared Euclidean distance.

## Computing gradients with JAX

You should compute gradients with JAX as follows:
1. You will _indicate_ what parameters require derivatives.
2. Next, you will _evaluate_ your function (the log marginal likelihood) to form a computation graph that depends on these parameters.
3. Last, JAX will perform _reverse-mode auto differentation_ to provide you with derivatives.

# JAX Tips

* JAX has _most_ of the functionality of NumPy. Using JAX is as simple as replacing your `import numpy as np` code with `import jax.numpy as np`. Likewise, for scipy, you would replace `import scipy.linalg` with `import jax.scipy.linalg`. Arrays, and their operations, remain the same. The **only difference** between NumPy arrays, and JAX arrays, is that JAX arrays are **immutable**. That is, you cannot slice existing arrays to assign new values. However, there are ways of getting around this: see this [common gotcha](https://jax.readthedocs.io/en/latest/notebooks/Common_Gotchas_in_JAX.html#array-updates-x-at-idx-set-y).
* The primary use of JAX for this assignment is to compute derivatives. Please see the following references for examples: [example 1](https://jax.readthedocs.io/en/latest/notebooks/quickstart.html#taking-derivatives-with-grad), [example 2](https://jax.readthedocs.io/en/latest/jax-101/01-jax-basics.html#jax-first-transformation-grad). Thus, it will be required to have a dedicated function for computing the log marginal likelihood, which takes in as its first argument hyperparameters that you are trying to find. Gradients will then be computed with respect to these parameters. This function can have other arguments too, but gradients for these arguments will not be computed. Note that the argument does not need to be a JAX array, but can be a dictionary of JAX arrays, which should help you organize your hyperparameters - the gradient will return a dictionary of the same form.
* By default, gradient computation in JAX assumes that the function that you aim to differentiate only returns a single value, namely a single scalar. You will likely find it useful, for debugging purposes, to return multiple values. To enable this, in your `grad` call, simply pass in the optional argument `has_aux=True`, see e.g. [this reference](https://jax.readthedocs.io/en/latest/jax-101/01-jax-basics.html?highlight=has_aux#auxiliary-data).
