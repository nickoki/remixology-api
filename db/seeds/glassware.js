// db/seeds/glassware.js

// Require connection
var mongoose = require('../connection')

// Define Model
var Glass    = require('../models/Glass')

// Seed Data
var data = [
  {
    name: 'Highball',
    image_url: 'http://res.cloudinary.com/ln4ekgvyc/image/upload/v1479402093/remixology/highball.svg',
    capacity: 12,
    margin_top: 12,
    margin_bottom: 77,
  },
]

// Remove all entries, insert data
Glass.remove({}).then( () => {
  data.forEach( glass => {
    Glass.collection.insert(glass).then(function(){
      process.exit()
    })
  })
})
