const Product = require('../../../models/Product');

function index(req, res) {
  res.json(Product.fetchAll());
}

module.exports = {
  index: index
};
