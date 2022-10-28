const FOR_X_GET_Y_FOR_Z = 'FOR_X_GET_Y_FOR_Z';
const NEW_PRICE_ON_X_VALUE_Y = 'NEW_PRICE_ON_X_VALUE_Y';

const discountForXGetYForZ = function(items, discountCode) {
  const productId = discountCode.params.x;
  const requiredCount = discountCode.params.y;
  const chargeCount = discountCode.params.z;

  // Count number of applicable products
  const discountItem = items.find((item) => item.product.id === productId);

  // Check if enough required count, floor to avoid decimal value like 0.6, 0.8
  let unchargedCount = Math.floor(discountItem.quantity / requiredCount);
  if (unchargedCount === 0) {
    return 0;
  }

  // applicable -> calculate discount value
  return Math.round(unchargedCount * (requiredCount - chargeCount) * discountItem.product.price * 100) / 100;
}

const discountNewPriceOnXValueY = function(items, discountCode) {
  const productId = discountCode.params.x;
  const newPrice = discountCode.params.y;

  // Count number of applicable products
  const discountItem = items.find((item) => item.product.id === productId);

  const originalPrice = discountItem.product.price;
  const quantity = discountItem.quantity;

  // applicable -> calculate discount value
  return Math.round((originalPrice - newPrice) * quantity * 100) / 100;
}

module.exports = function(items, discountCode) {
    // For every discount type, implement its own logic here
  console.log(discountCode.type);
  switch (discountCode.type) {
    case FOR_X_GET_Y_FOR_Z:
      this.discountValue = discountForXGetYForZ(items, discountCode);
      break;
    case NEW_PRICE_ON_X_VALUE_Y:
      this.discountValue = discountNewPriceOnXValueY(items, discountCode);
      break;
    default:
      this.discountValue = 0;
      break;
  }
};
