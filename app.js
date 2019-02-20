require('dotenv').config()
// require('./bin/passport')

const express = require('express'),
    app = express(),
    path = require('path'),
    PORT = process.env.PORT || 3000,
    exphbs = require('express-handlebars'),
    cookieSession = require('cookie-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    minifyHTML = require('express-minify-html')
// ,InstaMojo = require('instamojo-nodejs');

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('hbs', exphbs({
    'extname' : 'hbs',
    'defaultLayout': 'layout',
    'partialsDir' : __dirname + '/views/partials/'
}))
app.set('view engine', 'hbs')

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));


app.use('/', require('./routes/basic_routes'));
app.use('/buy', require('./routes/buy'));


// Do not reposition 404 code
app.get('*', (req, res) => {
    res.render('error-404');
});
app.listen(PORT, () => {
    console.log(`Server started on port`);
});