var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
var passport = require('passport')
var bodyParser = require('body-parser')
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  console.log(req.body)
  User.register(new User({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500,
        res.json({err: err})
      } else {
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200
          res.json({success: true, status: 'registration successful!'})
        })
      }
    })
})
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200
  res.json({success: true, status: 'you are successful logged in!'})
})
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.send('登出成功。重定向的事让前端做')
  } else {
    var err = new Error('you are not logged in!')
    err.status = 403
    next(err)
  }
})

// 使用github 登录 验证 登出
router.post('/github/login', passport.authenticate('github'), (req, res, next) => {
  res.statusCode = 200
  res.json({success: true, status: 'you are successful logged in!'})
})
router.get('/github/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.send('登出成功。重定向的事让前端做')
  } else {
    var err = new Error('you are not logged in!')
    err.status = 403
    next(err)
  }
})
// 使用github 登录 验证 登出

router.use((err, req, res, next) => {
  console.log(err)
  if (err) {
    res.send(err)
  }
})

module.exports = router;
