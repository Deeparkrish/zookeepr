const express = require('express'); //dependencies
const PORT = process.env.PORT || 3001;
const app = express(); // instantiate the server
const { animals } = require('./data/animals'); // data from animals.json

//get data from a location and gives response in 'res'
app.get('/api/animals', (req, res) => {
    let results;
    if(req.query)
   results = filterByQuery(req.query,animals);
    res.json(results);
    
  });
//make the server listen at a port 
app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
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