var express = require('express');
var router = express.Router();
var User = require('../models/user.js')
router.use(require('passport').json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 该文件在app.user(session(...))之前，所以得不到req.session
// // 查看session
// router.get('/session/first', (req, res, next) => {
//   let s = req.session
//   console.log(s)
//   res.send(s)
// })

// // 在session里保存浏览次数
// router.get('/session/view', (req, res, next) => {
//   let s = req.session
//   if (req.session.views) {
//     req.session.views++
//     res.send(`views: ${req.session.views} time.`)
//   } else {
//     req.session.views = 1
//     res.send('views: 1')
//   }
// })

router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username}).then(user => {
    if (user === null) {
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
    } else {
      var err = new Error(`User ${req.body.username} already exist!`)
      err.status = 403
      next(err)
    }
  }).then(user => {
    res.statusCode = 200
    res.json({status: 'registration successful', user: user})
  }).catch(err => next(err))
})
router.post('/login', (req, res, next) => {
  if (req.session.auth) { // 以req.session.auth为标记，标记是否已经通过登录验证
    res.statusCode = 200
    res.send('You are already authenticated')
  } else {
    User.findOne({username: req.body.username}).then(user => {
      if (user) {
        if (user.password)
      } else { // 没用指定用户
        var err = new Error(`User ${req.body.username} does not exist!`)
        err.status = 403
        next(err)
      }
    }).catch(err => next(err))
  }
})

module.exports = router;
