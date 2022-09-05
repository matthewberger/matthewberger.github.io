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
  <a href="/teaching/aml/fall2022">Overview</a>
  <a href="/teaching/aml/fall2022/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2022/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2022/assignments">Assignments</a>
  <a href="/teaching/aml/fall2022/project">Project</a>
</div>

---

<br>

# Assignment 2

In this assignment you will implement a method for Gaussian process binary classification using the Laplace approximation. This assignment will test your knowledge on the following concepts:
1. Setting up a prior, e.g. a Gaussian process prior.
2. Formulating a likelihood for binary classification.
3. Computing the MAP estimate via Newton's method.
4. Forming the predictive distribution.
5. Computing the averaged predictive probability, via Monte Carlo integration, in turn giving us predictions, and uncertainty in our predictions.

## Data

You will be applying your model to 2 datasets. Both of these datasets come from the [GLUE Benchmark](https://gluebenchmark.com/), a fairly standard benchmark for NLP models. Specifically, you will consider the Corpus of Linguistic Acceptability task (cola), and the Stanford Sentiment Treebank task (sst2). In these datasets, an input is a sentence, and an output is a binary label (0/1). In both cases, average-pooled contextualized representations from [RoBERTa](https://www.cs.princeton.edu/~danqic/papers/roberta_paper.pdf) have been extracted, these are 768-dimensional vectors. Data that you should use for building your model (train data) has been provided, along with validation data that you should use for assessing generalization. Moreover, the original sentences themselves are also provided. The filenaming convention is: "cola-sst2"\_"X-y"\_"train-val".npy for the appropriate numpy arrays. Similarly for the sentences, saved as JSON.

## Starter code

Starter code has been supplied in the file `gp.py`. You are free to build off of this, or start from scratch if you wish. Moreover, for experiments, you are free to work in the `main` of `gp.py`, but if you like, you may set up a separate script for experimentation.

[Please click here for data and code for this assignment](https://vanderbilt.box.com/s/o5lc87koimku31yx2l0tac1pcls5h1py).

## Gaussian process prior (20 points)

**class**: `GP`

You should first set up your Gaussian process prior on the latent function. This involves computation of the covariance function, which should expect two arguments, namely two sets of inputs. You should implement a **squared exponential covariance function**, which requires 2 hyperparameters: a (squared) length scale, and a signal variance.

## Computing the MAP (30 points)

**class**: `GPClassifier`

Once you have your Gaussian process prior set up, next you should implement an optimization method to compute the MAP estimate, e.g. finding the mode of the joint distribution of your data, and latent function. In other words, the product of your likelihood (Bernoulli presented with sigmoid applied to latent function), and your Gaussian process prior on latents.

It is recommended that you _first_ implement a method that computes the negative log likelihood: you may find this useful as you debug your code.

Next, you should implement Newton's method. Finding the mode should require _very few_ iterations, e.g. 10 or so. Once you find the mode, it is recommended to store it as an instance variable of class `GPClassifier`, for later use.

For numerical stability purposes, inverting the Hessian should be performed via application of the Woodbury matrix identity. See (GPML) Sec. 3.4.3 for further details.

## Forming the predictive distribution (15 points)

**class**: `GPClassifier`

You should next form the predictive distribution for your latent function, given a set of data instances (e.g. your validation inputs, but this could be arbitrary). For a _single_ input, this requires:
* Computing the predictive mean (a single scalar). This should be pretty straightforward.
* Computing the predictive variance (a single scalar). This is a bit more involved, since we need to combine two sources of variance: from the GP prior, _and_ the Laplace approximation.
The above two quantities will form the parameters of a Gaussian distribution. Note: this computation should be vectorized over _all_ input instances, using suitable matrix computations.

As above, numerically-stable matrix inversion is essential here, with details found in (GPML) Sec. 3.4.3.

## Computing the averaged predictive probability (15 points)

**class**: `GPClassifier`

Last, you will compute the averaged predictive probability, given your predictive distribution for your latents.

This involves performing Monte Carlo integration. For each point, you should:
1. Draw a set of samples from the predictive distribution.
2. Average the sigmoid-transformed samples.

## Analysis (20 points)

You should prepare a document for analyzing your model. This should be a LaTex document. You will need to perform two types of analyses.

### Impact on hyperparameters (10 points)

For both of the datasets, you should build a Gaussian process classifier across a set of hyperparameters. Provided in the starter code is a recommended set of hyperparameters, though you are not limited to this.

For each hyperparameter setting, you should compute the accuracy of the resulting model on, _both_, the **training data**, and the **validation data**. You should then prepare a table in your document comparing, for each dataset, their training/validation performance across hyperparameters.

Last, you should provide a discussion on your findings.

### The reject option (10 points)

Next, for each dataset, choose a hyperparameter setting, and build a GP classifier. Then, you will use the probabilities produced by the model to _reject_ samples that are of sufficiently-high uncertainty. Namely, for a specific threshold (e.g. in the range [0,0.5]), you should perform the following:

1. Gather all samples in the validation dataset whose uncertainty is _below_ the threshold. You can compute the uncertainty as $\|p(y_* \| \mathbf{x}_*) - 0.5\|$, whether predicting 0 or 1.
2. For _this subset of samples_, compute the accuracy on the ground truth.
3. Moreover, for all examples that were _retained_ at a given threshold, store their corresponding sentences.

For a series of thresholds, you will then plot the above 2 quantities - number of samples retained, and their accuracy - on the same graph, both as line plots. I have provided (commented out) code for plotting these two curves.

In your document, you should include these plots, accompanied with a discussion. What are your findings? Moreover, you should look to the examples you retained - at thresholds of your choosing - and assess whether these are "easy" examples.

As an example plot, please see the following image (details intentionally omitted):

{% include image.html url="/teaching/aml/fall2022/images/reject-curve-example.png" caption="Draws" width=512 align="center" %}

# Deliverables

On Brightspace, your submission should include:
1. Code
2. Data (nothing new you need to generate, just the original)
3. PDF formatted in LaTex

This assignment is due on **September 19**.

# Tips

* The core of this assignment (`GP` and `GPClassifier`) should require around 40 lines of code to write, assuming you are making good use of numpy. If you find yourself going far beyond this, then you may need to step back and reassess your approach.
* It is important to **debug your code**, at each step along the way. For instance, is your Gaussian process prior correctly implemented? Is a single step of Newton's method correct? What are sanity checks you can make about your predictive distribution? You should be asking yourself these kinds of questions as you complete the assignment.
