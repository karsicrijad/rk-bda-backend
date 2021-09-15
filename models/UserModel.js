const { Schema, model } = require('mongoose');
const { DATABASE_MODEL_NAMES } = require('../constants');

module.exports = model(DATABASE_MODEL_NAMES.USER, new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    surname: {
        type: String,
        trim: true,
        required: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    bloodType: {
        type: String,
        trim: true,
    },
    roleID: {
        type: String,
        required: true,
        ref: DATABASE_MODEL_NAMES.ROLE,
    }
}));