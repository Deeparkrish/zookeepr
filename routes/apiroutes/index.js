const router = require('express').Router();
const animalRoutes = require('../apiroutes/animalRoutes');
const zookeeperRoutes = require('../apiroutes/zookeeperRoutes');


router.use(zookeeperRoutes);
router.use(animalRoutes);

module.exports =router;