const { User } = require('../../models/User');
const { Genre } = require('../../models/Genre');
const request = require('supertest');
const app = require('../../app');

describe('AUTH HANDLER', () => {
  let token, genre, url;

  beforeAll(() => {
    token = new User().generateAuthToken();
    genre = { name: 'MyGenre3' };
    url = '/api/genres';
  });

  afterAll(async () => {
    await Genre.deleteMany({});
  });

  it('should return a 401 Unauthorized if there is no token', async () => {
    token = ''; // falsy

    const res = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(genre);

    expect(res.status).toBe(401);
    expect(res.body?.message).toMatch(/token/i);
  });

  it('should return a 400 Bad Request if there is wrong token', async () => {
    token = 'a'; //truthy

    const res = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(genre);

    expect.assertions(3);

    expect(res.status).toBe(400);
    expect(res.body?.message).not.toBeNull();
    expect(res.body).toHaveProperty('message');
  });

  it('should return a new Genre if token is valid - (POST) method', async () => {
    token = new User().generateAuthToken();

    const res = await request(app)
      .post(url)
      .set('Authorization', `Bearer ${token}`)
      .send(genre);

    expect.assertions(2);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name');
  });
});
