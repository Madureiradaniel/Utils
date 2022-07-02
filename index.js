const Authentication = require("./Service/Authentication")
const Rule = require("./Service/Rules")
const db = require("./db/mongoose")
const Jwt = require("./Service/Jwt")
const User = require("./Service/UserApi")
const Logs = require("./Service/LogsRequest")
const Routes = require("./Service/Routes")
const { Aes } = require("./Service/Aes")
const checkAuthorizedRoute = require("./middleware/checkAuthorizedRoute")


module.exports = {
    Authentication,
    Rule,
    db,
    Jwt,
    User,
    Aes,
    Logs,
    Routes,
    Middleware : {
        checkAuthorizedRoute
    }
}