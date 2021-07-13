const path = require('path');
const router = require('express').Router();


//GEt method to respond with a html file 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
  });


router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
  });

  module.exports =router;