const jwt = require('jsonwebtoken')
const Config = require("../model/Config")


exports.saveSecret = async (secret) => {
    try {
        var config = await Config.findOne({})

        if (config) {
            config.jwtSecret = secret
        } else {
            config = new Config({ jwtSecret: secret })
        }

        await config.save()
        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.create = async (data, expiresIn) => {
    try {
        var options = {}
        const config = await Config.findOne({})
        if (expiresIn) options.expiresIn = expiresIn
        const token = jwt.sign(data, config.jwtSecret, options)
        return { error: false, token }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.verify = async (token) => {
    try {

        const config = await Config.findOne({})

        const decoded = jwt.verify(token, config.jwtSecret)

        // check expireIn
        var now = new Date()

        if (now.getTime() >= decoded.exp * 1000) return { error: true, message: "token expired!" }

        return {
            error: false,
            decoded,
            createAt: decoded.iat ? new Date(decoded.iat * 1000) : false,
            expireIn: decoded.exp ? new Date(decoded.exp * 1000) : false
        }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
} 