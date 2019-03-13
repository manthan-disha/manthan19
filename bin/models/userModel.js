const mongoose = require('mongoose'),
    Schema = mongoose.Schema
mongoose.plugin(require('mongoose-nanoid'), 5)


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
    paymentStatus: Boolean,
    payment: Object,
    kuruInfo: {
        registered: Boolean,
        info: Boolean,
        teamLeader: String,
        teamName: String,
        game: String,
        members: [{
            name: String,
            mobile: String
        }]
    },
    RoboInfo: {
        registered: Boolean,
        info: Boolean,
        teamLeader: String,
        teamName: String,
        events: [String],
        members: [{
            name: String,
            mobile: String
        }]
    },
    qr: String
})

const user = module.exports = mongoose.model('user', UserSchema)