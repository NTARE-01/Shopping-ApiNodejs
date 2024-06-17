const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')('app:startup');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Set the strictQuery option to false
mongoose.set('strictQuery', false);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  debug(err.message, err);
  res.status(500).send('Something failed.');
});

// Connect to MongoDB
mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => debug('Connected to MongoDB...'))
  .catch(err => debug('Could not connect to MongoDB...', err));

const port = process.env.PORT || 3000;
app.listen(port, () => debug(`Listening on port ${port}...`));