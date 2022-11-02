const mongoose = require('mongoose');

const genreModel = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name of Genre is required.'],
  },
});

const Genre = mongoose.model('Genre', genreModel);

module.exports = {
  Genre,
};
