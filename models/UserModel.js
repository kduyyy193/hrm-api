const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    id: {type: String},
    name: {type: String, require: true},
    sex: {type: String, require: true},
    address: {type: String, require: true},
    date: {type: String, require: true},
    dateJoined: {type: String, require: true},
    salary: {type: String, require: true},
    group: {type: String, require: true},
    description: {type: String, require: true},
    hobby: {type: String, require: true},
})

module.exports = mongoose.model('user', UserSchema)