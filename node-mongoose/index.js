// 这个项目不能运行。
const mongoose = require('mongoose'),
  Dishes = require('./models/dishes'),
  url = 'mongodb://localhost:27017/conFusion',
  connect = mongoose.connect(url)

connect.then(db => {
  console.log('Connect correctly to server')
  // var newDish = Dishes({
  //   name: 'Uhappizza',
  //   description: 'test'
  // })
  // newDish.save().then(dish => {
  //   console.log(dish)
  //   return Dishes.find({})
  // }).then(dishes => {
  //   console.log(dishes)
  //   return Dishes.remove({})
  // }).then(() => {
  //   return mongoose.connection.close()
  // }).catch(err => {
  //   console.log(err)
  // })
  Dishes.create({
    name: 'Uthappizza3',
    description: 'Test'
  }).then(dish => {
    console.log(dish)
    // return Dishes.fine({}).exec()
    return Dishes.findByIdAndUpdate(dish._id, {
      $set: {description: 'Update test'}
    },
    {
      new: true
    }).exec()
  }).then(dishes => {
    console.log(dishes)
    // return Dishes.remove({})
    dishes.comments.push({
      rating: 5,
      comment: 'I\'m getting a sinking feeling',
      auther: 'Leonardo di Carpaccio'
    })
    return dishes.save()
  }).then(dish => {
    console.log(dish)
    return Dishes.remove({})
  }).then(() => {
    return mongoose.connection.close()
  }).catch(err => {
    console.log(err)
  })
})