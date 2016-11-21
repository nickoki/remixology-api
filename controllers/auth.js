// controllers/auth.js

// ====================
// Dependencies
// ====================
var db       = require('../db/connection')
var passport = require('passport')
var jwt      = require('jsonwebtoken')
var User     = require('../db/models/User')



// ====================
// Functions
// ====================
// Helper Function to extract JSON Web Token from headers
var getToken = headers => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) return parted[1]
    else return null
  }
  else return null
}

// Route protection
exports.bouncer = (passport.authenticate('jwt', { session: false }), (req, res, next) => {
  // Set token
  var token = getToken(req.headers)
  // Decode token
  if (token) {
    var decoded = jwt.verify(token, db.secret)
    User.findOne({ _id: decoded._doc._id }, (err, user) => {
      if (err) throw err
      if (!user) return res.status(403).send({ success: false, message: 'Authentication failed: User not found.' })
      else return next()
    })
  }
  else return res.status(403).send({ success: false, message: 'Authentication failed: No token provided.' })
})

exports.getUser = function(req, next) {
  // Set token
  var token = getToken(req.headers)
  // Decode token
  if (token) {
    var decoded = jwt.verify(token, db.secret)
    User.findOne({ _id: decoded._doc._id }, (err, user) => {
      if (err) throw err
      if (!user) return res.status(403).send({ success: false, message: 'Authentication failed: User not found.' })
      else return next(user._id)
    })
  }
  else return res.status(403).send({ success: false, message: 'Authentication failed: No token provided.' })
}
