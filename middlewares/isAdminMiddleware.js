const { AppError } = require('../providers');

async function isAdmin(req, res, next){
    try {
        if (req.user.role === 'User') {
            throw new AppError('not Authorized - nor admin nor owner!', 401);
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = isAdmin;