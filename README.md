# Shopping API

This is a RESTful API for a shopping application, built with Node.js, Express, and MongoDB.

## Features

- User registration and login with email verification
- JWT-based authentication
- Product management (add, view, delete products)
- Swagger API documentation

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Models](#models)
- [Middlewares](#middlewares)
- [Controllers](#controllers)
- [Services](#services)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/shopping-api.git
    cd shopping-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    JWT_PRIVATE_KEY=your_jwt_private_key
    MONGO_URI=your_mongodb_uri
    EMAIL_SERVICE=gmail
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASSWORD=your_email_password
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The API will be running at `http://localhost:3000`.

3. Access the Swagger API documentation at `http://localhost:3000/api-docs`.

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/verify/:token` - Verify user email

### Products

- `POST /api/products` - Add a new product (admin only)
- `GET /api/products` - Get all products
- `DELETE /api/products/:id` - Delete a product (admin only)

## Configuration

The configuration files are located in the `config` directory. You can specify custom environment variables in `custom-environment-variables.json` and provide default values in `default.json`.

## Models

### User Model

```javascript
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
