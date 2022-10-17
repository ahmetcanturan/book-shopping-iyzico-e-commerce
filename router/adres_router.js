const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.adres.getAllAdres)
router.get("/getAdresById/:adresId", [validators.adres.paramsIdValidator()], controller.adres.getAdresById)
router.post("/create", [validators.adres.createValidator(),], controller.adres.createAdres)
router.put("/updateAdresById/:adresId", [validators.adres.paramsIdValidator()], controller.adres.updateAdresById)
router.delete("/delete/:adresId", [validators.adres.paramsIdValidator()], controller.adres.deleteAdresById)


module.exports = router