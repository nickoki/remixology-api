// controllers/drinks.js

// ====================
// Dependencies
// ====================
// Models
var Drink      = require('../db/models/Drink')
var Glass      = require('../db/models/Glass')
var Ingredient = require('../db/models/Ingredient')

// Controllers
var auth       = require('../controllers/auth')



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
  auth.getUser(req, userId => {
    req.body.user = userId

    var drink = new Drink(req.body)
    Glass.findOne({ name: req.body.glass }, (err, glass) => {
      if (err) res.send(err)
      else if (glass) drink.glass = glass
      drink.save( err => {
        if (err) res.send(err)
        else res.json({ success: true, message: `Cheers! ${drink.name} posted successfully.` })
      })
    })
  })
}

// Edit Drink data, EDIT
exports.edit = (req, res, userId) => {
  auth.getUser(req, userId => {
    req.body.user = userId

    Glass.findOne({ name: req.body.glass }, (err, glass) => {
      if (err) res.send(err)
      else if (glass) req.body.glass = glass

      Drink.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true }, (err, drink) => {
        if (err) res.send(err)
        else res.json({ success: true, message: `${drink.name} updated succesfully.` })
      })
    })
  })
}

// Delete Drink data, DELETE
exports.delete = (req, res) => {
  Drink.findOneAndRemove({ _id: req.body._id }, (err, drink) => {
    if (err) res.send(err)
    else res.json({ success: true, message: `${drink.name} removed successfully.` })
  })
}
