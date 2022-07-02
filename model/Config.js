const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({

    jwtSecret: String

}, { timestamps: true })

const Config = mongoose.model('Config', configSchema)
module.exports = Config