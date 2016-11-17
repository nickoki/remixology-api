// db/seeds/glasses.js

// Require connection
var mongoose = require('../connection')

// Define Model
var Glass = mongoose.model('Glass')

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

Glass.remove({}).then( () => {
  data.forEach( glass => {
    Glass.collection.insert(glass)
  }).then( () => {
    process.exit()
  })
})
