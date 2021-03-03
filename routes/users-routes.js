const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('hello from GET in users');
  res.json({msg: 'works!'});
});

module.exports = router;