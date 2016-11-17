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
var GlasswareSchema = new Schema({
  name: {
    type:     String,
    required: true,
    unique:   true,
  },
  image_url: {
    type:     String,
    required: true,
  },
  capacity: {
    type:     Number,
    required: true,
  },
  margin_top: {
    type:     Number,
    required: true,
  },
  margin_bottom: {
    type:     Number,
    required: true,
  },
})



// ====================
// Exports
// ====================
module.exports = mongoose.model('Glass', GlasswareSchema)
