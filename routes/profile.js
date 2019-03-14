require('dotenv').config()
const router = require('express').Router(),
    InstaMojo = require('instamojo-nodejs'),
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
    },
    PaymentComplete = (r, s, n) => {
        if (r.user.paymentStatus) s.redirect('/user/profile')
        else n()
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

router.get('/payment', isLogged, PaymentComplete, (req, res) => {
    let amount = ((req.user.college === "College of engineering roorkee") ? 100 : ((req.user.accomodation) ? 600 : 500))
    res.render('pricing', {
        user: req.user,
        amount: amount,
        title: 'Manthan 2019 | pay now'
    });
});

router.get('/pay', isLogged, PaymentComplete, (req, res) => {
    let data = new InstaMojo.PaymentData()
    data.purpose = "Manthan 19 Ticket"
    data.currency = "INR"
    data.buyer_name = req.user.username
    data.email = req.user.email
    data.phone = req.user.mobile
    data.allow_repeated_payment = 'False'
    let amount = ((req.user.college === "College of engineering roorkee") ? 100 : ((req.user.accomodation) ? 600 : 500))
    data.amount = amount
    data.redirect_url = `http://${req.get('host')}/profile/payment/success`

    InstaMojo.createPayment(data, (err, resp) => {
        if (err) return res.send(err)
        let response = JSON.parse(resp)
        console.log(response)
        res.redirect(response.payment_request.longurl)
    })
});

router.get('/payment/success', isLogged, PaymentComplete, (req, res) => {
    let qpm = req.query;
    if (qpm.payment_status != "Failed") {
        let newData = {
            paymentStatus: true,
            payment: qpm
        }
        User.findOneAndUpdate({
            username: req.user.username
        }, newData, (err, doc) => {
            if (err) return s.send('<h1>Error completing payment,<br>please contact me@mrinalraj.com</h1>')
            // mailer
             res.redirect('/user/profile');
        })
    } else return res.send(
        '<title>Bad request </title>' +
        '<h1>403<br>invalid request</h1>'
    )
});


module.exports = router

// payment_id=MOJO9314005A17839805
// payment_status=Credit
// payment_request_id=721c4a9c89604ac99494c589a92c5173