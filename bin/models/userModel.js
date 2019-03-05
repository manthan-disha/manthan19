const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    shortid = require('shortid')
    mongoose.plugin(require('mongoose-nanoid'),5)


let UserSchema = new Schema({
    username: String,
    googleID: String,
    profileImage: String,
    basicInfo: Boolean,
    college: String,
    city: String,
    branch: String,
    year: String,
    mobile: String,
    email: String,
    accomodation: Boolean,
    events: [String],
    payment: Boolean,
    paymentId: String,
    paymentReq: String,
    kuruInfo: {
        registered: Boolean,
        teamLeader: String,
        teamName: String,
        game: String,
        members: [{
            name: String,
            mobile: String
        }]
    },
    qr: String
})

const user = module.exports = mongoose.model('user', UserSchema)