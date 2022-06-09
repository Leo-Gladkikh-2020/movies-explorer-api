const Movie = require('../models/movie');
const ErrorBadRequest = require('../errors/error-bad-request'); // 400
const ErrorNotFound = require('../errors/error-not-found'); // 404
const ErrorForbidden = require('../errors/error-forbidden'); // 403
const { errorMessage } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.badRequest));
      } else {
        next(err);
      }
    });
};

// module.exports.deleteMovie = (req, res, next) => {
//   Movie.findById(req.params.movieId)
//     .orFail(() => {
//       throw new ErrorNotFound(errorMessage.notFoundMovie);
//     })
//     .then((movie) => {
//       if (String(movie.owner) === String(req.user._id)) {
//         return movie.remove()
//           .then(() => res.status(200).send({ message: 'Фильм удален' }));
//       }
//       throw new ErrorForbidden(errorMessage.forbiddenMovie);
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new ErrorBadRequest(errorMessage.badRequestMovie));
//       } else {
//         next(err);
//       }
//     });
// };

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new ErrorNotFound(errorMessage.notFoundMovie);
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new ErrorForbidden(errorMessage.forbiddenMovie);
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Передан не валидный id пользователя'));
      } else {
        next(err);
      }
    });
};
