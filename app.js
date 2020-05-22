const express = require('express');
require('dotenv').config();
const cors = require('cors')
const path = require('path')

const Routes = require('./src/routes/Routes');
const bodyParser = require('body-parser');

const port = (process.env.PORT || 3000)
const app = express();

if (process.env.NODE_ENV)
app.set('photos', path.join(__dirname, ".." + '/museumStatic/exhibits'))
else
app.set('photos',__dirname + '/public/images')

app.set('root', __dirname);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log(`${new Date()}: [${req.method}] ${req.url}`);
    next();
});

app.use('/', Routes.homeRouter);
app.use('/v1/exhibits', Routes.exhibitRouter);

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
