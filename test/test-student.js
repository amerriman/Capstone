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


describe('Student', function() {


  beforeEach(function(done){

  // Student.collection.drop();
  // Writing.collection.drop();
  // Teacher.collection.drop();

    // var testTeacher = new Teacher({
    //   email: "test@test.com",
    //   password: "test",
    //   googleProfileID: "123456abcdef",
    //   username: "Test test",
    //   code: "code",
    //   students: [],
    //   writings: []
    // });
    // testTeacher.save(function(err, teacher){
    // });
    var testStudent = new Student({
      username: "Declan Atwell",
      password: "test",
      writings: []
      });
    testStudent.save(function(err, student){
      done();
    });

    // var id = testTeacher._id;
    // // console.log(id, "ID")
    // var update = {$push : {'students': testStudent}};
    // var options = {new: true};

    // Teacher.findByIdAndUpdateQ(id, update, options)
    // .then(function(result){
    //   // console.log(result, "RESULT")
    // })
    // .catch(function(err){
    //   // console.log(err, "ERROR")
    // });


    // done();

  });

  afterEach(function(done){
    Student.collection.drop();
    Writing.collection.drop();
    Teacher.collection.drop();
    done();
  });

  //*** get all students - working ***//
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
        // console.log(res.body, "RESBODY")
        // console.log(res.body[0], "resbody get all");
        // console.log(res.body[1], "resbody get all 1");
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


  //*** get one student - working ***//
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


  ///*** post one writing for a student - working ***//
  it('should add a writing to a student on /teaUser/student/:id/writings  POST', function(done){
    chai.request(server)
    .get('/stUser/students/')
    .end(function(error, response){
      // console.log(response.body, "RESPONSE")
      var student = response.body[0];
      var studentWriting = new Writing({
        text: "Sally sells seashells by the seashore alone in the dark",
        positiveWords: ["seashells", "Sally"],
        negativeWords: ["sells", "alone", "dark"],
        positiveWordCount: 2,
        negativeWordCount: 3,
        textWordCount: 10
      });

    studentWriting.save();
    chai.request(server)
      .post('/stUser/student/' + response.body[0]._id + '/writings')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body.SUCCESS, "RES.body.SUCCESS");
        res.body.should.be.a('object');
        res.body.SUCCESS.should.have.property('username');
        res.body.SUCCESS.should.have.property('_id');
        res.body.SUCCESS.should.have.property('writings');
        res.body.SUCCESS.writings.should.be.a('array');
        res.body.SUCCESS.writings.length.should.equal(1);
        done();
      });
    });
  });




  //*** get all writings for a student - working ***//
  it('should get a single students writings on /stUser/student/:id/writings get', function(done){
    var newWriting = new Writing({
      text: "Someday there will be an ugly rainbow on the moon",
      positiveWords: ["rainbow", "moon"],
      negativeWords: ["ugly"],
      positiveWordCount: 2,
      negativeWordCount: 1,
      textWordCount: 10
    });

    newWriting.save();

    chai.request(server)
    .get('/stUser/students/')
    .end(function(error, response){

      var id = response.body[0]._id;
      var update = {$push : {writings : newWriting}};
      var options = {new:true};

      Student.findByIdAndUpdate(id, update, options, function(err, res){
        if(err){
          console.log("DAMMIT!");
        } else {
          // console.log(res, "WORKED BY GOLLY!");
        }
      });

      chai.request(server)
      .get('/stUser/student/' + response.body[0]._id + '/writings')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body.success[0], "resbody")
        res.body.success.should.be.a('array');
        res.body.success[0].should.have.property('text');
        res.body.success[0].should.have.property('negativeWordCount');
        res.body.success[0].should.have.property('positiveWords');
        res.body.success[0].text.should.equal('Someday there will be an ugly rainbow on the moon');
        res.body.success[0].negativeWords.should.be.a('array');
        res.body.success[0].positiveWords[0].should.equal('rainbow');
        done();
      });
    });
  });




  //*** get one writing for a student ***//




  //*** Delete one writing for a student ***//








});
