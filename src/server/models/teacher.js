var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
//this might not be right
// var config = require ('../../../_config');
// var Student = require('./student.js');
// var Writing = require('./writing.js');

var Teacher = new Schema({
  email: {
    type: String,
    unique: true,
    // sparse: true,
    lowercase: true
  },
  password: {
    type: String,
    select: false
  },
  googleProfileID: {
  type: String
  },
  username: {
    type: String
  },
  code: String,
  students: [{type: Schema.Types.ObjectId, ref: 'students'}],
  writings: [{type: Schema.Types.ObjectId, ref: 'writings'}]
});

//might need to change all "User" to 'Teacher'
// hash before saving to database
Teacher.pre('save', function(next) {
  var user = this;

  // only hash if the password is new or modified
  if (!user.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password along with the salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // overwrite the plain-text password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// verify for plain-text and hashed passwords
Teacher.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('teachers', Teacher);
