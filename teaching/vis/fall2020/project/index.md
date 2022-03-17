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

# CS 3891.04 / 5891.04 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/fall2020">Overview</a>
  <a href="/teaching/vis/fall2020/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2020/schedule">Schedule</a>
  <a href="/teaching/vis/fall2020/assignments">Assignments</a>
  <a class='active' href="/teaching/vis/fall2020/project">Project</a>
  <a href="/teaching/vis/fall2020/resources">Resources</a>
</div>

---

<br>

# Project

The final assignment in the course is a project. You will be expected to conduct a design study.

A **design study** is concerned with building a visual interface to understand a given problem. You will be expected to first **formulate a problem** that you are interested in, **find a dataset** that is pertinent to the problem, and derive a **set of questions** that you hope to answer about the data. You will then design a visualization that will help **answer these questions**.

## Milestones

For the project, there are a sequence of milestones that you must meet at their specified due dates. The milestones are intended to keep you on track for the project, to make sure that the choices you are making for the project are sound. Milestones for the project are:

* **Project formation**
* **Project proposal**
* **Project prototype**
* **Presentation and final project submission**

**Update on late assignments**: I will permit 1-day late submissions, taking 10 points off, for each of the milestones.

## Project Formation

Each project will be comprised by a team of **2-3 students**. Undergraduate and graduate students may be within a single team, or separate teams, no distinction will be made. If there are extenuating circumstances and you would rather work by yourself for the project, please contact me first.

You should maintain an Observable notebook for the project. The notebook will document all aspects of your project, and of course, the resulting visualization. You should make the notebook **shared**, so that I can view it, and all members of the team can collaborate on a single notebook, forking and merging as appropriate. If you are not comfortable working with shared notebooks then please let me know.

Once you have formed your team, you should create the notebook, and provide the following information in your notebook (written in Markdown):

* Project title
* Team members
* 1 paragraph description of your project. Characterize the problem domain that you are interested in. What problem do you intend to solve? No considerations need to be made regarding data, tasks, visualization decisions, etc..

Please email me a link to your shared notebook.

## Project Proposal

The proposal will outline all aspects of the project, and should be the equivalent of a 4-5 page document. You should write the description as [Markdown](https://www.markdownguide.org/cheat-sheet/) in your notebook. The proposal should include:

* **Basic Info:** Project title, team members.
* **Background and Motivation:** What are your motivations for choosing this project? Is the project related to your research interests, or something we covered in the lectures?
* **Objectives:** What do you hope to achieve in the project? What do you intend to learn as part of the outcome?
* **Data:** From where and how are you collecting data? If appropriate, provide a link to your data sources.
* **Data Processing:** How much do you intend to devote to typical data processing tasks, such as data cleanup, data aggregation, etc.. How much time do you intend to devote to this?
* **Must-Have Features:** List the features that are absolutely necessary for the project to be succesful.
* **Optional Features:** List the features that you think would be nive to have, but not critical.
* **Project Schedule:** Plan out the schedule for the project, on a weekly basis. Show how work will be delegated amongst the team members.
* **Visualization Design:** How will you display your data? Provide some general ideas that you have for the visualization design. Create three alternative designs for your visualization. Create one final design that incorporates the best of your three designs. Describe your designs and justify your choices of visual encodings. Consider using the [Five Design Sheet Methodology](http://fds.design/).

After you have submitted your proposal, I will coordinate times to meet with groups during office hours to provide feedback.

## Prototype

Approximately halfway through, you are expected to demonstrate a prototype for your project.

You should have completed your data collection and data cleaning, as well as have your data structures in place, with the ability to load up and visually display the data. But note that this is only a prototype, so if you are only able to load up a subsample of data due to performance limitations, that is ok.

You are also expected to demonstrate a working visualization prototype to the class. Not all of the views and interactions need be in place, but the direction that the project is headed must be clear.

Your **process book** (see below) should also contain the appropriate documentation regarding progess up to ths point.

If you have questions about what to show for the prototype please let me know.

## Process Book

As part of your notebook you will maintain a **process book** throughout the entire project in order to document all aspects of your work --- above and beyond your code. This is very important, as the steps you take to get to the final outcome is just as important as the outcome itself! So be dilligent with documenting your process: decisions that you made, prototypes, successes and failures. In particular, the process book should include the following:

* **Overview and Motivation:** Provide an overview of the project goals and the motivation for it. Consider that this will be read by people who did not see your project proposal.
* **Related Work:** Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
* **Questions:** What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?
* **Data:** Source, scraping method, cleanup, etc.
* **Implementation:** Describe the intent and functionality of the visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.
* **Exploratory Data Analysis:** What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?
* **Design Evolution:** What were the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. Did you deviate from your proposal?
* **Analysis:** What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it?

These sections, indeed, mirror the project proposal - if you do not deviate from your proposal, then the documentation of some of these sections (e.g. Questions, Data) will not be that much different from your proposal. However, it your project begins to deviate from your proposal, then your process book will allow you to document these changes.

## Presentation

You will be expected to present your project to the class. You will have 5 minutes to demonstrate your project, optionally with some slides if you wish to establish some content up front. The presentation should cover the following points:

* What's the best part of your project?
* Insights gained: what did you learn about the data?
* The main takeaways: what do you want people to know?

## Peer Assessment:

It is important to provide positive feedback to people who truly worked hard for the good of the team and to also make suggestions to those you perceived not to be working as effectively on team tasks. Please provide an honest assessment of the contributions of the members of your team, including yourself. The feedback you provide should reflect your judgment of each team member's:

* **Preparation:** Were they prepared during team meetings?
* **Contribution:** Did they contribute productively to the team discussion and work?
* **Respect:** Did your team members encourage others to contribute their ideas?
* **Flexibility:** Were they flexible when disagreements occurred?

Your teammate's assessment of your contributions and the accuracy of your self-assessment will be considered as part of your overall project score.

Please email me, directly, your peer assessment.

## Schedule and Project Assessment

* Team Formation: 5%
	* Due: October 28
* Project proposal: 10%
	* Due: November 6
* Prototype: 25%
	* Due: November 18
* Presentation: 10%
	* To be held: week of December 1
* Final Project Submission: 50%
	* Due: December 11

## Acknowledgements

The structure of the project was influenced by the Vis projects of [Hanspeter Pfister](http://www.cs171.org/2018/project/), [Alexander Lex](http://dataviscourse.net/2018/project/), and [Alvitta Ottley](https://classes.engineering.wustl.edu/cse557/spring2017/). Please visit their respective websites for inspiration on choosing projects.
