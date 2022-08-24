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
  <a href="/teaching/aml/fall2022">Overview</a>
  <a href="/teaching/aml/fall2022/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2022/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2022/assignments">Assignments</a>
  <a href="/teaching/aml/fall2022/project">Project</a>
</div>

---

<br>

# Assignment 1

Show all of your work in support of answering the questions.

## Q1 (20 points)

(PML-1) Exercise 4.1 (found in Sec. 4.8). Derive the MLE for a univariate Gaussian, both mean and variance.

## Q2 (30 points)

(PML-1) Exercise 4.2.a and 4.2.b. (found in Sec. 4.8). Derive the MAP estimate for the mean of a Gaussian random variable, with known variance, under a particular prior. Further, show the MAP estimate's convergence to the MLE, as the number of samples increasees.

## Q3 (20 points)

Derive the **mean** of the posterior predictive distribution for Bayesian linear regression, e.g. see (PML-1) Sec. 11.7.4. Linear Gaussian systems, found in (PML-1) Sec. 3.3, will be helpful.

## Q4 (30 points)

(GPML) Exercise 2.4 (found in Sec. 2.9).

This result states that, for Gaussian process regression, the variance in our predictions can _not_ increase as we are given more data, which we should expect. Moreover, your derivation should result in an incremental formula for computing variance - this is _really_ nice to have in certain situations.
