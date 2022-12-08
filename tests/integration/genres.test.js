/**
 * Notes:
 * Create and destroy server in the beforeEach() and afterEach() functions to ensure port re-use
 * 1. Create a server variable.
 * 2. In beforeEach(), load the server.
 * 3. In afterEach(), shutdown the server.
 * 4. Also, clean up the db in the afterEach() function - to prevent multiple data entries
 */
const request = require('supertest');
const app = require('../../app');

const { Genre, genreJoiValidator } = require('../../models/Genre');
const { User } = require('../../models/User');

// let server;

describe('Genres controller', () => {
  beforeEach(() => {
    // server = require('../../index');
  });
  afterEach(async () => {
    // server.close();

    await Genre.deleteMany({});
  });

  // GET
  describe('GET', () => {
    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        { name: 'Genre1' },
        { name: 'Genre2' },
      ]);
      const url = `/api/genres`;
      const res = await request(app).get(url);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1'));
      expect(res.body.some((g) => g.name === 'genre2'));
    });
  });

  // GET SINGLE
  describe('GET SINGLE', () => {
    it('should return a 400 if invalid id is supplied', async () => {
      const url = `/api/genres/1`;

      const res = await request(app).get(url);

      expect(res.status).toBe(400);
    });

    it('should return a genre if valid id is supplied', async () => {
      const genre = new Genre({ name: 'Genre3' });
      await genre.save();

      const url = `/api/genres/${genre._id}`;
      const res = await request(app).get(url);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: genre.name });
      expect(res.body).toHaveProperty('name', genre.name);
    });
  });

  // POST
  describe('POST', () => {
    // get jwt token

    beforeEach(async () => {
      userName = 'Johnny';
      email = 'johnny@domain.com';
      password = 'Johnny111';
      confirmPassword = 'Johnny111';

      const registerUrl = '/api/users/register';

      const res = await request(app)
        .post(registerUrl)
        .send({ name: userName, email, password, confirmPassword });
    });

    afterEach(async () => {
      await User.deleteMany({});
    });

    it('should return a 201 with a valid genre', async () => {
      // Login User
      const loginUrl = '/api/users/login';

      const loginRes = await request(app)
        .post(loginUrl)
        .send({ email, password });

      const { token, expiresIn } = loginRes.body;

      // const someDynamicToken = new User().generateAuthToken();

      jwtToken = token;

      // Create Genre and Submit
      const genre = { name: 'MyGenre' };
      const postUrl = '/api/genres';

      const res = await request(app)
        .post(postUrl)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(genre);

      expect.assertions(2);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name: genre.name });
    });

    it('should return a 401 Not Authorized if user is not logged in.', async () => {
      const genre = { name: 'MyGenre2' };
      const postUrl = '/api/genres';

      const res = await request(app).post(postUrl).send(genre);

      expect.assertions(2);

      expect(res.status).toBe(401);
      expect(res.text).toMatch(/token/);
    });

    it('should return the saved genre upon querying the DB.', async () => {
      const jwtToken = new User().generateAuthToken();

      const url = '/api/genres';
      const genre = { name: 'MyGenre3' };

      const res = await request(app)
        .post(url)
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(genre);

      const newGenre = await Genre.findOne({ name: genre.name }); // Query the DB;

      expect.assertions(3);
      expect(newGenre).not.toBeNull();
      expect(newGenre).toHaveProperty('_id');
      expect(newGenre).toMatchObject({ name: genre.name });
    });
  });

  // PUT

  // DELETE
});
