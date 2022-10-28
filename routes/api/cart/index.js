const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.delete('/', controller.clear);

module.exports = router;
