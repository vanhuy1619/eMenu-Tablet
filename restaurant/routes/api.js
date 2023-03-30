const auth = require('../middlewares/auth')
const express = require('express');
const admin = require('../middlewares/admin');
const router = express.Router();
const adminController = require('../controllers/AdminController')
const chefController = require('../controllers/ChefController')
const paymentController = require('../controllers/PaymentController')

router.get("/get-bill-date/:date",auth, adminController.getBillByDate)

router.put("/update-status",auth,chefController.updateOrderStatus)
router.get("/list-products",auth,chefController.getProducts)
router.put("/update-toggle-food",auth,chefController.updateToggleFood)

router.get("/:id",auth,paymentController.payment)
router.post("/add-cart",auth,paymentController.addcart)
router.delete("/delete-cart",auth,paymentController.deleteProductFromCart)
router.delete("/delete-cart-all/:id",auth,paymentController.deleteCart)
router.post("/confirm-order/:idtable",auth,paymentController.confirmOrder)
router.post("/confirm-pay/:idtable",auth,paymentController.confirmPay)

module.exports = router