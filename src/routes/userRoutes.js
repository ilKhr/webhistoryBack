const userRouter = require('express').Router();
const userControllers = require('../controllers/users/userControllers');

// * TODO: Здесь храняться роуты по юзеру, мы просто добавили их в этот объект и теперь будем юзать именно его!(! * ? )

userRouter.use('/add/*', function(req, res) {
    res.send('error 404');
});

userRouter.use('/add', userControllers.addUser);
userRouter.use('/', userControllers.getUser);

module.exports = userRouter;
