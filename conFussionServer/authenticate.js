// var passport = require('passport'),
//   LocalStrategy = require('passport-local').Strategy,
//   User = require('./models/user')

// exports.local = passport.use(new LocalStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())




var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// exports.local = passport.use(new LocalStrategy(User.authenticate()))
// // passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// 在网上找到方法
exports.local = passport.use('local', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  // thirdField: 'third'
  // usernameField: 'third',
  // passwordField: 'four'
}, (username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    if (err) {
      return done(err, false)
    } else {
      if (user) {
        // if (third === 'tthh') {
        //   console.log('third: tthh');
        //   return done(null, user)
        // } else {
        //   console.log('V_V')
        //   return done(null, false)
        // }
        return done(null, user)
      } else {
        return done(null, false)
      }
    }
  })
}))
passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})