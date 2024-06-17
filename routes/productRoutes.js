const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');

router.post('/', [auth, admin], productController.addProduct);
router.get('/', auth, productController.getProducts);
router.delete('/:id', [auth, admin], productController.deleteProduct);

module.exports = router;
