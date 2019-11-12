// Do the following API endpoints
// Iteration 1: Get all movies
// Iteration 2: With same endpoint add an option to get it ordered by rate (asc & desc)
// Iteration 3: Get movies count
// Iteration 4: Get all the movies of a single year
// Iteration 5: Get All rates average
// Iteration 6: Get movies of a genre
// Iteration 7: Get movies that has more than X rate

// BONUS Iteration: Get films grouped by year of a genre
'use strict'
const data = require('./data')
const restify = require('restify')
const server = restify.createServer()
const port = 3000

server.get('/movies', (req, res, next) => {
  return res.send(data)
})

server.get('/movies/order/:orderType', (req, res, next) => {
  if (req.params.orderType === 'asc') {
    return res.send(data.sort((a, b) => (+a.rate > +b.rate) ? 1 : (+b.rate > +a.rate) ? -1 : 0))
  } else if (req.params.orderType === 'desc') {
    return res.send(data.sort((a, b) => (+a.rate < +b.rate) ? 1 : (+b.rate < +a.rate) ? -1 : 0))
  }
})

server.get('/movies/total', (req, res, next) => {
  return res.send('El número total es ' + data.length)
})

server.get('/movies/year/:year', (req, res, next) => {
  return res.send(data.filter(s => +s.year === +req.params.year))
})

server.get('/movies/rate', (req, res, next) => {
  return res.send('The average rate is ' + (data.reduce((acc, value) => { return acc + (+value.rate) }, 0) / data.length).toFixed(2))
})

server.get('/movies/genre/:genre', (req, res, next) => {
  return res.send(data.filter(s => s.genre.map(s => s.toUpperCase()).includes(req.params.genre.toUpperCase())))
})

server.get('/movies/rate-up/:rate', (req, res, next) => {
  return res.send(data.filter(s => +s.rate > +req.params.rate))
})

server.get('/movies/genrebyyear/:genre', (req, res, next) => {
  return res.send(data.filter(s => s.genre.map(s => s.toUpperCase()).includes(req.params.genre.toUpperCase()))
    .reduce((acc, value) => {
      const key = value.year
      if (!acc[key]) acc[key] = []
      acc[key].push(value)
      return acc
    }, {}))
})

server.listen(port, () => {
  console.log('Init service')
})
