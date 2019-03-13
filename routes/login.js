require('dotenv').config()
const router = require('express').Router(),
    passport = require('passport'),
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
    isNotFirstTime = (req, res, next) => {
        if (req.user.basicInfo) next()
        else res.redirect('/profile/details');
    }

router.get('/login', isNotLogged, (req, res) => {
    res.render('pre-login', {
        layout: false
    });
});

router.get('/login/start', isNotLogged, passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/auth/success', passport.authenticate('google'), (req, res) => {
    res.redirect('/user/profile')
})

router.get('/profile', isLogged, isNotFirstTime, (req, res) => {
    // TODO calculate amount
    req.user.amount = ((req.user.college === "College of engineering roorkee") ? 100 : ((req.user.accomodation) ? 600 : 500))
    res.render('profile', {
        user: req.user,
        title: `Manthan 2019 | ${req.user.username}'s Dashboard`,
        kuruNumber: [2, 3, 4, 5],
        roboNumber: [2, 3, 4, 5, 6, 7, 8],
        RZP_KEY: process.env.RZP_ID
    });
});

router.get('/logout', isLogged, (req, res) => {
    req.session = null;
    res.redirect('/');
})

module.exports = router