// db/connection.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')

// Fix mongoose promise warning
mongoose.Promise = global.Promise



// ====================
// MongoDB Connection
// ====================

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/remixology-api')



// ====================
// Exports
// ====================

module.exports = mongoose
