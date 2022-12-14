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
      let user, user2;
      user = user2 = { name, email, password, confirmPassword };

      const firstUser = await User.create(user);

      const url = '/api/users/register';
      const res = await request(app).post(url).send(user2);

      expect(res.status).toBe(400);
      expect(res.text).toMatch(/email/);
    });

    it('should register user with valid user details', async () => {
      const user = { name, email, password, confirmPassword };

      const url = '/api/users/register';
      const res = await request(app).post(url).send(user);

      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ name, email });
    });
  });

  describe('USER LOGIN', () => {
    it('it should return 400 Bad Request if invalid email is supplied', async () => {
      const user = { email: 'eeeeeeeee@dom.com', password };

      const url = '/api/users/login';
      const response = await request(app).post(url).send(user);

      expect.assertions(2);
      expect(response.status).toBe(400);
      expect(response.text).toMatch(/invalid/i);
    });

    it('it should return 400 Bad Request if invalid password is supplied', async () => {
      const user = { email, password: '1111222ABDCD' };
      const url = '/api/users/login';
      const response = await request(app).post(url).send(user);

      expect.assertions(2);
      expect(response.status).toBe(400);
      expect(response.text).toMatch(/invalid/i);
    });

    it('it should return user object with token for valid credentials', async () => {
      const userReg = { name, password, email, confirmPassword };
      const registerUrl = '/api/users/register';

      const newUserResponse = await request(app)
        .post(registerUrl)
        .send(userReg);

      const loginUrl = '/api/users/login';
      const credentials = {
        email: email,
        password: password,
      };

      const response = await request(app).post(loginUrl).send(credentials);

      expect.assertions(5);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({ email });
      expect(response.body).toMatchObject({ name });
      expect(response.body.token).toBeTruthy();
      expect(response.body.expiresIn).toBeTruthy();
    });
  });
});
