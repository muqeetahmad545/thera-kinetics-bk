const express = require('express');
const stripeController = require('../controller');
const stripeRoutes = express.Router();


stripeRoutes.post('/createPayment', stripeController.createPaymentIntent);

module.exports = { stripeRoutes };

