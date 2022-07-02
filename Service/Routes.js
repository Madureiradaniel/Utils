const RoutesDb = require("../model/Routes")

exports.createRoute = async (route) => {
    try {
        const newRoute = new RoutesDb(route)
        await newRoute.save()
        return { error: false, route: newRoute }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.deleteRoute = async (idRoute) => {
    try {
        await RoutesDb.deleteOne({ _id: idRoute })
        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.updateRoute = async (route) => {
    try {
        await RoutesDb.updateOne({ _id: route._id }, route)
        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.list = async () => {
    try{
        const routes = await RoutesDb.find({})
        return { error : false, routes }
    }catch(e){
        console.log(e)
        return { error : true }
    }
}