// db/models/Glass.js

// ====================
// Module dependencies
// ====================
var mongoose = require('mongoose')



// ====================
// Schema
// ====================
var Schema = mongoose.Schema

// Define Schema for Glasses
var GlassesSchema = new Schema({
  name:          String,
  image_url:     String,
  capacity:      Number,
  margin_top:    Number,
  margin_bottom: Number,
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Glass', GlassesSchema)
