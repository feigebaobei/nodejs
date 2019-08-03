var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var index = require('./routes/index');
var users = require('./routes/users');
var res = require('./routes/res.js')
var learnCookie = require('./routes/learnCookie.js')
var learnSession = require('./routes/learnSession.js')
var learnPassport = require('./routes/learnPassport.js')

const mongoose = require('mongoose')
const Dishes = require('./models/dishes')
const url = 'mongodb://localhost:27017/confusion'
const connect = mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})

connect.then(db => {
  console.log('Connnect correctly to server')
}).catch(err => {console.log(err)})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('123456')); // 指定加密
app.use(session({
  name: 'session-id',
  secret: '1234567',
  // cookie: {maxAge: 60000},
  cookie: {maxAge: 10000},
  saveUninitialized: false,
  resave: true,
  store: new FileStore()
}))
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  // res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  // res.header('Access-Control-Allow-Headers', 'fromli')
  res.header('Access-Control-Max-Age', 3600)
  next()
});

app.use('/users', users);
app.use('/res', res)
app.use('/learncookie', learnCookie)
app.use('/learnsession', learnSession)
app.use('/learnpassport', learnPassport)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
