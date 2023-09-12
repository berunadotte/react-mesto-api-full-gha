const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../middlewares/errors/notFoundError');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/', auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы по указанному адресу не существует.'));
});

module.exports = router;
