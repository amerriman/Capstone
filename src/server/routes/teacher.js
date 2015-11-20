var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


router.get('/teachers', function(req, res, next) {
  Teacher.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});


module.exports = router;
