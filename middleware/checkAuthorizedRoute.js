// verifica se o usuario possui autorização para acessar a rota.
// caso haja verificacao de ip verifica se o ipCadastrado é o de acesso.
const Jwt = require("../Service/Jwt")
const UserApiDb = require("../model/UsersApi")

const authRoute = async (req, res, next, isCheckIp=false) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')

        // faz o decode do token
        const result = await Jwt.verify(token)

        // busca usuario
        const user = await UserApiDb.findById(result.decoded._id).populate('unauthorizedRoutes')

        if (!user) throw new Error("Usuário não encontrado!")

        // se houver rotas bloqueadas verifica se é a que o usuário está solicitando
        if (user.unauthorizedRoutes.length > 0) {
            for (let route of user.unauthorizedRoutes) {

                if (
                    (route.path === req.path || route.path + '/' === req.path || route.path === req.path + '/' || route.path + '/' === req.path + '/')
                    &&
                    req.method.toLowerCase() == route.method.toLowerCase()) {
                    return res.status(401).send({ error: true, message: 'unauthorized!' })
                }
            }
        }

        if (isCheckIp) {
            var ip = req.headers['x-forwarded-for']
            if (!user.authorizedIps.includes(ip)) {
                throw new Error("IP não autorizado!")
            }
        }

        //recebendo atributos personalizados
        req.atributos = {}
        
        user.atributos_personalizados.forEach(row => req.atributos[row.name] = row.value)

        req.user = user

        next()

    } catch (e) {
        console.log(e)
        res.status(401).send({ error: true, message: "Please Authenticate!" })
    }
}

module.exports = authRoute