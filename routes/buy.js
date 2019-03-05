const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('pricing', {
        user: req.user
    });
});

module.exports = router