// controllers/users.js

// ====================
// Dependencies
// ====================
var db       = require('../db/connection')
var jwt      = require('jsonwebtoken')
var User     = require('../db/models/User')



// ====================
// Functions
// ====================
// Sign Up new User
exports.signup = (req, res) => {
  // Check request contents
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Missing username, email, and/or password.' })
  } else {
    // Create new User
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    // Save new User
    newUser.save( err => {
      if (err) res.send(err)
      else res.json({ success: true, message: 'Welcome! User created successfully.' })
    })
  }
}

// Authenticate User log in
exports.authenticate = (req, res) => {
  // Find User based on email
  // TODO Find based on username, too
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) throw err
    if (!user) res.send({ success: false, message: 'Authentication failed: User not found.' })
    else {
      // Verify password
      user.checkPassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Assign token
          var token = jwt.sign({ userId: user._id, username: user.username }, db.secret, { algorithm: 'HS256' })
          res.json({ success: true, token: `JWT ${token}`, username: user.username })
        }
        else res.send({ success: false, message: 'Authentication failed: Incorrect password.' })
      })
    }
  })
}
