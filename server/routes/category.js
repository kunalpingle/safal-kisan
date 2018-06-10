const router = require('express').Router();
const CategoryController = require('../controllers/category');

router.get('/:id', CategoryController.getAllCategoryProducts);

module.exports = router;