const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.sessionSepet.getAllSessionSepet)
router.get("/getSessionSepetBySessionId", controller.sessionSepet.getSessionSepetBySessionId)
router.post("/create", [validators.sepet.sessionSepetValidator()], controller.sessionSepet.createSessionSepet)
router.post("/addBookSessionSepet/", [validators.sepet.sessionSepetAddBookValidator()], controller.sessionSepet.addBookSessionSepet)
router.delete("/delete", controller.sessionSepet.deleteSessionSepetBySessionId)
router.delete("/deleteBookFromSessionSepet/:kitapId", [validators.sepet.SepetDeleteBookValidator()], controller.sessionSepet.deleteBookFromSessionSepet)
module.exports = router