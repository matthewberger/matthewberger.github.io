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

# CS 3891.04 / 5891.04 - Data Visualization

---

<div class='topnav'>
  <a href="/teaching/vis/fall2020">Overview</a>
  <a href="/teaching/vis/fall2020/syllabus">Syllabus</a>
  <a href="/teaching/vis/fall2020/schedule">Schedule</a>
  <a class='active' href="/teaching/vis/fall2020/assignments">Assignments</a>
  <a href="/teaching/vis/fall2020/project">Project</a>
  <a href="/teaching/vis/fall2020/resources">Resources</a>
</div>

---

<br>

# Assignments

You will work on assignments - both programming and written - in Observable notebooks.

When an assignment is posted, a link will be provided to the Observable notebook associated with the assignment. Everything that pertains to the assignment will be contained in the notebook: instructions, starter code, guidance for completing the assignment, data, and how the assignment will be assessed.

Now, the first thing you need to do is **create an account** with Observable. This should be straightforward, but if you have any questions please let me know.

## Notebook Access

It is important to understand the different levels of access for a notebook.

### Private Notebooks

You can create a notebook by clicking the "New" button in the top right:

{% include image.html url="/teaching/vis/fall2020/images/observable-new.png" caption="Observable New" width=282 align="center" %}

When you create a notebook, by default, it is **private**:

{% include image.html url="/teaching/vis/fall2020/images/observable-private.png" caption="Private" width=207 align="center" %}

You are the only one who can view and edit the notebook, assuming you are logged in.

### Shared Notebooks

You can choose to **share** your private notebook. Click on the ellipses in the top right, and a set of options will appear:

{% include image.html url="/teaching/vis/fall2020/images/observable-options.png" caption="Options" width=255 align="center" %}

By choosing "Enable link sharing", your notebook will be considered **shared**:

{% include image.html url="/teaching/vis/fall2020/images/observable-shared.png" caption="Options" width=255 align="center" %}

A shared notebook can be accessed by anyone, given the URL. However, the notebook is _not_ made public - Observable does not index the notebook.

You can make the notebook private again by choosing "Disable link sharing".

### Published Notebooks

A published notebook is _both_ accessible given the URL, _and_ made public via Observable.

## Completing Assignments in Observable Notebooks

Given an assignment's notebook, accessible as a **shared** notebook provided on the course website, to work on the assignment perform the following steps:

* Assuming you are logged in, _fork_ the notebook. In the options image above, you will see the "Fork" option. This will produce a **private** copy of the notebook, as part of your collection of notebooks.
* Work on your own forked, and private, copy. Changes that you make in cells will be automatically saved, assuming these cells have been _evaluated_. You are also free to remove cells that correspond to the assignment description, and assessment, if you like.
* Once you have completed the assignment, please submit the notebook to Brightspace. There are two options for submitting a notebook:
	* You may **enable link sharing** for your notebook, and submit a simple file containing the URL link to the notebook. _This is the preferred method for submissions_. The TA or myself can fork your assignment, provide detailed feedback in your code, make edits, reshare, etc.. After the assignment has been graded, you may opt to disable link sharing, making the notebook private again.
	* Alternatively, you may not wish to have your notebook accessible via a given URL, and this is totally understandable. Though Observable will not index and make publicly available the notebook, it is possible some _other_ search engine could. So, as an alternative, you can submit your **private** notebook. You will need to download the notebook	via the "Download code" option (shown in the above image). This will produce a compressed (tgz) file, and this file should be what is submitted to Brightspace.

One final note: **never publish your assignments.** Anyone can access the solution to your assignment by simply going to your Observable home page. I can only treat this as a form of copying.

## Programming Assignment 0

Introduction and survey ([link](https://observablehq.com/d/447ee35a03164b12))

## Programming Assignment 1

D3 Workout ([link](https://observablehq.com/d/0be21fbc2c2bce94))

## Programming Assignment 2

Rankings over time ([link](https://observablehq.com/d/85f1f4f097d5c609), [solution](https://observablehq.com/d/3a9c8140fe01b00a))

## Programming Assignment 3

Scatterplots ([undergrad](https://observablehq.com/d/ac3530f3cebb6e3f), [grad](https://observablehq.com/d/5c9f5b37c6a48c89))

## Programming Assignment 4

Multiple Views ([link](https://observablehq.com/d/f848866eabb931d4))

## Programming Assignment 5

Linked and Coordinated Views ([link](https://observablehq.com/d/f75505df6aa4d5a1))
