const baseResponse = require("../dto/baseresponse_dto")
const logger = require("../logger/logger")
const services = require("../services/index")
const { StatusCodes } = require("http-status-codes")
const validate_response = require("../validations/response_validator")

exports.createSessionSepet = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        const json = await services.sessionSepetService.createSessionSepet(req)
        res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED })
    } catch (error) {
        console.error(error)
        logger.logError(req, "POST", error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.addBookSessionSepet = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.sessionSepetService.addBookSessionSepet(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "PUT", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getAllSessionSepet = async (req, res) => {
    try {
        await services.sessionSepetService.getAllSessionSepet()
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getSessionSepetBySessionId = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.sessionSepetService.getSessionSepetBySessionId(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.deleteSessionSepetBySessionId = async (req, res) => {
    try {
        await services.sessionSepetService.deleteSessionSepetBySessionId(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.deleteBookFromSessionSepet = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.sessionSepetService.deleteBookFromSessionSepet(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
