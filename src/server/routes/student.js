var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


//*** register a new student - working ***//
router.post('/register', function(req, res, next){
  var payload = {
    username:req.body.username,
    password:req.body.password
  };
  var query = {
    code: (req.body.code || "snarf")
  };
  Teacher.findOne(query, function(err, teacher){
    if(err){
      res.json({'message': err});
    } else if(!teacher){
      // console.log(err, "CODE ERR");
      res.json({'message': "Whoops - invalid code!"});
    } else if(teacher){
      var newStudent = new Student(payload);
      newStudent.save(function(err, student){
        // console.log(student, "STUDENT");
        if(err){
        // console.log(err, "Register Err");
          res.json({'message': err});
        } else if(student){
          var options = {new:true};
          var update = {$push:{students:newStudent}};
          Teacher.findOneAndUpdate(query, update, options, function(err, data){
            if(err){
              res.json({'message':err});
            } else {
            res.json(newStudent);
            }
          });
        }
      });
    }
  });
});



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
