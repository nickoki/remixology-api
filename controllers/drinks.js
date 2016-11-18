// controllers/drinks.js

// ====================
// Dependencies
// ====================
var Drink = require('../db/models/Drink')
var Glass = require('../db/models/Glass')



// ====================
// Functions
// ====================
// GET
exports.get = (req, res) => {
  Drink.find({})
    .populate('glass', '-_id')
    .exec((err, drinks) => {
    if (err) res.send(err)
    else res.json(drinks)
  })
}

// POST
exports.post = (req, res) => {
  var drink = new Drink()
  drink.name = req.body.name
  drink.description = req.body.description
  drink.instructions = req.body.instructions
  Glass.findOne({ name: req.body.glass }, (err, result) => {

    if (err) res.send(err)
    else drink.glass = result

    drink.save( e => {
      if (e) res.send(e)
      else res.json({ message: `Cheers! Drink posted successfully.` })
    })
  })
}

// EDIT
exports.edit = (req, res) => {
  Glass.findOne({ name: req.body.glass }, (err, glass) => {

    if (err) res.send(err)
    else {
      req.body.glass = glass
      Drink.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true }, (err, result) => {
        if (err) res.send(err)
        else res.json({ message: `Drink updated succesfully.` })
      })

    }
  })

}

// DELETE
exports.delete = (req, res) => {
  Drink.findOneAndRemove({ _id: req.body._id }, (err, result) => {
    if (err) res.send(err)
    else res.json({ message: `Drink removed successfully.` })
  })
}
