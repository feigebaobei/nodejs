var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var authenticate = require('../authenticate')
var multer = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

var imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false)
  }
  cb(null, true)
}

var upload = multer({
  storage: storage,
  fileFilter: imageFileFilter
})

router.use(bodyParser.json())

/* GET home page. */
router.route('/')
.get(authenticate.verifyUser, (req, res, next) => {
  res.statuCode = 403
  res.send('GET operation not supported on /imageUpload')
})
.post(authenticate.verifyUser, upload.single('imageFile'), (req, res, next) => {
  res.statuCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.json(req.file)
})
.put(authenticate.verifyUser, (req, res, next) => {
  res.statuCode = 403
  res.send('PUT operation not supported on /imageUpload')
})
.delete(authenticate.verifyUser, (req, res, next) => {
  res.statuCode = 403
  res.send('DELETE operation not supported on /imageUpload')
})

module.exports = router;
