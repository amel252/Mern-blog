import { errorHandler } from "../utils/errors.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;
        if (userId !== req.user.id) {
            return next(
                errorHandler(403, "Vous n'avez pas l'autorisation de commenter")
            );
        }
        const newComment = new Comment({
            content,
            postId,
            userId,
        });
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
};
// récuperer les commentaires
export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort(
            { createdAt: -1 }
        );
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};
// mettre like au post
export const likeComment = async (req, res, next) => {
    try {
        // récup d'un comment a partir de son id
        const comment = await Comment.findById(req.params.commentId);
        // si le comment n'existe pas
        if (!comment) {
            return next(errorHandler(404, "Commentaire non trouvé"));
        }
        // récup de l'index de user qui a liké le post
        const userIndex = comment.likes.indexOf(req.user.id);
        if (userIndex === -1) {
            comment.numberOfLikes + 1;
            comment.likes.push(req.user.id);
        } else {
            comment.numberOfLikes - +1;
            comment.likes.splice(userIndex, 1);
        }
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};
// function update Commentaire
export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(
                errorHandler(404),
                "Vous n'etes pas permis d'éditer ce commentaire"
            );
        }
        // 🔒 Autorisation : seul l'auteur ou un admin peut modifier
        if (
            comment.userId.toString() !== req.user.id && // req.user.id fourni par middleware d'auth
            !req.user.isAdmin
        ) {
            return next(
                errorHandler(403, "Non autorisé à éditer ce commentaire")
            );
        }
        const updateComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                comment: req.body.content,
            },
            { new: true }
        );
        res.status(200).json(updateComment);
    } catch (error) {
        next(error);
    }
};
// function suppression comment
export const deletComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404), "Commentaire non trouvé");
        }
        if (comment.userId !== req.user.id && !req.user.isAdmin) {
            return next(
                errorHandler(
                    403,
                    "vous n'etes pas permis de supprimer ce commentaire "
                )
            );
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json("le commentaire a été supprimé");
    } catch (error) {
        next(error);
    }
};
