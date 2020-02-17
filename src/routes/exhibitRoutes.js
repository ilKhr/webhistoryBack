const exhibitRouter = require('express').Router();
const exhibitController = require('../controllers/exhibitController');

exhibitRouter.post('/', exhibitController.addExhibit);

module.exports = exhibitRouter;
