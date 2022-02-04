# ZooKeepr
## Description 
An app that  creates  a web server for a front-end application that will allow animal enthusiasts to access the data from different locations.

## Table of Contents 
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [UserStory](#userstory)
  * [Process](#process)
  * [Technologies](#technologies)
  * [MockUp](#mockup)
  * [Testing](#testing)
  * [Deployment](#deployment)
  * [Contribution](#contribution)
  
## Technologies 
  Express.js , Node.js, JavaScript, HTML , CSS 
## UserStory
- As a user, I can request for a list of all animal data
- As a user, I can request data for just one animal based on its id value
- As a user, I want to be able to do this from anywhere and not just my computer
- As a user, I want to be able to add a new animal to the catalog
- As a user, I want to be able to view data from the server in a front-end web application
- As a user, I want to create new data by submitting an HTML form
- As a user, I want to be able to access and create different types of data stored on the server

## Process 
  Set up the server(API endpoints) so that it's listening for incoming requests. 
    - This can be accomplished using express, first we need to instantiate the server, then tell it to listen for requests.
  Creating a route that the front-end can request data from.
    - This can be accomplishes by GET,SEND and POST requests 
   Make the server parse incoming data before it is sent to callback function
    - parse incoming string or array data:  
        app.use(express.urlencoded({ extended: true })) -takes incoming POST data and converts it to key/value pairs that can be accessed in the req.body object.
    - parse incoming JSON data :  
            app.use(express.json()) -takes incoming POST data in the form of JSON and parses it into the req.body JavaScript object
   Use Fetch API to POST Data
    -  This is used when the client adds new data through HTML form.
   Separate files have been created for animals, zookeeprs and corresponding GET,POST requests have been handled. 

## MockUp
   <div>
  <img src ="https://github.com/Deeparkrish/emp-portfolio/blob/main/src/assets/images/mockup/about.png" width ="400px" height ="300px" />
  <img src ="https://github.com/Deeparkrish/emp-portfolio/blob/main/src/assets/images/mockup/project.png"  width ="400px" height ="300px" />
  <img src = "https://github.com/Deeparkrish/emp-portfolio/blob/main/src/assets/images/mockup/resume.png" width ="400px" height ="300px" />
  <img src ="https://github.com/Deeparkrish/emp-portfolio/blob/main/src/assets/images/mockup/contact.png"  width ="400px" height ="300px" />
  </div>


## Installation 
      npm init -y
      npm i express
## Usage 
      npm start 
      visit : http://localhost:3001/api/animals
## Testing 
    Insomnia that we can use to test our APIs and make client-side server requests. 
     Launching the app in heroku 
## Deployed App 

## Contribution 


    
