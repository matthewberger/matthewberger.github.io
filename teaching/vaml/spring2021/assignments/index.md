---
layout: default
title: Assignments
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
  <a class='active' href="/teaching/vaml/spring2021/assignments">Assignments</a>
  <a href="/teaching/vaml/spring2021/project">Project</a>
  <a href="/teaching/vaml/spring2021/papers">Papers</a>
  <a href="/teaching/vaml/spring2021/resources">Resources</a>
</div>

---

<br>

# Assignments

You will work on assignments in Observable notebooks.

When an assignment is posted, a link will be provided to the Observable notebook associated with the assignment. Everything that pertains to the assignment will be contained in the notebook: instructions, starter code, guidance for completing the assignment, and how the assignment will be assessed. For some assignments, data will be _attached_ to the Notebook, and for other assignments, data will be externally provided for any relevant server-side processing in Python.

Now, the first thing you need to do is **create an account** with Observable. This should be straightforward, but if you have any questions please let me know.

## Notebook Access

It is important to understand the different levels of access for a notebook.

### Private Notebooks

You can create a notebook by clicking the "New" button in the top right:

{% include image.html url="/teaching/vaml/spring2021/images/observable-new.png" caption="Observable New" width=282 align="center" %}

When you create a notebook, by default, it is **private**:

{% include image.html url="/teaching/vaml/spring2021/images/observable-private.png" caption="Private" width=207 align="center" %}

You are the only one who can view and edit the notebook, assuming you are logged in.

### Shared Notebooks

You can choose to **share** your private notebook. Click on the ellipses in the top right, and a set of options will appear:

{% include image.html url="/teaching/vaml/spring2021/images/observable-options.png" caption="Options" width=255 align="center" %}

By choosing "Enable link sharing", your notebook will be considered **shared**:

{% include image.html url="/teaching/vaml/spring2021/images/observable-shared.png" caption="Options" width=255 align="center" %}

A shared notebook can be accessed by anyone, given the URL. However, the notebook is _not_ made public - Observable does not index the notebook.

You may continue to edit a notebook once it has been shared. However, any subseqent edits will not be visible to the public. You will need to _reshare_ your notebook for your edits to be visible.

You can make the notebook private again by choosing "Disable link sharing".

### Published Notebooks

A published notebook is _both_ accessible given the URL, _and_ made public via Observable.

## Completing Assignments in Observable Notebooks

Given an assignment's notebook, accessible as a **shared** notebook provided on the course website, to work on the assignment perform the following steps:

* Assuming you are logged in, _fork_ the notebook. In the options image above, you will see the "Fork" option. This will produce a **private** copy of the notebook, as part of your collection of notebooks.
* Work on your own forked, and private, copy. Changes that you make in cells will be automatically saved, assuming these cells have been _evaluated_. You are also free to remove cells that correspond to the assignment description, and assessment, if you like.
* Once you have completed the assignment, please submit the notebook to Brightspace. There are two options for submitting a notebook:
	* You may **enable link sharing** for your notebook, and submit a simple file containing the URL link to the notebook. _This is the preferred method for submissions_. I can fork your assignment, provide detailed feedback in your code, make edits, reshare, etc.. After the assignment has been graded, you may opt to disable link sharing, making the notebook private again. Additionally, if the assignment requires Python source code, then include as your submission both the Python code and a link to your notebook.
	* Alternatively, you may not wish to have your notebook accessible via a given URL, and this is totally understandable. Though Observable will not index and make publicly available the notebook, it is possible some _other_ search engine could. So, as an alternative, you can submit your **private** notebook. You will need to download the notebook	via the "Download code" option (shown in the above image). This will produce a compressed (tgz) file, and this file should be what is submitted to Brightspace, in addition to Python code (if required).

One final note: **never publish your assignments.** Anyone can access the solution to your assignment by simply going to your Observable home page. I can only treat this as a form of copying.

## Programming Assignment 1

Visually analyzing model predictions ([link](https://observablehq.com/d/3823c0348633f8f9))

## Programming Assignment 2.1

Visually analzying dimensionality reduction and clustering ([link](https://observablehq.com/d/30cbde3f866d24c6))
