var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose')
  User = new Schema({
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    // password: {
    //   type: String,
    //   required: true
    // },
    admin: {
      type: Boolean,
      default: false
    }
  })

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)