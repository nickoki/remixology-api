// db/models/Ingredient.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')
var User     = require('./User')



// ====================
// Schema
// ====================
var Schema = mongoose.Schema

// Define Schema for Ingredients
var IngredientsSchema = new Schema({
  name: {
    type:     String,
    required: true,
    unique:  true,
  },
  color: {
    type:     String,
    required: true,
    default:  '#eaeaea',
  },
  user: {
    ref:      'User',
    type:     Schema.ObjectId,
    required: true,
  },
}, {
  timestamps: true
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Ingredient', IngredientsSchema)
