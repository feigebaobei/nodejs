var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var bodyParser = require('body-parser')
router.use(bodyParser.json())

//
router.get('', (req, res, next) => {
  res.send('welcome')
})
router.post('/signup', (req, res, next) => {
  console.log(req.body)
  // User.register(new User({username: req.body.username}))
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.json({err: err})
    } else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json({success: true, status: 'registration successful!'})
      })
    }
  })
})
router.get('/login', (req, res, next) => {
  res.send('welcome')
})
router.get('/logout', (req, res, next) => {
  res.send('welcome')
})

module.exports = router