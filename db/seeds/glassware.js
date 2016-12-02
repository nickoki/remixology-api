// db/seeds/glassware.js

// Require connection
var mongoose = require('../connection')

// Define Model
var Glass    = require('../models/Glass')

// Seed Data
var data = [
  {
    name: 'Highball',
    image_url: 'http://res.cloudinary.com/ln4ekgvyc/image/upload/v1479402093/remixology/highball.png',
    capacity: 12,
    margin_top: 12,
    margin_bottom: 77,
  },
  {
    name: 'Martini',
    image_url: 'http://res.cloudinary.com/ln4ekgvyc/image/upload/v1480653617/remixology/martini.png',
    capacity: 6,
    margin_top: 11,
    margin_bottom: 356,
  }
]

// Remove all entries, insert seed data
/*
// ** Danger **
Glass.remove({}).then( () => {
*/
  data.forEach( glass => {
    console.log(`Inserting ${glass.name}`)
    Glass.collection.insert(glass).then( () => {
      console.log(`Glass seeding complete.`)
      process.exit()
    }).catch((err) => { console.log(err) })
  })
/*
}).catch((err) => { console.log(err) })
*/
