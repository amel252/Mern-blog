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
        res.status(201).json({
            success: true,
            post: savePost,
        });
    } catch (error) {
        next(error);
    }
};
