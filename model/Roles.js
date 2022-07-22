const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

}, { timestamps: true })

const Roles = mongoose.model('Roles', ruleSchema)
module.exports = Roles