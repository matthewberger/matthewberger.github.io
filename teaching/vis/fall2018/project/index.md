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

# CS 3891.06 / 5891.06 - Introduction to Visualization 

---

<div class='topnav'>
  <a href="/teaching/vis/fall2018">Overview</a>
  <a href="/teaching/vis/fall2018/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2018/schedule">Schedule</a>
  <a href="/teaching/vis/fall2018/assignments">Assignments</a>
  <a class='active' href="/teaching/vis/fall2018/project">Project</a>
  <a href="/teaching/vis/fall2018/resources">Resources</a>
</div>

---

<br>

# Project

The final assignment in the course is a project. You have the choice of two different types of projects: a technique project and a design study project.

A **technique project** is concerned with implementing a visualization technique, and understanding its effectiveness. The technique must be based on a paper published in the proceedings of IEEE Vis, beit SciVis, InfoVis, or VAST, **within the past 5 years**, as well as other papers if applicable. Techniques are intended to be applicable to a certain type of data, thus to demonstrate a technique's effectiveness you will also be responsible for collecting a **set of datasets**, at least 2, and ideally data that was not considered in the original paper. Through this process, you are expected to show the technique's **advantages and disadvantages**.

A **design study** is concerned with building a visual interface to understand a given problem. You will be expected to first **formulate a problem** that you are interested in, **find a dataset** that is pertinent to the problem, and derive a **set of questions** that you hope to answer about the data. You will then design a visualization that will help **answer these questions**.

## Milestones

Common to both types of projects are a sequence of milestones that you must meet at their specified due dates. Unlike assignments, there will be **no credit** given to milestones that are submitted late. The milestones are intended to keep you on track for the project, to make sure that the choices you are making for the project are sound. Milestones for the project are:

* **Project team** and **Project description**
* **Project proposals**
* **Project updates**
* **Prototype**
* **Presentation and final project submission**

## Team Formation and Project Description

Each project will be comprised by a team of **2-3 students**. Undergraduate and graduate students may be within a single team, or separate teams, no distinction will be made. If there are extenuating circumstances and you would rather work by yourself for the project, please contact the instructor first.

The project description will be 3-4 sentences, providing an overview of what you hope to accomplish. For the _design study_ you should describe the type of problem you are interested in addressing, as well as any specifics on the data you want to visualize. For _technique_, you should identify a topic of interest, and corresponding set of papers that you are interested in, of which one of them you will eventually select for the project.

Last, you should setup a project on GitHub that is shared by your team. Every aspect of the project should be included there.

## Proposal

The proposal will outline all aspects of the project, and should be a 4-5 page document. Common to both types of projects, the proposal should include:

* **Basic Info:** Project title, team members, link to project repository.
* **Background and Motivation:** What are your motivations for choosing this project? Is the project related to your research interests, or something we covered in the lectures?
* **Objectives:** What do you hope to achieve in the project? What do you intend to learn as part of the outcome?
* **Data:** From where and how are you collecting data? If appropriate, provide a link to your data sources.
* **Data Processing:** How much do you intend to devote to typical data processing tasks, such as data cleanup, data aggregation, etc.. How much time do you intend to devote to this?
* **Must-Have Features:** List the features that are absolutely necessary for the project to be succesful.
* **Optional Features:** List the features that you think would be nive to have, but not critical.
* **Project Schedule:** Plan out the schedule for the project, on a weekly basis. Show how work will be delegated amongst the team members.

And specific to the project types:

### Technique

* **Visualization Technique:** Provide a link to the paper you are going to implement, and a detailed description of how you plan on implementing it. What data analysis is necessary? How are you going to visually encode the data? If you are only going to consider parts of the paper, please specify which parts. If you plan on extending certain aspects of the paper, using other techniques, please include these details.
* **Analysis:** Describe how you are going to analyze the technique with the data that you collect.

### Design Study

