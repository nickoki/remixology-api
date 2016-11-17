// controllers/drinks.js

// ====================
// Dependencies
// ====================
var Drink = require('../db/models/Drink')



// ====================
// Functions
// ====================
// GET
exports.get = (req, res) => {
  Drink.find( (err, drinks) => {
    if (err) res.send(err)
    else res.json(drinks)
  })
}

// POST
exports.post = (req, res) => {
  var drink = new Drink()
  drink.name = req.body.name
  drink.save( err => {
    if (err) res.send(err)
    else res.json({ message: `Cheers! Drink posted successfully.` })
  })
}
