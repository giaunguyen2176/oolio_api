const _ = require('lodash');
const Checkout = require('../../../models/Checkout');

function checkout(req, res) {
  const codes = _.compact(_.uniq(req.body.codes));
  const items = _.compact(_.uniq(req.body.items));
  const checkout = new Checkout(items, codes);
  res.json(checkout.total);
}

module.exports = {
  checkout
};
