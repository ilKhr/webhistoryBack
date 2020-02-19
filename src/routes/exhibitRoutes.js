const exhibitRouter = require('express').Router();
const exhibitControllers = require('../controllers/exhibitControllers');
console.log('exhibitControllers: ', exhibitControllers);



exhibitRouter.post('/', exhibitControllers.addExhibit);
exhibitRouter.delete('/:uid', exhibitControllers.deleteExhibit);



module.exports = exhibitRouter;
