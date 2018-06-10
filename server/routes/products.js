const router = require('express').Router();
const ProductConroller = require('../controllers/products');

router.get('/:id', ProductConroller.getSingleProduct);

module.exports = router;