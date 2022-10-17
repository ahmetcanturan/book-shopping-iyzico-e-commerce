//? -------------İmports-----------------------
const express = require("express")
const router = require("./router/index")
const app = express()
const consts = require("./consts/index")
const middlewares = require("./middleware/index")
const cors = require("cors")
const { default: helmet } = require("helmet")
const configs = require("./configs/index")
const db = require("./db/index")
const utils = require("./utils/index")
const bodyParser = require("body-parser")
const fileUpload = require('express-fileupload')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const connectMongo = require('connect-mongo')
const fs = require("fs")
const https = require("https")


//* -------------İmports-END-------------------

//? -------------app.use-----------------------
app.use(express.json())
app.use(helmet())//? Headers üzerinden gelecek atakları için
app.use(cors())//? ip kaynağımızı kimlerle paylaşacağımızı belirlemek için
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
//* -------------app.use-END-------------------
//? -------------Static Dosyamı Dışarı Serve Etme İşlemi
//dosya yoksa olustursun
utils.helpers.createUploadDir("./public")
app.use("/public", express.static("public"))
//* -------------Static Dosyamı Dışarı Serve Etme İşlemi-END
//? -------------Configs-----------------------
configs.serverConfig.initialServerConfig() //? .env klasörümüzü çalıştırdık
const PORT = process.env.PORT
//*console.log(process.env)
//* -------------Configs-END-------------------

//? -------------MongoDB-----------------------
db.mongooseConnection.connectToMongoDB(process.env.MONGODB_HOST, process.env.MONGODB_PORT, process.env.MONGODB_DATABASE, process.env.MONGODB_MIN_POOL_SIZE, process.env.MONGODB_MAX_POOLSIZE, process.env.MONGODB_CONNECTION_TIME_OUT)
//* -------------MongoDB-END-------------------
//? -------------Session-----------------------
app.use(session({
    secret: "testtotest", // güvenlik anahtarı
    resave: false,
    saveUninitialized: true,
    store: connectMongo.create({ mongoUrl: "mongodb://127.0.0.1/myProject_1" })
}))
//* -------------Session-END-------------------
app.use((req, res, next) => {
    const { userId } = req.session
    if (userId) {
        res.locals.user = userId
    }
    else res.locals.user = null
    next()
})

//? -----------Global-Middlewares--------------
app.use(middlewares.loggerMiddleware)
app.use(middlewares.authMiddleware)
//* ------------Global-Middlewares-END---------
//? -------------App.use_Routers---------------
app.use(`${process.env.APP_PREFIX}${consts.router.KITAP}`, router.kitapRouter)//? Routerları middeware gibi tanıtıyoruz ->localhost:5000/e-ticaret/kitap/kitap
app.use(`${process.env.APP_PREFIX}${consts.router.YAYINEVI}`, router.yayineviRouter)//? localhost:5000/e-ticaret/kitap/yayinevi
app.use(`${process.env.APP_PREFIX}${consts.router.YAZAR}`, router.yazarRouter)//? localhost:5000/e-ticaret/kitap/yazar
app.use(`${process.env.APP_PREFIX}${consts.router.KATEGORI}`, router.kategoriRouter)//? localhost:5000/e-ticaret/kitap/kategori
app.use(`${process.env.APP_PREFIX}${consts.router.USER}`, router.userRouter)//? localhost:5000/e-ticaret/kitap/user
app.use(`${process.env.APP_PREFIX}${consts.router.ADRES}`, router.adresRouter)//? localhost:5000/e-ticaret/kitap/adres
app.use(`${process.env.APP_PREFIX}${consts.router.USER_SEPET}`, router.userSepetRouter)//? localhost:5000/e-ticaret/kitap/user/sepet
app.use(`${process.env.APP_PREFIX}${consts.router.SESSION_SEPET}`, router.sessionSepetRouter)//? localhost:5000/e-ticaret/kitap/session/sepet
app.use(`${process.env.APP_PREFIX}${consts.router.USER_SATIS}`, router.satinAlUserRouter)
app.use(`${process.env.APP_PREFIX}${consts.router.SESSION_SATIS}`, router.satinAlSessionRouter)
//* -------------App.use_Routers-END-----------
const undefined_routes = express.Router()
app.use(undefined_routes)
undefined_routes.use((req, res) => {
    res.send("Aradınız Sayfa Mevcut Değildir.")
})

//? -----------HTTPS-Certs-------------
if (process.env.HTTPS_ENABLED === "true") {
    const key = fs.readFileSync("./certs/key.pem").toString()
    const cert = fs.readFileSync("./certs/cert.pem").toString()
    const server = https.createServer({ key, cert }, app)
    server.listen(PORT, () => { console.log(`${PORT}. Port is Activated..`) })
} else {
    app.listen(PORT, () => { console.log(`${PORT}. Port is Activated..`) })
}
