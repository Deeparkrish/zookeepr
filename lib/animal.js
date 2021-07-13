const fs = require("fs");
const path = require("path");


//This function will take in req.query as an argument and filter through the animals accordingly, returning the new filtered array.
function filterByQuery(query, animalsArray) 
{

let filteredArr = animalsArray; 

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
    fs.writeFileSync(path.join( __dirname,'../data/animals.json'),
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

  module.exports ={filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};