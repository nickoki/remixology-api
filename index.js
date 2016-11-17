// index.js

// ====================
// Module dependencies
// ====================
var express    = require('express')
var bodyParser = require('body-parser')



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
router.get('/', (req, res) => {
  res.json({ message: `Cheers! Welcome to the Remixology API.` })
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
