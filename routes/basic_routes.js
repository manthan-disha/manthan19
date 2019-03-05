const router = require('express').Router(),
    events = require('../bin/event-data'),
    fs = require('fs');
let sponserlist = fs.readdirSync(`./public/assets/img/sponsers/`)
sponserlist = sponserlist.map((e, i) => (i % 4 === 0) ? sponserlist.slice(i, i + 4) : null).filter((e) => e)



router.get('/', (req, res) => {
    res.render('home', {
        sponsers: sponserlist,
        user: req.user,
        title : `Manthan 2019 | Home`
    });
});

router.get('/about-us', (req, res) => {
    res.render('about', {
        sponsers: sponserlist,
        user: req.user,
        title : `Manthan 2019 | About Us`
    });
});

router.get('/team', (req, res) => {
    res.render('team',{
        user: req.user,
        title: `Manthan 2019 | Team`
    });
});

router.get('/events', (req, res) => {
    res.render('events', {
        events: events,
        user: req.user,
        title: `Manthan 2019 | Events`
    });
});

router.get('/developer', (req, res) => {
    res.send('Not available yet, check back soon');
});

router.get('/contact-us', (req, res) => {
    res.render('contact',{
        user: req.user,
        title: `Manthan 2019 | Contact Us`
    });
});

router.post('/contact-submit', (req, res) => {
    if (req.body) {
        console.log(req.body)
        res.send(`success`);
    } else {
        console.log(`error in data recieved`)
        res.send(`error`);
    }
})


module.exports = router