var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Log = new Schema({
    userAgent: {
      type: String,
      default: ''
      // sparse: true
    },
    referrer: {
      type: String,
      default: ''
      // sparse: true
    }
  })

module.exports = mongoose.model('Log', Log)