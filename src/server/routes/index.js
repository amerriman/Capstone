var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'This is going to BE SOMETHING!' });
});

module.exports = router;
