var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 查看session
router.get('/session/first', (req, res, next) => {
  let s = req.session
  console.log(s)
  res.send(s)
})

// 在session里保存浏览次数
router.get('/session/view', (req, res, next) => {
  let s = req.session
  if (req.session.views) {
    req.session.views++
    res.send(`views: ${req.session.views} time.`)
  } else {
    req.session.views = 1
    res.send('views: 1')
  }
})

module.exports = router;
