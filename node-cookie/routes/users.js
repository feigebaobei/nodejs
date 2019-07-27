var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// set cookie
router.get('/setcookie', (req, res, next) => {
  res.cookie('name', 'stone', {maxAge: 60000, httpOnly: true})
  res.cookie('name1', 'stone', {maxAge: 60000, httpOnly: true})
  res.cookie('name20', 'stone', {maxAge: 60000, httpOnly: true, signed: true})
  res.cookie('name21', 'stone', {maxAge: 60000, httpOnly: true, signed: true})
  res.send('success for set up')
})

// get cookie
router.get('/getcookie', (req, res, next) => {
  let o = {
    unsign: req.cookies,
    signed: req.signedCookies
  }
  res.json(o)
})

module.exports = router;
