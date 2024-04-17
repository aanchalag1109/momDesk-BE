const mongoose = require('mongoose');
const { userRoles } = require('../config/enums');
const Schema = mongoose.Schema;

// MAIN SCHEMA----------------------------------******************
let userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})
module.exports = mongoose.model('user', userSchema);