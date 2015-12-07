var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');
var Teacher = require('../models/teacher');
var Student = require('../models/student');

//***  get all writings - working - ***//
router.get('/samples', function(req, res, next) {
  Writing.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});

//***  get one writing - working - ***//
router.get('/sample/:id', function(req, res, next) {
  Writing.findById(req.params.id, function (err, data){
     if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


//*** edit one writing - the title only***//
router.put('/sample/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {title : req.body.title};
  // console.log(update, "UPDATE");
  var options = {new: true};
  Writing.findOneAndUpdate(query, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});

router.put('/sample/:id/comment', function(req, res){
  var query = {"_id": req.params.id};
  var update = {$push:{comments : req.body.comments}};
  var options = {new: true};
  Writing.findOneAndUpdate(query, update, options, function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});


//***  add new writing(only to database, not to a user) - working ADMIN ONLY ***//
router.post('/samples', function(req, res, next) {
  newWriting = new Writing({
    title: req.body.title,
    text: req.body.text,
    positiveWords: req.body.positiveWords,
    negativeWords: req.body.negativeWords,
    positiveWordCount: req.body.positiveWordCount,
    negativeWordCount: req.body.negativeWordCount,
    textWordCount: req.body.textWordCount
  });
  // console.log(newWriting);
  newWriting.save(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json({"SUCCESS": data});
    }
  });
});

//***  delete a writing from the database ***//

router.delete('/sample/:id', function (req, res, next) {
  Writing.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json ({'message': err});
    } else {
      res.json({'REMOVED' :data});
    }
  });
});




module.exports = router;
