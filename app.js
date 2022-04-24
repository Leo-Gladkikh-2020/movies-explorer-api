require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/handler');
const limiter = require('./middlewares/rateLimit');
const { portNumber, dbAddress } = require('./utils/constants');

const { PORT = portNumber, MONGODB = dbAddress } = process.env;
mongoose.connect(MONGODB, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use(router);

// удалить после финального ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
