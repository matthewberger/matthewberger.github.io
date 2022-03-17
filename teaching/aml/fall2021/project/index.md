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
  <a href="/teaching/aml/fall2021">Overview</a>
  <a href="/teaching/aml/fall2021/syllabus">Syllabus</a>
  <a href="/teaching/aml/fall2021/schedule">Schedule</a>
  <a href="/teaching/aml/fall2021/assignments">Assignments</a>
  <a class='active' href="/teaching/aml/fall2021/project">Project</a>
</div>

---

<br>

# Project

As part of this course you will form teams of 1-2 to work on a project.

The purpose of the project is for you to go in-depth on a particular topic that we cover in class. Namely, during lectures we only cover the basics. In recent years, substantial research has been conducted in all of the areas that we cover. Your project should be situated in this research, specifically, papers published in the last 5-ish years at ICML, NeurIPS, ICLR, in addition to relevant papers within other areas such as computer vision (CVPR, ICCV, ECCV) and natural language processing (ACL, EMNLP, NAACL-HLT).

## Project Proposal

You will first formulate a proposal. This shoud be, roughly, a 3-page document. Your proposal needs to include the following:

* **Basic Information**: title of project, team members.
* **Brief Description**: provide a 1 paragraph description of: (1) the research domain in which your project is based, e.g. deep GPs, domain adaptation, few-shot learning, etc.., (2) general idea for your project, and (3) why this is of interest to you.
* **Hypotheses**: this is the _most important_ aspect of your proposal. What hypotheses do you intend to explore, if not answer, through your project? You may be interested in implementing a technique within a paper (or papers), and seek to understand a method's (or methods') behavior with respect to different data distributions, data size, data modalities, etc.. Alternatively, perhaps you have a hypothesis related to how 2 techniques might work together. Whatever the case, I expect to see clearly-defined hypotheses.
* **Literature Survey**: discuss 4-5 papers that are relevant to the problem you will work on.
* **Data**: a description of the data you will use for your project. _Make sure the data exists and is accessible_.
* **Evaluation Plan**: what are the measures of success for your project? This, likely, will comprise quantitative evaluation.
* **Project Plan**: develop a timeline of activities for the proposal, and how the activities will be divided between team members.

Moreover: you will present your project proposal to the class.

### Proposal Caveats

I will not allow projects where you choose to implement a paper, and this paper already has publicly-available code (whether or not from paper authors).

I will not permit projects that build off of existing research projects. Everyone should be starting from the same baseline. Having said that, if you are interested in using data that pertains to your research, this is acceptable. You should try to minimize data cleaning / wrangling.

## Midway Report

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

For all written portions of your project, you should use [NeurIPS style](https://nips.cc/Conferences/2020/PaperInformation/StyleFiles) LaTex.

## Project Schedule

* Proposal due **October 18**.
* Midway report due **November 10**.
* Final submission due **December 8**.
