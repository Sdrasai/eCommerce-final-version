const express = require('express');
const { authentication, validators, EH } = require('../middlewares');
const { 
    userControllers,
    cartControllers,
    profileControllers,
    commentControllers,
    orderControllers } = require('../controllers');

const router = express.Router(); // /api/user

router.route('/register')
    .post(
        ...validators.registerValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(userControllers.register)
    );

router.route('/login')
    .post(
        ...validators.loginValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(userControllers.login)
    );

router.route('/myProfile')
    .get(
        authentication,
        EH.asyncErrorHandler(profileControllers.showProfile)
    )
    .put(
        authentication,
        ...validators.editProfileValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(profileControllers.updateProfile)
    );

router.route('/myProfile/info') // TODO: need to force login again after change userName or password!
    .get(
        authentication,
        EH.asyncErrorHandler(userControllers.userInfo)
    )
    .put(
        authentication,
        ...validators.updateUserUserNameValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(userControllers.updateUserUserName)
    )
    .patch(
        authentication,
        ...validators.changePasswordValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(userControllers.changePassword)
    )
    .delete(
        authentication,
        EH.asyncErrorHandler(userControllers.deleteUser)
    );

router.route('/myProfile/myComments')
    .get(
        authentication,
        EH.asyncErrorHandler(commentControllers.retrieveCommentsByUser)
    );

router.route('/myProfile/myComments/:commentId')
    .get(
        authentication,
        EH.asyncErrorHandler(commentControllers.retrieveSpecificComment)
    )
    .put(
        authentication,
        ...validators.updateCommentViaProfileValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(commentControllers.updateComment)
    )
    .delete(
        authentication,
        EH.asyncErrorHandler(commentControllers.deleteComment)
    );

router.route('/myCart')
    .get(
        authentication,
        EH.asyncErrorHandler(cartControllers.showCart)
    )
    .post(
        authentication,
        ...validators.createOrderValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(orderControllers.createOrder)
    )
    .put(
        authentication,
        ...validators.inCartValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(cartControllers.updateProductInCart)
    )
    .delete(
        authentication,
        ...validators.deleteProductInCartValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(cartControllers.deleteProductInCart)
    );

router.route('myCart/deleteAll')
    .post(
            authentication,
            EH.asyncErrorHandler(cartControllers.deleteAllProductsInCart)
    );

router.route('/activeOrders')
    .get(
        authentication,
        EH.asyncErrorHandler(orderControllers.myActiveOrders)
    );

router.route('/activeOrders/:orderId')
    .get(
        authentication,
        ...validators.specificOrderValidatorsAndDelete,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(orderControllers.specificOrder)
    )
    .delete(
        authentication,
        ...validators.specificOrderValidatorsAndDelete,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(orderControllers.deleteOrder)
    );

router.route('/activeOrders/:orderId/pay')
    .post(
        authentication,
        ...validators.payValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(orderControllers.pay)
    );

module.exports = router;