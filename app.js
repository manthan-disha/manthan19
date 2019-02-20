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
    bodyParser = require('body-parser')
// ,InstaMojo = require('instamojo-nodejs');

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    'defaultLayout' : 'layout'
}))
app.set('view engine', 'handlebars')


app.use('/',require('./routes/basic_routes'));

// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'public/home-3.html'))
// });

// Do not reposition 404 code
app.get('*', (req, res) => {
    res.render('error-404');
});
app.listen(PORT, () => {
    console.log(`Server started on port`);
});