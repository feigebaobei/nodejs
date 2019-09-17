var cors = require('cors')

var whitelist = ['http://localhost:3000', 'https://localhost:3443']
var corsOptionDelegate = (req, cb) => {
  var corsOptions
  console.log(req.header('Origin'))
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {origin: true}
  } else {
    corsOptions = {origin: false}
  }
  cb(null, corsOptions)
}

exports.cors = cors()
exports.corsWithOptions = cors(corsOptionDelegate)