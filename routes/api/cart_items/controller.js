const Product = require('../../../models/Product');
const CartItem = require('../../../models/CartItem');

function create(req, res) {
  const product = Product.findOne(req.body.productId);
  const cartItem = CartItem.createOrUpdate(product, req.body.quantity);
  console.log(cartItem);
  res.json(cartItem);
}

module.exports = {
  create: create
};
