const prisma = require('../db.js');

class CommentService {
    db = prisma;

    async createComment(message, rating = 'None', byUser, onProduct){
        return await this.db.comment.create({data: {message, rating, byUser, onProduct}});
    }

    async retrieveAllComments(){
        return await this.db.comment.findMany({});
    }

    async retrieveCommentsByUserId(id){
        return await this.db.comment.findMany({where: {byUser: id}});
    }

    async retrieveCommentsOnProduct(productId){
        return await this.db.comment.findMany({where: {onProduct: productId}});
    }

    async retrieveCommentById(id){
        return await this.db.comment.findUnique({where: {commentId: id}});
    }

    async updateComment(id, fieldsForUpdate){
        return await this.db.comment.update({where: {commentId: id}, data: {...fieldsForUpdate}});
    }

    async deleteComment(id){
        return await this.db.comment.delete({where: {commentId: id}});
    }
}

module.exports = CommentService;