---
layout: default
title: Assignment 3
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
  <a href="/teaching/aml/fall2022">Overview</a>
  <a href="/teaching/aml/fall2022/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2022/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2022/assignments">Assignments</a>
  <a href="/teaching/aml/fall2022/project">Project</a>
</div>

---

<br>

# Assignment 3

This assignment is concerned with model selection for Gaussian process regression.

Recall that with Gaussian processes (GPs), given the specification of a covariance function, the posterior can be easily formed in order to make predictions. But in specifying the covariance function, we often have to decide on hyperparameters, and the performance of Gaussian process regression largely depends on a good selection of hyperparameters. In many cases, it might not be apparent how these hyperparameters should be set, e.g. noise variance, signal variance, length scale(s)?

Instead of performing grid search, manually tuning hyperparameters, etc.. in this assignment you will find hyperparameters that maximize the marginal likelihood of a GP, optimized _just_ on the training data. Type-II maximum likelihood estimation within GPs naturally strikes a balance between data fit, and model complexity.

More specifically, you will perform gradient ascent to optimize the log marginal likelihood. The space over which your optimization will take place is the _space of hyperparameters_. This requires computing gradients of the log marginal likelihood, with respect to your hyperparameters. This also requires implementation of a specific gradient ascent algorithm, for which you will implement **gradient ascent with momentum**. Last, you will consider slightly more elaborate kernels for your covariance function, namely ones that provide for **automatic relevance determination**.

## Data

