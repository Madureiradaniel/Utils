const authSuperAdmin = (req, res, next, tokenSuperAdmin) => {

    try{
    const token = req.header('Authorization').replace('Bearer ', '')

    if(tokenSuperAdmin === token){
        console.log('é super admin')
        next()
    }else{
        res.status(401).send({ error: true, message : `unauthorized!`})
    }
}catch(e){
    console.log(e)
    res.status(401).send({ error : true , message : 'unauthorized!'})
}

}


module.exports = authSuperAdmin