const router = require('express').Router(),
    events = require('../bin/event-data'),
    fs = require('fs'),
    _ = require('lodash'),
    isNotFirstTime = (req, res, next) => {
        if (req.user.basicInfo) next()
        else res.redirect('/profile/details');
    }
var sponserlist = fs.readdirSync(`./public/assets/img/sponsors/`)

sponserlist = sponserlist.map(e => {
    return e.split('.')[0]
})
sponserlist = (sponserlist.sort((a, b) => a - b)).map((e, i) => (i % 4 === 0) ? sponserlist.slice(i, i + 4) : null).filter((e) => e)


router.get('/', (req, res) => {
    res.render('home', {
        sponsers: sponserlist,
        user: req.user,
        title: `Manthan 2019 | Home`
    });
});



router.get('/ticket', (req, res) => {
    var pdf = require('dynamic-html-pdf');
    var html = fs.readFileSync('./views/partials/ticket-pdf.html', 'utf8');

    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm"
    };
    var document = {
        type: 'file',
        template: html,
        context: {
            user: req.user
        },
        path: "./output.pdf"
    };
    pdf.create(document, options).then(out => {
        console.log(out)
    })
        .catch(error => {
            console.log(error)
        })
})

router.get('/about-us',isNotFirstTime, (req, res) => {
    res.render('about', {
        sponsers: sponserlist,
        user: req.user,
        title: `Manthan 2019 | About Us`
    });
});

router.get('/team',isNotFirstTime, (req, res) => {
    res.render('team', {
        user: req.user,
        title: `Manthan 2019 | Team`
    });
});

router.get('/events',isNotFirstTime, (req, res) => {
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
    res.render('contact', {
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