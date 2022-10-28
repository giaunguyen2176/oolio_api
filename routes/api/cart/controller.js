const CartItem = require('../../../models/CartItem');

function clear(req, res) {
  CartItem.destroyAll()
  res.json([]);
}

module.exports = {
  clear
};
