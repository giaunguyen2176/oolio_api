const server = require('../../app');
const supertest = require('supertest');
const request = supertest(server);

describe('/api/products', () => {
  it('GET /api/products', async () => {
    const res = await request.get('/api/products');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data.length).toEqual(3);
    expect(res.body.data[0]).toEqual({
      id: 1,
      name: 'Small pizza',
      description: 'Small size pizza with cheese',
      price: 11.99
    });
    expect(res.body.data[1]).toEqual({
      id: 2,
      name: 'Medium pizza',
      description: 'Medium size pizza with cheese',
      price: 15.99
    });
    expect(res.body.data[2]).toEqual({
      id: 3,
      name: 'Large pizza',
      description: 'Large size pizza with cheese',
      price: 21.99
    });
  });
});
