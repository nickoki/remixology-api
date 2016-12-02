// controllers/drinks.js

// ====================
// Dependencies
// ====================
var async      = require('async')

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
  Drink.find()
    .populate('glass')
    .populate('recipe.ingredient')
    .populate('user', 'username')
    .exec((err, drinks) => {
    if (err) res.send(err)
    else res.json(drinks)
  })
}

// Read Drink data, SHOW
exports.show = (req, res) => {
  Drink.findOne({_id: req.params.id})
    .populate('glass')
    .populate('recipe.ingredient')
    .populate('user', 'username')
    .exec((err, drink) => {
    if (err) res.send(err)
    else res.json(drink)
  })
}

// Create new Drink, POST
exports.post = (req, res) => {
  // Get User
  auth.getUser(req, userId => {
    req.body.user = userId
    // Prepare async call stack
    let calls = []
    // Create new drink object
    let drink = new Drink(req.body)
    // Create temp recipe object
    let recipe = []
    // Add find glass function to stack
    calls.push(function(callback) {
      Glass.findOne({ name: req.body.glass }, (err, glass) => {
        if (err) return err
        else if (glass) drink.glass = glass
        callback(null, glass)
      })
    })
    // Add find ingedients functions to stack
    for (let i = 0; i < req.body.recipe.length; i++) {
      calls.push(function(callback) {
        Ingredient.findOne({name: req.body.recipe[i].name}, (err, item) => {
          if (err) return err
          let prep = {
            amount: req.body.recipe[i].amount,
            ingredient: item,
          }
          recipe.push(prep)
          callback(null, recipe)
        })
      })
    }
    // Run async functions
    async.series(calls, function(err, rez) {
      if (err) console.log(err)
      // Update drink recipe
      drink.recipe = recipe
      // Save drink object
      drink.save( err => {
        if (err) res.send(err)
        else res.json({ success: true, message: `Cheers! ${drink.name} posted successfully.`, id: drink._id })
      })
    })
  })
}

// Edit Drink data, EDIT
exports.edit = (req, res) => {
  // Prepare async call stack
  let calls = []
  // ID of User making request
  let reqUserId = ''
  // Create temp recipe object
  let recipe = []
  // Add find user to stack
  calls.push(callback => {
    auth.getUser(req, userId => {
      reqUserId = userId
      callback(null, reqUserId)
    })
  })
  // Add find glass function to stack
  calls.push(callback => {
    Glass.findOne({ name: req.body.glass }, (err, glass) => {
      if (err) return err
      else if (glass) req.body.glass = glass
      callback(null, glass)
    })
  })
  // Add find ingedients functions to stack
  for (let i = 0; i < req.body.recipe.length; i++) {
    calls.push(callback => {
      Ingredient.findOne({name: req.body.recipe[i].name}, (err, item) => {
        if (err) return err
        let prep = {
          amount: req.body.recipe[i].amount,
          ingredient: item,
        }
        recipe.push(prep)
        callback(null, recipe)
      })
    })
  }
  // Run async functions
  async.series(calls, function(err, results) {
    if (err) console.log(err)
    // Check for ownership
    if (JSON.stringify(reqUserId) != JSON.stringify(req.body.user)) {
      res.json({ success: false, message: "Permission denied: Wrong user." })
    } else {
      // Update drink recipe
      req.body.recipe = recipe
      // Update Ingredient object
      Drink.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true })
      .populate('user', 'username')
      .exec( (err, ingredient) => {
        if (err) res.send(err)
        else res.json({ success: true, message: `${ingredient.name} updated succesfully.`, id: ingredient._id })
      })
    }
  })
}

// DELETE
exports.delete = (req, res) => {
  // Prepare async call stack
  let calls = []
  // ID of User making request
  let reqUserId = ''
  // Ingredient to update
  let targetDrink = {}
  // Add find user to stack
  calls.push(callback => {
    auth.getUser(req, userId => {
      reqUserId = userId
      callback(null, reqUserId)
    })
  })
  // Add find drink to stack
  calls.push(callback => {
    Drink.findById(req.body._id, (err, drink) => {
      targetDrink = drink
      callback(null, drink)
    })
  })
  // Run async functions
  async.series(calls, function(err, results) {
    if (err) console.log(err)
    // Check for ownership
    if (JSON.stringify(reqUserId) != JSON.stringify(targetDrink.user)) {
      res.json({ success: false, message: "Permission denied: Wrong user." })
    } else {
      // Update Ingredient object
      Drink.findByIdAndRemove(req.body._id, (err, drink) => {
        if (err) res.send(err)
        else res.json({ success: true, message: `${drink.name} removed succesfully.`, id: drink._id })
      })
    }
  })
}
