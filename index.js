// index.js

// ====================
// Module dependencies
// ====================
var express     = require('express')
var bodyParser  = require('body-parser')

// Mongo and models
var db          = require('./db/connection')

// Controllers
var auth        = require('./controllers/auth')
var drinks      = require('./controllers/drinks')
var glassware   = require('./controllers/glassware')
var ingredients = require('./controllers/ingredients')
var users       = require('./controllers/users')



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
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})



// ====================
// API Routes
// ====================
// API Root
router.get('/', (req, res) => {
  res.json({ message: `Cheers! Welcome to the Remixology API.` })
})

// Routing for User auth
router.route('/signup')
  .post(users.signup)

router.route('/authenticate')
  .post(users.authenticate)

// Routing for Drinks
router.route('/drinks')
  .get(drinks.get)
  .post(auth.bouncer, drinks.post)
  .put(auth.bouncer, drinks.edit)
  .delete(auth.bouncer, drinks.delete)

router.route('/drinks/:id')
  .get(drinks.show)

// Routing for Glassware
router.route('/glassware')
  .get(glassware.get)

// Routing for Ingredients
router.route('/ingredients')
  .get(ingredients.get)
  .post(auth.bouncer, ingredients.post)
  .put(auth.bouncer, ingredients.edit)
  .delete(auth.bouncer, ingredients.delete)



// ====================
// API Middleware
// ====================
app.use('/', router)



// ====================
// Listen Up
// ====================
app.listen(port, () => {
  console.log(`Remixology API running on port ${port}`)
})
