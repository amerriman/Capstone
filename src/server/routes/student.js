var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');



router.get('/students', function(req, res, next) {
  Student.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});

router.get('/student/:id', function(req, res, next){
  Student.findById(req.params.id, function(err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

router.post('/students', function(req, res, next){
  newStudent = new Student({
    username: req.body.username,
    password: req.body.password,
    writings: []
  });
  newStudent.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});


module.exports = router;
