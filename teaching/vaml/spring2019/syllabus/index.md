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
  <a href="/teaching/vaml/spring2019">Overview</a>
  <a class='active' href="/teaching/vaml/spring2019/syllabus">Syllabus</a>
  <a href="/teaching/vaml/spring2019/schedule">Schedule</a>
  <a href="/teaching/vaml/spring2019/project">Project</a>
  <a href="/teaching/vaml/spring2019/papers">Papers</a>
  <a href="/teaching/vaml/spring2019/resources">Resources</a>
</div>

---

<br>

# Syllabus

## Course Description

This course is a research seminar on topics related to visual analytics and machine learning. Visual analytics is an area of data visualization that is concerned with improving a human's _analytic process_, or how one makes sense of data for a given problem: understanding, reasoning, and making decisions about a provided dataset, and a given problem domain. Visual analytics, in particular, is concerned with combining **automated processes**, with **human-driven processes** that are built around data visualization - visual representations of data, and ways to interact with data. Given the rapid growth in machine learning the last decade, research in visual analytics has witnessed similar growth in leveraging machine learning in a variety of ways. This course will cover topics that live at the interface of visual analytics and machine learning, exposing you to the basics of visual analytics, how maching learning can be used to enhance visual analytics, and how visual analytics can help machine learning.

## Instructor

Matthew Berger

email: <a href="mailto:matthew.berger@vanderbilt.edu">matthew.berger@vanderbilt.edu</a><br>

office hours: TH 2:00-3:00, JH 379

## Lectures

MW, 2:10-3:25, FGH 258

## Content

In addition to a primer on visual analytics, in this course we will study four primary areas that consider visual analytics and machine learning.

### Mixed-Initiative Visual Exploration

One of the main goals of data visualization is to enable the human to better understand their data through visual exploration. Through leveraging machine learning techniques, it is possible to improve this form of exploration, through establishing an effective blend of automated analyses provided by a learning technique, and what to expose to the user for determining their interactions.

### Visual Analytics for Understanding Models

The growth in machine learning has been accompanied by an equally-pressing demand to understand machine learning models, e.g. to provide provide interpretable and explainable models. Visual analytics plays an important role in helping the user understand machine learning models, be it through understanding the training process of a model, understanding the parameters of a model, understanding features learned by a model from a given set of data, or understanding the outputs produced by a model.

### Visual Analytics for Training Models

In machine learning, the training of a model is traditionally accomplished by a human identifying a training dataset, and then training the model, sometimes using a validation set to tune hyperparameters. Opening this process up, however, can enable visual analytics techniques to improve how models are trained, either through improving how humans annotate data used for training, or incorporating the human directly in to the model-building process.

### Learning Visualization

Machine learning can also be used as a means to improve the visualization process itself. This can range from methods for recommending visualizations, automating (or semi-automating) the creation of visualizations from a provided dataset, or constructing learning models for visualization techniques.

## Course Format

The course will primarily be lecture-based. There is no textbook for the course - all lectures will be based on papers I have listed in the [papers section](/teaching/vaml/spring2019/papers) of the website. The [schedule section](/teaching/vaml/spring2019/schedule) lists papers that will be covered during each lecture. It is expected that, prior to the lecture, you have read the corresponding papers.

**Class participation is expected during lectures.** As you will quickly see, designing an effective visual analytics solution often boils down to _making good decisions_. Put simply, there are lots of approaches to visualizing and interacting with data, but most are bad. Discerning good visualization choices from bad ones will be a common theme in the lectures, and should prove invaluable for the visual analytics techniques you develop for the class; thus, I expect everyone to participate in these discussions.

### Research Project

The bulk of the course will be devoted to a semester-long research project. Please see the [project section](/teaching/vaml/spring2019/project) of the course for more details. As part of the project, you will be expected to reproduce prior work, as well as implement a proposed research idea of your choosing. Moreover, you will be expected to demonstrate both the prior work, and your final research project, to the class during lectures. Again, please see [project](/teaching/vaml/spring2019/project) for additional details.

## Course Assessment

* Project Proposal: 15%
	* Presentation: 5%
	* Proposal Document: 10%
* Related Work: 30%
	* Presentation and Demonstration: 10%
	* Source Code and Documentation: 20%
* Project Updates: 5% (total)
* Full Project: 40%
	* Presentation: 10%
	* Full Submission: 30%
* Class Participation: 10%

## Prerequisites

CS 4260

More specifically, you should have a solid foundation in either data visualization or machine learning. Ideally, both! But ultimately, your background will determine the type of project that you work on. If you are only well-versed in machine learning, then you will need to learn the basics behind data visualization. On the other hand, if you are only a data visualization expert, then you will need to learn the basic components of machine learning.

During lectures, I will be going in to some detail, beyond the research papers, for topics in visualization and machine learning that are foundational, but traditionally not covered in the research literature. This will be **necessary**, but **not sufficient**, for you in fully understanding one of the two areas you may not have proper background in.

## Expectations

**To be succesful in this course you will need to be self-motivated.**

I will not be covering specific languages, libraries, etc.. for implementing machine learning techniques and visual analytics approaches. You are free to use whatever you like. However, if you do not have the appropriate background in one of these fields, then it is **your responsiblity** to learn the appropriate languages/libraries necessary for the project you intend to work on.

Having said this, I have provided a number of recommended visualization and machine learning libraries in the resources section of the course website, which you can [find here](/teaching/vaml/spring2019/resources).

## Discussion

We will use Brightspace for any discussion related to the course: questions on lecture content, project discussion, etc.. Brightspace will also be used for any announcements.

## Lecture Slides

See [schedule](/teaching/vaml/spring2019/schedule).

## Resources

See [resources](/teaching/vaml/spring2019/resources).

## Late Submission Policy

For all aspects of the project, **I will not accept anything that is submitted late**. Having said that, if there are extenuating circumstances that prohibit you from submitting on time, then please contact me **prior to the due date**.

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
