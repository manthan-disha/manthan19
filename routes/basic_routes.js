const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home-3');
});

router.get('/about-us', (req, res) => {
    
});

router.get('/team', (req, res) => {

});

router.get('/events', (req, res) => {

});

module.exports = router