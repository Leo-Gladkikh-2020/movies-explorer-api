const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateId = Joi.string().required().custom((value, helpers) => {
  if (ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message('Неверный id фильма');
});

const validateLink = Joi.string().required().custom((value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Неверный формат ссылки');
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: validateId,
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: validateLink,
    trailerLink: validateLink,
    thumbnail: validateLink,
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: validateId,
  }),
});
