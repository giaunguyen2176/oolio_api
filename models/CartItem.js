let cartItems = [];

module.exports = new function() {
  this.fetchAll = () => cartItems;

  this.findOne = (productId) => cartItems.find((ct) => ct.product.id === productId);

  this.createOrUpdate = (product, quantity) => {
    let cartItem = this.findOne(product.id);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = {
        product: product,
        quantity: quantity
      };
      cartItems.push(cartItem);
    }
    return cartItem;
  };

  this.destroyAll = () => {
    cartItems = [];
  };
};
