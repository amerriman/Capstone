var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


//*** get all students - working ***//
router.get('/students', function(req, res, next) {
  Student.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});

//*** get one student - working ***//
router.get('/student/:id', function(req, res, next){
  Student.findById(req.params.id, function(err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//*** post to add single writing to a student - working ***//
router.post('/student/:id/writings', function(req, res, next){
  var newWriting = new Writing({
    title: req.body.title,
    text: req.body.text,
    positiveWords: req.body.positiveWords,
    negativeWords: req.body.negativeWords,
    positiveWordCount: req.body.positiveWordCount,
    negativeWordCount: req.body.negativeWordCount,
    textWordCount: req.body.textWordCount
  });
  newWriting.save(function(err, writing){
    if(err){
      res.json({'message': err});
    } else if(writing){
      // console.log(writing, "WRITING");
      var id = req.params.id;
      var update = {$push : { writings : newWriting } };
      var options = {new :true };
      Student.findByIdAndUpdate(id, update, options, function(err, data){
        if (err){
          res.json({'message':err});
        } else {
          res.json({'SUCCESS': data});
        }
      });
    }
  });
});

// *** remove single writing from student ***//
router.put('/student/:id/:wid', function(req, res) {
  var student = req.params.id;
  var writing = req.params.wid;

  var remove = {$pull: {"writings": writing}};
  var options = {new: true, upsert: true};
  Student.findByIdAndUpdate(student, remove, options, function(err, data){
    if (err){
      console.log(err);
      res.send({'message':err});
        } else {
      console.log(data);
      res.send(data);
        }
});
});


//***  get all writings from one student ***//
router.get('/student/:id/writings', function(req, res, next){
 Student.findById(req.params.id)
  .populate('writings')
  .exec(function(err, student){
    if(err){
      res.json({'message':err});
    }
    else{
      res.json({"success":student.writings});
    }
  });
});






module.exports = router;
