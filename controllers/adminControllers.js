const { AdminService } = require('../services');
const adminService = new AdminService();

async function allUsers(req, res){
    const allUsers = await adminService.getAllUsers();
    res.status(200).send(allUsers);
}

async function specificUser(req, res){
    const user = await adminService.getSpecificUser(req.params.userId);
    res.status(200).send(user);
}

async function promoteUser(req, res){
    const updatedUser = await adminService.promoteUser(req.params.userId, req.body.newRole);
    res.status(201).send(updatedUser);
}

async function deleteUser(req, res){
    const deletedUser = await adminService.deleteUser(req.params.userId);
    res.status(204).send({deletedUser, message: 'succesfully deleted!'});
}

module.exports = {
    allUsers,
    specificUser,
    promoteUser,
    deleteUser
}