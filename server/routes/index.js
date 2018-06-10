const router = require('express').Router();
const HomeController = require('../controllers/home')
router.get('/', HomeController.getData); // Home routes

router.use('/products', require('./products')); // products routes

router.use('/category', require('./category')) // category

router.use('/checkout', require('../controllers/checkout').getData) // checkout

module.exports = router;