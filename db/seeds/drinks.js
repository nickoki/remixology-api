// db/seeds/glassware.js

// Require connection
var mongoose   = require('../connection')

// Define Model
var Glass      = require('../models/Glass')
var Drink      = require('../models/Drink')
var Ingredient = require('../models/Ingredient')

// Seed Data
Glass.findOne({ name: 'Highball' }, (err, glass) => {
  if (err) console.log(err)
  else {

    Ingredient.findOne({ name: 'Vodka' }, (err, vodka) => {
      if (err) console.log(err)
      else {
        var recipe = [{ingredient: vodka._id, amount: '25'}]

        Ingredient.findOne({ name: 'Dry Vermouth' }, (err, dryVermouth) => {
          if (err) console.log(err)
          else {
            recipe.push({ingredient: dryVermouth._id, amount: '1'})

            var data = [
              {
                name: 'Vodka Martini',
                glass: glass._id,
                description: 'Lorem ipsum.',
                instructions: 'Shaken, not stirred.',
                recipe: recipe,
              },
            ]

            // Remove all entries, insert seed data
            Drink.remove({}).then( () => {
              data.forEach( drink => {
                console.log(`Inserting ${drink.name}`)
                console.log(drink)
                Drink.collection.insert(drink).then( () => {
                  console.log('Drink seeding complete.')
                  process.exit()
                }).catch((err) => { console.log(err) })
              })
            }).catch((err) => { console.log(err) })
          }
        })
      }
    })
  }
})
