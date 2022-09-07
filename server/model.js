const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    password: { type: String, required: true },
  },
  {
    collection: 'user',
  }
);

const model = mongoose.model('user', User);

module.exports = model;
