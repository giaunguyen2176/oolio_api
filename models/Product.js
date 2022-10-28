let products = [
  {
    id: 1,
    name: 'Small pizza',
    description: 'Small size pizza with cheese',
    price: 12.99
  },
  {
    id: 2,
    name: 'Medium pizza',
    description: 'Medium size pizza with cheese',
    price: 15.99
  },
  {
    id: 3,
    name: 'Large pizza',
    description: 'Large size pizza with cheese',
    price: 21.99
  }
];

module.exports = new function () {
  this.fetchAll = () => products;
  this.findOne = (id) => products.find((p) => p.id === id);
};
