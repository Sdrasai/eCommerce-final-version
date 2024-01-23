const express = require('express');
const { adminControllers } = require('../controllers');
const { authentication, isAdmin, EH, validators } = require('../middlewares');


const router = express.Router(); // /api/admin

router.route('/allUsers')
    .get(
        authentication,
        isAdmin,
        EH.asyncErrorHandler(adminControllers.allUsers)
    )

router.route('/allUsers/:userId')
        .get(
            authentication,
            isAdmin,
            ...validators.getSpecificUserOrDeleteUserForAdminValidators,
            validators.validationErrorHandler,
            EH.asyncErrorHandler(adminControllers.specificUser)
        )
        .put(
            authentication,
            isAdmin,
            ...validators.promoteUserValidators,
            validators.validationErrorHandler,
            EH.asyncErrorHandler(adminControllers.promoteUser)
        )
        .delete(
            authentication,
            isAdmin,
            ...validators.getSpecificUserOrDeleteUserForAdminValidators,
            validators.validationErrorHandler,
            EH.asyncErrorHandler(adminControllers.deleteUser)
        )

module.exports = router;