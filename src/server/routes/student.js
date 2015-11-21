var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var Writing = require('../models/writing');
var Student = require('../models/student');
var Teacher = require('../models/teacher');


//register a new student
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

// //register a new student
// router.post('/register', function(req, res, next){
//   var payload = {
//     username:req.body.username,
//     password:req.body.password
//   };
//   var query = {
//     code: req.body.code
//   };
//   Teacher.findOne(query, function(err, teacher){
//     if(teacher){
//       var newStudent = new Student(payload);
//       newStudent.save(function(err, student){
//         // console.log(student, "STUDENT");
//         if(err){
//         // console.log(err, "Register Err");
//           res.json({'message': err});
//         } else if(student){
//           var options = {new:true};
//           var update = {$push:{students:newStudent}};
//           Teacher.findOneAndUpdate(query, update, options, function(err, data){
//             if(err){
//               res.json({'message':err});
//             } else {
//             res.json(newStudent);
//             }
//           });
//         }
//       });
//     } else if(!teacher){
//       console.log("No teacher found!")
//     } else if(err){
//       // console.log(err, "CODE ERR");
//       res.json({'message': "Whoops - invalid code!"});
//     }
//   });
// });

//get all students - tested
router.get('/students', function(req, res, next) {
  Student.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});

//get one student - tested
router.get('/student/:id', function(req, res, next){
  Student.findById(req.params.id, function(err, data){
    if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//Can't use this because then the student won't be attached to the teacher
// router.post('/students', function(req, res, next){
//   newStudent = new Student({
//     username: req.body.username,
//     password: req.body.password,
//     writings: []
//   });
//   newStudent.save(function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json({"SUCCESS": data});
//     }
//   });
// });


module.exports = router;
