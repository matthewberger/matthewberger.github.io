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
  <a href="/teaching/aml/fall2024">Overview</a>
  <a href="/teaching/aml/fall2024/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2024/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2024/assignments">Assignments</a>
  <a href="/teaching/aml/fall2024/project">Project</a>
</div>

---

<br>

# Assignment 2

This assignment is concerned with Bayesian model selection.

Bayesian approaches to machine learning offer a principled approach to choosing good models. We associate "model" with a specific setting of hyperparameters, while "good model" is defined as a model that gives high marginal likelihood.

In particular, Gaussian processes are a nice use case for model selection, as we can strike a balance between data fit (always able to interpolate the training data), and model complexity (ensure "nice" behavior over the rest of the domain).

Moreover, if we design our covariance functions in a particular way, then Bayesian model selection can function as a form of feature selection, allowing us to better interpret the chosen structure for our model.

In this assignment you will implement and test out model selection for Gaussian process regression. Your implementation should support the following:
* An implementation of Gaussian process (GP) regression. Your implementation should be independent of the choice of covariance function for the GP. This should give us (1) the posterior mean, (2) posterior variance, and (3) predictive density (for measuring error).
* Different types of covariance functions.
* Computation of the log marginal likelihood.
* Performing gradient ascent on the log marginal likelihood with respect to the GP hyperparameters. Or, equivalently, descending the negative log marginal likelihood (choice is yours).

