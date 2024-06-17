const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

// Generate an authentication token
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isVerified: this.isVerified }, config.get('jwtPrivateKey'));
  return token;
};

// Define the User model
const User = mongoose.model('User', userSchema);

// Validate user input
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validate: validateUser
};
