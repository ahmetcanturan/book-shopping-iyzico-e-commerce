const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.yazar.getAllYazar)
router.get("/getYazarById/:yazarId", [validators.yazar.paramsIdValidator()], controller.yazar.getYazarById)
router.post("/create", [validators.yazar.createValidator()], controller.yazar.createYazar)
router.put("/update/:yazarId", [validators.yazar.paramsIdValidator(), validators.yazar.createValidator()], controller.yazar.updateYazarById)
router.delete("/delete/:yazarId", [validators.yazar.paramsIdValidator()], controller.yazar.deleteYazarById)

module.exports = router