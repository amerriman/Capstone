process.env.NODE_ENV = 'test';

var chai = require('chai');
// var mocha = require('mocha');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../src/server/app.js');

// var Teacher = require('../src/server/models/teacher');
var Student = require('../src/server/models/student');
var Writing = require('../src/server/models/writing');

var should = chai.should();
chai.use(chaiHttp);


describe('Student', function() {

  Student.collection.drop();
  Writing.collection.drop();

  beforeEach(function(done){

    // var newWriting = new Writing({
    //   text: "There once was a man from Nantucket",
    //   positiveWords: ["once", "from"],
    //   negativeWords: ["Nantucket", "was"],
    //   positiveWordCount: 2,
    //   negativeWordCount: 2,
    //   textWordCount: 7
    // });
    // newWriting.save();

    var testStudent = new Student({
      username: "Declan Atwell",
      password: "test",
      writings: []
      });
    testStudent.save(function(err){
     done();
    });
  });
    // console.log(newStudent, "NEW STUDENT");

    // var id = newStudent.id;
    // var push = {$push : {writings : newWriting}};
    // var options = {new :true};

    // console.log(id, "ID");

    // Student.findByIdAndUpdate(id, push, options, function(err, result){
    //   if(err){
    //     console.log(err, "ERR");
    //   } else {
    //     console.log("WORKED");
    //   }
    // });



  afterEach(function(done){
    Student.collection.drop();
    Writing.collection.drop();
    done();
  });


  it('should list ALL students on GET', function(done) {
    chai.request(server)
      .get('/stUser/students')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body, "resbody get all");
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('writings');
        res.body[0].username.should.equal('Declan Atwell');
        res.body[0].writings.length.should.equal(0);
        done();
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
          console.log(res.body, "resbody get single");
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

  it('should add a SINGLE student', function(done){
    chai.request(server)
    .post('/stUser/students')
    .send({
      "username": "Max Smith",
      "password": "1234",
      "writings": []
    })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      console.log(res.body, "post one")
      // res.body.should.be.a('object');
      // res.body.should.have.property('SUCCESS');
      // res.body.SUCCESS.should.be.a('object');
      // res.body.should.be.a('object');
      // res.body.SUCCESS.should.have.property('text');
      // res.body.SUCCESS.should.have.property('positiveWords');
      // res.body.SUCCESS.should.have.property('negativeWordCount');
      // res.body.SUCCESS.text.should.equal("Someday there will be an ugly rainbow on the moon");
      // res.body.SUCCESS.positiveWords.should.be.a('array');
      // res.body.SUCCESS.positiveWords[0].should.equal('rainbow');
      // res.body.SUCCESS.textWordCount.should.equal(10);
      done();
    });
});


});
