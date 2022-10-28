const express = require('express');
const router = express.Router();
const api = require('./api');

router.get('/', (req, res) => {
  // health check
  res.status(200);
  res.json({});
});
router.use('/api', api);

module.exports = router;
