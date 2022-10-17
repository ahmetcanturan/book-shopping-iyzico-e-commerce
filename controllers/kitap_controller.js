const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
const services=require("../services/index")

const {StatusCodes}=require("http-status-codes") 
const validate_response=require("../validations/response_validator")


exports.createKitap=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        const json = await services.kitapService.createKitap(req)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATED})
    } catch (error) {
        console.error(error)
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.uploadPhotoByKitapId=async(req,res)=>{
    try {
        const json = await services.kitapService.uploadPhotoByKitapId(req)
        if(json.status==false){
            res.json(json).status(StatusCodes.INTERNAL_SERVER_ERROR)
            return
        }
        await services.imageResize.imageResize(req)
        if(json.oldImage!=="default.png")services.fileDeleteService.fileDelete("public/uploads/",json.oldImage)
        res.status(StatusCodes.CREATED).json({...baseResponse,data:json,success:true,timestamp:Date.now(),code:StatusCodes.CREATED})

    } catch (error) {
        console.error(error)
        logger.logError(req,"POST",error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

exports.getAllKitap=async(req,res)=>{
    try {
        await services.kitapService.getAllKitap()
        .then(e=>{res.json(e).status(StatusCodes.OK)})
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.getKitapById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.kitapService.getKitapById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"GET",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.updateKitapById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.kitapService.updateKitapById(req)
        .then(e=>res.json(e).status(StatusCodes.OK))
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))
    } catch (error) {
        logger.logError(req,"PUT",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
exports.deleteKitapById=async(req,res)=>{
    try {
        if(validate_response(req,res)!==undefined){return}
        await services.kitapService.deleteKitapById(req)
        .then(e=>
            { 
                if(e.kitap.image!=="default.png")services.fileDeleteService.fileDelete("public/uploads/",e.kitap.image)
                res.json(e).status(StatusCodes.OK)
            })
        .catch(e=>res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR))

    } catch (error) {
        logger.logError(req,"DELETE",error)
        console.error(error)
        res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

