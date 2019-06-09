const mongoose = require('mongoose'),
  Schema = mongoose.Schema
var commentSchema = ({
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    auther: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }),
  dishSchema = new Schema({
    name: {
      type: String,
      require: true,
      unique: true
    },
    description: {
      type: String,
      require: true
    },
    comments: [commentSchema]
  },
  {
    timestamps: true
  })

var Dishes = mongoose.model('Dish', dishSchema)
module.exports = Dishes