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
  <a href="/teaching/aml/fall2022">Overview</a>
  <a href="/teaching/aml/fall2022/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2022/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2022/assignments">Assignments</a>
  <a href="/teaching/aml/fall2022/project">Project</a>
</div>

---

<br>

# Assignment 4

In this assignment you will implement Hamiltonian Monte Carlo to perform approximate inference for matrix factorization.

## Problem Domain and Probabilistic Model

The data that you are provided is a set of user preferences for different kinds of beers (for further information please see [this link](https://cseweb.ucsd.edu/~jmcauley/datasets.html#multi_aspect)). A single data item consists of (1) a user id, (2) a beer id, and (3) a preference. The preference can be treated as a scalar, in the range of 1 (bad taste) to 5 (great taste). There are approximately 6100 users and 6900 beers in this dataset. For training, you are provided approximately 1.1M data items; thus, this represents a relatively small proportion (around 2.6%) of the total number of possible preferences. For testing, you are provided a set of approximately 100K data items. The objective is reminiscent of a recommendation system: for a given user, and a given beer, we want to predict the user's preference for the beer.

The way in which we will make predictions is to learn latent representations of users and beers. Specifically, for each user indexed by $i$ we will associate a latent vector $\mathbf{u}_i \in \mathbb{R}^D$ for some (user-specified) dimension $D$. Likewise, for each beer indexed by $j$ we will associate a latent vector $\mathbf{v}_j \in \mathbb{R}^D$ of the same dimension. The preference score for user $i$ and beer $j$ is formed by taking their dot product: $\mathbf{u}_i^T \mathbf{v}_j$.

This can be viewed as a problem of matrix factorization, but for the assignment, you will be probabilistic about predictions. The probabilistic model you will implement for matrix factorization is a simplified version of the approach proposed in the [Bayesian matrix factorization](http://www.cs.cmu.edu/~rsalakhu/papers/bpmf.pdf) paper. More specifically, the model can be broken down into the following:

### Likelihood

We have the following Gaussian likelihood:

$p(\mathcal{T} | \mathbf{U},\mathbf{V}) = \prod_{(i,j,v) \in \mathcal{T}} \mathcal{N}(v \| \mathbf{u}_i^T \mathbf{v}_j, 1)$,

where the $(i,j,v)$ triplet is a training data item that respectively contains user id $i$, beer id $j$, and preference value $v$. Matrices $\mathbf{U}$ and $\mathbf{V}$ contain, respectively, the latent user vectors and latent beer vectors.

### Priors

We will endow a Gaussian prior shared across all latent user representations:

$p(\mathbf{U} \| \lambda_u) = \prod_{i=1}^N \mathcal{N}(\mathbf{u}_i \| \mathbf{0}, \lambda_u^{-1}\mathbf{I})$,

where $\lambda_u$ is a precision hyperparameter. Likewise, we will endow a Gaussian prior shared across all latent beer representations:

$p(\mathbf{V} \| \lambda_v) = \prod_{i=1}^N \mathcal{M}(\mathbf{v}_i \| \mathbf{0}, \lambda_v^{-1}\mathbf{I})$,

where $\lambda_v$ is a precision hyperparameter. Last, the hyperparameters will be endowed with Gamma priors:

$p(\lambda_u) = Ga(\lambda_u \| 2,2)

$p(\lambda_v) = Ga(\lambda_v \| 2,2)

The fixed values of 2 in the above can be modified to your liking.

### Inference

We are concerned with performing inference, and thus, drawing samples from the posterior distribution. Given the above model definition, a "sample", indexed by $s$ is comprised of a user representation matrix $\mathbf{U}_s$, a beer representation matrix $\mathbf{V}_s$, and precision parameters $\lambda_{u,s}$ and $\lambda_{v,s}$. For computing the predictive distribution, we perform Monte Carlo integration with the drawn user and beer matrices over the withheld test preferences (user-beer pairings). MC integration will provide us with the predictive mean.

### Data and starting code

You can find data and starting code for the assignment [at this link](https://vanderbilt.box.com/s/e7qm6j6fjpz11280j44tt4sqhdtywsl5).

## Deriving and implementing Bayesian matrix factorization (35 points)

For HMC, we only require the unnormalized posterior, specifically the **log of the joint distribution** of data and model parameters. So the first thing you should do is derive the log joint - combine the likelihood with the priors. As part of a document you will prepare for the assignment, you should explicitly show your derivation, gathering all terms that are required for the log joint distribution - user/beer latent representations. and user/beer precision hyperparameters - and discarding constants. Your final derivation should be one that is both _efficient_  and _numerically-stable_ to compute.

As in the previous assignment, you should implement this as a function for which we can call `jax.grad` to perform automatic differentiation in computing gradients.

## Hamiltonian Monte Carlo (40 points)

Your implementation of Hamiltonian Monte Carlo should be rather straightforward, without any bells & whistles of adaptive steps, step sizes, etc.. Instead these will be treated as fixed parameters.

The main components of HMC are the following:

* You will implement the **leapfrog integrator**, in order to give us volume-preserving mappings in phase space. The step size $\varepsilon$ is a constant that you will specify.
* In your MCMC loop, to generate a sample in the chain you will take $L$ leapfrog steps. At the end, you should take a Metropolis-Hastings correction, in the event that you incur numerical error in integration. Error here refers to the Hamiltonian at the end of integration being greater than the Hamiltonian at the start.
* To generate draws from the posterior, you should specify the number of **burn-in** steps corresponding to samples you will discard. Afterwards, from the MCMC draws you should compute the predictive mean, via Monte Carlo integration, for _each_ test preference in an **online manner**, without explicitly storing the posterior draws. Given the number of model parameters, and the chain length, storing all samples can easily overwhelm memory.

## Analysis (25)

You will prepare a document that, in addition to containing your derivations for the log-joint as mentioned above, should contain the following analyses:

### Trace plots of precision

To assess convergence of a Markov chain to the stationary distribution, it is common to show so-called **trace plots** (see: (PML-2) Sec. 12.6.2.1) , where we run **multiple chains**, and for each we store (certain) model parameters over the course of MCMC. Last, for a single parameter we plot its values over all iterations as a line plot, one for each chain. In other words, if our starting points are different, then where we end up through MCMC should be (roughly) the same.

You should generate trace plots for both of the precision hyperparameters, for 5 different chains. Each chain should be distinguished by a unique initial number for the pseudorandom number generator (see `utils.py` at the very top, default to 0). You should set $D = 2$, in order to more-efficiently generate these results.

### Latent beer posterior

Matrix factorization approaches allow us to learn latent representations of data, which we can use to assess similarity - in our case, we can use this to see what beers are similar to others. A Bayesian approach to matrix factorization then allows us to represent a single beer as a distribution - a set of latent vectors drawn from the posterior - and in turn compare distributions. This bears similarity to variational autencoders.

To this end, for a dimensionality of $D = 2$, you should store all latent beer representations, post burn-in, obtained during a run of HMC. Note that this should be possible to store all in memory, given the low dimensionality. Then, you should identify a set of beers (e.g. 5-7 or so) from the `beers.json`, and through a 2D scatterplot, plot their 2D latent representations, color-encoding each "cluster" of points (draws from the posterior) by the beer name. The distribution of each beer, and how distributions overlap, can then give us additional information on similarity. E.g. is the distribution Gaussian? Do certain beers have more spread in their posterior draws than others?

### Bayesian marginalization v. point estimates

Last, you will assess performance of the mean of the predictive distribution, e.g. Bayesian marginalization, in comparison to the performance from **individual draws** from the posterior - those collected during an HMC run. After burn-in, at each iteration you should compute and store the RMSE given the sample drawn from the posterior, as well as the current mean of the predictive distribution (recall: this is computed online during HMC). Upon conclusion of HMC, you should plot these as superimposed line plots. We should see the benefit of Bayesian model averaging over merely taking individual point estimates.

This process should be done for different dimensions: $D = 2, 4, 8, 16$.

# Deliverables

On Brightspace, your submission should include:
1. Code
2. Data (nothing new you need to generate, just the original)
3. PDF formatted in LaTex

This assignment is due on **November 4**.

# Tips

* HMC requires evaluating the gradient of the log-joint _many times_. So you will want to ensure that this can be efficiently computed. In JAX, it is very easy to speed up code using _Just In Time_ (JIT) compilation. See the documentation [here](https://jax.readthedocs.io/en/latest/jax-101/02-jitting.html). The starting code has some suggestions for doing this - it is straightforward to use, but unfortunately, runs into difficulties when integrating with classes, and hence I recommend JIT'ing independent of classes.
* Another source of code optimization is recognizing that the leapfrog integrator need only take the gradient of the log-joint once per step, not twice.
* The ability to debug your code in this assignment is important. You can verify that your probabilistic model implementation is correct by evaluating on a witheld set of data. As for HMC, a nice bit of debugging is to verify that the Hamiltonian remains approximately constant after each update. You will find that the Hamiltonian starts to deviate when your step size is too large, a consequence of numerical error in the integration.
