var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var passport = require('passport')
var authenticate = require('./authenticate')
var config = require('./config')
var logDirectory = path.join(__dirname, 'log')
var Log = require('./models/log')

var index = require('./routes/index');
var users = require('./routes/users');
var news = require('./routes/news');
var dish = require('./routes/dish');
var error = require('./routes/error');

const mongoose = require('mongoose')
// const url = 'mongodb://localhost:27017/confusion'
const url = config.mongoUrl
const connect = mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})

connect.then(db => {
  console.log('Connect correct to server')
}, err => {console.log(err)})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accesLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
var writeToDB = {
  write: function (line) {
    let [, ua, re] = line.split(' ')
    var ele = new Log({
      userAgent: ua,
      referrer: re
    })
    ele.save(err => {
      if (err) {
        console.log('err', err)
      }
      //  else {
      //   console.log('ele', ele)
      // }
    })
  }
}
// 使用编译后的format
// let fn = logger.compile(`[joke] :method`)
// logger.format('nan', fn)
// app.use(logger('nan'))
app.use(logger(logger.compile(`[joke] :req[User-Agent] :req[Referer]`), {stream: accesLogStream})) // 把日志保存在日志文件里
app.use(logger(logger.compile(`[joke] :req[User-Agent] :req[Referer]`), {stream: writeToDB})) // 把日志保存在mongodb文件里

// 直接使用formatString,不编译。
// logger.format('nb', '[joke] :method')
// app.use(logger('nb'))

// 直接使用formatFunction,不编译
// app.use(logger(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//   ].join(' ')
// }))


// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(session({
//   name: 'session-id',
//   cookie: {maxAge: 10000},
//   secret: '12345-67890',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }))

app.use(passport.initialize())
// app.use(passport.session())

app.use('/', index);
app.use('/users', users);
app.use('/dish', dish);
app.use('/error', error);

// app.use(authFn)
// 使用使用passport使用验证是否登录.
// app.use((req, res, next) => {
//   console.log(req.session)
//   console.log(req.isAuthenticated())
//   if (req.isAuthenticated()) {
//     next()
//   } else {
//     res.redirect('/error')
//   }
// })

app.use('/news', news)

app.use(express.static(path.join(__dirname, 'public')));

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
