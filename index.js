// index.js

// ====================
// Module dependencies
// ====================
var express = require('express')



// ====================
// App Declaration
// ====================
var app = express()
// var router = express.Router()

// Define port
var port = process.env.PORT || 7000



// ====================
// API Routes
// ====================
app.get('/', (req, res) => {
  res.send( `Hello, World!` )
})



// ====================
// Listen Up
// ====================
app.listen(port, () => {
  console.log(`Remixology API running on port ${port}`)
})
