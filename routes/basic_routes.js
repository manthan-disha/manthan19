const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home-3');
});

router.get('/about-us', (req, res) => {
    res.render('about');
});

router.get('/team', (req, res) => {
    res.render('speakers');
});

router.get('/events', (req, res) => {
    res.render('speakers-single');
});

router.get('/developer', (req, res) => {

});

router.get('/contact-us', (req, res) => {
    res.render('contact');
});

module.exports = router