require('dotenv').config()
const router = require('express').Router(),
    User = require('../bin/models/userModel'),
    isNotLogged = (req, res, n) => {
        let session = req.session.isPopulated
        if (!session) n()
        else res.redirect('/user/profile')
    },
    isLogged = (req, res, next) => {
        let session = req.session.isPopulated
        if (session) next()
        else res.redirect('/user/login')
    },
    isFirstTime = (req, res, next) => {
        if (!req.user.basicInfo) next()
        else res.redirect('/user/profile');
    }

router.post('/edit', (req, res) => {

});

router.post('/register/event', (req, res) => {
    console.log(req.body)
    if (req.body) {
        let eventid = req.body.eventid
        if (eventid === 'Kurukshetra') {
            var data = {
                'kuruInfo.registered': true,
                $push: {
                    events: req.body.eventid
                }
            }
        } else {
            var data = {
                $push: {
                    events: req.body.eventid
                }
            }
        }
        User.findOneAndUpdate({
            'username': req.user.username
        }, data, (err, doc) => {
            // console.log(doc)
            if (err) return res.send('error')
            res.send('success');
        })
    } else {
        res.send('error');
    }
});

router.get('/details', isFirstTime, (req, res) => {
    res.render('details', {
        user: req.user,
        title: `Manthan 2019`
    });
});

router.post('/details', isFirstTime, (r, s) => {
    if (!r.body) return s.send('Invalid request')
    let newData = {
        basicInfo: true,
        college: r.body.othername ? r.body.othername : r.body.college,
        city: r.body.city,
        branch: r.body.branch,
        year: r.body.year,
        mobile: r.body.mobile,
        accomodation: (r.body.accomodation) ? true : false,
    }

    User.findOneAndUpdate({
        'username': r.user.username
    }, newData, (err, doc) => {
        if (err) return s.send('error occured')
        return s.redirect('/user/profile')
    })
});

router.get('/kurukshetra/team', (req, res) => {

});


module.exports = router