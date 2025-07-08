const mongoose = require('mongoose');

//creating a schema
const UserSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }
}, {timestamps: true});

//creating a model for the schema
const User = mongoose.model("users", UserSchema);

module.exports = User;