var passport = require('passport'),
  GithubStrategy = require('passport-github').Strategy,
  User = require('./models/user')

passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: '/'
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate(new User({username: user}), (err, user) => {
    // if (err) {
    //   res.statusCode = 500,
    //   res.json({err: err})
    // } else {
    //   passport.authenticate('local')(req, res, () => {
    //     res.statusCode = 200
    //     res.json({success: true, status: 'registration successful!'})
    //   })
    // }
    if (err) {
      return done(err)
    }
    done(null, user)
  })
}))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
