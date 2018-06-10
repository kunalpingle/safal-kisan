const router = require('express').Router();

router.get('/', HomeController.getData);

module.exports = router;