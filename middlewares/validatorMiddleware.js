const { body, param, query, validationResult, checkExact } = require('express-validator');
const { AppError } = require('../providers');

function validationErrorHandler(req, res, next){
    try {
        const isValid = validationResult(req);
        if (!isValid.isEmpty()){
            const message = isValid.errors[0].msg;
            throw new AppError(message, 500);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }

}

const registerValidators = [
    body('userName').isString().trim().escape().notEmpty().withMessage('username validation Error!'),
    body('password').isString().trim().escape().notEmpty().withMessage('password validation Error!'),
    body('email').isString().trim().escape().notEmpty().isEmail().withMessage('email validation Error!'),
    checkExact()
];

const loginValidators = [
    body('userName').isString().trim().escape().notEmpty().withMessage('username validation Error!'),
    body('password').isString().trim().escape().notEmpty().withMessage('password validation Error!'),
    checkExact()
];

const editProfileValidators = [
    body('address').isString().trim().escape().optional().withMessage('address validation Error!'),
    body('age').isInt().trim().escape().isLength({min: 1, max: 2}).optional().withMessage('age validation Error!'),
    body('phoneNumber').isString().trim().escape().isMobilePhone().optional().withMessage('phone number validation Error!'),
    checkExact()
];

const updateUserUserNameValidators = [
    body('userName').isString().trim().escape().withMessage('userName update validation Error!'),
    checkExact()
];

const changePasswordValidators = [
    body('lastPassword').isString().trim().escape().notEmpty().withMessage('lastPassword validatior Error!'),
    body('newPassword').isString().trim().escape().notEmpty().withMessage('newPassword validatior Error!'),
    checkExact()
];

const allProductsQueryValidators = [
    query('page').isInt().trim().escape().notEmpty().optional().withMessage('page query validation Error!'),
    query('count').isInt().trim().escape().notEmpty().optional().withMessage('count query validation Error!'),
    checkExact()
];

const createProductValidators = [
    body('productName').isString().trim().escape().notEmpty().withMessage('product name validation Error!'),
    body('price').trim().escape().notEmpty().withMessage('product price validation Error!'),
    body('count').isNumeric({min: 0}).trim().escape().notEmpty().withMessage('product count validation Error!'),
    body('attributes').isJSON().trim().escape().optional().withMessage('product attributes validation Error!'),
    body('categoryId').isString().trim().escape().isUUID().optional().withMessage('product categoryId validation Error!'),
    checkExact()
];

const updateProductValidators = [
    body('productName').isString().trim().escape().notEmpty().optional().withMessage('product name validation Error!'),
    body('price').trim().escape().notEmpty().optional().withMessage('product price validation Error!'),
    body('count').isNumeric({min: 0}).trim().escape().notEmpty().optional().withMessage('product count validation Error!'),
    body('attributes').isJSON().trim().escape().optional().withMessage('product attributes validation Error!'),
    body('categoryId').isString().trim().escape().isUUID().optional().withMessage('product categoryId validation Error!'),
    checkExact()
];

const createCommentValidators = [
    body('message').isString().trim().escape().notEmpty().withMessage('comment message validation Error!'),
    body('rating').isString().trim().escape().optional().withMessage('comment rating validation Error!'),
    param('productId').isUUID().notEmpty().escape().withMessage('productId in comment route validation Error!'),
    checkExact()
];

const updateCommentValidators = [
    body('message').isString().trim().escape().notEmpty().optional().withMessage('comment message validation Error!'),
    body('rating').isString().trim().escape().optional().withMessage('comment rating validation Error!'),
    param('productId').isUUID().notEmpty().escape().withMessage('productId in comment route validation Error!'),
    param('commentId').isUUID().notEmpty().escape().withMessage('commentId in comment route validation Error!'),
    checkExact()
];

const updateCommentViaProfileValidators = [
    body('message').isString().trim().escape().notEmpty().optional().withMessage('comment message validation Error!'),
    body('rating').isString().trim().escape().optional().withMessage('comment rating validation Error!'),
    param('commentId').isUUID().notEmpty().escape().withMessage('commentId in comment route validation Error!'),
    checkExact()
];

const createCategoryValidators = [
    body('title').isString().trim().escape().notEmpty().withMessage('category title validation Error!'),
    body('parentId').isString().trim().escape().isUUID().optional().withMessage('category parentId validation Error!'),
    checkExact()
];

const updateCategoryValidators = [
    body('title').isString().trim().escape().notEmpty().optional().withMessage('category title validation Error!'),
    body('parentId').isString().trim().escape().isUUID().optional().withMessage('category parentId validation Error!'),
    checkExact()
];

const addToCartValidators = [
    body(''),
    param('productId').isUUID().notEmpty().escape().withMessage('productId in add to cart validation Error!'),
    checkExact()
];

const inCartValidators = [
    body('productId').isUUID().notEmpty().escape().withMessage('productId in update cart validation Error!'),
    body('count').isInt({min: -1, max: 1}).notEmpty().escape().withMessage('count up or down in cart validation Error!'),
    checkExact()
];

const deleteProductInCartValidators = [
    body('productId').isUUID().notEmpty().escape().withMessage('productId in delete product in cart validation Error!'),
    checkExact()
];

const getSpecificUserOrDeleteUserForAdminValidators = [
    param('userId').isString().isUUID().trim().escape().notEmpty().withMessage('userId (delete/get) validation Error!'),
    checkExact()
];

const promoteUserValidators = [
    body('newRole').isString().trim().escape().notEmpty().withMessage('newRole for promote validation Error!'),
    param('userId').isString().isUUID().trim().escape().notEmpty().withMessage('userId validation Error!'),
    checkExact()
];

const createOrderValidators = [
    body(''),
    param(''),
    query(''),
    checkExact()
];

const specificOrderValidatorsAndDelete = [
    param('orderId').isString().trim().notEmpty().escape().isUUID().withMessage('orderId validation Error!'),
    checkExact()
];

const checkOutValidators = [
    query('success').escape().withMessage('checkout validation Error!'),
    query('status').escape().withMessage('checkout validation Error!'),
    query('trackId').escape().withMessage('checkout validation Error!'),
    query('orderId').escape().withMessage('checkout validation Error!'),
    checkExact()
];

const payValidators = [
    param('orderId').isString().notEmpty().isUUID().escape().withMessage('orderId Validation Error in payment'),
    checkExact()
]

module.exports = {
    validationErrorHandler,
    registerValidators,
    loginValidators,
    editProfileValidators,
    updateUserUserNameValidators,
    changePasswordValidators,
    allProductsQueryValidators,
    createProductValidators,
    updateProductValidators,
    createCommentValidators,
    updateCommentValidators,
    updateCommentViaProfileValidators,
    createCategoryValidators,
    updateCategoryValidators,
    addToCartValidators,
    inCartValidators,
    deleteProductInCartValidators,
    getSpecificUserOrDeleteUserForAdminValidators,
    promoteUserValidators,
    createOrderValidators,
    specificOrderValidatorsAndDelete,
    checkOutValidators,
    payValidators
}