var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


//get all teachers - an admin only route - tested
router.get('/teachers', function(req, res, next){
  Teacher.findQ({})
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    res.json({'message': err});
  })
  .done();
});


//get single teacher information - tested
router.get('/teacher/:id', function(req, res, next){
  Teacher.findByIdQ(req.params.id)
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  })
  .done();
});


//post to add single writing to a teacher
router.post('teacher/:id/writings', function(req, res, next){
  var newWriting = new Writing({
      text: req.body.text,
      positiveWords: req.body.positiveWords,
      negativeWords: req.body.negativeWords,
      positiveWordCount: req.body.positiveWordCount,
      negativeWordCount: req.body.negativeWordCount,
      textWordCount: req.body.textWordCount
    });
  newWriting.save();

  var id = req.params.id;
  var update = {$push : { writings : newWriting } };
  var options = {new :true };
  User.findByIdAndUpdateQ(id, update, options)
  .then(function(result){
    res.json({"SUCCESS": result});
  })
  .catch(function(err){
    res.send({'ERROR' : err});
  })
  .done();
});

//get all teacher writings



//get one teacher writing




//get all students from a single teacher
router.get('/:id/students', function(req, res, next){
 User.findById(req.params.id)
  .populate('students')
  .exec(function(err, user){
    if(err){
      console.log(err);
    }
    else{
      res.json(user.students);
    }
  });
});


//get one student from a single teacher






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





//delete a teacher - what happens to all the students...? Should this automatically also delete all the students attached to that teacher? - tested
router.delete('/teacher/:id', function(req, res, next){
  Teacher.findByIdAndRemoveQ(req.params.id)
  .then(function(result){
    res.json({'REMOVED' : result});
    // console.log(result, "RESULT IN ROUTE")
  })
  .catch(function(err){
    res.send(err);
  });
});


module.exports = router;
