const exhibitRouter = require('express').Router();
const exhibitControllers = require('../controllers/exhibitControllers');



exhibitRouter.post('/', exhibitControllers.addExhibit);
exhibitRouter.get('/', exhibitControllers.getAllExhibits);
exhibitRouter.delete('/:uid', exhibitControllers.deleteExhibit);
exhibitRouter.get('/:uid', exhibitControllers.findOneExhibit);




module.exports = exhibitRouter;
