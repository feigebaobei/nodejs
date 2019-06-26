var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  User = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    admin: {
      type: Boolean,
      default: true
    }
  })

module.exports = mongoose.model('User', User)