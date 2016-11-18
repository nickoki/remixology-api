// controllers/users.js

// ====================
// Dependencies
// ====================
var db       = require('../db/connection')
var passport = require('passport')
var jwt      = require('jsonwebtoken')
var User     = require('../db/models/User')

// Pass passport to db for configuration
require('../db/passport')(passport)


// ====================
// Functions
// ====================
// Route protection
exports.bouncer = (passport.authenticate('jwt', { session: false }), (req, res, next) => {
  // passport.authenticate('jwt', { session: false})
  var getToken = (headers) => {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ')
      if (parted.length === 2) return parted[1]
      else return null;
    }
    else return null
  }

  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.verify(token, db.secret);
    User.findOne({ _id: decoded._doc._id }, (err, user) => {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({ success: false, message: 'Authentication failed: User not found.' })
        } else {
          // res.status(200).json({ success: true, message: `Authenticated ${user.email} successfully.` })
          return next()
        }
    })
  } else {
    return res.status(403).send({ success: false, message: 'Authentication failed: No token provided.' })
  }
})
