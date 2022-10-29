const server = require('../../app');
const supertest = require('supertest');
const request = supertest(server);

describe('/api/cart', () => {
  it('DELETE /api/cart', async () => {
    const res = await request.delete('/api/cart');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body.data).toEqual([]);
  });
});
