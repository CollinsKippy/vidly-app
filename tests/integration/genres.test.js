/**
 * Notes:
 * Create and destroy server in the beforeEach() and afterEach() functions to ensure port re-use
 * 1. Create a server variable.
 * 2. In beforeEach(), load the server.
 * 3. In afterEach(), shutdown the server.
 * 4. Also, clean up the db in the afterEach() function - to prevent multiple data entries
 */
const request = require('supertest');
const { Genre } = require('../../models/Genre');

let server;

describe('Genres controller', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    server.close();

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
      const res = await request(server).get(url);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1'));
      expect(res.body.some((g) => g.name === 'genre2'));
    });
  });

  // GET SINGLE
  describe('GET SINGLE', () => {
    it('should return a genre if valid id is supplied', async () => {
      const genre = new Genre({ name: 'Genre3' });
      await genre.save();

      const url = `/api/genres/${genre._id}`;

      const res = await request(server).get(url);

      console.log(res.body);

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ name: genre.name });
      expect(res.body).toHaveProperty('name', genre.name);
    });
  });

  // POST

  // PUT

  // DELETE
});
