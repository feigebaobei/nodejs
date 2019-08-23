var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(`出错了.`)
});

router.get('/auth', function(req, res, next) {
  let header = req.headers
  let rawToken = header.authorization
  let token = rawToken.split(' ')[1]
  let result = jwt.verify(rawToken, config.secretKey, (err, authData) => {
    res.statusCode = 401
    res.json({
      code: 401,
      data: {
        error: err
      },
      message: '验证不通过'
    })
  })
});

module.exports = router;
