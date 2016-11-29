// controllers/ingredients.js

// ====================
// Dependencies
// ====================
// Models
var Ingredient = require('../db/models/Ingredient')

// Controllers
var auth       = require('../controllers/auth')



// ====================
// Functions
// ====================
// GET
exports.get = (req, res) => {
  Ingredient.find({})
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
    ingedient.save( err => {
      if (err) res.send(err)
      else res.json({ success: true, message: `Cheers! ${ingredient.name} posted successfully.` })
    })
  })
}
