// db/connection.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')
var Drink    = require('./models/Drink')
var Glass    = require('./models/Glass')

// Fix mongoose promise warning
mongoose.Promise = global.Promise



// ====================
// MongoDB Connection
// ====================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/remixology-api')



// ====================
// Exports
// ====================
module.exports = {
  mongoose,
  'secret': 'timtim'
}
