require('dotenv').config()
const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20'),
    User = require('./models/userModel')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GoogleClientID,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: "/user/auth/success"
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({
            googleID: profile.id
        }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser)
            } else {
                let photos = profile.photos[0],
                    image = photos.value,
                    mail = profile.emails[0],
                    email = mail.value
                new User({
                    username: profile.displayName,
                    googleID: profile.id,
                    profileImage: image.replace('s50', 's500'),
                    basicInfo: false,
                    paymentStatus: false,
                    email: email,
                    kuruInfo: {
                        registered : false,
                        info : false
                    },
                    RoboInfo :{
                        registered : false,
                        info : false
                    }
                }).save().then((newUser) => {
                    done(null, newUser)
                })
            }
        })


    })
)