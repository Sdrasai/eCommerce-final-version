const prisma = require("../db.js")

class AdminService {
  db = prisma

  async getAllUsers() {
    return await this.db.user.findMany({})
  }

  async getSpecificUser(userId) {
    const user = await this.db.user.findUnique({ where: { userId } })
    return {
      userInfo: user,
      profileInfo: await this.db.profile.findUnique({
        where: { forUser: user.userId },
      }),
    }
  }

  async promoteUser(userId, newRole) {
    return await this.db.user.update({
      where: { userId },
      data: { role: newRole },
    })
  }

  async deleteUser(userId) {
    return await this.db.user.delete({ where: { userId } })
  }
}

module.exports = AdminService
