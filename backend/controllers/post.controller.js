import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errors.js";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(
            errorHandler(403, "Vous n'avez pas le droit de publier un article ")
        );
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Tous les champs sont requis"));
    }
    // on crée un espace entre les mots puis le tiret
    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savePost = await newPost.save();
        res.status(201).json(savePost);
    } catch (error) {
        next(error);
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    // "insensible à la casse" si tu cherche en maj ou miniscule
                    {
                        title: {
                            $regex: req.query.searchTerm,
                            $options: "i",
                        },
                    },
                ],
            }),
        })
            .sort({ updateAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const totalPosts = await Post.countDocuments();
        const now = new Date();

        const oneMounthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMounthPosts = await Post.countDocuments({
            createAt: { $gte: oneMounthAgo },
        });
        res.status(200).json({
            posts,
            totalPosts,
            lastMounthPosts,
        });
    } catch (error) {}
};
export const deletePost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        // return next(
        //     errorHandler(403, "vous n'etes pas autorisé de supprimer l'article")
        // );
        return res.status(403).json({
            message: "Vous n'êtes pas autorisé à supprimer cet article",
        });
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({
            message: "L'article a été supprimé avec succès",
        });
    } catch (error) {
        // next(error);
        console.error("Erreur serveur lors de la suppression :", error);
        return res.status(500).json({
            message: "Erreur serveur lors de la suppression",
        });
    }
};
