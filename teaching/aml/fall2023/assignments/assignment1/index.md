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
  <a href="/teaching/aml/fall2023">Overview</a>
  <a href="/teaching/aml/fall2023/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2023/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2023/assignments">Assignments</a>
  <a href="/teaching/aml/fall2023/project">Project</a>
</div>

---

<br>

# Assignment 1

Please show all of your work in support of answering the questions.

## Q1 (10 points)

(PML-1) Exercise 4.1 (found in Sec. 4.8). Derive the MLE for a univariate Gaussian, both mean and variance.

## Q2 (15 points)

(PML-1) Exercise 4.2.a and 4.2.b. (found in Sec. 4.8). Derive the MAP estimate for the mean of a Gaussian random variable, with known variance, under a particular prior. Further, show the MAP estimate's convergence to the MLE, as the number of samples increasees.

## Q3 (25 points)

(PML-1) Exercise 4.6. For concreteness, assume a beta-binomial model is used.

## Q4 (25 points)

In the normal-inverse gamma model, show that the posterior marginal for the regression weights (weight vector $\mathbf{w}$) is a multivariate Student's t-distribution; see (PML-2) Sec. 15.2.2.2.

**Hint**: consider applying a change of variables, and consider the normalizing constant for the gamma distribution.

## Q5 (25 points)

(GPML) Exercise 2.4 (found in Sec. 2.9).

This result states that, for Gaussian process regression, the variance in our predictions can _not_ increase as we are given more data, which we should expect. Moreover, your derivation should result in an incremental formula for computing variance.

 **Hint**: consider using the inversion formula for block structured matrices. In particular, note that the covariance/precision matrix is symmetric, which will help simplify the derivation.
