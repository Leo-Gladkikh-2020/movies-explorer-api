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

const validateEmail = Joi.string().required().email();
const validateString = Joi.string().required();
const validateInfo = Joi.string().required().min(2).max(30);

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validateString,
    name: validateInfo,
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validateString,
  }),
});

module.exports.validateUserById = celebrate({
  params: Joi.object().keys({
    userId: validateId,
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: validateInfo,
    email: validateEmail,
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: validateString,
    director: validateString,
    duration: validateString,
    year: validateString,
    description: validateString,
    image: validateLink,
    trailer: validateLink,
    thumbnail: validateLink,
    movieId: validateString,
    nameRU: validateString,
    nameEN: validateString,
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: validateId,
  }),
});
