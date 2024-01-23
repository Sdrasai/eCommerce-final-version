const prisma = require('../db.js');

class UserService {
    db = prisma;

    async createUser(userName, password, email){
        return await this.db.user.create({data: {userName, password, email}});
    }

    async getAllUsers(){
        return await this.db.user.findMany({select: {userId: true, userName: true}});
    }

    async getUserByUserName(userName){
        return await this.db.user.findUnique({where: {userName}});
    }

    async getUserById(id){
        return await this.db.user.findUnique({where: {userId: id}, select: {userName: true, email: true}});
    }

    async updateUserById(id, fieldsforUpdate){
        return await this.db.user.update({where: {userId: id}, data: {...fieldsforUpdate}});
    }

    async deleteUserById(id){
        return await this.db.user.delete({where: {userId: id}});
    }
}

module.exports = UserService;