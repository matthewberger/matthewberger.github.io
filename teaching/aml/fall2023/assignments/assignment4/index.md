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
  <a href="/teaching/aml/fall2023">Overview</a>
  <a href="/teaching/aml/fall2023/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2023/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2023/assignments">Assignments</a>
  <a href="/teaching/aml/fall2023/project">Project</a>
</div>

---

<br>

# Assignment 4

In this assignment you will implement Hamiltonian Monte Carlo. You will use your implementation to approximate the posterior distribution of two kinds of probabilistic models:

1. Logistic regression
2. Matrix factorization

The code and data for this assignment can be [found here](https://vanderbilt.box.com/s/0qzno2c638n437voypqzipn86qd0vzdn).

# Hamiltonian Monte Carlo

Your implementation of Hamiltonian Monte Carlo should accept a probabilistic model, one that gives you an initialization of all model parameters, as well as a way to compute the log of the joint distribution. From here, your implementation should support the following features:

1. Take some prescribed number of steps in forming the Markov chain, only building the chain after some number of _burn in_ steps (another parameter).
2. At a given step, you should numerically solve Hamilton's equations using leapfrog integration. The number of leapfrog steps to take, and the step size, are both user-defined parameters.
3. Upon conclusion of the integration, compute the Metropolis-Hastings proposal acceptance. Only move to the new state if the acceptance is true, otherwise keep the current state.

The output should give a list of model parameters. You will this list of parameters to compute the posterior predictive distribution, which is necessarily model-specific, detailed below.

# Logistic regression probability specification

The data likelihood is the standard Bernoulli likelihood, using a sigmoid function to map the linear function to $[0,1]$:

$p(\mathbf{X}, \mathbf{y} \| \mathbf{w}, b) = \prod_{n=1}^N Bernoulli(y_ n ; \sigma(\mathbf{w}^T \mathbf{x}_ n + b))$

The matrix $\mathbf{X} \in \mathbb{R}^{N \times D}$ is the data matrix, while $\mathbf{y}$ is an n-dimensional vector that contains class labels, either 0 or 1.

The prior on the weight vector and bias, is a multivariate t-distribution, with 3 prior parameters: degrees of freedom $\nu$, variance $\sigma^2$ wherein covariance follows as a scaled identity matrix $\sigma^2 \mathbf{I}$, and a zero mean vector $\boldsymbol{\mu} = \mathbf{0}$. Specifically, ignoring the normalizing constant and taking $\mathbf{\bar{w}} = [\mathbf{w} , b]$:

$p(\mathbf{\bar{w}} \| \nu, \sigma^2, \boldsymbol{\mu}) = \left[ 1 + \frac{1}{\nu \sigma^2} \mathbf{w}^T\mathbf{w} \right]^{-(\nu+D)/2}$

The degrees of freedom and variance parameters will be set for you by default.

In summary, HMC should return a list of weight vectors and bias terms - it will likely be convenient to concatenate the bias with the weight, as in the above: $\mathbf{\bar{w}} = [\mathbf{w} , b]$.

# Matrix factorization probability specification

To make things concrete, consider the following problem domain.

The data that you are provided is a set of user preferences for different kinds of beers. A single data item consists of (1) a user id, (2) a beer id, and (3) a preference. The preference can be treated as a scalar, in the range of 1 (bad taste) to 5 (great taste). There are approximately 6100 users and 6900 beers in this dataset. For training, you are provided approximately 1.1M data items; thus, this represents a relatively small proportion (around 2.6%) of the total number of possible preferences. For testing, you are provided a set of approximately 100K data items. The objective is reminiscent of a recommendation system: for a given user, and a given beer, we want to predict the user's preference for the beer.

The way in which you will make predictions is to learn latent representations of users and beers. Specifically, for each user indexed by $i$ we will associate a latent vector $\mathbf{u}_ i \in \mathbb{R}^D$ for some (user-specified) dimension $D$. Likewise, for each beer indexed by $j$ we will associate a latent vector $\mathbf{v}_ j \in \mathbb{R}^D$ of the same dimension. The preference score for user $i$ and beer $j$ is formed by taking their dot product: $\mathbf{u}_ i^T \mathbf{v}_ j$.

The probabilistic model you will implement for matrix factorization is a simplified version of the approach proposed in the [Bayesian matrix factorization](http://www.cs.cmu.edu/~rsalakhu/papers/bpmf.pdf) paper. More specifically, the model can be broken down into the following:

## Likelihood

You should implement the following Gaussian likelihood:

$p(\mathcal{T} \| \mathbf{U},\mathbf{V}) = \prod_{(i,j,v) \in \mathcal{T}} \mathcal{N}(v \| \mathbf{u}_ i^T \mathbf{v}_ j, 1)$,

where the $(i,j,v)$ triplet is a training data item that respectively contains user id $i$, beer id $j$, and preference value $v$. Matrices $\mathbf{U}$ and $\mathbf{V}$ contain, respectively, the latent user vectors and latent beer vectors - these should be treated as model parameters.

## Priors

A single, shared, Gaussian prior should be placed on all latent user representations:

$p(\mathbf{U} \| \boldsymbol{\mu}_ u , \lambda_ u) = \prod_{n=1}^N \mathcal{N}(\mathbf{u}_ n \| \boldsymbol{\mu}_ u, \lambda_ u^{-1}\mathbf{I})$,

where $\boldsymbol{\mu}_ u$ is a model parameter representing the mean user, and $\lambda_ u$ is a model parameter for the precision of the Gaussian. Likewise, you will place a Gaussian prior on latent beer representations:

$p(\mathbf{V} \| \boldsymbol{\mu}_ v , \lambda_ v) = \prod_{n=1}^N \mathcal{N}(\mathbf{v}_ n \| \boldsymbol{\mu}_ v, \lambda_ v^{-1}\mathbf{I})$,

where $\boldsymbol{\mu}_ v$ is a model parameter representing the mean beer, and $\lambda_ v$ is a model parameter for the precision of the Gaussian.

The mean user parameter $\boldsymbol{\mu}_ u$ will have its own Gaussian prior (note dependence on precision parameter):

$p(\boldsymbol{\mu}_ u \| \lambda_ u) = \mathcal{N}(\boldsymbol{\mu}_ u \| \mathbf{0}, \lambda_ u^{-1}\mathbf{I})$,

As will the mean beer parameter $\boldsymbol{\mu}_ v$:

$p(\boldsymbol{\mu}_ v \| \lambda_ v) = \mathcal{N}(\boldsymbol{\mu}_ v \| \mathbf{0}, \lambda_ v^{-1}\mathbf{I})$,

Last, the precision parameters will have Gamma priors:

$p(\lambda_ u) = Ga(\lambda_ u \| D \cdot a, D \cdot b)$

$p(\lambda_ v) = Ga(\lambda_ v \| D \cdot a, D \cdot b)$

with shape $a$ and rate $b$ parameters - these have been defaulted for you, though you are free to adjust. The scaling by $D$ accounts for the latent dimensionality; this is equivalent to a Wishart prior with scale matrix set to a (scaled) identity.

Assume all of the above priors factorize.

In summary, HMC should return a list of model parameters, where each item in the list is comprised of (1) a matrix of latent user representations $\mathbf{U}$, (2) a matrix of latent beer representations $\mathbf{V}$, (3) a vector representing the mean user $\boldsymbol{\mu}_ u$, (4) a vector representing the mean beer $\boldsymbol{\mu}_ v$, (5) user precision $\lambda_ u$, and (6) beer precision $\lambda_ v$.

# Extra credit: No U-Turn Sampler

As you will find, setting the number of leapfrog steps to take at every iteration of your Markov chain is nontrivial. Hence, as extra credit, you may choose to implement the No U-Turn Sampler (NUTS) to automatically determine the number of leapfrog steps to take.

The specific implementation of [NUTS](https://jmlr.org/papers/volume15/hoffman14a/hoffman14a.pdf) should correspond to what we covered in class, namely this would be Algorithm 2 in the paper. You are free to implement the more efficient Algorithm 3, however.

# Experiments

## Part 1

In the first part, found in notebook `part1.ipynb`, you will test out your implementation of HMC for logistic regression.

The data provided is a subset of the [CoLA dataset](https://nyu-mll.github.io/CoLA/), namely contextualized embeddings of sentences derived from [RoBERTa](https://arxiv.org/pdf/1907.11692.pdf). CoLA tests for linguistic acceptability, and is framed as a binary classification problem: acceptable or not acceptable.

In the notebook you will first run HMC on the training data, and then compute the averaged predictive probability for each of the test inputs. To make a decision on a class label, assume that if a prediction is greater than 0.5, then the class label should be +1; otherwise, the class label should be 0. Compute and report the average error in predicted labels.

Secondly, you should use the accompanying plotting code to plot the entropy of all of the predictive probability scores against their accuracies. Entropy is in reference to the 2-class discrete distribution (0 or +1). The plotting code will show two entropy histograms: one for instances that were correctly predicted, the other for instances that were incorrectly predicted.

Moreover, you should gather the top, and bottom, 10 sentences (see `test_sentences`), ranked by entropy, and print them out. The confident (low entropy) sentences should be easily determined as linguistically acceptable or not, while the unconfident (high entropy) sentences should be more difficult.

If you are implementing NUTS, then you should further run your implementation, and verify the accuracy/uncertainty relative to the hard-coded parameters for standard HMC.

## Part 2

In the second part, found in notebook `part2.ipynb`, you will test out your implementation of HMC for matrix factorization.

You should run HMC on different latent dimensions: 2, 4, and 8. For each result, you should compute the averaged predictions, e.g. for a given user and beer, this would be the average of dot products between their latent representations, averaged over all models gathered on the Markov chain. You should then compute and report the root mean-squared error between these predictions, and the ground truth - you should obtain an RMSE of around 0.53 for all latent dimensions.

Moreover, since matrix factorization allows us to learn latent representations of data, we can use this to assess similarity of data - in our case, we can use the latent representations of beers to determine what beers are similar to other beers. To this end, for a dimensionality of $D = 2$, you should identify a set of beers (e.g. 5-7 or so) from the `beers.json`, and through a 2D scatterplot, plot their 2D latent representations, color-encoding each "cluster" of points (draws from the posterior) by the beer name. The distribution of each beer, and how distributions overlap, can then give us additional information on similarity. E.g. is the distribution Gaussian? Do certain beers have more spread in their posterior draws than others?

Last if you are implementing NUTS, then you should further run your implementation, just for latent dimension of 2, and verify the accuracy relative to the hard-coded parameters for standard HMC.

# Submission

Submit your assignment to Brightspace, include all of your code and the original data.

This assignment is due on **November 17**.

# Grading Criteria

## HMC (40 points)

* Implementation of leapfrog integration. (20 points)
* MH acceptance. (10 points)
* Overall algorithm structure of HMC is correct. (10 points)

## Logistic Regression (25 points)

* Correct implementation of the probability specification: log likelihood and log prior. (15 points)
* Computing averaged predictive probabilities and evaluating classification predictions. (5 points)
* Analysis of uncertainty in the predictions. (5 points)

## Matrix factorization (35 points)

* Correct implementation of the probability specification: log likelihood and all log priors. (25 points)
* Computing model average of preference predictions, and evaluating results. (5 points)
* Analyzing latent beer representations. (5 points)

## NUTS extra credit (50 points)

# Tips

* HMC requires evaluating the gradient of the log of the joint distribution _many times_. So you will want to ensure that this can be efficiently computed. In JAX, it is very easy to speed up code using _Just In Time_ (JIT) compilation. See the documentation [here](https://jax.readthedocs.io/en/latest/jax-101/02-jitting.html). The provided code has recommendations for this - only necessary for matrix factorization.
* For matrix factorization, you might find that for certain parameter settings, the MH acceptance criteria is never satisfied, especially at the beginning. This is expected; it is common to initialize HMC from a mode found via gradient descent on the log joint. You may opt to implement this, or alternatively, modify your HMC implementation to always accept the first steps taken (e.g. up to 50-100 steps), taking care that these will be considered burn-in steps, and thus not part of the Markov chain that is returned.
* One useful bit of debugging your HMC implementation is to verify that, once you start collecting samples for your Markov chain (e.g. after burn in), the Hamiltonian at the start of integration, and the Hamiltonian at the end of integration, are close to one another. If they are not, it is possible your parameters are inappropriately set (usually, the step size is too high). Otherwise, you might have a bug in your code.
