require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/handler');
const { portNumber, dbAddress } = require('./utils/constants');
const router = require('./routes/index');

const { PORT = portNumber, MONGODB = dbAddress } = process.env;
mongoose.connect(MONGODB, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
