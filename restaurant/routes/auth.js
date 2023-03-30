const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController')

router.post("/get-token", authController.getToken)
module.exports = router