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

describe('Teachers', function() {


  beforeEach(function(done){

  // Student.collection.drop();
  // Writing.collection.drop();
  // Teacher.collection.drop();

//create a test teacher account
    var testTeacher = new Teacher({
      email: "test@test.com",
      password: "test",
      googleProfileID: "123456abcdef",
      username: "Test test",
      code: "code",
      students: [],
      writings: []
    });
    testTeacher.save(function(err, teacher){
      done();
      // console.log(testTeacher, "test teacher")
    });

// //create a test student account
//     var testStudent = new Student({
//       username: "Declan Atwell",
//       password: "test",
//       writings: []
//       });
//     testStudent.save(function(err, student){
//     });

// //create a test TEACHER writing
//     var testWriting = new Writing({
//       text: "There once was a man from Nantucket",
//       positiveWords: ["once", "from"],
//       negativeWords: ["Nantucket", "was"],
//       positiveWordCount: 2,
//       negativeWordCount: 2,
//       textWordCount: 7
//     });
//     testWriting.save(function(err, writing){
//       // console.log(writing, 'WRITING');
//     });

//   //create a test STUDENT writing
//     var testStudentWriting = new Writing({
//       text: "This is a test student writing",
//       positiveWords: ["student", "writing"],
//       negativeWords: ["test"],
//       positiveWordCount: 2,
//       negativeWordCount: 1,
//       textWordCount: 6
//     });
//     testStudentWriting.save(function(err, writing){
//       // console.log(writing, 'WRITING');
//     });

    // var id = testTeacher._id;
    // // console.log(id, "ID");
    // var update = {$push : {'students': testStudent}};
    // var options = {new: true};

    // Teacher.findByIdAndUpdate(id, update, options, function(err, data){
    //   if (err){
    //     console.log(err, 'ERROR');
    //   } else {
    //     console.log(data, "data");
    //   }
    // });
    // done();

  });

  afterEach(function(done){
    Student.collection.drop();
    Writing.collection.drop();
    Teacher.collection.drop();
    done();
  });


//***  Get all teachers - working ***//
  it ('should list all teachers on /teachers/ get', function(done){
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
    .get('/teaUser/teachers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      // console.log(res.body, "resbody get all");
      res.body.should.be.a('array');
      res.body.length.should.equal(2);
      res.body[0].should.have.property('email');
      res.body[0].should.have.property('googleProfileID');
      res.body[0].should.have.property('username');
      res.body[0].should.have.property('code');
      res.body[0].should.have.property('students');
      res.body[0].should.have.property('writings');
      res.body[0].students.should.be.a('array');
      res.body[0].writings.should.be.a('array');
      res.body[1].email.should.equal('fancy@fancy.com');
      res.body[1].code.should.equal('Woot');
      res.body[0].googleProfileID.should.equal('123456abcdef');
      res.body[0].writings.length.should.equal(0);
      done();
    });
    });
  });

//*** get one teacher - working ***//
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
        .get('/teaUser/teacher/'+data.id)
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

//*** Update a teacher?  For updating their profile? ***//



//*** Not working when try to have a complex hook- unclear why - working otherwise ***//
  it('should delete a SINGLE teacher on /teaUser/teacher/<id> DELETE', function(done) {
    chai.request(server)
      .get('/teaUser/teachers')
      .end(function(err, res){
        // console.log(res.body, "DELETE RES BODY")
        chai.request(server)
          .delete('/teaUser/teacher/'+res.body[0]._id)
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


  //*** Post a writing for a teacher - working ***//
  it('should add a writing to a teacher on /teaUser/teacher/:id/writings  POST', function(done){
    chai.request(server)
    .get('/teaUser/teachers/')
    .end(function(error, response){
      var teacher = response.body[0];
      var teacherWriting = new Writing({
        text: "Sally sells seashells by the seashore alone in the dark",
        positiveWords: ["seashells", "Sally"],
        negativeWords: ["sells", "alone", "dark"],
        positiveWordCount: 2,
        negativeWordCount: 3,
        textWordCount: 10
      });

    teacherWriting.save();
    chai.request(server)
      .post('/teaUser/teacher/' + response.body[0]._id + '/writings')
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



  //*** Get all writing for a teacher - working ***//
  it('should get a single teachers writings on /teaUser/teacher/:id/writings get', function(done){
    var newWriting = new Writing({
      text: "Sally sells seashells by the seashore alone in the dark",
      positiveWords: ["seashells", "Sally"],
      negativeWords: ["sells", "alone", "dark"],
      positiveWordCount: 2,
      negativeWordCount: 3,
      textWordCount: 10
    });

    newWriting.save();

    chai.request(server)
    .get('/teaUser/teachers/')
    .end(function(error, response){

      var id = response.body[0]._id;
      var update = {$push : {writings : newWriting}};
      var options = {new:true};

      Teacher.findByIdAndUpdate(id, update, options, function(err, res){
        if(err){
          console.log("DAMMIT!");
        } else {
          // console.log(res, "WORKED BY GOLLY!");
        }
      });

      chai.request(server)
      .get('/teaUser/teacher/' + response.body[0]._id + '/writings')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body.success[0], "resbody")
        res.body.success.should.be.a('array');
        res.body.success[0].should.have.property('text');
        res.body.success[0].should.have.property('negativeWordCount');
        res.body.success[0].should.have.property('positiveWords');
        res.body.success[0].text.should.equal('Sally sells seashells by the seashore alone in the dark');
        res.body.success[0].negativeWords.should.be.a('array');
        res.body.success[0].positiveWords[0].should.equal('seashells');
        done();
      });
    });
  });




  //*** Get one writing for a teacher ***//





  //*** delete a writing for a teacher ***//




  //*** Get all students for a teacher -working ***//
  it('should get a single teachers studentson /teaUser/teacher/:id/students get', function(done){
    var newStudent = new Student({
      username: "Some Kid",
      password: "moo",
      writings: []
      });

    newStudent.save();

    chai.request(server)
    .get('/teaUser/teachers/')
    .end(function(error, response){

      var id = response.body[0]._id;
      var update = {$push : {students : newStudent}};
      var options = {new:true};

      Teacher.findByIdAndUpdate(id, update, options, function(err, res){
        if(err){
          console.log("DAMMIT!");
        } else {
          // console.log(res, "WORKED BY GOLLY!");
        }
      });

      chai.request(server)
      .get('/teaUser/teacher/' + response.body[0]._id + '/students')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body.success[0].username, "resbody")
        res.body.success.should.be.a('array');
        res.body.success[0].should.have.property('username');
        res.body.success[0].should.have.property('writings');
        res.body.success[0].username.should.equal('Some Kid');
        res.body.success[0].writings.should.be.a('array');
        res.body.success[0].writings.length.should.equal(0);
        done();
      });
    });
  });




  //*** Get all STUDENT WRITINGS for a teacher ***//





  //*** Get one student for a teacher ***//




  //*** Get on STUDENT WRITING for a teacher ***//







});
