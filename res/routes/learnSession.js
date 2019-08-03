var express = require('express')
var parseurl = require('parseurl') // express 自带的
var router = express.Router()
var session = require('express-session')
var FileStore = require('session-file-store')(session)

// 不知为什么不启作用
// 在app.js里写session启作用
// 若删除app.js里的session,则此session会启作用。
// router.use(session({
//   name: 'sessionFirst',
//   // name: 'session-id',
//   cookie: {maxAge: 10000},
//   store: new FileStore()
// }))

router.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {}
  }
  var pathname = parseurl(req).pathname
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  next()
})


// router.get('/views', (req, res, next) => {
//   console.log(req.session)
//   console.log(req.sessionID)
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-Type', 'text/html')
//     res.write(`<p>views: ${req.session.views}</p>`)
//     res.write(`<p>expires in: ${req.session.cookie.maxAge / 1000}s</p>`)
//     res.end()
//   } else {
//     req.session.views = 1
//     res.end('welcome to the session demo. refresh!')
//   }
// })

router.get('/foo', (req, res, next) => {
  res.send(`you viewed this page ${req.session.views['/foo']} times`)
})
router.get('/bar', (req, res, next) => {
  res.send(`you viewed this page ${req.session.views['/bar']} times`)
})
router.get('/login', (req, res, next) => {
  res.send('你在\'/\'时就已经登录了。把sid放在了cookie.session-id里。')
})
router.get('/logout', (req, res, next) => {
  if (req.session) {
    // req.session = null
    req.session.destroy(err => {
      console.log(err)
      // res.send('删除出错')
      // next(err)
    })
    res.clearCookie('session-id')
    res.send('已经删除session.并登出。')
  } else {
    var err = new Error('登出出错')
    err.status = 403
    next(err)
  }
})

module.exports = router