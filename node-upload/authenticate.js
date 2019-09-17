var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('./models/user')

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  jwt = require('jsonwebtoken')

var config = require('./config.js')

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

exports.getToken = function (user) {
  // return jwt.sign(user, config.secretKey, {expiresIn: '15s'}) // 签发jwt
  return jwt.sign(user, config.secretKey, {expiresIn: 3600}) // 签发jwt
}

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.secretKey

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // console.log('JWT payload: ', jwt_payload)
  User.findOne({_id: jwt_payload._id}, (err, user) => {
    if (err) {
      return done(err, false)
    } else {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }
  })
}))

exports.verifyUser = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/error/auth'
})
