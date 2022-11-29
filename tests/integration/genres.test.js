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

describe('/api/genres controller', () => {
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

      const res = await request(server).get('/api/genres');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'genre1'));
      expect(res.body.some((g) => g.name === 'genre2'));
    });

    it('should return a 404 not found if wrong ID is supplied', async () => {
      const id = '6358e0bf5d845de123c430b3';
      const url = `/api/genres/${id}`;
      const res = await request(server).get(url);

      expect(res.status).toBe(404);
    });
  });

  // POST

  // PUT

  // DELETE
});
