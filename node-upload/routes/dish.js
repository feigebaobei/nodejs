var express = require('express');
var router = express.Router();
var authenticate = require('../authenticate')
const Dishes = require('../models/dishes')
var cors = require('./cors')
// var passport = require('passport')
var bodyParser = require('body-parser')

router.use(bodyParser.json())

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 查询所有dish
.get((req, res, next) => {
  Dishes.find({}).populate('comments.author').then(dishes => {
  // Dishes.find({}).then(dishes => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.json(dishes)
  }).catch(err => next(err))
})
// 添加dish
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  console.log(req.abc)
  let {name, description} = req.body
  let dish = new Dishes({name: name, description: description})
  dish.save(function (err, doc) {
    if (err) {
      res.status(500).send(err)
    }
    res.status(200).send(doc)
  })
})
// 
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  res.send(`put`)
})
// 
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  res.send(`delete`)
})

// 根据dishId查询dish
router.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get((req, res, next) => {
  Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then(dish => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(dish)
    })
    .catch(err => next(err))
})

router.route('/:dishId/comments')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
// 根据dishId查询dish的comments
.get((req, res, next) => {
  Dishes.findById(req.params.dishId)
  .populate('comments/author')
  .then(dish => {
    if (dish !== null) {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(dish.comments)
    } else {
      let err = new Error(`Dish ${req.params.dishId} not found`)
      err.status = 404
      return next(err)
    }
  })
  .catch(err => next(err))
})
// 为指定dishId的dish添加comment
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
  Dishes.findById(req.params.dishId)
    .then(dish => {
      if (dish !== null) {
        req.body.author = req.user._id
        dish.comments.push(req.body)
        dish.save() // 保存
          .then(dish => { // 然后找到相应数据给client
            Dishes.findById(dish._id)
              .populate('comments.author')
              .then(dish => {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json(dish)
              })
          })
          .catch(err => next(err))
      } else {
        let err = new Error(`Dish ${req.params.dishId} not found`)
        err.status = 404
        return next(err)
      }
    })
    .catch(err => next(err))
})

// 根据dishId及commentId得到comment
router.route('/:dishId/comments/:commentId')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get((req, res, next) => {
  Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then(dish => {
      if (dish !== null && dish.comments.id(req.params.commentId) !== null) {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(dish.comments.id(req.params.commentId))
      } else {
        if (dish === null) {
          let err = new Error(`Dish ${req.params.dishId} not found`)
          err.status = 404
          return next(err)
        } else {
          let err = new Error(`Dish ${req.params.commentId} not found`)
          err.status = 404
          return next(err)
          
        }
      }
    })
    .catch(err => next(err))
})


module.exports = router;
