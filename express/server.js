'use strict'
const express = require('express')
const serverless = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()

app.use(bodyParser.json())
app.use('/.netlify/functions/server', router) // path must route to lambda
app.use('/', router)

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>Up and running</h1>')
  res.end()
})

router.post('/doSomething', async (req, res) => {
  try {
    // maybe do some database interaction or third-party API call here!
    res.status(200).send({ data: 'success' })
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: 'bad request' })
  }
})

module.exports = app
module.exports.handler = serverless(app)
