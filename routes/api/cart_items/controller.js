const Product = require('../../../models/Product');
const CartItem = require('../../../models/CartItem');

function index(req, res) {
  res.json(CartItem.fetchAll());
}

function create(req, res) {
  const product = Product.findOne(req.body.productId);
  const cartItem = CartItem.createOrUpdate(product, req.body.quantity);
  res.json(cartItem);
}

module.exports = {
  create,
  index
};
