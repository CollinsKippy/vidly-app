const jwt = require('jsonwebtoken');
const { User } = require('../User');

describe('generateAuthToken', () => {
  it('should generate a jwt token with _id and isAdmin variable', () => {
    const user = new User({ _id: 1, name: 'John', isAdmin: true });
    const token = user.generateAuthToken();

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log(decoded);

    expect(decoded).toMatchObject({ _id: user._id, isAdmin: true });
  });
});
