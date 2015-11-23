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




//*** Registering a student - not sure how to test that... ***//
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



  ///*** post one writing for a student - working ***//
  it('should add a writing to a student on /stUser/student/:id/writings  POST', function(done){
    chai.request(server)
    .get('/stUser/students/')
    .end(function(error, response){
      // console.log(response.body, "RESPONSE")
      var student = response.body[0];
      var studentWriting = new Writing({
        title: "Title",
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
      title: "Some Title",
      text: "Someday there will be an ugly rainbow on the moon",
      positiveWords: ["rainbow", "moon"],
      negativeWords: ["ugly"],
      positiveWordCount: 2,
      negativeWordCount: 1,
      textWordCount: 10
    });

    newWriting.save();

    var anotherWriting = new Writing({
      title: "Again Title",
      text: "There is some text here and it is awesome",
      positiveWords: ["awesome"],
      negativeWords: ["some"],
      positiveWordCount: 1,
      negativeWordCount: 1,
      textWordCount: 9
    });

    anotherWriting.save();

    chai.request(server)
    .get('/stUser/students/')
    .end(function(error, response){

      var id = response.body[0]._id;
      var update = {$pushAll : {writings : [newWriting, anotherWriting]}};
      var options = {new:true};

      Student.findByIdAndUpdate(id, update, options, function(err, res){
        if(err){
          console.log("DAMMIT!");
        } else {
          // console.log(res, "WORKED BY GOLLY!");
        }
      });
      // console.log(id, "ID for student?");
      chai.request(server)
      .get('/stUser/student/' + id + '/writings')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body.success.length, "resbody")
        res.body.success.should.be.a('array');
        res.body.success.length.should.equal(2);
        res.body.success[0].should.have.property('text');
        res.body.success[0].should.have.property('title');
        res.body.success[1].should.have.property('negativeWordCount');
        res.body.success[1].should.have.property('positiveWords');
        res.body.success[0].text.should.equal('Someday there will be an ugly rainbow on the moon');
        res.body.success[0].title.should.equal('Some Title');
        res.body.success[0].negativeWords.should.be.a('array');
        res.body.success[0].positiveWords[0].should.equal('rainbow');
        done();
      });
    });
  });




  //*** get one writing for a student ***//
    //combine finding all student writings, getting the id, and then using the regular GET one writing route by id
  it('should get a single writing for a student on /stUser/student/:id/:writingId get', function(done){
    var newWriting = new Writing({
      title: "Some Title",
      text: "Someday there will be an ugly rainbow on the moon",
      positiveWords: ["rainbow", "moon"],
      negativeWords: ["ugly"],
      positiveWordCount: 2,
      negativeWordCount: 1,
      textWordCount: 10
    });

    newWriting.save();

    var anotherWriting = new Writing({
      title: "Again Title",
      text: "There is some text here and it is awesome",
      positiveWords: ["awesome"],
      negativeWords: ["some"],
      positiveWordCount: 1,
      negativeWordCount: 1,
      textWordCount: 9
    });

    anotherWriting.save();

    chai.request(server)
    .get('/stUser/students/')
    .end(function(error, response){

      var id = response.body[0]._id;
      var update = {$pushAll : {writings : [newWriting, anotherWriting]}};
      var options = {new:true};

      Student.findByIdAndUpdate(id, update, options, function(err, res){
        if(err){
          console.log("DAMMIT!");
        } else {
          // console.log(res.writings[0], "WORKED BY GOLLY!");
        }
      });

      chai.request(server)
      .get('/stUser/student/' + id + '/writings')
      .end(function(err, res){
      // assign a variable to the first one in the writings array
        var wID = res.body.success[0]._id;
        // console.log(wID, "wID");

        chai.request(server)
        .get('/writing/sample/' + wID)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          // console.log(res.body, "resbody")
          res.body.should.be.a('object');
          res.body.should.have.property('text');
          res.body.should.have.property('title');
          res.body.should.have.property('negativeWordCount');
          res.body.should.have.property('positiveWords');
          res.body.text.should.equal('Someday there will be an ugly rainbow on the moon');
          res.body.title.should.equal('Some Title');
          res.body.negativeWords.should.be.a('array');
          res.body.positiveWords[0].should.equal('rainbow');
          done();
        });
      });
    });
  });



  //*** Delete one writing from a student - (show deleted) ***//
  it('should delete a writing from a student writings array once that writing is removed from the collection', function(done){
    chai.request(server)
    .get('/stUser/students/')
    .end(function(error, response){
      // console.log(response.body, "RESPONSE")
      var student = response.body[0]._id;
      console.log(student, "STUDENT");
      var studentWriting = new Writing({
        title: "Title",
        text: "Sally sells seashells by the seashore alone in the dark",
        positiveWords: ["seashells", "Sally"],
        negativeWords: ["sells", "alone", "dark"],
        positiveWordCount: 2,
        negativeWordCount: 3,
        textWordCount: 10
      });

      studentWriting.save();
      chai.request(server)
        .post('/stUser/student/' + student + '/writings')
        .end(function(err, res){
         // console.log(res.body, "RESBODY");
         var writingID = res.body.SUCCESS.writings[0];
          // console.log(writingID, 'WritingID');
          chai.request(server)
          .delete('/writing/sample/' + writingID)
          .end(function(err, res){
             // console.log(res.body, "RES");
             // console.log(err, "ERR");
            chai.request(server)
            .get('/stUser/students/')
            .end(function(err2, res2){
              chai.request(server)
              .get('/stUser/student/' + res2.body[0]._id + '/writings/')
              .end(function(err3, res3){
              // console.log(res3.body, 'res3.body');
                res3.should.have.status(200);
                res3.should.be.json;
                res3.body.success.should.be.a('array');
                res3.body.success.length.should.equal(0);
                done();
              });
            });
          });
      });
    });
  });



});
