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


describe('server router', function(){


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
