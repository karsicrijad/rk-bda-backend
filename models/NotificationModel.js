const { Schema, model } = require('mongoose');
const { DATABASE_MODEL_NAMES } = require('../constants');

module.exports = model(DATABASE_MODEL_NAMES.NOTIFICATION, new Schema({
    text: {
        type: String,
        trim: true,
        required: true,
    },
    isRead: {
        type: Boolean,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        ref: DATABASE_MODEL_NAMES.USER,
    },
}));