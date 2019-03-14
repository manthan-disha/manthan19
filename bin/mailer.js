require('dotenv').config()
const nodemailer = require('nodemailer2'),
    hbs = require('nodemailer-express-handlebars'),
    inlineBase64 = require('nodemailer-plugin-inline-base64'),
    path = require('path')

module.exports.sendMail = (user, callback) => {
    let auth = {
        user: process.env.UserEmail,
        pass: process.env.UserPassword
    }
    console.log(auth)
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth
    })
    let mailOptions = {
        from: '"Manthan 2019" ' + auth.user,
        to: user.email,
        subject: 'Manthan 2019 ticket',
        template: 'conf-mail',
        context: {
            user: user,
            accomodation: user.accomodation ? "Yes" : "No"
        }
    }
    let options = {
        viewEngine: {
            extname: 'handlebars',
            partialsDir : '/views/mail',
            layoutsDir: './views/mail'
        },
        viewPath: './views/mail'
    }
    transporter.use('compile', hbs(options))
    transporter.use('compile', inlineBase64())
    transporter
        .sendMail(mailOptions, (err, info) => {
            if (err) return console.log(err)
            console.log('mail sent to ' + user.email, info.messageId, info.response)
            console.log(info)
            callback(err)
        })
}