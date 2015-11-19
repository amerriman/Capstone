process.env.NODE_ENV = 'test';

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

  it('should list ALL writings on /writing GET', function(done) {
    chai.request(server)
      .get('/writing/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        console.log(res.body, "resbody get all");
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
