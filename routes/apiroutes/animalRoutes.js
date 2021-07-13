const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animal');
const { animals } = require('../../data/animals');



//get data from a location and gives response in 'res'
router.get('/animals', (req, res) => {
    let results =animals;
    if(req.query)
    results = filterByQuery(req.query,animals);
    res.json(results);
    
  });
// get animal data  by id
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

//function  to set up a route on our server that accepts data to be used or stored server-side.
router.post('/animals', (req, res) => { 
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

module.exports  = router;
