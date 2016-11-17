// controllers/drinks.js

// ====================
// Dependencies
// ====================
var Drink = require('../db/models/Drink')
var Glass = require('../db/models/Glass')



// ====================
// Functions
// ====================
// GET
exports.get = (req, res) => {
  Drink.find({})
    .populate('glass', '-_id')
    .exec((err, drinks) => {
    if (err) res.send(err)
    else res.json(drinks)
  })
}

// POST
exports.post = (req, res) => {
  var drink = new Drink()
  drink.name = req.body.name
  Glass.findOne({ name: req.body.glass }, (err, result) => {

    if (err) res.send(err)
    else drink.glass = result

    drink.save( e => {
      if (e) res.send(e)
      else res.json({ message: `Cheers! Drink posted successfully.` })
    })
  })
}
