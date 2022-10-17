const baseResponse = require("../dto/baseresponse_dto")
const logger = require("../logger/logger")
const services = require("../services/index")
const { StatusCodes } = require("http-status-codes")
const validate_response = require("../validations/response_validator")

exports.createUserSepet = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        const json = await services.userSepetService.createUserSepet(req)
        res.status(StatusCodes.CREATED).json({ ...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.CREATED })
    } catch (error) {
        console.error(error)
        logger.logError(req, "POST", error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.addBookUserSepet = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.userSepetService.addBookUserSepet(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "PUT", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getAllUserSepet = async (req, res) => {
    try {
        await services.userSepetService.getAllUserSepet()
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getUserSepetById = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.userSepetService.getUserSepetById(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "GET", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


exports.deleteUserSepetById = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.userSepetService.deleteUserSepetById(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.deleteBookFromUserSepet = async (req, res) => {
    try {
        if (validate_response(req, res) !== undefined) { return }
        await services.userSepetService.deleteBookFromUserSepet(req)
            .then(e => res.json(e).status(StatusCodes.OK))
            .catch(e => res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req, "DELETE", error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}