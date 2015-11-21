process.env.NODE_ENV = 'test';

var chai = require('chai');
// var mocha = require('mocha');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose-q')(require('mongoose'));
var server = require('../src/server/app.js');

var Teacher = require('../src/server/models/teacher');
var Student = require('../src/server/models/student');
var Writing = require('../src/server/models/writing');

var should = chai.should();
chai.use(chaiHttp);


describe('Student', function() {

  Student.collection.drop();
  Writing.collection.drop();
  Teacher.collection.drop();

  beforeEach(function(done){


    var testTeacher = new Teacher({
      email: "test@test.com",
      password: "test",
      googleProfileID: "123456abcdef",
      username: "Test test",
      code: "code",
      students: [],
      writings: []
    });
    // testTeacher.save();
    testTeacher.save(function(err, teacher){
      // if (err){
      //   console.log(err, "ERR");
      // } else {
        // console.log(teacher, "TEACHER")
      // }
    });
    var testStudent = new Student({
      username: "Declan Atwell",
      password: "test",
      writings: []
      });
    // testStudent.save();
    testStudent.save(function(err, student){
      // console.log(student, "STUDENT");
     // done();
    });

    var testWriting = new Writing({
      text: "There once was a man from Nantucket",
      positiveWords: ["once", "from"],
      negativeWords: ["Nantucket", "was"],
      positiveWordCount: 2,
      negativeWordCount: 2,
      textWordCount: 7
    });
    testWriting.save(function(err, writing){
      console.log(writing, 'WRITING');
    });

    var id = testTeacher._id;
    console.log(id, "ID")
    var update = {$push : {'students': testStudent}};
    var options = {new: true};

    Teacher.findByIdAndUpdateQ(id, update, options)
    .then(function(result){
      // console.log(result, "RESULT")
    })
    .catch(function(err){
      // console.log(err, "ERROR")
    });
    done();

  });

  afterEach(function(done){
    Student.collection.drop();
    Writing.collection.drop();
    Teacher.collection.drop();
    done();
  });


  it('should list ALL students on GET', function(done) {
    var testStudent = new Student({
      username: "Some Student",
      password: "yelp",
      writings: []
    });
    testStudent.save(function(err, data){
    chai.request(server)
      .get('/stUser/students')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body, "RESBODY")
        console.log(res.body[0], "resbody get all");
        console.log(res.body[1], "resbody get all 1");
        res.body.should.be.a('array');
        res.body.length.should.equal(2);
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('writings');
        res.body[0].writings.length.should.equal(0);
        done();
      });
    });
  });



  it('should list a SINGLE student', function(done) {
    var newStudent = new Student({
      username: "Megan Connley",
      password: "sample",
      writings: []
    });
    newStudent.save(function(err, data) {
      chai.request(server)
        .get('/stUser/student/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          // console.log(res.body, "resbody get single");
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('writings');
          res.body.username.should.equal("Megan Connley");
          res.body.writings.should.be.a('array');
          res.body.writings.length.should.equal(0);
          done();
        });
    });
  });


// // Registering a student - not sure how to test that...
//   it('should add a SINGLE student', function(done){
//     chai.request(server)
//     .post('/stUser/register')
//     .send({
//       "username": "Max Smith",
//       "password": "1234",
//     })
//     .end(function(err, res){
//       res.should.have.status(200);
//       res.should.be.json;

//       done();
//     });
// });


  //Post one writing for a student




  //get all writing for a student




  //get one writing for a student




  //Delete one writing for a student








});
