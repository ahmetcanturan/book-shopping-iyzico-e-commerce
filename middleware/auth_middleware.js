//? Global bir middleware oluşturduk kullanıcı login olmamışsa headerslerine token atıcak
const helpers = require("../utils/index")
const { StatusCodes } = require("http-status-codes")
const consts = require("../consts/index")
module.exports = (req, res, next) => {
    try {
        if (!req.url.includes("/e-ticaret/kitap/user/signIn")) {
            if (req?.headers?.authorization) {
                const token = req.headers.authorization.split(" ")[1]
                const decodedToken = helpers.helpers.verifyToken(token)
                if (decodedToken.decodedToken === null) {
                    res.locals.user = null
                    return res.status(StatusCodes.UNAUTHORIZED).send({
                        message: consts.auth.UNAUTHORIZATION_MESSAGE
                    })
                }
            }
            else {
                return res.status(StatusCodes.UNAUTHORIZED).send({
                    message: consts.auth.UNAUTHORIZATION_MESSAGE
                })
            }


        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).send({
            message: consts.auth.UNAUTHORIZATION_MESSAGE
        })
    }
}