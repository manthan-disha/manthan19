const router = require('express').Router(),
    events = require('../bin/event-data')

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about-us', (req, res) => {
    res.render('about');
});

router.get('/team', (req, res) => {
    res.render('team');
});

router.get('/events', (req, res) => {
    res.render('events', {
        events: events
    });
});

router.get('/developer', (req, res) => {
    res.send('Not available yet, check back soon');
});

router.get('/contact-us', (req, res) => {
    res.render('contact');
});

router.post('/contact-submit', (req, res) => {
    if(req.body){
        console.log(req.body)
        res.send(`success`);
    }
    else{
        console.log(`error in data recieved`)
        res.send(`error`);
    }
})

module.exports = router