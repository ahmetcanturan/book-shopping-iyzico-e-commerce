//?npm i --save winston-daily-rotate-file
const winston = require("winston")
const { label, timestamp, prettyPrint, json, colorize } = winston.format
const dailyRotateFile = require("winston-daily-rotate-file")


const logger = winston.createLogger({
    defaultMeta: { api: "Katmanlı Mimari Endpointleri" },
    format: winston.format.combine(
        label({ label: "Api" }),
        timestamp(),
        prettyPrint(),
        //colorize(),
        json() //! myFormatı silersek bunu yazarsak kayıtları json veri türüne göre yapar
    ),
    level: "verbose",
    transports: [ //! tek bir dailyRotateFile bırakıp içindeki level yazısını silersek hepsini tek dosyaya yazar
        new dailyRotateFile({
            datePattern: "DD-MM-YYYY",//?  -HH-mm-ss -> hh her saate yeni dosya -mm her dakikaya yeni dosya -ss her saniyeye yeni dosya
            filename: "myapp-%DATE%.log",
            dirname: "./logs"
        })
    ]
})

class MyLogger {
    logError(req, method, error = "NULL") {
        if (method == "GET") { logger.error(`${req.ip} ip'li cihaz tarafından [${req.path}] endpointine erişildi fakat bu hata meydana geldi-> ${error}`) }
        else if (method == "POST") { logger.error(`${req.ip} ip'li cihaz tarafından  [${req.path}] endpointine erişildi ve bu verileri girdi-> ${JSON.stringify(req.body)} ama bu hata meydana geldi-> ${error} `) }
        else if (method == "PUT") { logger.error(`${req.ip} ip'li cihaz tarafından  [${req.path}] endpointine erişildi ve eski verileri bu verilerle güncellemek istedi-> ${JSON.stringify(req.body)} ama bu hata meydana geldi-> ${error} `) }
        else if (method == "DELETE") { logger.error(`${req.ip} ip'li cihaz tarafından  [${req.path}] endpointine erişildi  ve bu _id'nin silinmesini istedi -> ${req.params._id}} ama bu hata meydana geldi-> ${error} `) }
    }
    logInfo(req, method) {
        if (method == "GET") { logger.info(`${req.ip} ip'li cihaz tarafından [${req.path}] endpointine erişildi`) }
        else if (method == "POST") { logger.info(`${req.ip} ip'li cihaz tarafından [${req.path}] endpointine erişildi ve bu verileri girdi -> ${JSON.stringify(req.body)} `) }
        else if (method == "PUT") { logger.info(`${req.ip} ip'li cihaz tarafından [${req.path}] endpointine erişildi ve eski verileri bu verilerle güncelledi-> ${JSON.stringify(req.body)} `) }
        else { logger.info(`${req.ip} ip'li cihaz tarafından [${req.path}] endpointine erişildi ve bu _id'nin silinmesini istedi -> ${req.params._id} `) }
    }
    logWarning(message) {
        logger.warn(message)
    }
    //? Standardın dışında yazılacak kayıtlar işin bu fonksiyonu çağırıcaz ve özel kayıt mesajını message ile yollayacağız
    logSpecial(message, level) {
        if (level == "info") { logger.info(message) }
        else if (level == "error") { logger.error(message) }
        else { logger.warn(message) }
    }
}

module.exports = new MyLogger()