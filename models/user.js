const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const ErrorUnauthorized = require('../errors/error-unauthorized'); // 401
const { errorMessage, validateMessage, requiredMessage } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, requiredMessage.email],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: validateMessage.email,
    },
  },

  password: {
    type: String,
    required: [true, requiredMessage.password],
    select: false,
  },

  name: {
    type: String,
    required: [true, requiredMessage.name],
    minlength: 2,
    maxlength: 30,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new ErrorUnauthorized(errorMessage.unauthorizedEmailPassword));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new ErrorUnauthorized(errorMessage.unauthorizedEmailPassword));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
