const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.yayinevi.getAllYayinevi)
router.get("/getYayineviById/:yayineviId", [validators.yayinevi.paramsIdValidator()], controller.yayinevi.getYayineviById)
router.post("/create", [validators.yayinevi.createValidator()], controller.yayinevi.createYayinevi)
router.put("/updateYayineviById/:yayineviId", [validators.yayinevi.paramsIdValidator(), validators.yayinevi.createValidator()], controller.yayinevi.updateYayineviById)
router.delete("/delete/:yayineviId", [validators.yayinevi.paramsIdValidator()], controller.yayinevi.deleteYayineviById)

module.exports = router