The code for this assignment can be [found here](https://vanderbilt.box.com/s/1siy79lbe0b8jvxs3u4iek03bsupwn5p).

## Gaussian process regression

Your implementation of GP regression will be split into 2 functions.

The first function will be responsible for computing the posterior mean & variance on a given set of test inputs. You should precompute anything necessary for inference, given just the covariance function, hyperparameters, and training data.

The second function will evaluate the negative log of the posterior predictive density (referred below as negative log probability for brevity), provided (1) ground-truth labels for test inputs, (2) the posterior mean and variance for corresponding test inputs, and (3) noise variance (found in hyperparameters). You will use this function for model evaluation.

## Covariance functions

You will implement two types of covariance functions. In what follows, the noise variance should _only_ be added when considering the covariance function over training inputs.

### Squared exponential kernel

The squared exponential kernel gives rise to the following covariance function:

$cov(\mathbf{x}_ i , \mathbf{x}_ j) = \delta_ {ij} \sigma^2_ n + \sigma^2_ f \exp( -\lVert \mathbf{x}_ i - \mathbf{x}_ j \rVert^2 / l )$,

where $\delta_ {ij}$ is the Kronecker delta function. You will be responsible for finding the three hyperparameters of (1) noise variance $\sigma^2_ n$, (2) signal variance $\sigma^2_ f$, and (3) length scale $l$. Note: the "squares" on the variance terms are just for notation purposes, e.g. you should be finding $\sigma^2_ n$ directly, rather than explicitly squaring $\sigma_ n$.

You will need to compute the covariance function between all pairs of provided points. _This needs to be efficient_. Otherwise, optimization will be quite slow. It is recommended to compute all pairs of squared Euclidean distances first, which can be computed in a single line of code with no loops, no list comprehension, etc.. 

### Squared exponential kernel - Mahalanobis distances

For a more expressive covariance function, you will modify the squared Euclidean distances in the above with squared Mahalanobis distances:

$cov(\mathbf{x}_ i , \mathbf{x}_ j) = \delta_ {ij} \sigma^2_ n + \sigma^2_ f \exp( -(\mathbf{x}_ i - \mathbf{x}_ j)^T \mathbf{L}^{-1} (\mathbf{x}_ i - \mathbf{x}_ j) )$,

where we have replaced a single shared length scale $l$ with a _set_ of length scales, represented in the diagonal matrix $\mathbf{L} \in \mathbb{R}^{D \times D}$. For instance, $\mathbf{L}_ {i,i}$ contains the length scale for feature indexed by $i$ in input vector $\mathbf{x} \in \mathbb{R}^D$.

Once again, this needs to be computed efficiently. You should not simply implement the equation as stated above. Think through a more efficient way to compute this for all pairs of provided points.

## Gradient ascent on the log marginal likelihood

You will need to support the computation of the log marginal likelihood, given an arbitrary set of hyperparameters.

This function needs to be numerically stable! You should compute the Cholesky decomposition on the covariance matrix, and use the provided factorization to, _both_, solve the linear system (required for data fit), and evaluate the log determinant (required for model complexity). Please see Appendix A.4 in [GPML](https://gaussianprocess.org/gpml/chapters/) for more details.

Moreover, all hyperparameters (across both covariance functions) need to be strictly positive. To handle this, gradient ascent should be performed in an unconstrained space for all hyperparameters. The log marginal likelihood should thus be understood to be a function of these unconstrained hyperparameters. This will require _transforming_ the hyperparameters to be strictly positive when evaluating the covariance function. See the discussion in Ch. 17.2.6.1 in [PML-1](https://probml.github.io/pml-book/book1.html) for more details.

Use an exponential function to map from unconstrained to constrained space, and the log function for the inverse mapping.

You should use batch gradient descent for optimization. Use JAX's automatic differentiation to obtain gradients. See tips below for more details.

# Experiments

The dataset on which you will test your implementation consists of air quality measurements. The main task is to predict the level of benzene at a given location and point in time, given a set of sensor measurements of the environment. Specifically, for a given data observation, its features consist of (in order):

1. Hour of day
2. Level of carbon monoxide
3. Level of non-methane hydrocarbons
4. Level of nitrogen oxides
5. Temperature
6. Relative humidity
7. Absolute humidity

Please use the Jupyter notebook `exps.ipynb` for running all experiments.

## Marginal likelihood and generalization

In this experiment you will run empirical Bayes multiple times, over different random initializations.

For each run, you should collect (1) the negative log probability at initialization, (2) the negative log probability on conclusion of optimization, and (3) the log marginal likelihood.

After collecting all of the data, you should first verify that the averaged negative log probability was consistently improved over the hyperparameters used at initialization, across all runs.

Afterwards, we want to better understand the following: is the marginal likelihood a good indicator of generalization? To this end, draw a scatterplot where the x-axis is the log marginal likelihood, the y-axis is the negative log probability, and each point is a unique run. Ideally, we should see a clear inverse relationship. Report your findings in the notebook in a Markdown-formatted cell.

## Using a learned Mahalanobis distance for feature importance

For this experiment you will test out your Mahalanobis squared distance exponential kernel.

Perform a single run of empirical Bayes, and verify the negative log probabilty upon conclusion of optimization, ensuring that it is an improvement over initialization.

Now, what is most relevant here is _inspecting the learned hyperparameters_.

Show the hyperparameters corresponding to the per-feature length scales. Recall the attribute names in the air quality dataset above - this will help provide some context for explaining your findings. **Note**: the data is standardized (zero-mean, unit variance), and thus length scales across features are comparable.

In a Markdown-formatted cell, provide a discussion on what you have found, addressing the following questions:
1. Which length scales are found to be most important by the model? Which ones the least important? How are you deciding on what is considered "important"? Note: this should be based on the covariance function.
2. Explain why empirical Bayes would be likely to reduce the importance of features, if it is possible to do so. You should relate your discussion to what we covered in class regarding "data fit" and "model complexity" for GP empirical Bayes.

# Submission

When submitting your assignment to Brightspace, be sure to include all of your code, and only your code. **Exclude the dataset from your submission**. Please prepare your assignment so that I can easily run your notebook.

This assignment is due on **September 27**.

# Grading criteria

## Gaussian process regression implementation (75 points)

* GP posterior mean and variance. (15 points)
* Negative log of the posterior predictive density (negative log probability). (10 points)
* Squared exponential kernel. (5 points)
* Mahalanobis-based squared exponential kernel. (15 points)
* Numerically-stable implementation of the log marginal likelihood. (15 points)
* Optimization loop for empirical Bayes. (15 points)

## Experiments (25 points)

* Marginal likelihood and generalization. (10 points)
* Feature importance experiments using Mahalanobis distance kernel, and accompanying discussion. (15 points)

# Implementation Tips

* The primary use of JAX for this assignment is to compute derivatives. I strongly recommend reading through the following [JAX tutorial on automatic differentiation](https://jax.readthedocs.io/en/latest/automatic-differentiation.html).
* It will be required to have a dedicated function for computing the log marginal likelihood, which takes in as its first argument hyperparameters that you are trying to find. Gradients will then be computed with respect to these parameters, and returned. This function can have other arguments too, but gradients for these arguments will not be computed.
* I _strongly recommend_ using `jax.value_and_grad`, [see link](https://jax.readthedocs.io/en/latest/automatic-differentiation.html#automatic-differentiation-evaluating-using-jax-value-and-grad). Although your function will just return the log marginal likelihood, JAX will provide you with both the value you returned, _and_ the gradient. This should prove helpful for debugging, e.g. ensuring the log marginal likelihood is increasing over optimization steps (if ascending).
* [Read the docs](https://jax.readthedocs.io/en/latest/_autosummary/jax.scipy.linalg.cholesky.html) on JAX & Cholesky decomposition.
* The assignment is structured in a way that hyperparameters are represened in a 1D array. Although simple, accessing hyperparameters via indexing is not all that intuitive. If you would like a more semantically-meaningful representation of the hyperparameters, [check out pytrees](https://jax.readthedocs.io/en/latest/working-with-pytrees.html#working-with-pytrees).
