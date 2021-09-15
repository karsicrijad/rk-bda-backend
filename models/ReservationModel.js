const { Schema, model } = require('mongoose');
const { DATABASE_MODEL_NAMES } = require('../constants');

module.exports = model(DATABASE_MODEL_NAMES.RESERVATION, new Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    hour: {
        type: Number,
        required: true,
    },
    userID: {
        type: String,
        required: true,
        ref: DATABASE_MODEL_NAMES.USER,
    },
}));