var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate')

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
  res.send(`get`)
})
.post(authenticate.verifyUser, (req, res, next) => {
// .post((req, res, next) => {
  res.send(`post`)
})
.put(authenticate.verifyUser, (req, res, next) => {
  res.send(`put`)
})
.delete(authenticate.verifyUser, (req, res, next) => {
  res.send(`delete`)
})

module.exports = router;
