// index.js

// ====================
// Module dependencies
// ====================
var express    = require('express')
var bodyParser = require('body-parser')
var db         = require('./db/connection')
var Drink      = require('./db/models/Drink')



// ====================
// App Declaration
// ====================
var app = express()
var router = express.Router()

// Define port
var port = process.env.PORT || 7000

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Handle CORS
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})



// ====================
// API Routes
// ====================
// Root
router.get('/', (req, res) => {
  res.json({ message: `Cheers! Welcome to the Remixology API.` })
})

// /drinks
router.route('/drinks')

  // GET
  .get( (req, res) => {
    Drink.find( (err, drinks) => {
      if (err) res.send(err)
      else res.json(drinks)
    })
  })

  // POST
  .post( (req, res) => {
    var drink = new Drink()
    drink.name = req.body.name
    drink.save( err => {
      if (err) res.send(err)
      else res.json({ message: `Cheers! Drink posted successfully.` })
    })
  })



// ====================
// API Middleware
// ====================
app.use('/api', router)



// ====================
// Listen Up
// ====================
app.listen(port, () => {
  console.log(`Remixology API running on port ${port}`)
})
