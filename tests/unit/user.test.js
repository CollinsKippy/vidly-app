const jwt = require('jsonwebtoken');
const {
  User,
  userRegisterValidator,
  userLoginValidator,
} = require('../../models/User');

let id, name, email, password;

describe('GENERATE AUTH TOKEN', () => {
  beforeEach(() => {
    name = 'Kennedy';
    email = 'kennedy@domain.com';
    password = 'Kennedy111';
  });

  it('should generate a valid jwt token with _id and isAdmin variable', () => {
    const user = new User({ _id: 1, name, isAdmin: true });

    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    expect(decoded).toMatchObject({ _id: user._id, isAdmin: true });
  });
});

describe('REGISTER JOI VALIDATION', () => {
  beforeEach(() => {
    name = 'Kennedy';
    email = 'kennedy@domain.com';
    password = 'Kennedy111';
    confirmPassword = 'Kennedy111';
  });

  it('should reject user object without the name property', async () => {
    const user = { email, password, confirmPassword };

    expect.assertions(3);
    try {
      await userRegisterValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/name/);
    }
  });

  it('should reject user object without the email property', async () => {
    const user = { name, password, confirmPassword };

    expect.assertions(3);
    try {
      await userRegisterValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/email/);
    }
  });

  it('should reject user object without the password property', async () => {
    const user = { name, email, confirmPassword };

    expect.assertions(3);
    try {
      await userRegisterValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/password/);
    }
  });

  it('should reject user object without confirmPassword property', async () => {
    const user = { name, email, password };

    expect.assertions(3);
    try {
      await userRegisterValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/confirmPassword/);
    }
  });
});

describe('LOGIN JOI VALIDATION', () => {
  beforeEach(() => {
    email = 'kennedy@domain.com';
    password = 'Kennedy111';
  });

  it('should reject credentials without email property', async () => {
    const user = { password };

    expect.assertions(3);
    try {
      await userLoginValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/email/);
    }
  });

  it('should reject credentials without password property', async () => {
    const user = { email };

    expect.assertions(3);
    try {
      await userLoginValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/password/);
    }
  });
});
