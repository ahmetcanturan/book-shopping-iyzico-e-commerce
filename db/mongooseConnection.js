const mongoose = require("mongoose")
const logger = require("../logger/logger")
exports.connectToMongoDB = async (host,port,collection,minPoolSize,maxPoolSize,connectTimeoutMS) => {
    try {
        await mongoose.connect(`mongodb://${host}:${port}/${collection}`, {
            minPoolSize,
            maxPoolSize,
            autoIndex: true,
            compressors: 'zlib',
            connectTimeoutMS
        });
        console.log('connected To DB..')
        logger.logSpecial("MongoDB'ye Bağlanıldı","info")
    } catch (error) {
        console.log('error', error)
        logger.logSpecial(`MongoDB Bağlantı Hatası!!: ${error}`,"error")
        throw new Error(error)
    }
}