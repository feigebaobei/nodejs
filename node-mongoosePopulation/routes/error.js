var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var config = require('../config')
var authenticate = require('../authenticate')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(`出错了.`)
});

router.get('/auth', function(req, res, next) {
  let header = req.headers
  let rawToken = header.authorization
  if (!rawToken.split(' ').length) {
    res.json({ // 统一的数据结构方便前端使用
      code: 403,
      data: {},
      message: 'error for get token'
    })
  } else {
    let token = rawToken.split(' ')[1]
    jwt.verify(token, config.secretKey, err => { // 这里用到jsonwebtoken/config。注意引用
      switch (err.name) {
        case 'TokenExpiredError':
        case 'NotBeforeError':
          let payload = jwt.decode(token)
          token = authenticate.getToken({_id: payload._id})
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.json({success: true, token: token, status: '已经刷新token'})
          break
        case 'JsonWebTokenError':
        default:
          res.statusCode = 401
          res.json({
            code: 401,
            data: {
              error: err
            },
            message: 'token错误'
          })
          break
      }
      })
  }
});

module.exports = router;
