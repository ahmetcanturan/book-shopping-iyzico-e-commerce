const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.post("/", validators.satinAl.sessionSatis(), controller.satinAlSession.sessionSatis)
router.post("/checkout/complete/payment", validators.satinAl.userSatis(), controller.satinAlSession.satisKontrol)

module.exports = router