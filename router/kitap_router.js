const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")
const middelewares = require("../middleware/index")

router.get("/all", controller.kitap.getAllKitap)
router.get("/getKitapById/:kitapId", [validators.kitap.paramsIdValidator()], controller.kitap.getKitapById)
router.post("/create", [validators.kitap.createValidator()], controller.kitap.createKitap)
router.post("/uploadPhotoByKitapId/:kitapId", [validators.kitap.paramsIdValidator(), middelewares.validatorNext, middelewares.imageUploadMiddleware], controller.kitap.uploadPhotoByKitapId)
router.put("/update/:kitapId", [validators.kitap.paramsIdValidator(), validators.kitap.createValidator()], controller.kitap.updateKitapById)
router.delete("/delete/:kitapId", [validators.kitap.paramsIdValidator()], controller.kitap.deleteKitapById)


module.exports = router