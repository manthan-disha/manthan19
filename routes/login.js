require('dotenv').config()
const router = require('express').Router(),
    passport = require('passport'),
    checkAuth = (req, res, n) => {
        let session = req.session.isPopulated
        if (!session) n()
        else res.redirect('/') // to do change to profile
    }

router.get('/login', checkAuth, (req, res) => {
    res.render('pre-login', {
        layout: false
    });
});

router.get('/login/start', checkAuth, passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/auth/success', passport.authenticate('google'), (req, res) => {
    res.redirect('/')
})

router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
})

module.exports = router