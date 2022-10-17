const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.userSepet.getAllUserSepet)
router.get("/getUserSepetById/:sepetId", [validators.sepet.userSepetparamsIdValidator()], controller.userSepet.getUserSepetById)
router.post("/create", [validators.sepet.userSepetValidator()], controller.userSepet.createUserSepet)
router.post("/addBookUserSepet/", [validators.sepet.userSepetAddBookValidator()], controller.userSepet.addBookUserSepet)
router.delete("/delete/:sepetId", [validators.sepet.userSepetparamsIdValidator()], controller.userSepet.deleteUserSepetById)
router.delete("/deleteBookFromUserSepet/", [validators.sepet.userSepetAddBookValidator()], controller.userSepet.deleteBookFromUserSepet)
module.exports = router