const Pricing = require('./Pricing');

let codes = [
  {
    code: 'MICROSOFT',
    type: 'FOR_X_GET_Y_FOR_Z',
    params: {
      x: 1,
      y: 3,
      z: 2
    }
  },
  {
    code: 'AMAZON',
    type: 'NEW_PRICE_ON_X_VALUE_Y',
    params: {
      x: 3,
      y: 19.99
    }
  },
  {
    code: 'FACEBOOK',
    type: 'FOR_X_GET_Y_FOR_Z',
    params: {
      x: 2,
      y: 5,
      z: 4
    }
  }
];

module.exports = new function() {
  this.fetchAll = () => codes;
  this.findOne = (code) => codes.find((ct) => ct.code.toLowerCase() === code.toLowerCase());
};
