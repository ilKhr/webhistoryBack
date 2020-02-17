const userRouter = require('express').Router();
const userControllers = require('../controllers/userControllers');

// * TODO: Здесь храняться роуты по юзеру, мы просто добавили их в этот объект и теперь будем юзать именно его!(! * ? )

// const userRouter = express.Router();

userRouter.use('/add', userControllers.addUser);
userRouter.use('/', userControllers.getUser);

module.exports = userRouter;
