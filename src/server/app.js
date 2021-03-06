// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var swig = require('swig');
var mongoose = require('mongoose');


// *** config file *** //
var config = require('../../_config.js');

// *** routes *** //
var routes = require('./routes/index.js');
var authRoutes = require('./routes/auth.js');
var writingRoutes = require('./routes/writing.js');
var studentRoutes = require('./routes/student.js');
var teacherRoutes = require('./routes/teacher.js');


// *** express instance *** //
var app = express();

// *** view engine *** //
// var swig = new swig.Swig();
// app.engine('html', swig.renderFile);
// app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));


// *** mongoose ** //
mongoose.connect(config.MONGO_URI[app.settings.env]);


// *** main routes *** //
app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/writing', writingRoutes);
app.use('/stUser', studentRoutes);
app.use('/teaUser', teacherRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //can I use json here instead of res.send?

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
});


module.exports = app;
