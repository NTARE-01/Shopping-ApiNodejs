const { Product, validate } = require('../models/product');

exports.addProduct = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let product = new Product(req.body);
  await product.save();

  res.send(product);
};

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product) return res.status(404).send('Product not found.');

  res.send(product);
};
