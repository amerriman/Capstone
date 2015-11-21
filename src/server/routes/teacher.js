var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


//get all teachers - an admin only route - working ***//
router.get('/teachers', function(req, res, next){
  Teacher.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});


//*** get single teacher information - working ***//
router.get('/teacher/:id', function(req, res, next){
  Teacher.findById(req.params.id, function (err, data){
     if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//*** post to add single writing to a teacher - working ***//
router.post('/teacher/:id/writings', function(req, res, next){
  var newWriting = new Writing({
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
      Teacher.findByIdAndUpdate(id, update, options, function(err, data){
        if (err){
          res.json({'message':err});
        } else {
          res.json({'SUCCESS': data});
        }
      });
    }
  });
});

//*** get all teacher writings - working ***//
router.get('/teacher/:id/writings', function(req, res, next){
 Teacher.findById(req.params.id)
  .populate('writings')
  .exec(function(err, teacher){
    if(err){
      res.json({'message':err});
    }
    else{
      res.json({"success":teacher.writings});
    }
  });
});


  //*** Get all students for a teacher - working ***//
router.get('/teacher/:id/students', function(req, res, next){
 Teacher.findById(req.params.id)
  .populate('students')
  .exec(function(err, teacher){
    if(err){
      res.json({'message':err});
    }
    else{
      res.json({"success" : teacher.students});
    }
  });
});



  //*** Get one writing for a teacher ***//




  //*** Get one student for a teacher ***//






// //get all students and writings for a single teacher - not exactly what I want - maybe all students and THEIR writings?
// router.get('/teacher/:id/all', function(req, res, next){
//   User.findById(req.params.id)
//   .populate('students')
//   .populate('writings')
//   .exec(function(err, user){
//     if(err){
//       res.send(err);
//     } else {
//       res.json(user);
//     }
//   });
// });





//*** delete a teacher - what happens to all the students...? Should this automatically also delete all the students attached to that teacher? - working ***//
router.delete('/teacher/:id', function(req, res, next){
  Teacher.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json ({'message': err});
    } else {
      res.json({'REMOVED' :data});
    }
  });
});


module.exports = router;

