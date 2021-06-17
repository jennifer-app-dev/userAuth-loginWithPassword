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

// Create /login Endpoint
app.post('/users/login', async (req,res) => {
  // 1st, get our user => try to find particular user based on the name we passed in.
  // // => find the matching name by using 'array.find()' method
  const user = users.find(user => user.name =req.body.name)
  // 1.A: Conditional Check
  if(user == null) {
    // 1.A.1: if the user does NOT exist, send a error message
    return res.status(400).send('Cannot find user')
  }
  // 2nd, run 'try ...catch' to do the comparison for our password
  try {
    // conditonal check: if the password are the same
    if(await bcrypt.compare(req.body.password, user.password)) {
      // if the password are the same, => the user will be logged In
      res.send('Success')
    } else {
      // if the password are NOT the same, => the user will be NOT allowed to log in
      res.send('Not Allowed')
    }

  }catch {
    // catch the error by sending the status code && corresponding error messages
    res.status(500).send()
  }
})

app.listen(3003)