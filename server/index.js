require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/users');
const path = require('path');

//initializing app
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//connection with mongodb
mongoose
.connect(process.env.MONGO_URL)
.then(console.log("MongoDB has been connected successfully."));

//route for fetching and displaying records
app.get('/', async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
})

//route for fetching updated records
app.get('/getUser/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({_id:id});
  res.json(user);
})

//route for updating user
app.put('/updateUser/:id', async (req, res) => {
  const id = req.params.id;
  const updatedUser = await User.findByIdAndUpdate({_id:id} ,
    { name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  )
  res.json(updatedUser);
})

//route for creating new record
app.post('/createUser', async (req, res) => {
   const {name, email, age} = req.body;
   await User.create({
    name,
    email,
    age
   });
   return res.status(201).json({ message: "User created successfully" });
})

//router for deleting a record
app.delete('/deleteUser/:id', async (req, res) => {
  const id = req.params.id;
  const deletedUser = await User.findByIdAndDelete(id);
  res.json(deletedUser);
})

// Serve React build files
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//assigning a port for app
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
  console.log("Server has started on port ", PORT);
})