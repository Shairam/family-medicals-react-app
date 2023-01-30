const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    token: {
         type: String 
    }
},{timestamps: true, collection: 'Users'})

module.exports = mongoose.model('UserData', userSchema)