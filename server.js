const fs = require('fs');
const path = require('path');
const express = require('express'); //dependencies
const PORT = process.env.PORT || 3001;
const app = express(); // instantiate the server
const { animals } = require('./data/animals'); // data from animals.json

//Middleware
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// to include assets like css for html-to access front end code
app.use(express.static('public'));


//get data from a location and gives response in 'res'
app.get('/api/animals', (req, res) => {
    let results =animals;
    if(req.query)
    results = filterByQuery(req.query,animals);
    res.json(results);
    
  });
// get animal data  by id
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//function  to set up a route on our server that accepts data to be used or stored server-side.
app.post('/api/animals', (req, res) => { 
    // req.body is where our incoming content will be
    console.log(req.body);
     // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body))
    {
        res.status(400).send('The animal is not properly formatted.');
    } 
    else
    {
        // add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});
//GEt method to respond with a html file 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, './public/animals.html'));
  });


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/zookeepers.html'));
  });
//make the server listen at a port 
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });


//This function will take in req.query as an argument and filter through the animals accordingly, returning the new filtered array.
function filterByQuery(query, animalsArray) 
{

let filteredArr = animalsArray; 
if(query.id){
    filteredArr = filteredArr.filter(animal => animal.id === query.id);
}
if(query.diet){
    filteredArr = filteredArr.filter(animal => animal.diet === query.diet);
}
if(query.name){
    filteredArr = filteredArr.filter(animal => animal.name === query.name);
}
if(query.species){
    filteredArr = filteredArr.filter(animal => animal.species === query.species);
}
if(query.personalityTraits){
    let personalityTraitsArr=[];
        // If personalityTraits is a string, place it into a new array and save.
    if(typeof query.personalityTraits === 'string'){
        personalityTraitsArr=[query.personalityTraits];
    }
    else {
    personalityTraitsArr=query.personalityTraits;} //Copy the array into new array 
    // Loop through each trait in the personalityTraits array:
    personalityTraitsArr.forEach(trait => {
          // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.

        filteredArr = filteredArr.filter(animal => animal.personalityTraits.indexOf(trait) != -1);
    });
}
return filteredArr;
}

// returns single animal object
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  }

function createNewAnimal(body, animalsArray) {
    const  animal =body;
    animalsArray.push(animal);
    fs.writeFileSync(path.join( __dirname,'./data/animals.json'),
    JSON.stringify({ animals:animalsArray},null, 2)
    );
    // return finished code to post route for response
    return animal;
  }

  function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
      return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
      return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
      return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
      return false;
    }
    return true;
  }