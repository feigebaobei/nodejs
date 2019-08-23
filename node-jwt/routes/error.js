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
  let token = rawToken.split(' ')[1]
  let result = jwt.verify(token, config.secretKey, (err) => {
    switch (err.name) {
      case 'TokenExpiredError':
      case 'NotBeforeError':
      default :
        let payload = jwt.decode(token)
        token = authenticate.getToken({_id: payload._id})
        res.statusCode = 888 // 这是自定义的状态码
        res.setHeader('Content-Type', 'application/json')
        // res.json({
        //   code: 401,
        //   data: {
        //     error: payload
        //   },
        //   message: '登录已超时'
        // })
        res.json({success: true, token: token, status: '已经刷新token'})
        break
      case 'JsonWebTokenError':
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
});

module.exports = router;
