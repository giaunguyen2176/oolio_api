const Pricing = require('./Pricing');
const DiscountCode = require('./DiscountCode');

module.exports = function (items, codes) {
  // Calculate total of all products
  this.total = items.reduce((accumulator, item) => {
    return accumulator + item.product.price * item.quantity;
  }, 0);

  // With each code, deduct the discount amount from the total to get final total
  codes.forEach((code) => {
    const discountCode = DiscountCode.findOne(code);
    if (!discountCode) {
      return;
    }
    const pricing = new Pricing(items, discountCode);
    this.total -= pricing.discountValue;
  });

  this.total = Math.round(this.total * 100) / 100;
};
