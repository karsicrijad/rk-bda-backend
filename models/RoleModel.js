const { Schema, model } = require('mongoose');
const { DATABASE_MODEL_NAMES } = require('../constants');

module.exports = model(DATABASE_MODEL_NAMES.ROLE, new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    permissions: {
        type: Array,
        required: true,
    }
}));