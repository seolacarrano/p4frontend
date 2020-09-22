# Project Overview

## Project Link
- [Link](https://sa-wrong-answer-note.netlify.app/#)

## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|Day 1| Project Description | Complete
|Day 1| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 2| Working RestAPI | Complete
|Day 3| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 4| MVP & Bug Fixes | Cmplete
|Day 5| Final Touches and Present | Incomplete

## Project Description
For the unit04 project, I'm creating a wrong answer note. Users sign up and login with a custom username and password and then are taken to a mobile, tablet, and desktop application where they can add a subject. In each subject, they can add a wrong answer note. Each user can create, read, update, and delete their note.

## Google Sheet
[Google Sheet](https://docs.google.com/spreadsheets/d/1MiYUM5Rr0hr_9kbYVNgYzxu88jngsMA9udl1Ox-z7Vw/edit#gid=0) 

## Wireframes

- [mobile](https://res.cloudinary.com/dqduwnrb1/image/upload/v1600014820/Page_1_mho2ij.png)
- [tablet/desktop](https://res.cloudinary.com/dqduwnrb1/image/upload/v1600014820/Page_2_itrg3k.png)



## Time/Priority Matrix 

- [MVP](https://res.cloudinary.com/dqduwnrb1/image/upload/v1600017836/p4_front_Time_Priority_Matrix_vw0mro.jpg)

### MVP/PostMVP 

#### MVP
- Create function to request data and populate for all pages
- Create function to create new data for all pages
- Create function to delete data for all pages
- Create function to edit data on all pages
- Build UI incorporating functions with Vue
- Make hamburger menu
- Make it responsive to different screen sizes (mobile, tablet, and desktop)
- Render API on frontend application

#### PostMVP 
- Make hover effect
- Add button shadow effects
- Add a landing page 



## Functional Components

#### MVP

| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | :---: |  :---: | :---: | :---: |
| A | Wireframe | H | 1hr | 1hr |
| B | Hamburger Menu | H | 1hr | 0.5hr |
| C | Login HTML & CSS | H | 3hrs | 0.5hr |
| D | Category page HTML & CSS | H | 3hr | 6hrs |
| E | Note page HTML & CSS | H | 3hrs | 7hrs |
| F | Vue Research | H | 5hrs | 8hrs |
| G | Login Implementation | H | 5hrs | 5hrs |
| H | Create Function for Category | H | 3hrs | 3hrs |
| I | Read Function for Category | H | 3hrs | 4hrs |
| J | Update Function for Category | H | 3hrs | 3hrs |
| K | Delete Function for Category | H | 3hrs | 1hr |
| L | Create Function for Note | H | 2hrs | 5hrs |
| M | Read Function for Note | H | 2hrs | 2hrs |
| N | Update Function for Note | H | 2hrs | 1hr |
| O | Delete Function for List | H | 2hr | 1hr |
| P | Login HTML/CSS Debugging | H | 3hrs | 6hrs |
| Q | Category HTML/CSS Debugging | H | 3hrs | 3hrs |
| R | Note HTML/CSS Debugging | H | 3hrs | 6hrs |
| S | Blackbox Testing & Deployment | H | 3hrs | 3hrs |
| - | Total | - | 50hrs | 66hrs |

#### PostMVP
| Letter | Component | Priority | Estimated Time | Time Invested |
| --- | --- | :---: |  :---: | :---: |
| A | Hover effect | L | 1hr | 1hr |
| B | Add button shadow effects | L | 1hr | 1hr |
| C | Landing Page | M | 3hrs | 3hrs |
| - | Total | - | 5hrs | 5hrs |

## Additional Libraries
- [Vue](https://vuejs.org)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

## Code Snippets
```
<router-link :to="{name: 'Note', query: $route.query, params:{categoryid: category.id}}"><div v-bind:id="category.id" class="category_name"> {{category.title}} </div></router-link>

```
To get the data from anotehr page to the other page, I needed to grab the id. 

## Issues and Resolutions

**ERROR**: After editing note, getting note didn't work            
**RESOLUTION**: I was using the same modal for two different functions, so I made another modal. 