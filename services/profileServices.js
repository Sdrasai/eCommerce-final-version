const prisma = require('../db.js');

class ProfileService {
    db = prisma;

    async createProfile(userId){
        return await this.db.profile.create({data: {forUser: userId}});
    }

    async getProfileByUserId(userId){
        return await this.db.profile.findUnique({where: {forUser: userId}});
    }

    async updateProfileByUserId(userId, fieldsForUpdate){
        return await this.db.profile.update({where: {forUser: userId}, data: {...fieldsForUpdate}});
    }
}

module.exports = ProfileService;