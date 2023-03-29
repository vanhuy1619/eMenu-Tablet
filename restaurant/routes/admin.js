const express = require('express');
const admin = require('../middlewares/admin');
const router = express.Router();
const adminController = require('../controllers/AdminController')

router.get('/',admin, adminController.admin)
router.get("/get-bill-date/:date",admin, adminController.getBillByDate)
module.exports = router