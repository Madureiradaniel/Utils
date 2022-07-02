const UserDb = require("../model/UsersApi")
const cryptoRandomString = require('crypto-random-string');

exports.create = async (name) => {
    try {

        const user = await UserDb.findOne({ name })

        if (user) return { error: true, message: "User already exists!" }

        const newUser = new UserDb({
            name,
            secret_id: cryptoRandomString({ length: 32, type: 'url-safe' }),
            client_id: cryptoRandomString({ length: 10, type: 'base64' })
        })

        await newUser.save()

        return { error: false, user: newUser }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}


exports.update = async (data) => {
    try {
        await UserDb.updateMany({ _id: data._id }.data)
        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.findByNameOrId = async (nameId) => {
    try {

        const user = await UserDb.findOne({
            $or: [
                { _id: nameId }, { name: nameId }
            ]
        })

        return { error: false, user }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

//

exports.addUnauthorizedRoutes = async (idUser, route) => {
    try {
        const user = await UserDb.findById(idUser)

        var routes = [...user.unauthorizedRoutes, route]

        routes = new Set(routes)

        user.unauthorizedRoutes = [ ...routes ]

        await user.save()

        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.removeUnauthorizedRoutes = async (idUser, route) => {
    try {

        const user = await UserDb.findById(idUser)

        user.unauthorizedRoutes = user.unauthorizedRoutes.filter(row => route != row)

        await user.save()

        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.addAuthorizedIps = async (idUser, ip) => {
    try {
        const user = await UserDb.findById(idUser)

        var authorizedIps = [...user.authorizedIps, ip]

        authorizedIps = new Set(authorizedIps)

        user.authorizedIps = [ ...authorizedIps ]

        await user.save()

        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.removeAuthorizedIps = async (idUser, ip) => {
    try {

        const user = await UserDb.findById(idUser)

        user.authorizedIps = user.authorizedIps.filter(row => ip != row)

        await user.save()

        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}