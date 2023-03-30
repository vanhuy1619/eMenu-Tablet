const express = require('express')
const router = express.Router()
const chefController = require("../controllers/ChefController")
const checkChef = require('../middlewares/checkChef')


router.get("/", checkChef, chefController.getChef)
router.put("/update-status",checkChef,chefController.updateOrderStatus)
router.get("/list-products",checkChef,chefController.getProducts)
router.put("/update-toggle-food",checkChef,chefController.updateToggleFood)

module.exports = router