You will test your implementation out on 2 datasets. Each dataset corresponds to a different regression problem. The first is a dataset of concrete-based materials ([link](https://archive-beta.ics.uci.edu/ml/datasets/concrete+compressive+strength)), where the goal is to predict a material's compressive strength, based on a variety of measured quantitative attributes. The second is a set of telemetry data collected from players of the video game Starcraft 2 ([link](https://archive-beta.ics.uci.edu/ml/datasets/skillcraft1+master+table+dataset)), where the goal is to predict a player's expertise (integer-valued, ranging from 1 through 8) given their demographics, and data logged from their game play.

Data that you should use for building your models (train data) has been provided, along with validation data that you should use for assessing generalization. The filenaming convention is: "concrete-skillcraft"\_"train-val"\_"X-y".npy for the appropriate numpy arrays, where "concrete" refers to the materials data, and "skillcraft" refers to player telemetry data.

## Starter code

Starter code has been supplied in the file `gp.py`. As in the previous assignment, you may choose to build off of this, or start from scratch. Moreover, for experiments, you are free to work in the `main` of `gp.py`, but if you like, you may set up a separate script for experimentation.

[Please click here for data and code for this assignment]().

## Gaussian process regression (30 points)

You should first implement a Gaussian process regression model.

As part of your model, you will need to specify a set of hyperparameters for the covariance function. You should use a squared-exponential kernel for this purpose, requiring:
1. A noise variance hyperparameter.
2. A signal variance hyperparameter.
3. And one length scale _for each attribute of your data_. E.g. for the concrete data, this will amount to 8 different length scales.

You will divide _each_ attribute for a given data instance by its length scale, prior to computing squared Euclidean distances. In effect, this corresponds to a Mahalanobis distance, under a diagonal matrix, where the squared distance between points will be computed as:

$d_M^2(\mathbf{x}_i,\mathbf{x}_j) = (\mathbf{x}_i - \mathbf{x}_j)^T \mathbf{L} (\mathbf{x}_i - \mathbf{x}_j)$

Given a set of length scales $(l_1,l_2,\ldots,l_d)$, the matrix $\mathbf{L}$ is diagonal, with diagonal elements $\mathbf{L}_{ii} = l_i^2$.

This squared Mahalanobis distance is what should be supplied to the exponential argument, as part of your squared-exponential kernel.

## Maximizing the marginal likelihood (50 points)

To maximize the marginal likelihood you will implement gradient ascent with momentum. You should implement the procedure described in (PML-1) Sec. 8.2.4.1. I have provided default parameters for the learning rate, and momentum, though you are free to adjust the parameters.

Gradient ascent requires you to compute gradients for the log marginal likelihood. And this requires computing matrix inversions, and log-determinants, which will lead to complex derivatives for your hyperparameters (if you choose to manually derive these). Instead, you will use the library [JAX](https://jax.readthedocs.io/en/latest/) for automatic differentiation. Specifically:
1. You will _indicate_ what parameters require derivatives.
2. Next, you will _compute_ the log marginal likelihood to form a computation graph that depends on these parameters. This will require you to take the Cholesky factorization of your (hyperparameter-dependent) covariance matrix, in order to compute, both, the data fit term, and model complexity term.
3. Last, JAX will perform _reverse-mode auto differentation_ to provide you with derivatives.
See below for JAX tips.

There are a few issues you will need to handle, related to optimization:
1. Gradient ascent requires an initialization of hyperparameters. For ease of setting, you should initialize each attribute-specific length scale to be the standard deviation of its attribute, computed on the training data. Moreover, for both the noise variance and signal variance, you should initialize them to the mean of the targets (the `y` value), computed over the training data.
2. All hyperparameters need to be positive. And though you will, ultimately, be squaring these hyperparameters in the kernel computation, this is not the best way to handle negative values. Rather, you should consider a transformation of your hyperparameters that is (1) monotonically-increasing, (2) invertible, and (3) ensures the transformed value is strictly positive. Invertibility is necessary for your initialization. The transformation should be done _just prior_ to computing the kernel.

## Analysis (20 points)

There are four main points of analysis that you should address, as part of a document formatted in LaTex:
1. You should describe, and justify, any choices made in your implementation, e.g. parameters selected for gradient ascent, choice of transformation in ensuring positivity of hyperparameters.
2. As a debugging tool, you should log the (1) data fit term (quadratic form) and (2) model complexity term (log-determinant) at each step of gradient ascent. At the end of optimization, you should then plot these two terms, as well as their sum. Over the course of optimization, you should expect to see their sum is (mostly) increasing, while the data fit and model complexity slowly come into balance. Plotting code has been provided for you for this purpose.
3. Evaluate your model on the validation datasets, comparing models based on hyperparameters found through optimization, with models based on hyperparameters used for initialization. You should report root mean-squared error.
4. For each dataset, gather the optimized length scales, and compare them to their initialization. Length scales that have decreased during optimization indicate attributes that are more discriminative for the prediction task, whereas length scales that have increased indicate potentially less-predictive attributes. You may report these results in a table, or in a plot (see provided for plotting ratios).

# Deliverables

On Brightspace, your submission should include:
1. Code
2. Data (nothing new you need to generate, just the original)
3. PDF formatted in LaTex

This assignment is due on **October 4**.

# JAX Tips

* JAX has _most_ of the functionality of NumPy. Using JAX is as simple as replacing your `import numpy as np` code with `import jax.numpy as np`. Likewise, for scipy, you would replace `import scipy.linalg` with `import jax.scipy.linalg`. Arrays, and their operations, remain the same. The **only difference** between NumPy arrays, and JAX arrays, is that JAX arrays are **immutable**. That is, you cannot slice existing arrays to assign new values. However, there are ways of getting around this: see this [common gotcha](https://jax.readthedocs.io/en/latest/notebooks/Common_Gotchas_in_JAX.html#array-updates-x-at-idx-set-y).
* The primary use of JAX for this assignment is to compute derivatives. Please see the following references for examples: [example 1](https://jax.readthedocs.io/en/latest/notebooks/quickstart.html#taking-derivatives-with-grad), [example 2](https://jax.readthedocs.io/en/latest/jax-101/01-jax-basics.html#jax-first-transformation-grad). Thus, it will be required to have a dedicated function for computing the log marginal likelihood, which takes in as its first argument hyperparameters that you are trying to find. Gradients will then be computed with respect to these parameters. This function can have other arguments too, but gradients for these arguments will not be computed.
* By default, gradient computation in JAX assumes that the function that you aim to differentiate only returns a single value, namely a single scalar. You will likely find it useful, for both debugging purposes and for the analysis above, to return multiple values. To enable this, in your `grad` call, simply pass in the optional argument `has_aux=True`, see e.g. [this reference](https://jax.readthedocs.io/en/latest/jax-101/01-jax-basics.html?highlight=has_aux#auxiliary-data).
