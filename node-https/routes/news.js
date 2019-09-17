var express = require('express');
var router = express.Router();
// var session = require('express-session')
// var FileStore = require('session-file-store')(session)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/first', function(req, res, next) {
  res.send('news/first page')
  res.render('index', { title: 'Express' });
});

// 清理session
// router.get('/clearSession', function(req, res, next) {
//   // FileStore.touch(sid, session, cb)
//   console.log(req.cookies.session-id)
//   FileStore.touch(req.cookies.session-id, req.session, (err) => {
//     console.log(err)
//     res.send('err')
//   }) 
// });

module.exports = router;
