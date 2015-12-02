var mongoose = require('mongoose-q')(require('mongoose'));
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
//this might not be right
var config = require ('../../../_config.js');

var Student = new Schema({
  username: {
    type: String,
    unique: true
  },
  userImage:{
    type: String
  },
  password: {
    type: String,
    select: false
  },
  teacher: {
    type: Boolean
  },
  section: {
    type: String
  },
  writings: [{type: Schema.Types.ObjectId, ref: 'writings'}]
});

// hash before saving to database
Student.pre('save', function(next) {
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
Student.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('students', Student);

