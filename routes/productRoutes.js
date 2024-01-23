const express = require('express');
const { authentication, isAdmin, validators, EH } = require('../middlewares');
const { productControllers, commentControllers, cartControllers } = require('../controllers');
const router = express.Router(); // api/products     - TODO: TEST ALL API's | admin panel can update or remove comments!

router.route('/create')
    .post(
        authentication,
        isAdmin,
        ...validators.createProductValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(productControllers.createProduct)
    );

router.route('/')
    .get(
        ...validators.allProductsQueryValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(productControllers.productList)
    );

router.route('/:productId')
    .get(
        EH.asyncErrorHandler(productControllers.productDetails)
    )
    .post(
        authentication,
        ...validators.addToCartValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(cartControllers.addToCart)
    )
    .put(
        authentication,
        isAdmin,
        ...validators.updateProductValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(productControllers.updateProduct)
    )
    .delete(
        authentication,
        isAdmin,
        EH.asyncErrorHandler(productControllers.deleteProduct)
    );

router.route('/:productId/writeComment')
    .post(
        authentication,
        ...validators.createCommentValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(commentControllers.createComment)
    );

router.route('/:productId/comments')
    .get(
        EH.asyncErrorHandler(commentControllers.retrieveCommentsOnProduct)
    );

router.route('/:productId/comments/:commentId')
    .get(
        EH.asyncErrorHandler(commentControllers.retrieveSpecificComment)
    )
    .put(
        authentication,
        ...validators.updateCommentValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(commentControllers.updateComment)
    )
    .delete(
        authentication,
        EH.asyncErrorHandler(commentControllers.deleteComment)
    );

module.exports = router;