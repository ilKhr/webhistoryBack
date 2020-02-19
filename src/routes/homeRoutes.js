const homeRouter = require('express').Router();
const homeControllers = require('../controllers/home/homeControllers');

homeRouter.get('/about', homeControllers.about);
homeRouter.get('/', homeControllers.index);

module.exports = homeRouter;
