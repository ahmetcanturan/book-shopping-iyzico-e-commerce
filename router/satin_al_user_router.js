const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.post("/", validators.satinAl.userSatis(), controller.satinAlUser.userSatis)
router.post("/checkout/complete/payment", validators.satinAl.userSatis(), controller.satinAlUser.satisKontrol)

module.exports = router