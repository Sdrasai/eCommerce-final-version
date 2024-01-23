const prisma = require("../db.js")

class OrderService {
  db = prisma

  async createOrder(byUser, totalPrice, orderProducts) {
    return await this.db.order.create({
      data: {
        byUser,
        totalPrice,
        orderProducts,
      },
    })
  }

  async getUserAllActiveOrders(userId) {
    return await this.db.order.findMany({
      where: {
        byUser: userId,
        status: "Paying",
      },
    })
  }

  async getSpecificOrderById(orderId, userId) {
    return await this.db.order.findUnique({
      where: {
        byUser: userId,
        orderId,
      },
    })
  }

  async deleteOrder(orderId, userId) {
    return await this.db.order.delete({
      where: {
        byUser: userId,
        orderId,
      },
    })
  }

  async changeOrderStatus(orderId, status) {
    return await this.db.order.update({ where: { orderId }, data: { status } })
  }
}

module.exports = OrderService
