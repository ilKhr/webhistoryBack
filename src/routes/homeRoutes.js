const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.send('Главная страница');
});
router.get('/about', (req, res) => {
    res.send('О сайте');
});

router.get('/adds', (req, res) =>{
    
    res.render(__dirname + '/hbsFiles/shmindex.hbs');
});
router.get('/addhui', (req, res) =>{
    res.render(path.resolve('src/hbsFiles') + '/forest.hbs');
});
router.get('/addhuiStyles', (req, res) =>{
    console.log('-----------' + path.resolve('src/styles') + '---------')
    res.sendFile(path.resolve('src/styles') + '/forest.css');
});


module.exports = router;
