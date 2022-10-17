const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
const services=require("../services/index")


const {StatusCodes}=require("http-status-codes") 
const validate_response=require("../validations/response_validator")


exports.signIn = async(req, res) => {
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.userService.signIn(req)
        res.status(StatusCodes.OK).json({...baseResponse, data: json, success: true, timestamp: Date.now(), code: StatusCodes.OK })
    } catch (error) {
        logger.logError(req,"POST",error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({...baseResponse,
            success: false,
            error: true,
            timestamp: Date.now(),
            message: error.message,
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
}

exports.createUser=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.userService.createUser(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATE})
    } catch (error) {
        console.error(error)
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.specialData=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.userService.specialData(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATE})
    } catch (error) {
        console.error(error)
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.getAllUser=async(req,res)=>{
    try {
        await services.userService.getAllUser()
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getUserById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.userService.getUserById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.updateUserById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.userService.updateUserById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.deleteUserById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.userService.deleteUserById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

