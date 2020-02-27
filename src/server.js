//подключем express
const express = require('express');
require('dotenv').config();
const { database, models } = require('./database');
const Routes = require('./routes/Routes');
const bodyParser = require('body-parser');
/* const userRouter = require('./routes/userRoutes');
const homeRouter = require('./routes/homeRoutes');
const exhibitRouter = require('./routes/exhibitRoutes'); */

const app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
    console.log(`${new Date()}: [${req.method}] ${req.url}`);
    next();
});

Routes(app);
/* app.use('/users', userRouter);
app.use('/exhibits', exhibitRouter);
app.use('/', homeRouter); */

/* const users = models.User.findAll().then(users => {
        console.log(users.every(user => user instanceof models.User)); // true
        console.log('All users:', JSON.stringify(users, null, 2));
    });*/

app.listen(3000);

module.exports = app;
