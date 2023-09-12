require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils/constants');

const { PORT = 3000, DB_CONN = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(cors());

mongoose.connect(DB_CONN);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => { throw new Error('Сервер сейчас упадёт'); }, 0);
});

app.use('/', require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Произошла ошибка на сервере.' });
  }
  next();
});

app.listen(PORT, () => {
  console.log(PORT);
});
