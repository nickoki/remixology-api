// db/models/Drink.js

// ====================
// Module dependencies
// ====================
var mongoose   = require('mongoose')
var Glass      = require('./Glass')
var Ingredient = require('./Ingredient')
var User       = require('./User')



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
    type: String,
  },
  instructions: {
    type: String,
  },
  recipe: [{
    ingredient: {
      ref:      'Ingredient',
      type:     Schema.ObjectId,
      required: true,
    },
    amount: {
      type:     Number,
      required: true,
    },
    // order: {
    //   type:    Number,
    //   default: 0,
    // },
    _id: false, // No recipe entry ids needed
  }],
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
module.exports = mongoose.model('Drink', DrinksSchema)
