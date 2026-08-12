const express = require("express");
const router = express.Router();
const { verifyPayment, createOrder } = require("../controllers/paymentcontroller");
const authenticate = require("../middleware/authenticate");

router.use(authenticate); 

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router; 