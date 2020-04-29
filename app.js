const express = require('express');
const Routes = require('./src/routes/Routes');
const bodyParser = require('body-parser');
const sequelize = require('./database')
const port = (process.env.PORT || 3000)
const app = express();

app.set('root', __dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + 'public'));

app.use(function (req, res, next) {
    console.log(`${new Date()}: [${req.method}] ${req.url}`);
    next();
});

app.use('/', Routes.homeRouter);
app.use('/exhibits', Routes.exhibitRouter);

app.use(function (err, req, res, next) {
    console.log(err)

    if (err) {
        res.json({
            ok: "Undefined error",
            err,
            message: "3"
        });
    }
});
app.listen(port);

module.exports = app;
