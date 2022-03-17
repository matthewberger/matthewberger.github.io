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

# CS 8395-03 - Visual Analytics & Machine Learning

---

<div class='topnav'>
  <a href="/teaching/vaml/spring2019">Overview</a>
  <a href="/teaching/vaml/spring2019/syllabus">Syllabus</a>
  <a href="/teaching/vaml/spring2019/schedule">Schedule</a>
  <a class='active' href="/teaching/vaml/spring2019/project">Project</a>
  <a href="/teaching/vaml/spring2019/papers">Papers</a>
  <a href="/teaching/vaml/spring2019/resources">Resources</a>
</div>

---

<br>

# Project

The project for this course covers the vast majority of your grade. It will span the entire semester. The project is structured in a manner similar to a research paper, and you should treat it as such. It is composed of the following pieces:

* **Abstract and Introduction**: this is your proposed research idea that you want to pursue for the course. You will be expected to present your idea to the class.
* **Related Work**: this is all works related to your project, and includes a baseline comparison that you are required to implement. Think of the baseline as a mini-project, a prelude of sorts to the main project. You will be expected to present all related work, describe your baseline implementation, and demonstrate it to the class.
* **Technical Approach**: this is the implementation of your idea. You will be expected to present 2 separate updates to the class throughout the semester, to show the progress of your project.
* **Results**: this is the presentation of your project. You will be expected to present this to the class at the end of the semester, demonstrating your project, insights gained, comparisons to the baseline you previously implemented, and an assessment of strengths/weaknesses.

Each piece is described in more detail below.

## Project Proposal (Abstract and Introduction)

The proposal will outline all aspects of the project, and should reflect the content of an abstract, and introduction, in a typical research paper. It is a document that you must write up, and should include the following:

* **Basic Info:** Project title. A link to your GitHub for the project. You can choose to make it public or private, but if the latter, then you will need to grant me access.
* **Description:** Provide a brief description (1 paragraph) of what you propose to do.
* **Background:** Motivate your project: what is the importance of the problem you are addressing? Where does existing work fall short in addressing the problem? How do you think your project will advance the field? What is the novelty of your proposed work?
* **Data:** Describe the data that you plan on working from, and how much data cleaning, munging, etc.. is necessary for the project.
* **Baseline:** Identify an existing approach (baseline) that you intend to implement (and eventually compare against).

Last, you will need to provide a **Schedule** for the project, on a week-to-week basis. **This is essential**. You should break up your schedule according to the individual project requirements (discussed in more detail in subsequent sections):
* **Baseline**: what is your plan for implementing the baseline? Decompose this into: languages/libraries that you will use, _or need to learn_, any necessary data gathering and processing, the individual pieces of the baseline, etc..
* **Project Updates**: what do you plan to have done by each of the updates? Be as specific as possible: outline all of the work that you will need to consider for each update.
* **Project Submission**: post-updates, what do you need to do to wrap up the project? How do you plan to perform evaluation? Compare against your baseline?

**Proposal Presentations will be held on January 23rd**. You will be expected to present your proposed work to the class, as a 5-minute presentation.

**Project Proposals are due on January 28th**. This refers to the document consisting of the above information.

## Baseline (Related Work)

The baseline should serve as your related work in a research paper. You will be responsible for the following:

* **Get your data**: _get situated with data_. Do all of your data cleaning, aggregation, etc..
* **Initial Visual Exploration**: before considering a baseline, first get familiar with your data. Use some existing visualization tools that enable basic exploration. Please see [resources]() for example tools. Note: the tools you use will likely fall short of what you, ultimately, want to do, thus necessitating the development of bespoke visualizations.
* **Identify and implement a baseline**: given your proposed work, identify the most relevant approach. Perhaps your project is inspired by this approach, or you would like to compare your project to this work. You will then be expected to implement this baseline.

**Baseline Updates will be held on February 11th**. At this time, I expect to see that the data is all set up, you have experimented with some existing visualization tools, you have settled on a visualization library that you will use for your baseline implementation, and you have made some progress on the implementation.

**Baselines will be due on February 25th**. You will be expected to have implemented your baseline in full. You should provide an accompanying document describing the features of the baseline. All of this should be on your GitHub project.

**Baseline presentations will be held the week of February 25th**. You will be expected to present _related work to your project_, not just the baseline. Then, you will be expected to explain, and demonstrate, your baseline. Plan for a 10-minute presentation.

## Project Updates (Technical Approach)

The project updates are intended to keep you on track for completing your project; it is useful to think of these as fleshing out the technical approach section of a research paper. There will be two separate updates. No formal document is required. I will be using your project proposal as a means of evaluating your updates.

**Project update 1 will be held on March 20**. Plan for a 3-minute presentation.

**Project update 2 will be held on April 3**. Plan for a 3-minute presentation.

## Project Presentation and Submission (Results)

The project presentation can be viewed as the results section of your paper. You will present to the class your project, and submit all code, along with a written document of your project.

**Project presentations will be held on April 17th and April 22nd**. Your presentation should be all-encompassing. What problem are you addressing? How is it an improvement over related work? What is your technical approach? And then, demonstrate your project. Showcase all of its features. What are its strengths and weaknesses? Show what insights you have found through your approach. Plan for a 10-minute presentation.

**Final project submissions are due on April 26**. Your final submission should include all of your code, a formal write up of the technical approach details, results which show your project in action, comparisons to your baseline, along with any relevant supporting results (timings, accuracy, etc..).
