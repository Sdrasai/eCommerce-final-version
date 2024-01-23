const jwt = require('jsonwebtoken');
const { AppError } = require('../providers');
const { UserService } = require('../services');
const userService = new UserService();

async function authentication(req, res, next){
    try {
        const { authorization } = req.headers;
        if (!authorization) throw new AppError('token is needed in header for authentication!', 401);
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        if (payload){
            req.user = await userService.getUserByUserName(payload.userName);
            next();
        } else {
            throw new AppError('token needed', 401);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authentication;