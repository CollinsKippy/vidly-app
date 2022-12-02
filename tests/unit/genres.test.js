const { genreJoiValidator } = require('../../models/Genre');

describe('validate genre model', () => {
  it('should throw an error if genre length is less than 3 characters', async () => {
    const genre = { name: 'Ge' };

    expect.assertions(2);
    try {
      await genreJoiValidator.validateAsync(genre);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error?.message).toMatch(/length/);
    }
  });

  it('should throw an error if genre length is more than 20 characters', async () => {
    const genre = { name: 'GenreGenreGenreGenreGenre' };

    expect.assertions(2);
    try {
      await genreJoiValidator.validateAsync(genre);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error?.message).toMatch(/length/);
    }
  });

  it('should throw an error if genre is empty or null', async () => {
    const genre = {};

    expect.assertions(2);
    try {
      await genreJoiValidator.validateAsync(genre);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error?.message).toMatch(/required/);
    }
  });

  it('should accept a genre with character length more than 3 and less than 20', async () => {
    const genre = { name: 'MyGen' };

    expect.assertions(2);
    try {
      const result = await genreJoiValidator.validateAsync(genre);
      expect(result).toBeDefined();
      expect(result).toMatchObject({ name: 'MyGen' });
    } catch (error) {}
  });
});
