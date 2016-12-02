// controllers/ingredients.js

// ====================
// Dependencies
// ====================
// Controllers
var auth       = require('../controllers/auth')
var async      = require('async')

// Models
var Ingredient = require('../db/models/Ingredient')



// ====================
// Functions
// ====================
// GET
exports.get = (req, res) => {
  Ingredient.find({})
    .populate('user', 'username')
    .exec((err, ingredients) => {
    if (err) res.send(err)
    else res.json(ingredients)
  })
}

// POST
exports.post = (req, res) => {
  auth.getUser(req, userId => {
    req.body.user = userId

    var ingredient = new Ingredient(req.body)
    ingredient.save( err => {
      if (err) res.send(err)
      else res.json({ success: true, message: `Cheers! ${ingredient.name} posted successfully.` })
    })
  })
}

// EDIT
exports.edit = (req, res) => {
  // Prepare async call stack
  let calls = []
  // ID of User making request
  let reqUserId = ''
  // Ingredient to update
  let targetIngredient = {}
  // Add find user to stack
  calls.push(callback => {
    auth.getUser(req, userId => {
      reqUserId = userId
      callback(null, reqUserId)
    })
  })
  // Add find ingredient to stack
  calls.push(callback => {
    Ingredient.findById(req.body._id, (err, ingredient) => {
      targetIngredient = ingredient
      callback(null, ingredient)
    })
  })
  // Run async functions
  async.series(calls, function(err, results) {
    if (err) console.log(err)
    // Check for ownership
    if (JSON.stringify(reqUserId) != JSON.stringify(targetIngredient.user)) {
      res.json({ success: false, message: "Permission denied: Wrong user." })
    } else {
      // Update Ingredient object
      Ingredient.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
      .populate('user', 'username')
      .exec( (err, ingredient) => {
        if (err) res.send(err)
        else res.json({ success: true, message: `${ingredient.name} updated succesfully.`, id: ingredient._id })
      })
    }
  })
}

// Delete Drink data, DELETE
exports.delete = (req, res) => {
  // Prepare async call stack
  let calls = []
  // ID of User making request
  let reqUserId = ''
  // Ingredient to update
  let targetIngredient = {}
  // Add find user to stack
  calls.push(callback => {
    auth.getUser(req, userId => {
      reqUserId = userId
      callback(null, reqUserId)
    })
  })
  // Add find ingredient to stack
  calls.push(callback => {
    Ingredient.findById(req.body._id, (err, ingredient) => {
      targetIngredient = ingredient
      callback(null, ingredient)
    })
  })
  // Run async functions
  async.series(calls, function(err, results) {
    if (err) console.log(err)
    // Check for ownership
    if (JSON.stringify(reqUserId) != JSON.stringify(targetIngredient.user)) {
      res.json({ success: false, message: "Permission denied: Wrong user." })
    } else {
      // Update Ingredient object
      Ingredient.findByIdAndRemove(req.body._id, (err, ingredient) => {
        if (err) res.send(err)
        else res.json({ success: true, message: `${ingredient.name} removed succesfully.`, id: ingredient._id })
      })
    }
  })
}
