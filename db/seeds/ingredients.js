// db/seeds/ingredients.js

// Require connection
var mongoose   = require('../connection')

// Define Model
var Ingredient = require('../models/Ingredient')

// Seed Data
var data = [
  {
    name: 'Rye',
    color: '#c33726',
    user: '583dfe995ca6bc09bf901aa4',
  }, {
    name: 'Sweet Vermouth',
    color: '#32110e',
    user: '583dfe995ca6bc09bf901aa4',
  }, {
    name: 'Angostura Bitters',
    color: '#421711',
    user: '583dfe995ca6bc09bf901aa4',
  }, {
    name: 'Vodka',
    color: '#eeeeee',
    user: '583dfe995ca6bc09bf901aa4',
  }, {
    name: 'Dry Vermouth',
    color: '#f4f8e9',
    user: '583dfe995ca6bc09bf901aa4',
  },
]

// Remove all entries, insert seed data
Ingredient.remove({}).then( () => {
  data.forEach( ingredient => {
    console.log(`Inserting ${ingredient.name}`)
    Ingredient.collection.insert(ingredient).then( () => {
      console.log(`Ingredient seeding complete.`)
      process.exit()
    }).catch((err) => { console.log(err) })
  })
}).catch((err) => { console.log(err) })
