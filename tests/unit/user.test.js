const jwt = require('jsonwebtoken');
const { User, userRegisterValidator } = require('../../models/User');

let id, name, email, password;

describe('generateAuthToken', () => {
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

describe('user register validator', () => {
  beforeEach(() => {
    name = 'Kennedy';
    email = 'kennedy@domain.com';
    password = 'Kennedy111';
  });

  it('should reject user object without name property', async () => {
    const user = { email, password };

    expect.assertions(3);
    try {
      await userRegisterValidator.validateAsync(user);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeTruthy();
      expect(error?.message).toMatch(/name/);
    }
  });
});
