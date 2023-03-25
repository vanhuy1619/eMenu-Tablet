const express = require('express')
const router = express.Router()
const chefController = require("../controllers/ChefController")
const checkChef = require('../middlewares/checkChef')

router.get("/", checkChef, chefController.getChef)
router.put("/update-status",checkChef,chefController.updateOrderStatus)

module.exports = router