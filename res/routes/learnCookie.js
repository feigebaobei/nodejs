var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.cookies)
  let cookies = req.cookies
  console.log(req.signedCookies)
  res.send(`${req.cookies} || `);
});
router.get('/set', (req, res, next) => {
  res.cookie('name', 'feige', {maxAge: 60000, httpOnly: true})
  res.cookie('name1', 'feige', {maxAge: 60000, httpOnly: true, domain: 'baidu.com'})
  res.cookie('name2', 'feige', {maxAge: 60000, httpOnly: true, path: '/user'})
  res.cookie('name3', 'feige', {maxAge: 60000, httpOnly: true, signed: true})
  res.cookie('name4', 'feige', {expires: new Date(0)})
  res.send('welcome')
})
router.get('/modify', (req, res, next) => {
  let oc = req.cookies
  for (let k in oc) {
    res.cookie(k, oc[k])
  }
  res.cookie('name', 'modifyName', {maxAge: 60000})
  res.send('modify')
})

module.exports = router;
