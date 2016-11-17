// db/models/Drink.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')



// ====================
// Schema
// ====================
var Schema = mongoose.Schema

// Define Schema for Drinks
var DrinksSchema = new Schema({
  name: String,
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Drink', DrinksSchema)
