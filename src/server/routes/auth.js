var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var request = require('request');
var qs = require('querystring');

var config = require('../../../_config');
var Teacher = require('../models/teacher.js');
var Student = require('../models/student');


// *** login required *** //
function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).send({
      message: 'You did not provide a JSON Web Token in the authorization header.'
    });
  }

  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  var now = moment().unix();

  // check if the token has expired
  if (now > payload.exp) {
    return res.status(401).send({
      message: 'Token has expired. '
    });
  }

  // check if the user still exists in the db
  Teacher.findById(payload.sub, function(err, user) {
    if (!user) {
      return res.status(400).send({
        message: 'Teacher no longer exists. '
      });
    }
    req.user = user;
    next();
  });
}

// *** generate token *** //
function createToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

var userImages = ["https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSZK8F2vAEhdfNUnR_9bFQQtj7IuyGK2YZ7N7KXXZ17FZS_Lc9A", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkO8qK-ZPv9jkBX9urprg6MkM6EjY75lcJsToGCa3n1-mIK0_G", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuY3uoXyde7dGCKW9RePnW8zSLKWImAVZxZK0-I2mjs1e-jylq", "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRMnSacu5UpW-KudwL2gMa1W_1QH-92hcWit0KFtLx5o-fUvylSqw", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrQ7KCmQH648oBrJwnFuQKbCaa9BGrPSh9Bl8fxWtbmv5PjLEs", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5OVTFzml-6y72r_JfOdvUaiyM0HN8eIoraFm0iCDutV9MiiU7", "http://www.fourlittlemonsters.com/purple_monster.png"];


function generateUserImage(array){
  var workA = array.slice(0);
  var result = [];
  var random = Math.floor(Math.random() * workA.length);
  result.push(workA.splice(random,1)[0]);
  return result.toString();
}

// *** teacher register route (name, email and password) *** //
router.post('/signup', function(req, res) {
  //need to break this down so it's more specific - check first email and username, and then code seperately so user gets a more specific error
  Teacher.findOne({$or: [{email: req.body.email}, {username: req.body.username}, {code: req.body.code}]}, function(err, existingUser) {
    if (existingUser) {
      return res.status(409).send({
        message: 'Email, name or code is already taken'
      });
    }
    var user = new Teacher({
      username: req.body.name,
      email: req.body.email,
      password: req.body.password,
      code: req.body.code,
      teacher: true,
      userImage: "http://www.mascotdesigngallery.com/wp/wp-content/themes/pinboard/themify/img.php?src=http://www.mascotdesigngallery.com/wp/wp-content/uploads/2014/05/rlv.zcache.jpg&w=670&h=&zc=1"
    });
    user.save(function() {
      var token = createToken(user);
      res.send({
        token: token,
        user: user
      });
    });
    console.log(user, "USER in the teacher login");
  });
});

//it creates the token, but is not sending it to local storage..how to deal with this?
//*** register a new student - working ***//
router.post('/register', function(req, res, next){
  var payload = {
    username:req.body.username,
    password:req.body.password,
    teacher: false,
    section: req.body.section,
    userImage: generateUserImage(userImages)
  };
  var query = {
    code: req.body.code
  };
  Teacher.findOne(query, function(err, teacher){
    if(err){
      res.json({'message': err});
    } else if(!teacher){
      // console.log(err, "CODE ERR");
      res.json({'message': "Whoops - invalid code!"});
    } else if(teacher){
      var user = new Student(payload);
      console.log(user, "STUDENT USER");
      user.save(function(err, user){
        // var token = createToken(user);
        // console.log(token, 'TOKEN');
        // res.send({
        //   token: token,
        //   user: user
        // });
        if(err){
          res.json({'message': err});
        } else if(user){

          var options = {new:true};
          var update = {$push:{students:user}};
          Teacher.findOneAndUpdate(query, update, options, function(err, data){
            if(err){
              res.json({'message':err});
            } else {
              var token = createToken(user);
              console.log(token, "student token", user, "student user");
              res.send({
                token: token,
                user: user
              });
            }
          });
        }
      });
    }
  });
});



// *** teacher and student login route (username and password) WORKING!!!! *** //
router.post('/login', function(req, res){
  Teacher.findOne({username: req.body.username}, '+password', function(err, user){
    if (user){
      user.comparePassword(req.body.password, function(err, isMatch){
        if(!isMatch){
          return res.status(401).send({
            message: 'Wrong username or password'
          });
        } else if (isMatch){
          user = user.toObject();
          delete user.password;
          var token = createToken(user);
          res.send({
            token: token,
            user: user
          });
        }
      });
    } else if (!user){
      Student.findOne({username: req.body.username}, '+password', function(err, user){
        if (user){
          user.comparePassword(req.body.password, function(err, studentMatch){
            if (!studentMatch){
              return res.status(401).send({
                message: 'Wrong username or password'
              });
            } else if (studentMatch){
              user = user.toObject();
              delete user.password;
              var token = createToken(user);
              res.send({
                token: token,
                user: user
              });
            }
          });
        } else if (!user){
          return res.status(401).send({
            message: 'Cant find you!'
          });
        }
      });
    }
  });
});


// *** teacher update user route *** //
router.put('/update', ensureAuthenticated, function(req, res) {
  Teacher.findOne({_id: req.body._id}, function(err, user) {
    if (!user) {
      return res.status(401).send({
        message: {
          email: 'Incorrect email'
        }
      });
    } else {
      var update = {
        email: req.body.email,
        username: req.body.name,
        code: req.body.code
      };
      var options = {new: false};
      Teacher.findByIdAndUpdate({_id: req.body._id}, update, options, function(err, teacher){
        if(err){
          res.json({'message': err});
        } else {
          res.json({'UPDATED' : teacher});
        }
      });
    }
  });
});


//Google Login
router.post('/google', function(req, res) {
  var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
  var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.GOOGLE_SECRET,
    redirect_uri: req.body.redirectUri,
    grant_type: 'authorization_code'
  };

  // Step 1. Exchange authorization code for access token.
  request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
    var accessToken = token.access_token;
    var headers = { Authorization: 'Bearer ' + accessToken };

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
      console.log(profile, "profile");
      if (profile.error) {
        return res.status(500).send({message: profile.error.message});
      }
      // Step 3a. Link user accounts.
      if (req.headers.authorization) {
        Teacher.findOne({ googleProfileID: profile.sub }, function(err, existingUser) {
          if (existingUser) {
            return res.status(409).send({ message: 'There is already a Google account that belongs to you' });
          }
          var token = req.headers.authorization.split(' ')[1];
          var payload = jwt.decode(token, config.TOKEN_SECRET);
          Teacher.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'Teacher not found' });
            }
            user.googleProfileID = profile.sub;
            user.email = profile.email;
            user.username = profile.name;
            user.code = profile.name;
            user.teacher = true;
            user.save(function() {
              var token = createToken(user);
              res.send({
                token: token,
                user: user
              });
            });
          });
        });
      } else {
        // Step 3b. Create a new user account or return an existing one.
        Teacher.findOne({ email: profile.email }, function(err, existingUser) {
          if (existingUser) {
            return res.send({
              token: createToken(existingUser),
              user: existingUser
            });
          }
          // var user = new Teacher();
          // user.googleProfileID = profile.sub;
          // user.email = profile.email;
          // user.username = profile.name;
          // user.code = profile.name;
          // user.save(function(err) {
          //   var token = createToken(user);
          //   res.send({
          //     token: token,
          //     user: user
          //   });
          // });
        });
      }
    });
  });
});


module.exports = router;

