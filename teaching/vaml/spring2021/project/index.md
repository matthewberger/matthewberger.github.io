---
layout: default
title: Project
author: Blah
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
  <a href="/teaching/vaml/spring2021">Overview</a>
  <a href="/teaching/vaml/spring2021/syllabus">Syllabus</a>
  <a href="/teaching/vaml/spring2021/schedule">Schedule</a>
  <a href="/teaching/vaml/spring2021/assignments">Assignments</a>
  <a class='active' href="/teaching/vaml/spring2021/project">Project</a>
  <a href="/teaching/vaml/spring2021/papers">Papers</a>
  <a href="/teaching/vaml/spring2021/resources">Resources</a>
</div>

---

<br>

# Project

As part of this course you will form teams of two to work on a project.

## Project Types

The type of project you choose should come from three of the main research topics that we will cover in the course: **Mixed-Initiative Visual Exploration**, **Visual Analytics for Understanding Models**, or **Visual Analytics for Training Models**. If a project that you would like to do does not quite fit in the above topics, then please contact me in advance.

## Team Formation and Project Proposal

You will first form a two-person team as part of the project. If you wish to work in a team by yourself, or a team of three, then please let me know.

You will then formulate a project proposal. The proposal should include the following:

* **Basic Info:** Project title. A link to your notebook for the project. The notebook will serve as a sort of living document for your project; _everything_ you do will go here, any writing/documentation (using Markdown), as well as your code.
* **Description:** Provide a brief description (1 paragraph) of what you propose to do.
* **Background:** Motivate your project (1 page). What is the importance of the problem you are addressing? What is existing work in addressing your problem? How does existing work fall short? What is the novelty of your proposed work?
* **Tasks:** Provide a task decomposition for addressing your problem (2-3 paragraphs). How is your visualization going to address the problem you are solving?
* **Data:** Describe the data that you plan on working from, and how much data cleaning, munging, etc.. is necessary for the project (1-2 paragraphs).
* **Models:** Describe the machine learning models that you will be using (1-2 paragraphs).
* **Design:** Provide several visualization designs that you will consider for your project. Consider drawing, on paper, potential designs, e.g. with colored pencils, highlighting different spatial layouts, visual encoding choices, and interactions.

Unlike the assignments, you will _share_ your notebook with me. This does not make your notebook visible to the public, rather, anyone with the link will be able to access it. If you have any problems with this please let me know.

Additionally, each team will present their proposal to the class. Please prepare a 10-minute presentation.

## Project Prototype

The project prototype should be comprised of three parts:

### Data Wrangling

You should be able to complete any data cleaning/wrangling/munging at this stage. My recommendation is to take data sources that you've collected, or data generated via machine learning models, and write them out as JSON files for further processing on the visualization side. If you find that you have a lot of data, then a Python server backend might be more appropriate for serving data.

### Exploratory Data Analysis

You should quickly prototype some visualizations for exploring your data. I **strongly recommend** using [Vega-Lite](https://vega.github.io/vega-lite/) for this purpose, as it simple to use and integrates with Observable notebooks, while still providing a decent-sized design space to consider. In your notebook, you should present these Vega-Lite visualizations alongside discussions written in Markdown, detailing any findings regarding your data.

### Design Prototype

You should have a working prototype of your project in place. The basics should be here: spatial organization, visual encodings, some (but not all) interactions, and integration with machine learning models, as appropriate. It does not need to be polished yet, but rather, it should be clear where the project is headed.

## Project Presentation

Each team will have 5 minutes to present their project. Your presentation should include the following:

* Recap the problem you are addressing.
* Discuss the data, and machine learning models, that your project uses.
* Describe your visualization design.
* Demonstrate your visualization. Show how it works. Showcase interesting findings through your visualization.

## Final Submission

Your final submission should contain your final visualization design, as well as a discussion about your project:

* Write-up the technical details of your project.
* Justify your visualization design.
* Assess the tasks that you laid out in your project description: how does your visualization help the user analyze data? Analyze model? Annotate data/model? The specifics depends on the project type, but either way, you should clearly describe use cases.

## Project Assessment

As everyone's projects will be different, there is no detailed rubric for grading. Nevertheless, the projects will be assessed based on their intended contributions. In general, this should consist of the following components:

* Good visualization design practices.
* Multiple views that are linked and coordinated.
* Interactivity should be a central component.

However, if the main contributions of your project deviate from the above, then the assessment will be adjusted accordingly.

## Project Schedule

* Project Proposal and Presentations: March 10
* Project Prototypes: March 31
* Project Presentations: April 28
* Final Project Submission: May 5
