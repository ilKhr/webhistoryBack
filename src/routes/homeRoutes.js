const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Главная страница');
});
router.get('/about', (req, res) => {
    res.send('О сайте');
});

module.exports = router;
