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
  auth.getUser(req, userId => {
    req.body.user = userId

    let drink = new Drink(req.body)
    let recipe = []

    var calls = []



    calls.push(function(callback) {
      Glass.findOne({ name: req.body.glass }, (err, glass) => {
        if (err) return err
        else if (glass) drink.glass = glass
        callback(null, glass)
      })
    })

    for (let i = 0; i < req.body.recipe.length; i++) {

      calls.push(function(callback) {
        Ingredient.findOne({name: req.body.recipe[i].name}, (err, item) => {
          if (err) return err
          console.log("BBBBBB")
          let prep = {
            amount: req.body.recipe[i].amount,
            ingredient: item,
          }
          recipe.push(prep)
          console.log(recipe)
          callback(null, recipe)
        })
      })
    }

    console.log("HERE")

    async.series(calls, function(err, rez) {
      if (err) console.log(err)

      console.log("CCCCCC")
      console.log(rez)
      console.log("RECIPE")
      console.log(recipe)
      console.log("SAVING")
      drink.recipe = recipe
      console.log(drink)

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

      Drink.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
      .populate('glass')
      .populate('recipe.ingredient')
      .populate('user', 'username')
      .exec( (err, drink) => {
        if (err) res.send(err)
        else res.json({ success: true, message: `${drink.name} updated succesfully.`, drink })
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
