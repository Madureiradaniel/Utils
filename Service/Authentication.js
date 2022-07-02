const bcrypt = require("bcrypt")

const saltRounds = 12;

exports.generateHash = async (password) => {
    var encripted = await bcrypt.hash(password, saltRounds)
    return encripted
}

exports.checkHash = async (password, encriptedPassword) => {
    var isCheck;
    
    try{
        isCheck = await bcrypt.compare(password, encriptedPassword)
    }catch(e){
        console.log(e)
        isCheck = false
    }
    return isCheck
}