const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.kategori.getAllKategori)
router.get("/getKategoriById/:kategoriId", [validators.kategori.paramsIdValidator()], controller.kategori.getKategoriById)
router.post("/create", [validators.kategori.createValidator()], controller.kategori.createKategori)
router.put("/updateKategoriById/:kategoriId", [validators.kategori.paramsIdValidator(), validators.kategori.createValidator()], controller.kategori.updateKategoriById)
router.delete("/delete/:kategoriId", [validators.kategori.paramsIdValidator()], controller.kategori.deleteKategoriById)

module.exports = router