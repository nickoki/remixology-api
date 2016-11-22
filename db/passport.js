// db/passport.js

// ====================
// Module dependencies
// ====================
var db          = require('./connection')
var passport    = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt  = require('passport-jwt').ExtractJwt
var User        = require('./models/User')



// ====================
// Exports
// ====================
// JWT Strategy
module.exports = passport => {
  // Set JwtStrategy Options
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.secretOrKey = db.secret
  // Start Passport Strategy
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // Find a user based on id (from jwt payload)
    User.findOne({ _id: jwt_payload.id }, (err, user) => {
      if (err) return done(err, false)
      if (user) done(null, user)
      else done(null, false)
    })
  }))
}
