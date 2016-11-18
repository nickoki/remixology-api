// db/models/Drink.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')
var Glass = require('./Glass')


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
  },
  description: {
    type:     String,
  },
  instructions: {
    type:     String,
  },
  // created_at: {
  //   type:     Date,
  //   required: true,
  //   default:  Date.now(),
  // },
  // ingredients: {
  //   type: [Ingredient],
  // },

}, {
  timestamps: true
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Drink', DrinksSchema)
