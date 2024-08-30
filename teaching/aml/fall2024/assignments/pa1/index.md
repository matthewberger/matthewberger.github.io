---
layout: default
title: Assignment 1
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

# Assignment 1

In this assignment you will implement, and study, different forms of gradient descent. Specifically, different implementations of gradient descent can be categorized based on the following:
* The data used to compute a gradient.
* How a direction of descent is formed.
* The choice of step size for each step.
* The parameter update.
You will implement different schemes for each of the above. 

The code for this assignment can be [found here](https://vanderbilt.box.com/s/zeuvsthig8cmv5dl2w8pwcneofmxtaef).

## Problem setup

You will be expected to implement a L2-regularized logistic regression model for performing binary classification.

Specifically, the data corresponds to [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html). You will build a model to categorize images into one of two classes. The specific classes chosen for the problem will determine the difficulty of the classification problem.

As part of your model, you will need to support a number of functions:
* Weight vector initialization.
* Computing the (averaged) negative log likelihood (NLL) on training/validation data.
* Computing the accuracy of the model's prediction on validation data.
* Gradient and Hessian of the NLL. You may use JAX auto-differentiation for this purpose, but note that explicit formulas can be found in the lecture notes.
Make sure your code takes advantage of matrix computations, and vectorization, offered by JAX/NumPy. The only loop in your implementation should be your optimization loop.

## Data access

Your implementation should support accessing subsets of the training data at each dataset. This could be either the full dataset, a minibatch of data, or just a single data item in the case of stochastic gradient descent.

## Descent direction

You should support two kinds of descent directions:
* Gradient of the loss.
* A descent direction corresponding to Newton's method. This requires, both, the gradient and the Hessian of the loss.

## Step size

There are two kinds of step size schemes:
* A constant step size.
* A step size that diminishes over the course of optimization. Specifically, you should implement the scheme in [Bottou et al.](https://epubs.siam.org/doi/10.1137/16M1080173) Eq. (4.20).
Your step size should be expressed as a scaling of the Lipschitz constant of the loss gradient. This is straightforward to compute; please see the lecture notes.

## Parameter update

Your implementation should support three types of parameter updates:
* Standard gradient update. This is done for you in the provided code, as it is effectively an identity mapping (once you have the descent direction).
* An implementation of [SAGA](https://arxiv.org/pdf/1407.0202), for variance reduction in SGD. See also [Bottou et al.](https://epubs.siam.org/doi/10.1137/16M1080173) Sec. 5.3.2. Note: your implementation of SAGA should be _efficient_, e.g. you should allow for incremental updates of the averaged gradient.
* An implementation of gradient descent with momentum. See [Bottou et al.](https://epubs.siam.org/doi/10.1137/16M1080173) Sec. 7.1.
The above updates should **return a direction** that will subsequently be scaled by the step size, and subtracted off from the weight vector, in your optimization loop.

## Optimization loop

Once you have implemented the above pieces, you will then put them together in a single optimization loop.

In principle, you should be able to combine _all_ of the different flavors of data access, descent directions, step size schemes, and parameter updates.

In practice, you should not do this. Certain combinations make little sense (e.g. Newton's method with accessing a single data item).

The specific combinations you should study are detailed below in the experiments.

# Experiments

To test out your implementation you will run the following experiments.

## Performance as a function of data access

One way to measure the effectiveness of an optimization method is to assess how well a method performs based on how many data items it has "seen" during optimization. For instance, full batch gradient descent needs to see all data items to take a single step, whereas SGD requires just a single data item to take a step.

For this experiment, you will evaluate the following schemes:
1. Full batch gradient descent, using a standard gradient update and constant step size.
2. Newton's method (full batch), using a standard update and constant step size.
3. Minibatch gradient descent, of varying minibatch sizes, using standard update and a diminishing step size.
4. Stochastic gradient descent (special case of above with minibatch size set to 1), using standard update and a diminishing step size.
You will consider two classification problems for CIFAR-10: birds vs. airplanes, and deer vs. horses. For each problem you will show, as superimposed line plots, the number of data items (x-axis) accessed against the **training loss** (y-axis) gathered over the course of optimization. Moreover, compute the validation accuracy for each method, and show the results in a table. Provide a discussion on your findings, supplied as individual Markdown cells in the notebook.

Please see notebook `data_access.ipynb` for this experiment, and details on parameters that you should set in the above methods.

## A comparison of stochastic gradient methods

Stochastic gradient methods all seek fast convergence, while maintaining stability in updates (e.g. suppressing gradient noise). In this experiment we will study the behavior of different SGD methods, and in particular how well they generalize as a function of optimization step (in contrast with the previous experiment that studies training behavior).

Specifically, you will consider the following schemes:
1. Stochastic gradient descent, with standard update, with diminishing step size.
2. Stochastic gradient descent, with standard update, and constant step size.
3. The SAGA update, with constant step size.
4. Gradient descent with momentum, with diminishing step size.
What you will show for this experiment is very similar to the previous (same datasets, line plots, accuracy), but show **validation loss** rather than training loss. Moreover, the x-axis should simply correspond to the iteration number in SGD. Report your findings in the notebook as separate Markdown cells. Note: SAGA uses a constant step size; how does this compare with a constant step size in SGD?

Please see notebook `sgd_comparison.ipynb` for this experiment, and details on parameters that you should set in the above methods.

## Study of convergence

SGD methods can be shown to converge, but only if certain conditions are met. In practice, these conditions often cannot be determined, e.g. bounds on the gradient's second moment. Thus, we might not always observe convergence. This can be revealed by running an SGD method multiple times with different random seeds, inducing randomness across (1) initialization and (2) choice of data items in optimization.

To study convergence, you will inspect two methods:
1. Stochastic gradient descent, with standard update, with diminishing step size.
2. The SAGA update, with constant step size.
You will run each method multiple times. At the conclusion of each run, you should compute the training loss and validation loss. You should then show a scatterplot where the x-axis corresponds to the training loss, the y-axis the validation loss, and each point is a single optimization run. Points should be colored to distinguish the different methods (SAGA vs. SGD). Report your findings.

Please see notebook `convergence.ipynb` for this experiment, and details on parameters that you should set in the above methods.

# Extra credit

In a separate document (LaTex-formatted PDF, or scan of paper), show that for logistic regression, the Lipschitz constant for the gradient of the loss (negative log likelihood) gives the matrix norm of $\mathbf{X}^T \mathbf{X}$, with $\mathbf{X}$ being the data matrix.

# Submission

When submitting your assignment to Brightspace, be sure to include all of your code, and only your code. **Exclude the dataset from your submission**. Please prepare your assignment so that I can easily run your notebooks.

This assignment is due on **September 13**.

# Grading criteria

## Gradient descent implementation (55 points)

* Data access. (5 points)
* Implementation of logistic regression (loss, gradient, Hessian, Newton step). (15 points)
* Diminishing step size. (5 points)
* SAGA implementation. (10 points)
* Gradient descent with momentum. (10 points)
* Optimization loop. (10 points)

## Part 2 (45 points)

Each of the experiments are equally weighted (15 points a piece).

## Extra credit (15 points)

# Implementation Tips

* [matplotlib is your well-documented friend](https://matplotlib.org/). Please feel free to modify any of the accompanying plotting code as you see fit, in order to clearly communicate your experimental results.
* The code for this assignment utilizes closures. In particular, for certain closures, if you would like to access variables from outside of the scope, then you will need to use the `nonlocal` syntax in Python.
* **JAX** has _most_ of the functionality of NumPy. Using JAX is as simple as replacing your `import numpy as np` code with `import jax.numpy as np`. The **big difference** between NumPy arrays, and JAX arrays, is that JAX arrays are **immutable**. That is, you cannot slice existing arrays to assign new values. This will be relevant for the SAGA implementation. In particular, I recommend representing the list of gradients not as a JAX array, but, as ... a list of gradients. Then, you can easily assign new data to items of the list.
