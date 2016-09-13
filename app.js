var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mysql = require('mysql');
var db = mysql.createConnection({
  host:'es4.clmk2ccz7ewv.us-west-2.rds.amazonaws.com',
  port:'3306',
  user:'es4admin',
  password: 'es4admin'
});

db.connect(function(err){
  if(err){
    console.log('Error connecting to mysql');
    console.log(err);
    return;
  }
  console.log('Connected to mysql');
})


// db.query('CALL es4.selectLeos(1,2)', function(err, rows){
//   if(err){
//     console.log(err);
//     throw err;
//   }
//   console.log('Data:');
//   console.log(rows);
// })
//
// db.end(function (err) {
//   if(err){
//     console.log(err);
//   }
//   console.log('Disconnected');
//
// })



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  req.db = db;
  next();
})


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
