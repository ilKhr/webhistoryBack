const router = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req, res) => {
    res.send('Главная страница');
});
router.get('/about', (req, res) => {
    res.send('О сайте');
}); 

router.get('/addExhibit', (req, res) =>{
    res.render(path.resolve('src/hbsFiles') + '/forest.hbs');
});
router.get('/exhibitsStyles', (req, res) =>{
    res.sendFile(path.resolve('src/styles') + '/forest.css');
});

module.exports = router;
