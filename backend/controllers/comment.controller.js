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
// export const likeComment = async (req, res, next) => {
//     try {
//         const comment = await Comment.findById(req.params.commentId);
//         if (!comment) {
//             return next(errorHandler(404, "Commentaire non trouvé"));
//         }

//         const userIndex = comment.likes.indexOf(req.user.id);

//         if (userIndex === -1) {
//             comment.likes.push(req.user.id);
//         } else {
//             comment.likes.splice(userIndex, 1);
//         }

//         // si tu veux conserver `numberOfLikes`, mets-le à jour comme ça :
//         comment.numberOfLikes = comment.likes.length;

//         await comment.save();

//         res.status(200).json(comment);
//     } catch (error) {
//         next(error);
//     }
// };
// function de modif du commentaire :
export const editComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(
                errorHandler(404),
                "Vous n'etes pas permis d'éditer ce commentaire"
            );
        }
        const editComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                comment: req.body.comment,
            },
            { new: true }
        );
        res.status(200).json(editComment);
    } catch (error) {
        next(error);
    }
};
