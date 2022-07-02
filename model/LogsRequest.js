const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const logRequestSchema = new mongoose.Schema({

    baseUrl: { index: true, type: String },

    path: { index: true, type: String },

    method: String,

    statusCodeResponse: Number,

    ipRequest: String,

    idUser: { type: String, ref: 'UserApi',  required : true }

}, { timestamps: true })

logRequestSchema.plugin(mongoosePaginate);

const Logs = mongoose.model('RequestLog', logRequestSchema)
module.exports = Logs