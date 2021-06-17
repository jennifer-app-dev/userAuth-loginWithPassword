const express = require('express')
const app = express()

app.use(express.json())

// create a users variable to store our users
// in real world cases, you will store the users in the database somewhere
// but for this mini project, we just use an array to store the users for testing purpose
const users = [{
  name: 'Name'
}]

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password
  }
  users.push(user)
  res.status(201).send() 
})

app.listen(3001)