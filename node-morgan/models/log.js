var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  // passportLocalMongoose = require('passport-local-mongoose'),
  Log = new Schema({
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true
    // },
    // password: {
    //   type: String,
    //   required: true
    // },
    // _id: {
    //   // type: ObjectId,
    //   unique: true
    // },
    userAgent: {
      type: String,
      default: '',
      unique: true
    },
    referrer: {
      type: String,
      default: ''
    }
  })

// Log.plugin(passportLocalMongoose)

module.exports = mongoose.model('Log', Log)