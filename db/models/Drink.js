// db/models/Drink.js

// ====================
// Module dependencies
// ====================
var mongoose   = require('mongoose')
var Glass      = require('./Glass')
var Ingredient = require('./Ingredient')



// ====================
// Schema
// ====================
var Schema = mongoose.Schema

// Define Schema for Drinks
var DrinksSchema = new Schema({
  name: {
    type:     String,
    required: true,
  },
  glass: {
    ref:      'Glass',
    type:     Schema.ObjectId,
    required: true,
  },
  description: {
    type:     String,
  },
  instructions: {
    type:     String,
  },
  recipe: {
    type: [{
      ingredient: {
        type: Ingredient,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    }],
  },

}, {
  timestamps: true
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Drink', DrinksSchema)
