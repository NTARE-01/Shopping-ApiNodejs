const mongoose = require('mongoose');
const Joi = require('joi');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    user: Joi.objectId().required(),
    products: Joi.array().items(Joi.objectId()).required(),
    totalPrice: Joi.number().required()
  });
  return schema.validate(order);
}

exports.Order = Order;
exports.validate = validateOrder;
