var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var router = express.Router();
var passport = require('passport')
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

// router.post('/login', (req, res, next) => {
//   if (!req.session.user) {
//     var authHeader = req.headers.authorization;
//     if (!authHeader) {
//       var err = new Error('You are not authenticated!');
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       next(err);
//       return;
//     }
//     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//     var username = auth[0];
//     var password = auth[1];
//     User.findOne({username: username}).then(user => {
//       if (user === null) {
//         var err = new Error(`User ${username} does not exis!`);
//         err.status = 403;
//         next(err);
//       } else {
//         if (user.password !== password) {
//           var err = new Error(`your password is incorrect!`);
//           err.status = 403;
//           next(err);
//         } else {
//           if (user.username === username && user.password === password) {
//             req.session.user = 'authenticated'
//             res.statusCode = 200
//             res.setHeader('Content-Type', 'text/plain')
//             res.end('You are authenticated')
//             next()
//           }
//         }
//       }
//     }).catch(err => next(err))
//   }
//   else {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/plain')
//     res.end('You are already authenticated!')
//   }
// })

// router.post('/login', passport.authenticate('local'), (req, res) => {
router.post('/login',
  // consoles.log(passport.authenticate)
  passport.authenticate('local'),
  (req, res) => {
  console.log('req.body', req.body)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // 通过验证后在req对象里会多一个属性user。该属性值是数据库里的user数据.
  // res.json({success: true, status: 'You are successfully logged in!'});
  res.json({success: true, status: 'You are successfully logged in!', user: req.user, body: req.body, resBody: res.user});
  // res.json({success: true, status: 'You are successfully logged in!', req: req});
  // res.json({success: true, status: req.user + 'You are successfully logged in!', req: req});
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.redirect('/')
  } else {
    var err = new Error('You are not logged in!')
    err.status = 403
    next(err)
  }
})

router.get('/test', (req, res) => {
  res.json({a: 'a', b: 'b'})
})

module.exports = router;
