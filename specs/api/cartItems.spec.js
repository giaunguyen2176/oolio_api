const server = require('../../app');
const supertest = require('supertest');
const request = supertest(server);

describe('/api/checkout', () => {
  it('POST /api/cart_items', async () => {
    const res = await request.post('/api/cart_items')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        productId: 1,
        quantity: 1
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data).toEqual({
      product: {
        id: 1,
        name: 'Small pizza',
        description: 'Small size pizza with cheese',
        price: 11.99
      },
      quantity: 1
    });
  });

  it('GET /api/cart_items', async () => {
    await request.post('/api/cart_items')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        productId: 1,
        quantity: 3
      });
    await request.post('/api/cart_items')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        productId: 2,
        quantity: 2
      });
    const res = await request.get('/api/cart_items');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data.length).toEqual(2);
    expect(res.body.data[0]).toEqual({
      product: {
        id: 1,
        name: 'Small pizza',
        description: 'Small size pizza with cheese',
        price: 11.99
      },
      quantity: 4
    });
    expect(res.body.data[1]).toEqual({
      product: {
        id: 2,
        name: 'Medium pizza',
        description: 'Medium size pizza with cheese',
        price: 15.99
      },
      quantity: 2
    });
  });
});
