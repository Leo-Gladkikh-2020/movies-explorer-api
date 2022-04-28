const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/error-not-found');
const { errorMessage } = require('../utils/constants');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new ErrorNotFound(errorMessage.notFound));
});

module.exports = router;
