---
layout: default
title: Syllabus
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
  <a class='active' href="/teaching/vaml/spring2021/syllabus">Syllabus</a>
  <a href="/teaching/vaml/spring2021/schedule">Schedule</a>
  <a href="/teaching/vaml/spring2021/assignments">Assignments</a>
  <a href="/teaching/vaml/spring2021/project">Project</a>
  <a href="/teaching/vaml/spring2021/papers">Papers</a>
  <a href="/teaching/vaml/spring2021/resources">Resources</a>
</div>

---

<br>

# Syllabus

## Course Description

This course is a research seminar on topics related to visual analytics and machine learning. Visual analytics is an area of data visualization that is concerned with improving a human's _analytic process_, or how one makes sense of data for a given problem: understanding, reasoning, and making decisions about a provided dataset, and a given problem domain. Visual analytics, in particular, is concerned with combining **automated processes**, with **human-driven processes** that are built around data visualization - visual representations of data, and ways to interact with data. Given the rapid growth in machine learning the last decade, research in visual analytics has witnessed similar growth in leveraging machine learning in a variety of ways. This course will cover topics that live at the interface of visual analytics and machine learning, exposing you to the basics of visual analytics, how maching learning can be used to enhance visual analytics, and how visual analytics can help machine learning.

## Learning Objectives

It is expected that you will learn the following by taking this course:

* The latest research in the field of visual analytics, as it pertains to machine learning.
* The ability to critique visualization designs, in terms of satisfying good visualization design principles and the user's analytical needs.
* What is involved in designing visualizations for creating visual analytics systems.
* Authoring visualizations using web-based technologies.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

office hours: TR 2:00-3:00, via Zoom

## Lectures

MW 3:00-4:10, FGH 110

## Content

This course will cover four primary research areas:

### Mixed-Initiative Visual Exploration

One of the main goals of data visualization is to enable the human to better understand their data through visual exploration. Through leveraging machine learning techniques, it is possible to improve this form of exploration, through establishing an effective blend of automated analyses provided by a learning technique, and what to expose to the user for determining their interactions.

### Visual Analytics for Understanding Models

The growth in machine learning has been accompanied by an equally-pressing demand to understand machine learning models, e.g. to provide provide interpretable and explainable models. Visual analytics plays an important role in helping the user understand machine learning models, be it through understanding the training process of a model, understanding the parameters of a model, understanding features learned by a model from a given set of data, or understanding the outputs produced by a model.

### Visual Analytics for Training Models

In machine learning, the training of a model is traditionally accomplished by a human identifying a training dataset, and then training the model, sometimes using a validation set to tune hyperparameters. Opening this process up, however, can enable visual analytics techniques to improve how models are trained, either through improving how humans annotate data used for training, or incorporating the human directly in to the model-building process.

### Learning Visualization

Machine learning can also be used as a means to improve the visualization process itself. This can range from methods for recommending visualizations, automating (or semi-automating) the creation of visualizations from a provided dataset, or constructing learning models for visualization techniques.

In addition, the course will cover the basics behind designing data visualizations, ranging from basic visualization principles, to how to code data visualizations for the web using D3.

## Course Format

The course will primarily be lecture-based. There is no textbook for the course - all lectures will be based on papers I have listed in the [papers section](/teaching/vaml/spring2021/papers) of the website. The [schedule section](/teaching/vaml/spring2021/schedule) lists papers that will be covered during each lecture. It is expected that, prior to the lecture, you have read the corresponding papers.

**Class participation is expected during lectures.** As you will quickly see, designing an effective visual analytics solution often boils down to _making good decisions_. Put simply, there are lots of approaches to visualizing and interacting with data, but most are bad. Discerning good visualization choices from bad ones will be a common theme in the lectures, and should prove invaluable for the visual analytics techniques you develop for the class; thus, I expect everyone to participate in these discussions.

### Assignments

In the first half of the semester you will be required to complete three programming assignments. These are intended to satisfy the following:

