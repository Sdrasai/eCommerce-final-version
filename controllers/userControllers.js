const bc = require('bcrypt');
const { UserService, CartService, ProfileService } = require('../services');
const { createToken, hashPassword } = require('../utilities');
const { AppError } = require('../providers');
const userService = new UserService();
const cartService = new CartService();
const profileService = new ProfileService();

async function register(req, res){
    const hashedPassword = await hashPassword(req.body.password);
    const createdUser = await userService.createUser(req.body.userName, hashedPassword, req.body.email);
    const createdCart = await cartService.createCart(createdUser.userId);
    const createdProfile = await profileService.createProfile(createdUser.userId);
    res.status(201).send({createdUser, createdCart, createdProfile});
}

async function login(req, res){
    const user = await userService.getUserByUserName(req.body.userName);
    if (!user) throw new AppError('username or password does not match!', 401);
    const verify = await bc.compare(req.body.password, user.password);
    if (!verify) throw new AppError('username or password does not match!', 401);
    const tokens = await createToken({userName: req.body.userName}, process.env.SECRET_KEY, process.env.ACCESS_EXPIRE_TIME, 
        process.env.REFRESH_EXPIRE_TIME, req.body.userName);
    res.status(200).send(tokens);
}

async function userInfo(req, res){
    const userInfo = await userService.getUserById(req.user.userId);
    res.status(200).send(userInfo);
}

async function updateUserUserName(req, res){
    const fieldsforUpdate = {...req.body};
    const updatedUser = await userService.updateUserById(req.user.userId, fieldsforUpdate);
    res.status(201).send(`updateUser: ${JSON.stringify(updatedUser)}`);
}

async function changePassword(req, res){
    const verify = await bc.compare(req.body.lastPassword, req.user.password);
    if (!verify) throw new AppError('password doesn\'t match!', 401);
    const hashedNewPassword = await hashPassword(req.body.newPassword);
    const fieldsforUpdate = {password: hashedNewPassword};
    await userService.updateUserById(req.user.userId, fieldsforUpdate);
    res.status(201).send('successfully updated password!');
}

async function deleteUser(req, res){
    await userService.deleteUserById(req.user.userId);
    res.status(204);
}

module.exports = {
    register,
    login,
    userInfo,
    updateUserUserName,
    changePassword,
    deleteUser
}