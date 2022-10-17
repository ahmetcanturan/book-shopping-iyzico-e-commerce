const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
const services=require("../services/index")
const {StatusCodes}=require("http-status-codes") 
const validate_response=require("../validations/response_validator")

exports.createAdres=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.adresService.createAdres(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATED})
    } catch (error) {
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.getAllAdres=async(req,res)=>{
    try {
        await services.adresService.getAllAdres()
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getAdresById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.adresService.getAdresById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.updateAdresById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.adresService.updateAdresById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.deleteAdresById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.adresService.deleteAdresById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

