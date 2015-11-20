var express = require('express');
var router = express.Router();
var Writing = require('../models/writing');


router.get('/samples', function(req, res, next) {
  Writing.find(function(err, data){
    if(err){
      res.json({'message': err});
    } else{
      res.json(data);
    }
  });
});


router.get('/sample/:id', function(req, res, next) {
  Writing.findById(req.params.id, function (err, data){
     if (err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});


router.post('/samples', function(req, res, next) {
  newWriting = new Writing({
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
