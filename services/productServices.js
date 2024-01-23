const prisma = require('../db.js');

class ProductService {
    db = prisma;

    async createProduct(productDetails){
        return await this.db.product.create({data: {...productDetails}});
    }

    async retrieveProductsWithPagination(page, count){
        const selectObject = { productId: true, productName: true, price: true };
        if (page && count){
            if (+page === 1) return await this.db.product.findMany({ skip: 0, take: +count, select: selectObject });
            else {return await this.db.product.findMany({
                skip: (+page) * (+count),
                take: +count,
                select: selectObject
            })};
        } else {
            return await this.db.product.findMany({ skip: 0, take: 20, select: selectObject });
        }
    }

    async getProductById(id){
        return await this.db.product.findUnique({where: {productId: id}});
    }

    async updateProductById(productId, fieldsforUpdate){
        return await this.db.product.update({where: {productId}, data: {...fieldsforUpdate}});
    }

    async deleteProductById(productId){
        return await this.db.product.delete({where: {productId}});
    }
}

module.exports = ProductService;