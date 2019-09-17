var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),
  News = new Schema({
    title: {
      type: String,
      required: true,
      unique: true
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  })

module.exports = mongoose.model('News', News)