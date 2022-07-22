const RoleDb = require("../model/Roles")


exports.create = async (name) => {
    try {
        var role = await RoleDb.findOne({ name })
        if (role) return { error: true, message: 'role already exists!' }
        var newRole = new RoleDb({ name })
        await newRole.save()
        return { error: false, role: newRole }
    } catch (e) {
        console.log(e)
        return { error: true, e }
    }
}

exports.list = async () => {
    try {
        const roles = await RoleDb.find()
        return { error: false, roles }
    } catch (e) {
        console.log(e)
        return { error: true, e }
    }
}


exports.getByName = async (name) => {
    try {
        var result = await RoleDb.find({ name })
        return { error: false, roles: result }
    } catch (e) {
        console.log(e)
        return { error: true, e }
    }
}

exports.getById = async (id) => {
    try {
        const role = await RoleDb.findById(id)
        return { error: false, role }
    } catch (e) {
        console.log(e)
        return { error: false, e }
    }
}

exports.delete = async (id) =>{
    try{
        await RoleDb.deleteMany({ _id : id })
        return { error : false, message : 'deleted!'}
    }catch(e){
        console.log(e)
        return { error : true, e}
    }
}