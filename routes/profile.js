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
    },
    CheckKuru = (r, s, n) => {
        if (r.user.kuruInfo.registered) n()
        else res.send('not allowed')
    }

router.post('/edit', (req, res) => {

});

router.post('/get-in-touch', (req, res) => {

});

router.post('/register/event', isLogged, (req, res) => {
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
        } else if (eventid === 'Robosync') {
            var data = {
                'RoboInfo.registered': true,
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

router.post('/details', isLogged, (r, s) => {
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
        console.log(`details updated`)
        s.redirect('/user/profile')
    })
});

router.post('/kurukshetra/team', isLogged, (req, res) => {
    if (req.body) {
        let membersArray = [];
        req.body.memname.forEach((element, index) => {
            if (element) {
                membersArray.push({
                    "name": element,
                    "mobile": req.body.mob[index]
                })
            }
        });

        let newData = {
            kuruInfo: {
                registered: true,
                info: true,
                teamLeader: req.user.username,
                teamName: req.body.teamname,
                game: req.body.game,
                members: membersArray
            }
        }
        User.findOneAndUpdate({
            username: req.user.username
        }, newData, (err, doc) => {
            if (err) return s.send('error occured')
            console.log(doc)
            // require("../teamMailer").sendTeamMail(newData, (err) => {
            //     console.log("mail sent to shuhul");
            // })
            res.send('success')
        })
    } else {
        res.send('error')
    }
});

router.post('/robosync/team', isLogged, (req, res) => {
    if (req.body) {
        let membersArray = [];
        req.body.memname.forEach((element, index) => {
            if (element) {
                membersArray.push({
                    "name": element,
                    "mobile": req.body.mob[index]
                })
            }
        });

        let newData = {
            RoboInfo: {
                registered: true,
                info: true,
                teamLeader: req.user.username,
                teamName: req.body.teamname,
                events: req.body.events,
                members: membersArray
            }
        }
        User.findOneAndUpdate({
            username: req.user.username
        }, newData, (err, doc) => {
            if (err) return s.send('error occured')
            console.log(doc)
            // require("../teamMailer").sendTeamMail(newData, (err) => {
            //     console.log("mail sent to shuhul");
            // })
            res.send('success')
        })
    } else {
        res.send('error')
    }
});


module.exports = router