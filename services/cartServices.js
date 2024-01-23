const prisma = require('../db.js');

class CartService {
    db = prisma;

    async createCart(userId){
        return await this.db.cart.create({data: {forUser: userId}});
    }

    async getCartByUserId(userId){
        return await this.db.cart.findUnique({where: {forUser: userId}});
    }

    async addtoCart(cartId, productId){
        return await this.db.productToCart.create({
            data: {
                cartId,
                productId,
                count: 1
            }
        })
    }

    async showCart(userId){
        const cartForUser = await this.getCartByUserId(userId);
        return await this.db.productToCart.findMany({
            where: {
                cartId: cartForUser.cartId,
            },
            include: {
                product: {
                    select: {
                        productName: true,
                        price: true
                    }
                }
            }
        })
    }

    async updateCart(cartId, productId, count){
        const cart = await this.db.productToCart.findMany({
            where:{
                productId,
                cartId
            }});
        const product = await this.db.productToCart.findMany({
            where: {
                productId,
                cartId
            }});
            console.log(count);
        if (count === -1 && +product[0].count === 1){
            return null;
        } else {
            return await this.db.productToCart.updateMany({
                where: {
                    productId,
                    cartId
                },
                data: {
                    count: +(cart[0].count) + +(count)
                }
            });
        }
    }

    async deleteItemInCart(cartId, productId){
        return await this.db.productToCart.delete({where: {cartId, productId}});
    }

    async deleteAllItemsInCart(cartId){
        return await this.db.productToCart.deleteMany({where: {cartId}});
    }

    async getAllProductInUserCart(userId){
        const cart = await this.getCartByUserId(userId)
        return await this.db.productToCart.findMany({where: {cartId: cart.cartId}, include: {
            product: {
                select: {
                    price: true
                }
            }
        }});
    }
}

module.exports = CartService;