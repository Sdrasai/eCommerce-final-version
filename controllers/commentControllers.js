const { CommentService } = require('../services');
const { AppError } = require('../providers');
const commentService = new CommentService(); //admin panel should have an option to see all comments!

async function createComment(req, res){
    const {message, rating} = req.body;
    const createdComment = await commentService.createComment(message, rating, req.user.userId, req.params.productId);
    res.status(201).send(createdComment);
}

async function retrieveCommentsByUser(req, res){
    const commentsByUser = await commentService.retrieveCommentsByUserId(req.user.userId);
    res.status(200).send(commentsByUser);
}

async function retrieveCommentsOnProduct(req, res){
    const commentsOnProduct = await commentService.retrieveCommentsOnProduct(req.params.productId);
    res.status(200).send(commentsOnProduct);
}

async function retrieveSpecificComment(req, res){
    const specificComment = await commentService.retrieveCommentById(req.params.commentId);
    res.status(200).send(specificComment);
}

async function updateComment(req, res){
    const comment = await commentService.retrieveCommentById(req.params.commentId);
    if (comment.byUser === req.user.userId){
        const fieldsForUpdate = {...req.body};
        const updatedComment = await commentService.updateComment(req.params.commentId, fieldsForUpdate);
        res.status(201).send(updatedComment);
    } else {
        throw new AppError('not the Owner of the comment!', 401);
    }
}

async function deleteComment(req, res){
    const comment = await commentService.retrieveCommentById(req.params.commentId);
    if (comment.byUser === req.user.userId){
        const deletedComment = await commentService.deleteComment(req.params.commentId);
        res.status(204).send(deletedComment);
    } else {
        throw new AppError('not the Owner of the comment!', 401);
    }
}

module.exports = {
    createComment,
    retrieveCommentsByUser,
    retrieveCommentsOnProduct,
    retrieveSpecificComment,
    updateComment,
    deleteComment
}