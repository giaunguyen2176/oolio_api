const server = require('../../app');
const supertest = require('supertest');
const request = supertest(server);

describe('/api/checkout', () => {
  it('POST /api/checkout', async () => {
    const res = await request.post('/api/checkout')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        items: [
          {
            product: {
              id: 1,
              name: 'Small pizza',
              description: 'Small size pizza with cheese',
              price: 11.99
            },
            quantity: 1
          },
          {
            product: {
              id: 2,
              name: 'Medium pizza',
              description: 'Medium size pizza with cheese',
              price: 15.99
            },
            quantity: 1
          },
          {
            product: {
              id: 3,
              name: 'Large pizza',
              description: 'Large size pizza with cheese',
              price: 21.99
            },
            quantity: 1
          }
        ],
        codes: []
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data).toEqual(49.97);
  });

  it('POST /api/checkout - MICROSOFT', async () => {
    const res = await request.post('/api/checkout')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        items: [
          {
            product: {
              id: 1,
              name: 'Small pizza',
              description: 'Small size pizza with cheese',
              price: 11.99
            },
            quantity: 3
          },
          {
            product: {
              id: 3,
              name: 'Large pizza',
              description: 'Large size pizza with cheese',
              price: 21.99
            },
            quantity: 1
          }
        ],
        codes: ['MICROSOFT']
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data).toEqual(45.97);
  });

  it('POST /api/checkout - FACEBOOK', async () => {
    const res = await request.post('/api/checkout')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        items: [
          {
            product: {
              id: 2,
              name: 'Medium pizza',
              description: 'Medium size pizza with cheese',
              price: 15.99
            },
            quantity: 5
          }
        ],
        codes: ['FACEBOOK']
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data).toEqual(63.96);
  });

  it('POST /api/checkout - AMAZON', async () => {
    const res = await request.post('/api/checkout')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        items: [
          {
            product: {
              id: 2,
              name: 'Medium pizza',
              description: 'Medium size pizza with cheese',
              price: 15.99
            },
            quantity: 3
          },
          {
            product: {
              id: 3,
              name: 'Large pizza',
              description: 'Large size pizza with cheese',
              price: 15.99
            },
            quantity: 1
          }
        ],
        codes: ['AMAZON']
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data).toEqual(67.96);
  });
});
