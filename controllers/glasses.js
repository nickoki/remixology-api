// controllers/glasses.js

// ====================
// Dependencies
// ====================
var Glass = require('../db/models/Glass')



// ====================
// Functions
// ====================
// GET
exports.get = (req, res) => {
  Glass.find( (err, glasses) => {
    if (err) res.send(err)
    else res.json(glasses)
  })
}
