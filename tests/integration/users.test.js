const { User } = require('../../models/User');
const request = require('supertest');
const app = require('../../app');

/**
 * Test the Registration and Login of Users
 */
// let server;
let name, email, password;

describe('Users Controller', () => {
  beforeEach(() => {
    // server = require('../../index');

    name = 'Kennedy';
    email = 'kennedy@domain.com';
    password = 'Kennedy111';
    confirmPassword = password;
  });

  afterEach(async () => {
    // server.close();

    await User.deleteMany({});
  });

  describe('USER REGISTRATION', () => {
    it('should thow a 400 Bad Request if user email already exists in ', async () => {
      const user = { name, email, password, confirmPassword };
      const user2 = { name, email, password, confirmPassword };

      const firstUser = await User.create(user);

      const url = '/api/users/register';
      const res = await request(app).post(url).send(user2);

      expect(res.status).toBe(400);
      // expect(res.message).toMatch(/exists/);
    });

    // it('should register user with valid user details', () => {});
  });

  describe('user login', () => {});
});
