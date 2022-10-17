const services=require("../services/index")
const baseResponse=require("../dto/baseresponse_dto")
const logger=require("../logger/logger")
module.exports=async(req,res,next)=>{
    await services.fileImageService(req,res,async(error)=>{
        if(error){
            console.log(error.message)
            logger.logError(req,"PUT",error.message)
            res.json({data:null,success:false,timestamp:Date.now(),message:"dosya yükleme değişken adı image olmak zorunda"})
        }
        else{
            next()
        }
    })   
}