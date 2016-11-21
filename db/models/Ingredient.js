// db/models/Ingredient.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')



// ====================
// Schema
// ====================
var Schema = mongoose.Schema

// Define Schema for Ingredients
var IngredientsSchema = new Schema({
  name: {
    type:     String,
    required: true,
  },
  color: {
    type:     String,
    required: true,
    default:  '#eaeaea',
  },
}, {
  timestamps: true
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Ingredient', IngredientsSchema)
