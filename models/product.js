const mongoose = require('mongoose');
const Joi = require('joi');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required()
  });
  return schema.validate(product);
}

exports.Product = Product;
exports.validate = validateProduct;
