# Capstone Proposal

## Titanium Typewriter
### For creating rock-solid stories.

## Project Overview

### Summary

Titanium Typewriter is a writing app that takes a user’s daily word count goal and tracks it. Users are able to make new goals for specific projects or contribute to just their daily word count goal. They can also set word count goals for dates in the future and access a statistics page that shows their writing progress.

### Problem

There are a lot of writing apps out there that do a lot of different things. Some are as minimalistic as it gets with just you, the page, and text that [vanishes as it’s typed to keep your focus on the typing](https://www.ilys.com/welcome). And then there’s [Write or Die](https://writeordie.com/) with stimulus around every corner and [the Most Dangerous Writing App](https://www.squibler.io/dangerous-writing-prompt-app), which deletes progress after five seconds if there’s no keystrokes made.

But this app aims to strike a balance between a clean, minimalist style and one inundated with extra bells and whistles. It will also include pages dedicated solely to statistics that track individual project progress and daily word count habits to encourage the user to keep going.

### Libraries/Frameworks

**Django**

— Database for storing daily word count, project word count goals, and data related to specific projects

— Built-in templating system for building multiple class-based views extending from base.html

— (Optional?): Authentication system

**Vue/Javascript**

— Handle methods like addNewProject, updateDailyWC, etc.

## Features

### Be able to set long-term and daily word count goals.

**Tasks**

- [ ] Create user input that is stored in database
- [ ] Keep a running calculation of how many words a user has left that day using function
- [ ] Store a boolean that determines whether user has completed the word count goal or not
- [ ] Display to the user the goal and whether it has been completed or not
- [ ] \(Optional) Display progress bar that tells user how close they are to completing daily goal

### Be able to mark the text field with a corresponding project tag and view that project’s progress on its own page
#### Record that project’s word count daily and overall

**Tasks**
- [ ] Store project’s word counts (daily and total) in database
- [ ] Create view with custom page for that project
- [ ] Make that page display the project’s total word count and the day’s word count contribution

### Have custom view for displaying all statistics to user

**Tasks**
- [ ] Create view for displaying all information to user
- [ ] Parse data for use in a line chart and/or bar graph
- [ ] Include running list of all word count contributions alongside what day they were made (inspired by [this](https://i.imgur.com/J3NzAWC.jpg)).


## Optional Features
### Add ability to set timer with visual feedback (depleting progress bar or similar) indicating how much time they have left

**Tasks**
- [ ] Create user input to choose how long timer runs for
- [ ] Write function that starts timer upon button click/countdown and tracks words contributed in that time, storing the end result to show the user
- [ ] Add functionality that erases all user input if no keystroke is made after 10 seconds

### Add ability to add to word count from outside the app (such as adding a specific word count for writing the user did elsewhere)

**Tasks**
- [ ] Create input field for word count and optionally what project it corresponds to
- [ ] Connect that user input to the project data and word count data
- [ ] Reformat/create function that calculates daily word count/total word count

### Implement Google Drive API to back up work

**Tasks**

*Requires more research/documentation reading-up*
- [ ] Create needed credentials to connect with Google Drive API
- [ ] Link app and API together

## Data Model

`User` has: `totalWc`, `dailyWc`, optional `Projects` (each with its own `projectName`, `dailyWc` and `totalWc`)
`CalcTotalWC` function returns `totalWc`
`DailyWC` model
`TotalWC` model (where this has a one-to-many relationship with other data in the database, as it spans input from multiple days),
`wordCount` from each day stored in database

## Schedule

**Thu Jan. 26:** Finish first mvp
- [ ] Have one view with input and a word count tracking words typed
- [ ] Track user’s daily word count and total word count

![A screenshot of what a wireframe might look like for this first mvp.](https://i.imgur.com/wsraSxR.png)

**Wed Feb. 1:** Have second mvp working
- [ ] Be able to input writing goals (daily and set to a specific date)
- [ ] Display daily word goal counter
- [ ] Have a view to see progress on word count goals

![A screenshot of what a wireframe might look like for this first mvp.](https://imgur.com/wizhG8g.png)

**Wed Feb. 8:** Refactor necessary code + add features for third mvp
- [ ] Add tag functionality for projects
- [ ] Have new view for projects (at least to display all projects and their info on one page)

**If time:**
- [ ] Refine CSS styling/add extra touches (custom webpage icon, font, cursor, input style, rich text editor options for user, etc.)
- Dip into optional features and begin implementing!
