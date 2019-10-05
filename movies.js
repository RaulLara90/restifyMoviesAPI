// Do the following API endpoints
// Iteration 1: Get all movies
// Iteration 2: With same endpoint add an option to get it ordered by rate (asc & desc)
// Iteration 3: Get movies count
// Iteration 4: Get all the movies of a single year
// Iteration 5: Get All rates average
// Iteration 6: Get movies of a genre
// Iteration 7: Get movies that has more than X  rate

// BONUS Iteration: Get films grouped by year of a genre
//
const express = require('express')
const data = require('./data')

const app = express()

app.get('/movies', (req, res) => {
  res.send(data)
})

app.listen(3000, () => {
  console.log('listening in port: 3000')
})
