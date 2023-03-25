const express = require('express')
const router = express.Router()
const staffController = require("../controllers/StaffController")
// const upload = require('../middlewares/user-upload')
// const validate = require('../middlewares/validate')
const rejectUser = require('../middlewares/rejectUser')
const checkUser = require('../middlewares/checkUser')
const checkTableFunction = require('../middlewares/checkTableFunction')

router.get("/login", rejectUser, staffController.login)
router.post("/login", rejectUser, staffController.checkLogin)
router.get("/table",checkTableFunction,staffController.getTable)
router.post("/opentable",checkTableFunction,staffController.openTable)
module.exports = router