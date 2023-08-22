---
layout: default
title: Project
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

# CS 6362 - Advanced Machine Learning

---

<div class='topnav'>
  <a href="/teaching/aml/fall2023">Overview</a>
  <a href="/teaching/aml/fall2023/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2023/schedule">Schedule</a>
  <a href="/teaching/aml/fall2023/assignments">Assignments</a>
  <a class='active' href="/teaching/aml/fall2023/project">Project</a>
</div>

---

<br>

# Project

As part of this course you will form teams of 1-2 to work on a project.

For the project, you will go in-depth on a particular topic that we cover in class. Namely, during lectures we only cover the basics. In recent years, substantial research has been conducted in all of the areas that we cover. Your project should be situated in this research, specifically, papers published in the last 5-ish years at ICML, NeurIPS, ICLR, in addition to relevant papers within other areas such as computer vision (CVPR, ICCV, ECCV) and natural language processing (ACL, EMNLP, NAACL-HLT).

## Project proposal

You will first formulate a proposal. This shoud be, roughly, a 3-page document. Your proposal needs to include the following:

* **Basic Information**: title of project, team members.
* **Brief Description**: provide a 1 paragraph description of: (1) the research topic for your project, (2) general idea for your project, and (3) why this is of interest to you.
* **Hypotheses**: this is the _most important_ aspect of your proposal. What hypotheses do you intend to explore, if not answer, through your project? You may be interested in implementing a technique within a paper (or papers), and seek to understand a method's (or methods') behavior with respect to different data distributions, data size, data modalities, etc.. Alternatively, perhaps you have a hypothesis related to how 2 techniques might work together. Whatever the case, I expect to see clearly-defined hypotheses. See also **Project Tips** below.
* **Literature Survey**: discuss 4-5 papers that are relevant to the problem you will work on.
* **Data**: a description of the data you will use for your project. _Make sure the data exists and is accessible_.
* **Evaluation Plan**: what are the measures of success for your project? This, likely, will comprise quantitative evaluation.
* **Project Plan**: develop a timeline of activities for the proposal, and how the activities will be divided between team members.

Moreover: you will present your project proposal to the class.

### Project policies

For the project, you are free to use standard existing ML libraries, such as [PyTorch](https://github.com/pytorch/pytorch) or [Flax](https://github.com/google/flax).

The purpose of the project is for you to gain experience in (1) implementing machine learning algorithms, and (2) experimentally evaluating your implementation. As such, I will not allow projects where you use publicly-available code for a paper, as-is, e.g. with no modifications. However, if you intend to build off of existing code, then the work needs to be scoped appropriately.

If you have any doubts on whether your proposed project is suitable for the course, then please contact me prior to submitting the proposal. Please also see **Project Tips** below for some suggestions.

## Midway report

Midway through your project you will produce a report, roughly 5 pages, that should contain the following:

* **Introduction and Project Aims**: this should be a refinement of the description, and hypotheses, listed in your proposal.
* **Literature Survey**: provide a more detailed survey, e.g. 10-15 papers, of research relevant to your project.
* **Methods**: describe in detail what you will be doing for your project, and what you have already done.
* **Experimental Design**: describe in detail the experiments you will run, and have already ran.
* **Refinement of Plan**: discuss any potential modifications you will need to make from your original proposal.

## Presentation

At the end of the semester you will present your project to the class.

## Final Submission

For your final submission you will prepare an 8-page document (page length excludes references) that should take the form of a research paper:

* **Introduction**
* **Related Work**
* **Methods**
* **Experiments**
* **Discussion**

In addition, you will hand in all code related to your project, and documentation for how to run the code.

## Document Formatting

For all written portions of your project, you should use [NeurIPS](https://nips.cc/Conferences/2023/PaperInformation/StyleFiles) LaTex, preprint mode.

## Project Tips

As a general suggestion, I recommend looking ahead at the topics we will cover throughout the semester, much of which we will not have covered by the time of the proposal. You should identify a topic that looks interesting, and independently research the area. At the time of the proposal, understanding the details in a particular area is not too important. It is expected you will gain this knowledge over the semester as you steadily work on your project.

Below I list some flavors of projects. By no means are you limited to what is listed, so if you have other project ideas that don't fit, you should feel encouraged to pursue them.

### Novel data

You might wish to see how a given method performs on data that was never originally considered. The data that you choose to bring can differ in several ways: (1) by _type_ (e.g. discrete vs. continuous), (2) by _dimensionality_ (e.g. the data of interest is of higher dimension), (3) by _distribution_ (e.g. simple, maybe even synthetically generated, distributions vs. more complex, in-the-wild data distributions).

### Modeling assumptions

Bayesian approaches to machine learning require us to make modeling choices on data likelihoods and priors. Especially for neural networks, the impact of these choices is not entirely clear. Moreover, the choice of approximate inference scheme (e.g. some flavor of MCMC) can also have an impact. So studying how our modeling choices may impact some downstream task (e.g. prediction, uncertainty quantification, model selection) is of interest.

### Combining methods

It is common to see how two (or more) methods might be combined to achieve some task. In particular, bridging prediction with generation can offer some interesting topics to pursue, e.g. density estimation (normalizing flows, diffusion models) combined with active learning criteria, generative models as feature extractors for classification, etc..