* **Visualization Design:** How will you display your data? Provide some general ideas that you have for the visualization design. Create three alternative designs for your visualization. Create one final design that incorporates the best of your three designs. Describe your designs and justify your choices of visual encodings. Consider using the [Five Design Sheet Methodology](http://fds.design/).

## Project Updates

On Wednesdays, we will devote some class time to having all of the teams give brief updates on their project.

## Prototype

Approximately halfway through, you are expected to hand in your code and process book, demonstrating a prototype for your project.

You should have completed your data collection and data cleaning, as well as have your data structures in place, with the ability to load up and visually display the data. But note that this is only a prototype, so if you are only able to load up a subsample of data due to performance limitations, thats ok.

For the **design study**, you should have a working visualization prototype. Not all of the views and interactions need be in place, but the direction that the project is headed must be clear.

For the **technique**, you should at least have a rough implementation of the method working. Not all of the visual encodings associated with the technique need to be present, nor the analysis of the technique with multiple datasets, but the core of the method should be running, and the remaining pieces of the technique to be implemented should be clear.

If you have questions about what to show for the prototype please contact the instructor.

## Process Book

You will maintain a **process book** throughout the entire project in order to document all aspects of your work --- above and beyond your code. This is very important, as the steps you take to get to the final outcome is just as important as the outcome itself! So be dilligent with documenting your process: decisions that you made, prototypes, successes and failures. In particular, the process book should include the following:

* **Overview and Motivation:** Provide an overview of the project goals and the motivation for it. Consider that this will be read by people who did not see your project proposal.
* **Related Work:** Anything that inspired you, such as a paper, a web site, visualizations we discussed in class, etc.
* **Questions:** What questions are you trying to answer? How did these questions evolve over the course of the project? What new questions did you consider in the course of your analysis?
* **Data:** Source, scraping method, cleanup, etc.
* **Implementation:** Describe the intent and functionality of the visualizations you implemented. Provide clear and well-referenced images showing the key design and interaction elements.

And specific to the project types:

### Technique

* **Visualization Technique:** What were the difficulties in implementing the paper? What did you have to learn, above and beyond the paper, in order to implement it? 
* **Evaluation:** What did you choose to evaluate the technique? Did you follow the experimental setup as described by the paper, or did you pursue a different form of evaluation?
* **Analysis:** What did you learn about the technique by applying it to the different datasets? How can you characterize the technique's strengths and weaknesses in terms of the data?

### Design Study

* **Exploratory Data Analysis:** What visualizations did you use to initially look at your data? What insights did you gain? How did these insights inform your design?
* **Design Evolution:** What were the different visualizations you considered? Justify the design decisions you made using the perceptual and design principles you learned in the course. Did you deviate from your proposal?
* **Analysis:** What did you learn about the data by using your visualizations? How did you answer your questions? How well does your visualization work, and how could you further improve it?

## Presentation

You will be expected to present your project to the class. You will have 5 minutes to demonstrate your project, optionally with some slides if you wish to establish some content up front. The presentation should cover the following points:

* Whats the best part of your project?
* Insights gained: what did you learn about the data, or what did you learn about the technique?
* The main takeaways: what do you want people to know?

## Final Project Submission

The final project submission should be everything that you maintain in your team's GitHub project. It should consist of the following items:

* **Code:** All source files and libraries, assuming they are not too big to include.
* **Data:** Include all of the data that you used in your project. If the data is too large for GitHub, store it on a cloud storage provider, such as Dropbox.
* **Process Book:** Your Process Book in PDF format.
* **README:** The README file must give an overview of what you are handing in: which parts are your code, which parts are libraries, and so on. The README should also explain any non-obvious features of your visualization.

## Peer Assessment:

It is important to provide positive feedback to people who truly worked hard for the good of the team and to also make suggestions to those you perceived not to be working as effectively on team tasks. Please provide an honest assessment of the contributions of the members of your team, including yourself. The feedback you provide should reflect your judgment of each team member's:

* **Preparation:** Were they prepared during team meetings?
* **Contribution:** Did they contribute productively to the team discussion and work?
* **Respect:** Did your team members encourage others to contribute their ideas?
* **Flexibility:** Were they flexible when disagreements occurred?

Your teammate's assessment of your contributions and the accuracy of your self-assessment will be considered as part of your overall project score.

## Project Assessment

* Team formation and project description: 5%
* Proposal: 10%
* Updates: 5% (total, between the 2 updates)
* Prototype: 20%
* Presentation: 10%
* Final Project Submission: 50%

## Schedule

* **Team formation and project description:** October 29
* **Proposal:** November 7
* **Update 1:** November 14
* **Prototype Submission:** November 21
* **Update 2:** November 28
* **Presentation:** December 5
* **Final Project Submission:** December 14

## Acknowledgements

The structure of the project was influenced by the Vis projects of [Hanspeter Pfister](http://www.cs171.org/2018/project/), [Alexander Lex](http://dataviscourse.net/2018/project/), and [Alvitta Ottley](https://classes.engineering.wustl.edu/cse557/spring2017/). Please visit their respective websites for inspiration on choosing projects.
