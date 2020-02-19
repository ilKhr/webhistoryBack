const userRouter = require('./userRoutes');
const homeRouter = require('./homeRoutes');
const exhibitRouter = require('./exhibitRoutes');

module.exports = function Routes(app) {
    app.use('/users', userRouter);
    app.use('/exhibits', exhibitRouter);
    app.use('/', homeRouter);
    app.use('*', function(req, res) {
        res.send('error 404');
    });
};
