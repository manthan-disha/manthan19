require('dotenv').config()
require('./bin/passport')

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

mongoose.connect(process.env.MongoDBURI, () => console.log('db connected'))

app.use(cookieSession({
    maxAge: 2 * 24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

let hbs = exphbs.create({
    'extname': 'hbs',
    'defaultLayout': 'layout',
    'partialsDir': __dirname + '/views/partials/',
    helpers: {
        checkEvent: (event, array, opts) => {
            let ar = []
            ar.concat(array)
            return array.includes(event) ? opts.inverse(this) : opts.fn(this)
        }
    }
})

app.engine('hbs', hbs.engine)
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
app.use('/user', require('./routes/login'));
app.use('/buy', require('./routes/buy'));
app.use('/profile', require('./routes/profile'));


// Do not reposition 404 code
app.get('*', (req, res) => {
    res.render('error-404', {
        layout: false
    });
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});