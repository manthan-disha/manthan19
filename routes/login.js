require('dotenv').config()
const router = require('express').Router(),
    passport = require('passport'),
    isNotLogged = (req, res, n) => {
        let session = req.session.isPopulated
        if (!session) n()
        else res.redirect('/user/profile') // to do change to profile
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
    res.render('profile', {
        user: req.user,
        title: `Manthan 2019 | ${req.user.username}'s Dashboard`,
        number : [2,3,4,5]
    });
});

router.get('/logout', isLogged, (req, res) => {
    req.session = null;
    res.redirect('/');
})

module.exports = router