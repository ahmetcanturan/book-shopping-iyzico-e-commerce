const express = require("express")
const router = express.Router()
const controller = require("../controllers/index")
const validators = require("../validations/index")

router.get("/all", controller.user.getAllUser)
router.get("/getUserById/:userId", [validators.user.paramValidateId()], controller.user.getUserById)
router.post("/create", [validators.user.validateCreateUser()], controller.user.createUser)
router.post("/specialData/:userId", [validators.user.paramValidateId(), validators.user.validateSpecialData()], controller.user.specialData)
router.put("/updateUserById/:userId", [validators.user.paramValidateId(), validators.user.validateUpdateUser()], controller.user.updateUserById)
router.post("/signIn", [validators.user.validateSignIn()], controller.user.signIn)
router.delete("/delete/:userId", [validators.user.paramValidateId()], controller.user.deleteUserById)


module.exports = router