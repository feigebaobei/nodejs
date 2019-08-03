
// 在公司使用。返回测试数据。
var express = require('express');
var router = express.Router();
var Mock = require('mockjs')

/* GET test data. */
router.get('/', function(req, res, next) {
  res.json({key: 'welcome'})
});
/* GET users. */
router.get('/users', function(req, res, next) {
  let users = []
  let i = 0
  while (i < 3) {
    users.push({
      name: Mock.Random.string(3, 8)
    })
    i++
  }
  console.log(users)
  res.setHeader('Access-Control-Max-Age', 3600)
  res.json({users: users})
});

module.exports = router;
