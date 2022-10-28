const express = require('express');
const formatter = require('./formatter');
const errorHandler = require('./errorHandler');
const products = require('./products');
const cartItems = require('./cart_items');
const checkout = require('./checkout');
const router = express.Router();

router.use(formatter());

router.use('/products', products);
router.use('/cart_items', cartItems);
router.use('/checkout', checkout);

router.use(errorHandler());
module.exports = router;
