const exhibitRouter = require('express').Router();
const exhibitControllers = require('../controllers/exhibitControllers');



exhibitRouter.post('/', exhibitControllers.addExhibit);
exhibitRouter.delete('/:uid', exhibitControllers.deleteExhibit);
exhibitRouter.get('/:uid', exhibitControllers.readExhibit);




module.exports = exhibitRouter;
