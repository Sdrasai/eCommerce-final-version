const express = require('express');
const { orderControllers } = require('../controllers');
const { authentication, EH, validators } = require('../middlewares');

const router = express.Router(); // /api/order

router.route('/')
    .get(
        authentication,
        ...validators.checkOutValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(orderControllers.checkOut)
    )

module.exports = router;