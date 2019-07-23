var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose'),
  User = new Schema({
    admin: {
      type: Boolean,
      default: false
    }
  })

User.plugin(passportLocalMongoose)
module.exports = mongoose.model('User', User)