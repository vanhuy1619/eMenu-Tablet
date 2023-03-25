const express = require('express')
const router = express.Router()
const orderController = require("../controllers/OrderController")
const checkTableFunction = require('../middlewares/checkTableFunction')

router.get("/:id",checkTableFunction, orderController.order)

module.exports = router
