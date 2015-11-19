var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');


router.get('/', function(req, res, next) {
  Writing.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});

module.exports = router;
