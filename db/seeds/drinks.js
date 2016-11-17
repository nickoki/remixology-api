// db/seeds/glassware.js

// Require connection
var mongoose = require('../connection')

// Define Model
var Glass    = require('../models/Glass')
var Drink    = require('../models/Drink')

// Seed Data
Glass.findOne({ name: 'Highball' }, (err, glass) => {
  if (err) console.log(err)
  else {
    var data = [
      {
        name: 'Vodka Martini',
        glass: glass._id,
      },
    ]

    // Remove all entries, insert seed data
    Drink.remove({}).then( () => {
      data.forEach( drink => {
        Drink.collection.insert(drink).then( () => {
          process.exit()
        }).catch((err) => { console.log(err) })
      })
    }).catch((err) => { console.log(err) })
  }
})
