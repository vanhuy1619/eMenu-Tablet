const express = require('express')
const router = express.Router()
const paymentController = require("../controllers/PaymentController")
const userController = require("../controllers/StaffController")
const checkUser = require("../middlewares/checkUser")

router.get("/:id",paymentController.payment)
router.post("/add-cart",paymentController.addcart)
router.delete("/delete-cart",paymentController.deleteProductFromCart)
router.delete("/delete-cart-all/:id",paymentController.deleteCart)
router.post("/confirm-order/:idtable",paymentController.confirmOrder)
router.post("/confirm-pay/:idtable",paymentController.confirmPay)

module.exports = router