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
  <a href="/teaching/aml/fall2023">Overview</a>
  <a href="/teaching/aml/fall2023/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2023/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2023/assignments">Assignments</a>
  <a href="/teaching/aml/fall2023/project">Project</a>
</div>

---

<br>

# Assignment 3

In this assignment you will be expected to implement the approach of [automatic differentiation variational inference](https://www.jmlr.org/papers/volume18/16-107/16-107.pdf). Your implementation will allow for a good deal of flexibility in specifying probabilistic models, thus enabling approximate inference for numerous problems. However, for this assignment an emphasis will be placed on Bayesian mixture models.

The code and data for this assignment can be [found here](https://vanderbilt.box.com/s/01f87fmdl8kou0pexwk9xh9skpku7qeq).

# Model structure

We will assume that model parameters can be partitioned into mutually exclusive groups. Specifically, for model parameters $\boldsymbol{\Theta}$, we can partition this into groups $\boldsymbol{\Theta} := ( \Theta_ 1 , \Theta_ 2 , \ldots , \Theta_ M)$. Each parameter group $\Theta_ m$ is in 1:1 correspondence with a _prior_ $p_ m(\Theta_ m \| \phi_ m)$ with prior parameters $\phi_ m$ - we will assume the prior parameters are fixed, not to be estimated, and do not consist of other model parameters. The priors _factorize_, e.g the full prior probability can be written as:

$p(\boldsymbol{\Theta}) = \prod_{m=1}^M p_ m(\Theta_ m \| \phi_ m)$.

The data likelihood $p(\mathbf{X} \| \boldsymbol{\Theta})$ as usual conditions on all model parameters. Thus we may form the joint probability distribution:

$p(\mathbf{X}, \boldsymbol{\Theta}) = p(\mathbf{X} \| \boldsymbol{\Theta}) p(\boldsymbol{\Theta})$.

The variational distribution will be a Gaussian distribution. In particular, the covariance structure of the Gaussian will be _block-diagonal_, where each block corresponds to a particular group of the model parameters. This implies the following factorization:

$q(\boldsymbol{\Theta} \| \boldsymbol{\psi}) = \prod_{m=1}^M \mathcal{N}(T_ m(\Theta_ m) \| \boldsymbol{\mu}_ m , \boldsymbol{\Sigma}_ m)$,

where the variational parameters for the $m$'th parameter group are comprised of mean and covariance parameters, $\boldsymbol{\psi}_ m = (\boldsymbol{\mu}_ m , \boldsymbol{\Sigma}_ m)$. The transformation $T_ m$ is a map from the support of the model parameters $\Theta_ m$, to the space of real-valued vectors. The full set of variational parameters $\boldsymbol{\psi} := (\boldsymbol{\psi}_ 1 , \boldsymbol{\psi}_ 2 , \ldots , \boldsymbol{\psi}_ M)$ are the parameters that you will find by maximizing the evidence lower bound (ELBO).

# Priors

Your implementation should support different types of prior densities. Any prior $p_ m$ will need to support the following:

1. **Evaluate the log probability**: given model parameters $\Theta_ m$, compute the log probability $\log p(\Theta_ m \| \phi_ m)$. Note: you may exclude additive constants, since these will be zero'd out upon taking gradients.
2. **Transform constrained parameters to an unconstrained space**: implement a function $T_ m$, specific to the model parameters, that yields $\zeta_ m = T_ m(\Theta_ m)$, where $\zeta_ m$ is a vector of real-valued scalars.
3. **Transform unconstrained parameters to the constrained space of the model parameters**: this is the inverse, $\Theta_ m = T^{-1}_ m(\zeta_ m)$.
4. **Evaluate the log of the absolute determinant of the Jacobian**: the Jacobian is in reference to the transformation $T_ m$.

Moreover, each prior should report the total number of model parameters $\|\Theta_ m\|$.

## Prior types

Your implementation should support the following priors:

1. A Gaussian distribution.
2. A Dirichlet distribution. Note, this should be a **minimal representation**, to ensure unique transformations, see (PML-2, Sec. 2.4.2.2).
3. A factored prior on variances. Specifically, this should be a product of exponential distributions, where each exponential distribution is a prior for a single variance term. This prior will be used for diagonal covariance matrices, see e.g. (PML-2, Sec. 3.4.6.4).
4. A diagonal + low-rank covariance matrix that decomposes into the following: $\boldsymbol{\Sigma} = \text{diag}(\boldsymbol{\sigma^2}) + \mathbf{L} \mathbf{L}^T$, with vector $\boldsymbol{\sigma^2}$ being strictly positive values, and $\mathbf{L} \in \mathbb{R}^{D \times r}$ for a specified rank $r$. The above factored prior on variances (product of exponentials) should be used for $\boldsymbol{\sigma^2}$. A Gaussian prior should be used for the low rank part, flattening it to a vector: $\mathcal{N}(\text{vec}(\mathbf{L}) \| \mathbf{0}, \rho^{-1} \mathbf{I})$, with a single parameter for prior strength $\rho$. These 2 priors (diagonal part & low-rank part) should factorize.

# Likelihood

You will implement 2 data likelihoods. Each will need to evaluate the log probability limited to training data (for optimization), and the probability evaluated on novel points.

1. **Gaussian likelihood**: the likelihood should condition on 2 model parameters, a mean vector and a covariance matrix.
2. **Gaussian mixture model**: the likelihood should condition on a list of mean vectors, a list of covariance matrices, and a list of mixture weights. Note: a numerically-stable way of evaluating a GMM may be necessary here, you should use the logsumexp trick, see (PML-2, Sec. 28.2.5.3).

Moreover, for the GMM likelihood, you should implement a method for drawing a sample from a specified component, given model parameters that have been sampled from the approximate posterior.

# Gaussian variational approximation

You will create a Gaussian with variational parameters $\boldsymbol{\mu}_ m, \boldsymbol{\Sigma}_ m$, in correspondence with model parameters $\Theta_ m$. The dimensionality of the Gaussian will be determined from $\|\Theta_ m\|$, supplied by its corresponding prior. For simplicity, you should use a diagonal covariance matrix for $\boldsymbol{\Sigma}_ m$; this limits the approximation power of the posterior, but for this assignment will suffice.

# Maximizing the ELBO

You will need to compute the ELBO on the variational parameters. This involves the following:

1. Compute the entropy of the Gaussian variational distribution. See (PML-2, Sec. 5.2.2). Note: this is greatly simplified due to block-diagonal covariance structure.
2. As part of approximating the expectation, draw a single Monte Carlo sample. This involves the following sampling path: (1) $\eta \sim \mathcal{N}(\mathbf{0},\mathbf{I})$, (2) $\zeta_ m = S(\eta,\boldsymbol{\psi}_ m)$, (3) $\Theta_ m = T^{-1}_ m(\zeta_ m)$, where the function $S$ transforms a unit standard Gaussian random vector to Gaussian with parameters $\boldsymbol{\psi}_ m$. This should be done for each group of model parameters.
3. Evaluate the log probability for each prior, using $\Theta_ m$ as input to the prior.
4. Evaluate the log determinant of the Jacobian for $T_ m$, given $\Theta_ m$.
5. Evaluate the log probability of the data likelihood, given _all_ sampled model parameters.

Once you have computed the above, you can form the ELBO.

You should then implement stochastic gradient ascent to optimize the ELBO, using the method detailed in [ADVI](https://www.jmlr.org/papers/volume18/16-107/16-107.pdf). See Sec. 2.6, namely Eqs. (10) and (11). Your implementation should support minibatching, in order to approximate the full log likelihood from a small number of samples that are drawn uniformly at random from the original data.

Once optimized, you should be able to draw samples from the posterior - transformed into the constrained domain of the model parameters.

# Experiments

You will evaluate your implementation under different probabilistic models.

## Part 1

As a sanity check, you will apply ADVI for model parameter estimation in a multivariate Gaussian model:

1. The model parameters consist of a mean vector and a covariance matrix.
2. The mean vector has a Gaussian prior density.
3. The covariance matrix is diagonal, and has as a prior a factorized exponential distribution - one exponential distribution per variance.
4. The likelihood is a Gaussian, conditioned on the mean and covariance parameters.

You will be provided two sets of 2D samples: one dense, the other sparse. Your objective is to compute the approximate posterior for both, and compare the posteriors. Namely, for each, use the variational covariance parameters to measure how uncertain we are in the model parameter estimates, and report your findings.

For debugging, plotting code has been provided for displaying the original data, as well as contouring GMM draws from the posterior. You are free to modify/extend the plotting code.

## Part 2

This is the same setting as Part 1, _except_ the covariance matrix now changes. The covariance matrix should be a diagonal + low-rank matrix, with rank set to 1.

You should simply plot the results in the notebook, in order to confirm that your implementation of ADVI supports more general covariances.

## Part 3

You will apply ADVI to a GMM. Specifically, you are provided two sets of 2D points:

1. The first set of points ("X_ mixture") should use diagonal covariance matrices in the GMM components.
2. The second set of points ("X_ mixture_ offdiag") should use diagonal + low-rank covariance matrices, with rank set to 1, in the GMM components.

In your experiments, set the number of components to 6, and set the Dirichlet prior parameters to 0.1 and 100 for all components. Report on the resulting variational parameters for the Dirichlet distribution, and their corresponding mean variational parameters. How do these results compare across the different datasets?

Moreover, using the accompanying plotting code, you should plot different draws from the posterior - recall that a single draw is a single GMM model. Between the datasets, what do you observe across draws? Which Bayesian model looks more confident? The plotting code might need to be modified to fit your analysis.

## Part 4

In the last part of the assignment you will fit a Bayesian GMM to a dataset of images, namely the MNIST dataset.

The dataset is comprised of odd-numbered digits, 10,000 in total. We aim to see whether (1) we can find meaningful clusters in the dataset (ideally recovering the different digits), and (2) exploring the variations of digits offered by each component of the GMM, across posterior samples.

Basic image plotting code has been provided, but you will need to extend this in support of the below analysis.

Fit one model using a diagonal covariance matrix, and fit another using a diagonal + low-rank approximation. How do the variational means compare? You should show the means as images. Fixing a GMM from the posterior, how do draws from individual components of the GMM compare across the different types of covariance structures?

You should experiment with different settings of prior parameters, and study the following through your experiments:
1. What is the impact of the Dirichlet prior parameters?
2. What is the impact of the rank? Think in extremes here, e.g. r = 1 vs. r = 30.
3. How are the results impacted by the prior strengths on the covariance? Namely the diagonal & low-rank portions.

Note: this is left somewhat open-ended, there is no single "optimal" answer. What is most important is that your implementation of a Bayesian GMM is correct, and that your analysis provides some insight on these questions.

# Submission

Submit your assignment to Brightspace, include all of your code and the original data.

This assignment is due on **October 13**.

# Grading criteria

## Priors (30 points)

* Gaussian (5 points)
* Factorized exponentials prior (5 points)
* Diagonal + low-rank covariance prior (10 points)
* Dirichlet (10 points)

## Likelihoods (25 points)

* Gaussian likelihood (10 points)
* Gaussian mixture model likelihood (15 points)

## ADVI (20 points)

* Correct implementation of the ELBO (10 points)
* Implementation of gradient ascent to optimize the ELBO (10 points)

## Experiments (25 points)

* Part 1, Part 2 analysis (5 points)
* Part 3 analysis: comparing Dirichlet posteriors, comparing draws across datasets (10 points)
* Part 4 analysis: comparing covariance structures, parameter study (10 points)

# Tips

This assignment is designed to be completed incrementally. I do not recommend implementing all priors, and both likelihoods, all at once. Rather, first, implement what you need to complete Part 1 in the experiments. At that point, your ELBO implementation and optimization code should be set up such that regardless of the probabilistic model, your code will support it. Then, you should move on to Part 2 to test out non-diagonal covariances. And last, implement the GMM.

It is recommended to implement two different kinds of Gaussian objects, to account for (1) diagonal covariance, and (2) diagonal + low-rank covariance, when evaluating the log probability, and sampling. For the Gaussian distribution with low-rank + diagonal covariance, you should use the block-structured matrix identities to efficiently compute log-determinants and solve linear systems. See (PML-1 Sec. 7.3.3 - 7.3.4). Otherwise, your code will be slow on MNIST.

There are a couple subtleties to the GMM likelihood. First, as mentioned above, it is recommended to apply the logsumexp trick for numerical stability - this assumes you can write a Gaussian _strictly_ as an exponential function (recall, exponential family), inclusive of the mixture weights. Moreover, you should think carefully about how to compute the likelihood in a vectorized manner (over data items, not necessarily GMM components).

The default optimization parameters in the gradient ascent method should work for all models, and need not be tweaked. The only parameter that you will need to adjust is the number of optimization steps to take. In particular, for MNIST, the more the better, given the number of data items.

Regarding optimization, you should structure your model parameters in the way that makes the most sense to you, but ensuring they meet the types of data structures supported by JAX for gradient computation, e.g. lists, tuples, and dicts. For updating model parameters, or any kind of mapping you aim to perform, rather than iterate over your data structure, it is recommended to use JAX pytrees, and the provided `jax.tree_map` function. [See the docs](https://jax.readthedocs.io/en/latest/jax-101/05.1-pytrees.html) for more information. This will enable concise and simple code for optimization, and potentially other parts of your code.
