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

describe('Teachers', function() {

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
    testTeacher.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Teacher.collection.drop();
    done();
  });

  it ('should list all teachers on /teachers/ get', function(done){
    chai.request(server)
    .get('/auth/teachers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      // console.log(res.body, "resbody get all");
      res.body.should.be.a('array');
      res.body.length.should.equal(1);
      res.body[0].should.have.property('email');
      res.body[0].should.have.property('googleProfileID');
      res.body[0].should.have.property('username');
      res.body[0].should.have.property('code');
      res.body[0].should.have.property('students');
      res.body[0].should.have.property('writings');
      res.body[0].students.should.be.a('array');
      res.body[0].writings.should.be.a('array');
      res.body[0].email.should.equal('test@test.com');
      res.body[0].code.should.equal('code');
      res.body[0].googleProfileID.should.equal('123456abcdef');
      res.body[0].writings.length.should.equal(0);
      done();
    });
  });

  it('should list a SINGLE teacher on /teacher/:id get', function(done) {
    var newTeacher = new Teacher({
      email: "fancy@fancy.com",
      password: "fancy",
      googleProfileID: "Blargh",
      username: "Fancy fancy",
      code: "Woot",
      students: [],
      writings: []
    });
    newTeacher.save(function(err, data) {
      chai.request(server)
        .get('/auth/teacher/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          // console.log(res.body, "resbody get single");
          res.body.should.have.property('email');
          res.body.should.have.property('googleProfileID');
          res.body.should.have.property('username');
          res.body.should.have.property('code');
          res.body.should.have.property('students');
          res.body.should.have.property('writings');
          res.body.students.should.be.a('array');
          res.body.writings.should.be.a('array');
          res.body.email.should.equal('fancy@fancy.com');
          res.body.code.should.equal('Woot');
          res.body.googleProfileID.should.equal('Blargh');
          res.body.writings.length.should.equal(0);
          done();
        });
    });
  });


  it('should delete a SINGLE exercise on /api/exercise/<id> DELETE', function(done) {
    chai.request(server)
      .get('/auth/teachers')
      .end(function(err, res){
        chai.request(server)
          .delete('/auth/teacher/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            // console.log(response.body, "DELETE ONE")
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('username');
            response.body.REMOVED.should.have.property('_id');
            response.body.REMOVED.username.should.equal("Test test");
            done();
        });
      });
  });




});
