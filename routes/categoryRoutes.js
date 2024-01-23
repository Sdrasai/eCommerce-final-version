const express = require('express');
const { authentication, isAdmin, validators, EH } = require('../middlewares');
const { categoryControllers } = require('../controllers');
const router = express.Router(); // api/category

router.route('/create')
    .post(
        authentication,
        isAdmin,
        ...validators.createCategoryValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(categoryControllers.createCategory)
    );

router.route('/')
    .get(
        EH.asyncErrorHandler(categoryControllers.retrieveAllCategories)
    );

router.route('/:categoryId')
    .get(
        EH.asyncErrorHandler(categoryControllers.retrieveSpecificCategory)
    )
    .put(
        authentication,
        isAdmin,
        ...validators.updateCategoryValidators,
        validators.validationErrorHandler,
        EH.asyncErrorHandler(categoryControllers.updateCategory)
    )
    .delete(
        authentication,
        isAdmin,
        EH.asyncErrorHandler(categoryControllers.deleteCategory)
    );

module.exports = router;