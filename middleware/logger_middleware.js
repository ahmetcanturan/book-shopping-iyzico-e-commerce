const logger = require("../logger/logger")
module.exports = (req, res, next) => {
    logger.logInfo(req,req.method)
    next()
}