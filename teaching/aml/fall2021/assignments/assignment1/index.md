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
  <a href="/teaching/aml/fall2021">Overview</a>
  <a href="/teaching/aml/fall2021/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2021/schedule">Schedule</a>
  <a class='active' href="/teaching/aml/fall2021/assignments">Assignments</a>
  <a href="/teaching/aml/fall2021/project">Project</a>
</div>

---

<br>

# Assignment 1

Show all of your work in support of answering the questions.

## Q1 (10 points)

Given a random vector $\mathbf{x} \in \mathbb{R}^d$, distributed as a multivariate normal $\mathbf{x} \sim \mathcal{N}(\boldsymbol{\mu},\mathbf{\Sigma})$ with mean $\boldsymbol{\mu} \in \mathbb{R}^d$ and covariance $\mathbf{\Sigma} \in \mathbb{R}^{d \times d}$, if we apply a linear transformation $A \in \mathbb{R}^{d \times d}$ to the random vector, what is its resulting distribution?

## Q2 (10 points)

"Complete the square" in Eq. 2.7 (**Rasmussen & Williams**), namely, derive the posterior.

## Q3 (30 points)

Derive the predictive distribution in Eq. 2.9 (**Rasmussen & Williams**), namely, the mean and variance.

* Hint 1: for the mean, this requires taking the expectation of the integral, so recommended to break this up into 2 problems: compute the expectation, then plug that into the integral.
* Hint 2: this problem requires the evaluation of multidimensional integrals of Gaussians, consider a change of variable to reduce the integrals to really simple forms.

## Q4 (20 points)

Derive the noise-free predictive distribution in Eq. 2.19 (**Rasmussen & Williams**).

Hint: write the conditional distribution in terms of the joint distribution and the prior, take the log, and use the matrix identities found in Appendix A.3 (**Rasmussen & Williams**). You may want to review the Schur complement.

## Q5 (30 points)

Exercise 4 in Ch. 2 of (**Rasmussen & Williams**). Exercises can be found in Sec. 2.9 (end of chapter).

This result states that the variance in our predictions can _not_ increase as we are given more data, which we should expect. Moreover, your derivation should result in an incremental formula for computing variance - this is _really_ nice to have in certain situations.
