// process.env.NODE_ENV = 'test';

var chai = require('chai');
var mocha = require('mocha');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var server = require('../src/server/app.js');

var Teacher = require('../src/server/models/teacher');
var Student = require('../src/server/models/student');
var Writing = require('../src/server/models/writing');

var should = chai.should();
chai.use(chaiHttp);


describe('Writing', function(){

  Writing.collection.drop();

  beforeEach(function(done){
    var newWriting = new Writing({
      text: "There once was a man from Nantucket",
      positiveWords: ["once", "from"],
      negativeWords: ["Nantucket", "was"],
      positiveWordCount: 2,
      negativeWordCount: 2,
      textWordCount: 7
    });
    newWriting.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Writing.collection.drop();
    done();
  });

//get all writing samples
  it('should list ALL writings', function(done) {
    chai.request(server)
      .get('/writing/samples')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // console.log(res.body, "resbody get all");
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('text');
        res.body[0].should.have.property('positiveWords');
        res.body[0].should.have.property('negativeWordCount');
        res.body[0].text.should.equal("There once was a man from Nantucket");
        res.body[0].positiveWords.should.be.a('array');
        res.body[0].positiveWords[0].should.equal('once');
        res.body[0].negativeWordCount.should.equal(2);
        done();
      });
  });

//get a single writing sample
  it('should list a SINGLE writing', function(done) {
    var newWriting = new Writing({
      text: "Sally sells seashells by the seashore alone in the dark",
      positiveWords: ["seashells", "Sally"],
      negativeWords: ["sells", "alone", "dark"],
      positiveWordCount: 2,
      negativeWordCount: 3,
      textWordCount: 10
    });
    newWriting.save(function(err, data) {
      chai.request(server)
        .get('/writing/sample/'+data.id)
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          // console.log(res.body, "resbody get single")
          res.body.should.be.a('object');
          res.body.should.have.property('text');
          res.body.should.have.property('positiveWords');
          res.body.should.have.property('negativeWordCount');
          res.body.text.should.equal("Sally sells seashells by the seashore alone in the dark");
          res.body.positiveWords.should.be.a('array');
          res.body.positiveWords[0].should.equal('seashells');
          res.body.negativeWordCount.should.equal(3);
          done();
        });
    });
  });


it('should add a SINGLE writing', function(done){
    chai.request(server)
    .post('/writing/samples')
    .send({
      'text': "Someday there will be an ugly rainbow on the moon",
      'positiveWords': ["rainbow", "moon"],
      'negativeWords': ["ugly"],
      'positiveWordCount': 2,
      'negativeWordCount': 1,
      'textWordCount': 10
    })
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      // console.log(res.body, "post one")
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      res.body.should.be.a('object');
      res.body.SUCCESS.should.have.property('text');
      res.body.SUCCESS.should.have.property('positiveWords');
      res.body.SUCCESS.should.have.property('negativeWordCount');
      res.body.SUCCESS.text.should.equal("Someday there will be an ugly rainbow on the moon");
      res.body.SUCCESS.positiveWords.should.be.a('array');
      res.body.SUCCESS.positiveWords[0].should.equal('rainbow');
      res.body.SUCCESS.textWordCount.should.equal(10);
      done();
    });
});


it('should delete a SINGLE writing', function(done) {
  chai.request(server)
    .get('/writing/samples')
    .end(function(err, res){
      chai.request(server)
        .delete('/writing/sample/'+res.body[0]._id)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('REMOVED');
          response.body.REMOVED.should.be.a('object');
          response.body.REMOVED.should.have.property('text');
          response.body.REMOVED.should.have.property('_id');
          response.body.REMOVED.text.should.equal("There once was a man from Nantucket");
          done();
      });
    });
});

  // it('should return...', function(done){
  //   chai.request(server)
  //   .get('/')
  //   .end(function(err, res){
  //     // console.log(res);
  //     res.should.have.status(200);
  //     done();
  //   });
  // });

});
