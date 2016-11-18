// db/passport.js

// ====================
// Module dependencies
// ====================
var JwtStrategy = require('passport-jwt').Strategy
var User        = require('./models/User')
var db          = require('./connection')



// ====================
// Exports
// ====================
// JWT Strategy
module.exports = passport => {
  var opts = {}
  opts.secretOrKey = config.secret
  passport.user(new JwtStrategy(opts, jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.id }, (err, user) => {
      if (err) return done(err, false)
      if (user) done(null, user)
      else done(null, false)
    })
  })
}
