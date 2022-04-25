const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorBadRequest = require('../errors/error-bad-request'); // 400
const ErrorUnauthorized = require('../errors/error-unauthorized'); // 401
const ErrorNotFound = require('../errors/error-not-found'); // 404
const ErrorConflictHttp = require('../errors/error-conflict-http'); // 409
const { errorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    })
      .then((user) => {
        const newUser = user.toObject();
        delete newUser.password;
        res.send(newUser);
      })
      .then((user) => res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new ErrorBadRequest(errorMessage.badRequest);
        } if (err.code === 11000) {
          throw new ErrorConflictHttp(errorMessage.conflictHttpUser);
        }
        return next(err);
      }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new ErrorNotFound(errorMessage.notFoundUser);
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.badRequest));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token }).end();
    })
    .catch((err) => {
      throw new ErrorUnauthorized(err.message);
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new ErrorNotFound(errorMessage.notFoundUser);
    })
    .then((user) => res.send(user))
    .catch(next);
};
