const Jwt = require("../Service/Jwt")

const Auth = async (req, res, next, header) => {
    try {
        // verifica se o token é válido
        const token = req.header(header).replace('Bearer ', '')

        // faz o decode do token
        const result = await Jwt.verify(token)

        res.decoded = result.decoded

        next()

    } catch (e) {
        console.log(e)
        res.status(401).send({ error: true, message: "Please Authenticate!" })
    }

}

module.exports = Auth;