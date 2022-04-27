const mongoose = require('mongoose');
const { validateMessage, requiredMessage } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, requiredMessage.country],
  },

  director: {
    type: String,
    required: [true, requiredMessage.director],
  },

  duration: {
    type: Number,
    required: [true, requiredMessage.duration],
  },

  year: {
    type: String,
    required: [true, requiredMessage.year],
  },

  description: {
    type: String,
    required: [true, requiredMessage.description],
  },

  image: {
    type: String,
    required: [true, requiredMessage.image],
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?[-\w]+\.[-\w/]*/gim.test(v);
        // проверено с помощью сервиса https://regex101.com/
      },
      message: validateMessage.image,
    },
  },

  trailerLink: {
    type: String,
    required: [true, requiredMessage.trailerLink],
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?[-\w]+\.[-\w/]*/gim.test(v);
        // проверено с помощью сервиса https://regex101.com/
      },
      message: validateMessage.trailerLink,
    },
  },

  thumbnail: {
    type: String,
    required: [true, requiredMessage.thumbnail],
    validate: {
      validator(v) {
        return /^https?:\/\/(www.)?[-\w]+\.[-\w/]*/gim.test(v);
        // проверено с помощью сервиса https://regex101.com/
      },
      message: validateMessage.thumbnail,
    },
  },

  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: [true, requiredMessage.owner],
  },

  movieId: {
    type: Number,
    required: [true, requiredMessage.movieId],
  },

  nameRU: {
    type: String,
    required: [true, requiredMessage.nameRU],
  },

  nameEN: {
    type: String,
    required: [true, requiredMessage.nameEN],
  },

});

module.exports = mongoose.model('movie', movieSchema);
