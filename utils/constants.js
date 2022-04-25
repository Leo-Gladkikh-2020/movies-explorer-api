const portNumber = 3000;
const dbAddress = 'mongodb://localhost:27017/moviesdb';
const isUrl = /^https?:\/\/(www.)?[-\w]+\.[-\w/]*/gim.test;
// проверено с помощью сервиса https://regex101.com/

const errorMessage = {
  badRequest: 'Переданы некорректные данные',
  badRequestMovie: 'Передан некорректный id фильма',
  unauthorized: 'Необходима авторизация',
  unauthorizedEmailPassword: 'Неправильные почта или пароль',
  forbiddenMovie: 'Нет прав на удаление фильма',
  notFound: 'Страница не найдена',
  notFoundUser: 'Пользователь с таким id не найден',
  notFoundMovie: 'Фильм с таким id не найден',
  conflictHttpUser: 'Пользователь с таким email уже существует',
  wrongLink: 'Неверный формат ссылки',
  wrongId: 'Неверный формат ссылки',
  serverError: 'На сервере произошла ошибка',
};

const validateMessage = {
  wrongUrlImage: 'Неверный URL адрес для постера к фильму',
  wrongUrlTrailerLink: 'Неверный URL адрес для трейлера к фильму',
  wrongUrlThumbnail: 'Неверный URL адрес для миниатюрного изображения постера к фильму',
  wrongEmail: 'Неверный email',
  wrongName: 'Неверный формат поля "name" (диапазон от 2 до 30)',
};

const requiredMessage = {
  country: 'Поле "country" (страна создания фильма) является обязательным',
  director: 'Поле "director" (режиссёр фильма) является обязательным',
  duration: 'Поле "duration" (длительность фильма) является обязательным',
  year: 'Поле "year" (год выпуска фильма) является обязательным',
  description: 'Поле "description" (описание фильма) является обязательным',
  image: 'Поле "image" (ссылка на постер к фильму) является обязательным',
  trailerLink: 'Поле "trailerLink" (ссылка на трейлер фильма) является обязательным',
  thumbnail: 'Поле "thumbnail" (миниатюрное изображение постера к фильму) является обязательным',
  owner: 'Поле "owner" (_id пользователя, который сохранил фильм) является обязательным',
  movieId: 'Поле "movieId" (id фильма, который содержится в ответе сервиса MoviesExplorer) является обязательным',
  nameRU: 'Поле "nameRU" (название фильма на русском языке) является обязательным',
  nameEN: 'Поле "nameEN" (название фильма на английском языке) является обязательным',
  email: 'Поле "email" (электронная почта) является обязательным',
  password: 'Поле "password" (пароль) является обязательным',
  name: 'Поле "name" (имя пользователя) является обязательным',
};

module.exports = {
  portNumber,
  dbAddress,
  isUrl,
  errorMessage,
  validateMessage,
  requiredMessage,
};
