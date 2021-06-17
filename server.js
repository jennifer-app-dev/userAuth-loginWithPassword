const express = require('express')
const app = express()
// PART. 1: Create an endpoint to get the users
// PART. 2: Encrypt users password using 'bcrypt'
const bcrypt = require('bcrypt')

// PART: 2.A: How to hash the password?
// => PART. 2.A.1: step 1. create a 'salt'
// // => how 'salt' works => is add 'salt' at the beginning of the hashed password: hash(salt + 'password') ; the salt is different for different user
// => PART. 2.A.2: step 2. 

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

app.post('/users', async (req, res) => {
  try {
    // the larger the number in the 'genSalt()', the longer the password => e.g. bcrypt.genSalt(10)
    const salt = await bcrypt.genSalt(10)
    // => bcrypt.hash() takes in normal password as the 1st para. ; then take 'salt' as the 2nd para.
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    console.log(hashedPassword)

    // bring the codes inside the 'try'
    const user = {
      name: req.body.name,
      password: hashedPassword,
      salt: salt
    }
    users.push(user)
    res.status(201).send() 
  } catch {
    res.status(500).send()
  }
  
})

app.listen(3003)