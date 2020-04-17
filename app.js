const express = require('express');
require('dotenv').config();
const Routes = require('./src/routes/Routes');
const bodyParser = require('body-parser');


const app = express();

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
            ok: "NyAM",
            err,
            message: "3"
        });
    }
});
app.listen(3000);

module.exports = app;
