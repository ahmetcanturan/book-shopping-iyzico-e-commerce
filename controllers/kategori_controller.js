const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
const services=require("../services/index")
const {StatusCodes}=require("http-status-codes") 
const validate_response=require("../validations/response_validator")

exports.createKategori=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.kategoriService.createKategori(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATED})
    } catch (error) {
        console.error(error)
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.getAllKategori=async(req,res)=>{
    try {
        await services.kategoriService.getAllKategori()
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getKategoriById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.kategoriService.getKategoriById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.updateKategoriById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.kategoriService.updateKategoriById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.deleteKategoriById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.kategoriService.deleteKategoriById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

