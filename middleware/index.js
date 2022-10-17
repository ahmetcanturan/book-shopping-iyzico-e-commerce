const authMiddleware=require("./auth_middleware")
const loggerMiddleware=require("./logger_middleware")
const imageUploadMiddleware=require("./image_upload_middleware")
const validatorNext=require("./validator_next")


module.exports={
    authMiddleware,
    loggerMiddleware,
    imageUploadMiddleware,
    validatorNext
}