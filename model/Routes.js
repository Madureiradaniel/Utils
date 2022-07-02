const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    path: { index: true, type: String },

    method: String,

    roles: [String] // nome deve ser igual ao que foi criado em rules

}, { timestamps: true })

const Routes = mongoose.model('Routes', routeSchema)
module.exports = Routes