* Exposure to the basics of coding visualizations using web technologies. Specifically, we will be primarily using JavaScript for programming, and in particular [D3](https://d3js.org/). Further, we will be using [Observable notebooks](https://observablehq.com/) for our development environment. We will also use a bit of [Vega-Lite](https://vega.github.io/vega-lite/) to slowly ease into things.
* How to combine machine learning techniques with data visualization. Here we will use Python, as a backend server, in order to leverage appropriate libraries, e.g. for matrix computations and optimization. There will be an emphasis on how to combine these libraries with interactive data visualization as supported by D3. Indeed, the real power of visual analytics is how to make machine learning interactive.
* Understanding basic visualization design principles. This involves understanding spatial organization, color design, interactions, amongst other design decisions. The reactive nature of [Observable notebooks](https://observablehq.com/) will greatly facilitate understanding the design space of authoring visualizations.

### Research Paper Presentation

During the middle portion of the semester, you will be expected to present a research paper. You may choose from any of the appropriately denoted papers that are listed in the [papers section](/teaching/vaml/spring2021/papers). If you are interested in presenting a paper that is not listed, or alternatively, listed but not marked, then please contact me for approval.

In your presentation you will be required to address the following questions:

* What problem is the paper solving?
* What was the approach taken to solve the problem? Discuss the tasks that the paper intends to address, relevant machine learning techniques, and the developed visualization design.
* What are the advantages and disadvantages of the approach? Provide a design critique, assessing the trade-offs employed by the paper. Note: the paper, very likely, will not discuss such trade-offs! You will need to think critically about what was involved in their design.
* What are some alternative visualization designs? How else _could_ the paper have solved the problem? It is recommended to provide a sketch of alternative designs.

The last point is crucial: the ability to iterate on multiple visualization designs, understanding their strengths and weaknesses, and deciding on a final design, are essential skills in authoring data visualizations.

### Project

The latter half of the semester will be devoted to a research project. You will form a team of two, propose a project, develop a working prototype halfway through, and finally present your project to the class at the end of the semester. Please see the [project section](/teaching/vaml/spring2021/project) of the course for more details.

For the project, as in assignments, you will use Observable and D3 for development, and as necessary, a Python backend.

## Course Assessment

* Assignments: 30%
	* Three assignments, each worth 10%
* Class Participation: 20%
	* Research paper presentation: 10%
	* Active in-class discussion: 10%
* Project: 50%
	* Proposal: 10%
	* Prototype: 10%
	* Presentation: 10%
	* Full Submission: 20%

## Prerequisites

You should have a sufficient background in machine learning: basic understanding of unsupervised learning methods (e.g. dimensionality reduction, clustering), supervised learning methods (e.g. classification, regression), basics of optimization, and experience implementing machine learning techniques. You should also have a basic understanding of deep learning methods. Although we will review these methods as appropriate, you should not treat this course as an opportunity for understanding the details of machine learning techniques.

In addition, you should have sufficient background in linear algebra, e.g. the ability to comprehend matrix notation, and an understanding of basic matrix computations, especially matrix inversion, eigendecomposition, and singular value decomposition.

A background in data visualization is not necessary for this course. We will cover the fundamentals behind data visualization, ranging from basic principles, to how to author visualizations using JavaScript and D3, in the first part of the course. Nevertheless, having some background with visualization systems such as matplotlib, ggplot2, Tableau, etc.. will be useful.

Please see the [resources page](/teaching/vaml/spring2021/project) for resources related to JavaScript, SVG, D3, and Observable notebooks.

## Discussion

We will use Slack for any discussion related to the course: questions on lecture content, assignment questions, project discussion, etc.. Slack will also be used for all course announcements. My preference is to not communicate via email, but rather, use Slack for _all_ communication.

## Lecture Slides

See [schedule](/teaching/vaml/spring2021/schedule).

## Grades

Your final grade will be numeric, and will be converted into a letter grade via the following:

* 97+ : A+
* 94-97 : A
* 90-94 : A-
* 87-90 : B+
* 84-87 : B
* 80-84 : B-
* 77-80 : C+
* 74-77 : C
* 70-74 : C-
* 67-70 : D+
* 64-67 : D
* 60-64 : D-
* < 60 : F

## Late Submission Policy

For all deadlines associated with the course, the late submission policy is as follows:

* One day late: 10% off
* Two days late: 20% off
* Past two days: no credit

The exception, here, is class presentation. You will be expected to present to the class three times throughout the semester:

* Research paper presentation
* Project proposal
* Final project

For each of these presentations, no credit will be given if you do not present in your alloted time.

## Reading Days

The compressed schedule for the semester might add undue stress due to a lack of break. Consequently, Feb. 24 and April 7 are designated as reading days this semester. I will treat these days as **Project Days**. On Feb. 24, I intend to meet with students to discuss project ideas, and on April 7 I will meet with project teams to discuss progress, questions, difficulties, etc.. Furthermore, during these particular weeks, no assignments will be due, and no paper presentations from students will be given.

## Covid-19 Policies and Guidance

### Classroom Restrictions

Up to **18 students** may attend any given lecture. All other students may attend, synchronously, via a remote connection. Lectures will be broadcast live, as well as recorded so that you may view the lecture afterwards. Up through the add/drop deadline, I will directly notify students that may physically attend lectures. After this deadline, students will be able to attend on a rotating basis, scheduled to ensure that students will be physically present as much as possible over the course of the semester.

For students that attend class in-person, it is necessary to wear a facial mask at all times. Furthermore, students will be expected to be at least 6 feet apart from all other students and myself. You are not permitted to eat, or drink, in the class at any time. This policy holds for myself as well.

If you have tested positive for Covid-19, then you should not attend class. If you come down with symptoms associated with Covid-19, and you have not yet been tested or awaiting test results, then you should not attend class.

If I test positive for the virus, or come down with symptoms, then I will not attend class. Instead, lectures will be held remotely. If my illness prevents me from holding lectures remotely, then substitute/guest instructors will hold lectures instead.

If you come down with the virus, and are unable to keep up with progress, then please let me know. We will coordinate a schedule that will enable you to be successful in this course. Your health takes priority over this course, so do not feel that you need to "push through" this course if you are feeling unwell.

### Mental Health During a Pandemic

If you are not comfortable physically attending class, _that is fine_. I strongly encourage you to take actions that are most beneficial for your mental health. If at any time during the semester you would prefer to move towards remote-only attendance, I am ok with this -- just please inform me of your decision.

If you begin to experience anxiety regarding the pandemic, there is plenty of support available at the university: the [Center for Student Wellbeing](https://www.vanderbilt.edu/healthydores/), [University Counseling Center](https://www.vanderbilt.edu/ucc/), and [Student Health Center](https://www.vumc.org/student-health/). I encourage you to take advantage of these resources.

## Department and University Academic Policies

### Academic Honesty

Studuents should adhere to the [Vanderbilt Honor System](https://www.vanderbilt.edu/student_handbook/the-honor-system/). Cheating or plagiarizing will not be tolerated in this course.

* Do not copy, in any way, another student's work when it comes to the project.
* There are many resources on the web related to visualization and machine learning, and you may want to use some of this code as part of your project. This is fine with me; however, be aware that copying/pasting code from the web may not benefit you intellectually, and might do more harm than good for achieving certain aspects of the project. Having said all of this, if you decide to use pieces of code from external resources, **cite it**. If you do not, then I will treat this as plagiarism.

### Academic Integrity

More generally, students should act in accordance with the academic integrity policies of the university, please see [Vanderbilt's Academic Integrity](https://www.vanderbilt.edu/studentaccountability/academic-integrity) for more information.

### Privacy

All student data and information will be protected under FERPA laws. Please refer to the [Vanderbilt Student Privacy Statement](https://registrar.vanderbilt.edu/ferpa/vanderbilt-student-privacy-statement.php). Please take care to not disclose any private information during lectures and when submitting assignments.

### Nondiscrimination and Anti-Harassment

Vanderbilt is committed to an environment that is free of discrimination and harassment of any kind. If you feel you are being sexually harassed, please see [Project Safe](https://www.vanderbilt.edu/projectsafe/). If you feel unsafe, taken advantage of in any way, or mentally/emotionally unwell, please reach out to the [Student Care Network](https://www.vanderbilt.edu/studentcarenetwork/).

## Subject to Change Statement

Information contained in the course syllabus, other than the general assessment, may be subject to change with advance notice, at the discretion of the instructor.
