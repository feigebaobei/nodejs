var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
var passport = require('passport')
var bodyParser = require('body-parser')
var authenticate = require('../authenticate')
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
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 500,
        res.json({err: err})
      } else {
        // passport.authenticate('local')(req, res, () => {
        //   res.statusCode = 200
        //   res.json({success: true, status: 'registration successful!'})
        // })
        if (req.body.firstname) {
          user.firstname = req.body.firstname
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname
        }
        // if (req.body.admin) {
        //   user.admin = req.body.admin
        // }
        user.save((err, user) => {
          if (err) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json({err: err})
            return
          }
          passport.authenticate('local')(req, res, () => {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            res.json({success: true, status: 'registration successful!'})
          })
        })
      }
    })
})

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.statusCode = 200
//   res.json({success: true, status: 'you are successful logged in!'})
// })
router.post('/login', passport.authenticate('local'), (req, res) => {
  // res.statusCode = 200
  // res.json({success: true, status: 'you are successful logged in!'})
  var token = authenticate.getToken({_id: req.user._id})
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json({success: true, token: token, status: 'You are successful logged in!'})
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
