const Authentication = require("./Service/Authentication")
const Role = require("./Service/Roles")
const db = require("./db/mongoose")
const Jwt = require("./Service/Jwt")
const User = require("./Service/UserApi")
const Logs = require("./Service/LogsRequest")
const Routes = require("./Service/Routes")
const { Aes } = require("./Service/Aes")
const checkAuthorizedRoute = require("./middleware/checkAuthorizedRoute")
const checkIsSuperAdmin = require("./middleware/checkIsSuperAdmin")
const checkIsAuthenticate = require("./middleware/checkIsAuthenticate")


module.exports = {
    Authentication,
    Role,
    db,
    Jwt,
    User,
    Aes,
    Logs,
    Routes,
    Middleware : {
        checkAuthorizedRoute,
        checkIsSuperAdmin,
        checkIsAuthenticate
    }
}