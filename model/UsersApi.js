const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    client_id: { type: String, required: true },

    secret_id: { type: String, required: true },

    isCheckIp: { type: Boolean, default: false },

    authorizedIps: [String],

    unauthorizedRoutes: [{ type: String, ref: 'Routes' }],

    atributos_personalizados: [{
        name: String,
        value: String
    }]

}, { timestamps: true })

const User = mongoose.model('UserApi', userSchema)
module.exports = User