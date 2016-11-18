// db/models/User.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')



// ====================
// Schema
// ====================
var Schema = mongoose.Schema

// Define Schema for Users
var UserSchema = new Schema({
  username: {
    type:     String,
    required: true,
  },
  email: {
    type:     String,
    required: true,
    unique:   true,
  },
  password: {
    type:     String,
    required: true,
  },
  photo_url: {
    type:    String,
  }
})

// Before User save
UserSchema.pre('save', function(next) {
  var user = this
  // If edit password or new User
  if (this.isModified('password') || this.isNew) {
    // Salt password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
      // Hash password
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err)
        // Set salted & hashed password
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

// Check password method
UserSchema.methods.checkPassword = function(password, done) {
  // Compare passwords
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return done(err)
    else done(null, isMatch)
  })
}


// ====================
// Exports
// ====================
module.exports = mongoose.model('User', UserSchema)
