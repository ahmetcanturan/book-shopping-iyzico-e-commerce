const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
const services=require("../services/index")
const {StatusCodes}=require("http-status-codes") 
const validate_response=require("../validations/response_validator")

exports.createYazar=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.yazarService.createYazar(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATED})
    } catch (error) {
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.getAllYazar=async(req,res)=>{
    try {
        await services.yazarService.getAllYazar()
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getYazarById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.yazarService.getYazarById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.updateYazarById=async(req,res)=>{
    try {
        console.time("Time")
        if(validate_response(req,res)!==undefined){return}
        await services.yazarService.updateYazarById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
        console.timeEnd("Time")
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.deleteYazarById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.yazarService.deleteYazarById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

