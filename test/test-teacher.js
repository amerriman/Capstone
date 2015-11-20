process.env.NODE_ENV = 'test';

var chai = require('chai');
// var mocha = require('mocha');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../src/server/app.js');

var Teacher = require('../src/server/models/teacher');
var Student = require('../src/server/models/student');
var Writing = require('../src/server/models/writing');

var should = chai.should();
chai.use(chaiHttp);

// describe('Exercises', function() {

// Exercise.collection.drop();

//   beforeEach(function(done){
//     var newExercise = new Exercise({
//       name: "CSS primer",
//       description: "Learn CSS",
//       tags: ["CSS"]
//     });
//     newExercise.save(function(err) {
//       done();
//     });
//   });
//   afterEach(function(done){
//     Exercise.collection.drop();
//     done();
//   });
// });
