const router = require('express').Router(),
    events = require('../bin/event-data')

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
    res.render('speakers-single',{
        events : events
    });
});

router.get('/developer', (req, res) => {

});

router.get('/contact-us', (req, res) => {
    res.render('contact');
});

module.exports = router