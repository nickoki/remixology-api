// controllers/drinks.js

// ====================
// Dependencies
// ====================
var Drink      = require('../db/models/Drink')
var Glass      = require('../db/models/Glass')
var Ingredient = require('../db/models/Ingredient')



// ====================
// Functions
// ====================
// Read Drink data, GET
exports.get = (req, res) => {
  Drink.find({})
    .populate('glass')
    .populate('recipe.ingredient')
    .exec((err, drinks) => {
    if (err) res.send(err)
    else res.json(drinks)
  })
}

// Create new Drink, POST
exports.post = (req, res) => {
  var drink = new Drink(req.body)
  Glass.findOne({ name: req.body.glass }, (err, glass) => {
    if (err) res.send(err)
    else if (glass) drink.glass = glass
    drink.save( err => {
      if (err) res.send(err)
      else res.json({ success: true, message: `Cheers! Drink posted successfully.` })
    })
  })
}

// Edit Drink data, EDIT
exports.edit = (req, res) => {

  Glass.findOne({ name: req.body.glass }, (err, glass) => {
    if (err) res.send(err)
    else if (glass) req.body.glass = glass

    Drink.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true }, (err, result) => {
      if (err) res.send(err)
      else res.json({ success: true, message: `Drink updated succesfully.` })
    })
  })
}

// Delete Drink data, DELETE
exports.delete = (req, res) => {
  Drink.findOneAndRemove({ _id: req.body._id }, (err) => {
    if (err) res.send(err)
    else res.json({ success: true, message: `Drink removed successfully.` })
  })
}
