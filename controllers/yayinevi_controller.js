const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
const services=require("../services/index")
const {StatusCodes}=require("http-status-codes") 
const validate_response=require("../validations/response_validator")

exports.createYayinevi=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.yayineviService.createYayinevi(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATED})
    } catch (error) {
        console.error(error)
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.getAllYayinevi=async(req,res)=>{
    try {
        await services.yayineviService.getAllYayinevi()
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getYayineviById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.yayineviService.getYayineviById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.updateYayineviById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.yayineviService.updateYayineviById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.deleteYayineviById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.yayineviService.deleteYayineviById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

