const express = require('express'),
  bodyParser = require('body-parser'),
  promotion = express.Router()

promotion.route('/')
.all((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  next()
})
.get((req, res, next) => {
  res.end('will send all the promotion to you!')
})
.post((req, res, next) => {
  res.end('will add the promotion: ' + req.body.name + ' with details: ' + req.body.description)
})
.put((req, res, next) => {
  res.statusCode = 403
  res.end('PUT operateion not supported on /promotion')
})
.delete((req, res, next) => {
  res.end('delete all the promotion')
})
// .get((req, res, next) => {
//   res.end('will send details of the dish:' + req.params.dishId + ' to you!')
// })
// .post((req, res, next) => {
//   res.statusCode = 403
//   res.end(`Post operation not supported on /dishes/ ${req.params.dishId}`)
// })
// .put((req, res, next) => {
//   res.write(`Updating the dish: ${req.params.dishId}`)
//   res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`)
// })
// .delete((req, res, next) => {
//   res.end('/dishes/:dishId ' + req.body.dishId)
// })

module.exports = promotion