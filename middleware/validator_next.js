const { validationResult } = require("express-validator")
const {StatusCodes}=require("http-status-codes")

module.exports=async(req,res,next)=>{
    try {
        const validationErrors=validationResult(req)
        if(validationErrors.isEmpty()===false){
            return res.status(StatusCodes.BAD_REQUEST).json({data:null,error:true,validationErrors:validationErrors.array(),
                success:false,message:"Geçersiz Veri",timestamp:Date.now(),
                code:StatusCodes.BAD_REQUEST})
        }
        next()
    } catch (error) {
        console.log("içeride hata var")
    }
}
