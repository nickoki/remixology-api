// controllers/ingredients.js

// ====================
// Dependencies
// ====================
var Ingredient = require('../db/models/Ingredient')



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
