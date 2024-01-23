const prisma = require('../db.js');

class TokenService {
    db = prisma;

    async addToken(userName, token){
        return await this.db.token.create({data: {forUser: userName, token}});
    }
}

module.exports = TokenService;