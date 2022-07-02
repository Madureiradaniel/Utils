const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    roles: [String]

}, { timestamps: true })

const Rules = mongoose.model('Rules', ruleSchema)
module.exports = Rules